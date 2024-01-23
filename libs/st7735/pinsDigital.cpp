#include "pxt.h"

#include "Pin.h"
#define PinCompat codal::Pin

#include "config_nrf.h"

#ifdef PXT_CODAL

namespace pxt {

static void waitABit() {
    // for (int i = 0; i < 10; ++i)
    //    asm volatile("nop");
}

class ButtonMultiplexer : public CodalComponent {
  public:
    Pin &latch;
    Pin &clock;
    Pin &data;
    uint32_t state;
    uint32_t invMask;
    uint16_t buttonIdPerBit[8];
    bool enabled;

    ButtonMultiplexer(uint16_t id)
        : latch(*LOOKUP_PIN(BTNMX_LATCH)), clock(*LOOKUP_PIN(BTNMX_CLOCK)),
          data(*LOOKUP_PIN(BTNMX_DATA)) {
        this->id = id;
        this->status |= DEVICE_COMPONENT_STATUS_SYSTEM_TICK;

        state = 0;
        invMask = 0;
        enabled = true;

        memset(buttonIdPerBit, 0, sizeof(buttonIdPerBit));

        data.getDigitalValue(PullMode::Down);
        latch.setDigitalValue(1);
        clock.setDigitalValue(1);
    }

    void disable() {
        data.getDigitalValue(PullMode::None);
        latch.getDigitalValue(PullMode::None);
        clock.getDigitalValue(PullMode::None);
        enabled = false;
    }

    bool isButtonPressed(int id) {
        for (int i = 0; i < 8; ++i) {
            if (buttonIdPerBit[i] == id)
                return (state & (1 << i)) != 0;
        }
        return false;
    }

    uint32_t readBits(int bits) {
        latch.setDigitalValue(0);
        waitABit();
        latch.setDigitalValue(1);
        waitABit();

        uint32_t state = 0;
        for (int i = 0; i < bits; i++) {
            state <<= 1;
            if (data.getDigitalValue(PullMode::Down))
                state |= 1;

            clock.setDigitalValue(0);
            waitABit();
            clock.setDigitalValue(1);
            waitABit();
        }

        return state;
    }

    virtual void periodicCallback() override {
        if (!enabled)
            return;

        uint32_t newState = readBits(8);
        newState ^= invMask;
        if (newState == state)
            return;

        for (int i = 0; i < 8; ++i) {
            uint32_t mask = 1 << i;
            if (!buttonIdPerBit[i])
                continue;
            int ev = 0;
            if (!(state & mask) && (newState & mask))
                ev = PXT_INTERNAL_KEY_DOWN;
            else if ((state & mask) && !(newState & mask))
                ev = PXT_INTERNAL_KEY_UP;
            if (ev) {
                Event(ev, buttonIdPerBit[i]);
                Event(ev, 0); // any key
            }
        }

        state = newState;
    }
};

static ButtonMultiplexer *btnMultiplexer;
ButtonMultiplexer *getMultiplexer() {
    if (!btnMultiplexer)
        btnMultiplexer = new ButtonMultiplexer(DEVICE_ID_FIRST_BUTTON);
    return btnMultiplexer;
}

uint32_t readButtonMultiplexer(int bits) {
    if (!LOOKUP_PIN(BTNMX_CLOCK))
        return 0;
    return getMultiplexer()->readBits(bits);
}

void disableButtonMultiplexer() {
    if (LOOKUP_PIN(BTNMX_CLOCK)) {
        getMultiplexer()->disable();
    }
}

}

#endif
