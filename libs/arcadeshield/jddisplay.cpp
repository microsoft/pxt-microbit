#include "pxt.h"

#include "jddisplay.h"

#include "config_nrf.h"

#define VLOG NOLOG
//#define VLOG DMESG

namespace pxt {

codal::CodalDevice device;

#define ALIGN(x) (((x) + 3) & ~3)

static void jd_panic(void) {
    target_panic(121);  // PANIC_SCREEN_ERROR
}

static int jd_shift_frame(jd_frame_t *frame) {
    int psize = frame->size;
    jd_packet_t *pkt = (jd_packet_t *)frame;
    int oldsz = pkt->service_size + 4;
    if (ALIGN(oldsz) >= psize)
        return 0; // nothing to shift

    int ptr;
    if (frame->data[oldsz] == 0xff) {
        ptr = frame->data[oldsz + 1];
        if (ptr >= psize)
            return 0; // End-of-frame
        if (ptr <= oldsz) {
            DMESG("invalid super-frame %d %d", ptr, oldsz);
            return 0; // don't let it go back, must be some corruption
        }
    } else {
        ptr = ALIGN(oldsz);
    }

    // assume the first one got the ACK sorted
    frame->flags &= ~JD_FRAME_FLAG_ACK_REQUESTED;

    uint8_t *src = &frame->data[ptr];
    int newsz = *src + 4;
    if (ptr + newsz > psize) {
        DMESG("invalid super-frame %d %d %d", ptr, newsz, psize);
        return 0;
    }
    uint32_t *dst = (uint32_t *)frame->data;
    uint32_t *srcw = (uint32_t *)src;
    // don't trust memmove()
    for (int i = 0; i < newsz; i += 4)
        *dst++ = *srcw++;
    // store ptr
    ptr += ALIGN(newsz);
    frame->data[newsz] = 0xff;
    frame->data[newsz + 1] = ptr;

    return 1;
}

static void *jd_push_in_frame(jd_frame_t *frame, unsigned service_num, unsigned service_cmd,
                              unsigned service_size) {
    if (service_num >> 8)
        jd_panic();
    if (service_cmd >> 16)
        jd_panic();
    uint8_t *dst = frame->data + frame->size;
    unsigned szLeft = (uint8_t *)frame + sizeof(*frame) - dst;
    if (service_size + 4 > szLeft)
        return NULL;
    *dst++ = service_size;
    *dst++ = service_num;
    *dst++ = service_cmd & 0xff;
    *dst++ = service_cmd >> 8;
    frame->size += ALIGN(service_size + 4);
    return dst;
}

JDDisplay::JDDisplay(SPI *spi, Pin *cs, Pin *flow) : spi(spi), cs(cs), flow(flow) {
    inProgress = false;
    stepWaiting = false;
    displayServiceNum = 0;
    controlsStartServiceNum = 0;
    controlsEndServiceNum = 0;
    soundServiceNum = 0;
    buttonState = 0;
    brightness = 100;
    soundBufferPending = 0;
    soundSampleRate = 44100;
    avgFrameTime = 26300; // start with a reasonable default
    lastFrameTimestamp = 0;

    EventModel::defaultEventBus->listen(DEVICE_ID_DISPLAY, 4243, this, &JDDisplay::sendDone);

    flow->getDigitalValue(PullMode::Down);
    EventModel::defaultEventBus->listen(flow->id, DEVICE_PIN_EVENT_ON_EDGE, this,
                                        &JDDisplay::onFlowHi, MESSAGE_BUS_LISTENER_IMMEDIATE);
    flow->eventOn(DEVICE_PIN_EVT_RISE);
}

void JDDisplay::waitForSendDone() {
    if (inProgress)
        fiber_wait_for_event(DEVICE_ID_DISPLAY, 4242);
}

void JDDisplay::sendDone(Event) {
    inProgress = false;
    Event(DEVICE_ID_DISPLAY, 4242);
}

void *JDDisplay::queuePkt(uint32_t service_num, uint32_t service_cmd, uint32_t size) {
    void *res = jd_push_in_frame(&sendFrame, service_num, service_cmd, size);
    if (res == NULL)
        target_panic(122);  // PANIC_SCREEN_ERROR
    return res;
}

void JDDisplay::flushSend() {
    if (cs)
        cs->setDigitalValue(0);
    spi->startTransfer((uint8_t *)&sendFrame, sizeof(sendFrame), (uint8_t *)&recvFrame,
                       sizeof(recvFrame), &JDDisplay::stepStatic, this);
}

void JDDisplay::stepStatic(void *p) {
    ((JDDisplay *)p)->step();
}

// We assume EIC IRQ pre-empts SPI/DMA IRQ (that is the numerical priority value of EIC is lower)
// This is true for codal STM32, SAMD, and NRF52
void JDDisplay::onFlowHi(Event) {
    if (stepWaiting)
        step();
}

void JDDisplay::handleIncoming(jd_packet_t *pkt) {
    if (pkt->service_number == JD_SERVICE_NUMBER_CTRL &&
        pkt->service_command == JD_CMD_ADVERTISEMENT_DATA) {
        uint32_t *servptr = (uint32_t *)pkt->data;
        int numServ = pkt->service_size >> 2;
        for (uint8_t servIdx = 1; servIdx < numServ; ++servIdx) {
            uint32_t service_class = servptr[servIdx];
            if (service_class == JD_SERVICE_CLASS_INDEXED_SCREEN) {
                displayServiceNum = servIdx;
                VLOG("JDA: found screen, serv=%d", servIdx);
            } else if (service_class == JD_SERVICE_CLASS_ARCADE_GAMEPAD) {
                if (!controlsStartServiceNum)
                    controlsStartServiceNum = servIdx;
                controlsEndServiceNum = servIdx;
                VLOG("JDA: found controls, serv=%d", servIdx);
            } else if (service_class == JD_SERVICE_CLASS_ARCADE_SOUND) {
                soundServiceNum = servIdx;
                VLOG("JDA: found sound, serv=%d", servIdx);
            } else {
                VLOG("JDA: unknown service: %x", service_class);
            }
        }
    } else if (pkt->service_number == JD_SERVICE_NUMBER_CTRL &&
               pkt->service_command == JD_CMD_CTRL_NOOP) {
        // do nothing
    } else if (pkt->service_number == soundServiceNum) {
        switch (pkt->service_command) {
        case JD_GET(JD_ARCADE_SOUND_REG_BUFFER_PENDING):
            soundBufferPending = *(uint32_t *)pkt->data;
            break;
        case JD_GET(JD_ARCADE_SOUND_REG_SAMPLE_RATE):
            soundSampleRate = *(uint32_t *)pkt->data >> 10;
            break;
        }
    } else if (pkt->service_number == displayServiceNum) {
        switch (pkt->service_command) {
        case JD_GET(JD_INDEXED_SCREEN_REG_HEIGHT):
            screenHeight = *(uint16_t *)pkt->data;
            break;
        case JD_GET(JD_INDEXED_SCREEN_REG_WIDTH):
            screenWidth = *(uint16_t *)pkt->data;
            break;
        }
    } else if (controlsStartServiceNum <= pkt->service_number &&
               pkt->service_number <= controlsEndServiceNum &&
               pkt->service_command == (JD_CMD_GET_REG | JD_REG_READING)) {
        auto report = (jd_arcade_gamepad_buttons_t *)pkt->data;
        auto endp = pkt->data + pkt->service_size;
        uint32_t state = 0;

        while ((uint8_t *)report < endp) {
            int idx = 0;
            int b = report->button;

            if (report->pressure < 0x20)
                continue;

            if (b == JD_ARCADE_GAMEPAD_BUTTON_SELECT)
                b = JD_ARCADE_GAMEPAD_BUTTON_MENU;

            if (b == JD_ARCADE_GAMEPAD_BUTTON_RESET || b == JD_ARCADE_GAMEPAD_BUTTON_EXIT)
                target_reset();

            if (1 <= b && b <= 7) {
                idx = b + 7 * (pkt->service_number - controlsStartServiceNum);
            }

            if (idx > 0)
                state |= 1 << idx;

            report++;
        }

        if (state != buttonState) {
            for (int i = 0; i < 32; ++i) {
                if ((state & (1 << i)) && !(buttonState & (1 << i)))
                    Event(PXT_INTERNAL_KEY_DOWN, i);
                if (!(state & (1 << i)) && (buttonState & (1 << i)))
                    Event(PXT_INTERNAL_KEY_UP, i);
            }
            buttonState = state;
        }
    } else {
        // TODO remove later
        VLOG("JDA: unknown packet for %d (cmd=%x)", pkt->service_number, pkt->service_command);
    }
}

void JDDisplay::step() {
    if (cs)
        cs->setDigitalValue(1);

    target_disable_irq();
    if (!flow->getDigitalValue()) {
        stepWaiting = true;
        target_enable_irq();
        return;
    } else {
        stepWaiting = false;
    }
    target_enable_irq();

    memset(&sendFrame, 0, JD_SERIAL_FULL_HEADER_SIZE);
    sendFrame.crc = JDSPI_MAGIC;
    sendFrame.device_identifier = device.getSerialNumber();

    if (recvFrame.crc == JDSPI_MAGIC_NOOP) {
        // empty frame, skip
    } else if (recvFrame.crc != JDSPI_MAGIC) {
        DMESG("JDA: magic mismatch %x", (int)recvFrame.crc);
    } else if (recvFrame.size == 0) {
        // empty frame, skip
    } else {
        for (;;) {
            handleIncoming((jd_packet_t *)&recvFrame);
            if (!jd_shift_frame(&recvFrame))
                break;
        }
    }

    if (displayServiceNum == 0) {
        // poke the control service to enumerate
        queuePkt(JD_SERVICE_NUMBER_CTRL, JD_CMD_ADVERTISEMENT_DATA, 0);
        flushSend();
        return;
    }

    if (palette) {
        {
#define PALETTE_SIZE (16 * 4)
            auto cmd =
                queuePkt(displayServiceNum, JD_SET(JD_INDEXED_SCREEN_REG_PALETTE), PALETTE_SIZE);
            memcpy(cmd, palette, PALETTE_SIZE);
            palette = NULL;
        }
        {
            auto cmd = (jd_indexed_screen_start_update_t *)queuePkt(
                displayServiceNum, JD_INDEXED_SCREEN_CMD_START_UPDATE,
                sizeof(jd_indexed_screen_start_update_t));
            *cmd = this->addr;
        }
        {
            auto cmd =
                (uint8_t *)queuePkt(displayServiceNum, JD_SET(JD_INDEXED_SCREEN_REG_BRIGHTNESS), 1);
            *cmd = this->brightness * 0xff / 100;
        }

        if (soundServiceNum) {
            // we only need this for sending sound
            uint32_t now = (uint32_t)(pxt::current_time_ms());
            if (lastFrameTimestamp) {
                uint32_t thisFrame = now - lastFrameTimestamp;
                avgFrameTime = (avgFrameTime * 15 + thisFrame) >> 4;
            }
            lastFrameTimestamp = now;
            // send around 2 frames of sound; typically around 60ms, so ~3000 samples
            soundBufferDesiredSize =
                sizeof(int16_t *) * ((((avgFrameTime * 2) >> 10) * soundSampleRate) >> 10);
        }

        flushSend();
        return;
    }

    if (dataLeft > 0) {
        uint32_t transfer = bytesPerTransfer;
        if (dataLeft < transfer)
            transfer = dataLeft;
        auto pixels = queuePkt(displayServiceNum, JD_INDEXED_SCREEN_CMD_SET_PIXELS, transfer);
        memcpy(pixels, dataPtr, transfer);
        dataPtr += transfer;
        dataLeft -= transfer;
        flushSend();
    } else if (soundServiceNum && soundBufferPending < soundBufferDesiredSize) {
        int bytesLeft = soundBufferDesiredSize - soundBufferPending;
        if (bytesLeft > bytesPerTransfer)
            bytesLeft = bytesPerTransfer;
        auto samples = (int16_t *)queuePkt(soundServiceNum, JD_ARCADE_SOUND_CMD_PLAY, bytesLeft);
        if (pxt::redirectSamples(samples, bytesLeft >> 1, soundSampleRate)) {
            soundBufferPending += bytesLeft;
        } else {
            // no sound generated, fill with 0 and stop
            memset(samples, 0, bytesLeft);
            soundBufferDesiredSize = 0;
        }
        flushSend();
    } else {
        // trigger sendDone(), which executes outside of IRQ context, so there
        // is no race with waitForSendDone
        Event(DEVICE_ID_DISPLAY, 4243);
    }
}

int JDDisplay::sendIndexedImage(const uint8_t *src, unsigned width, unsigned height,
                                uint32_t *palette) {
    if (height & 1 || !height || !width)
        target_panic(123);  // PANIC_SCREEN_ERROR
    if (width != addr.width || height != addr.height)
        target_panic(124); // PANIC_SCREEN_ERROR
    if (inProgress)
        target_panic(125); // PANIC_SCREEN_ERROR

    if (addr.y && addr.y >= screenHeight)
        return 0; // out of range

    inProgress = true;

    int numcols = JD_SERIAL_PAYLOAD_SIZE / (height / 2);

    bytesPerTransfer = numcols * (height / 2);
    dataLeft = (height / 2) * width;
    dataPtr = src;

    this->palette = palette;

    memset(&sendFrame, 0, sizeof(sendFrame));

    step();

    return 0;
}

} // namespace pxt