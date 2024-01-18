#include "pxt.h"

// This adds about 1.2k of binary size, but allows for displaying
// panic codes regardless of heap state etc. with IRQs disabled.

#define ST7735_NOP 0x00
#define ST7735_SWRESET 0x01
#define ST7735_RDDID 0x04
#define ST7735_RDDST 0x09

#define ST7735_SLPIN 0x10
#define ST7735_SLPOUT 0x11
#define ST7735_PTLON 0x12
#define ST7735_NORON 0x13

#define ST7735_INVOFF 0x20
#define ST7735_INVON 0x21
#define ST7735_DISPOFF 0x28
#define ST7735_DISPON 0x29
#define ST7735_CASET 0x2A
#define ST7735_RASET 0x2B
#define ST7735_RAMWR 0x2C
#define ST7735_RAMRD 0x2E

#define ST7735_PTLAR 0x30
#define ST7735_COLMOD 0x3A
#define ST7735_MADCTL 0x36

#define ST7735_FRMCTR1 0xB1
#define ST7735_FRMCTR2 0xB2
#define ST7735_FRMCTR3 0xB3
#define ST7735_INVCTR 0xB4

#define ST7735_GMCTRP1 0xE0
#define ST7735_GMCTRN1 0xE1

#define MADCTL_MY 0x80
#define MADCTL_MX 0x40
#define MADCTL_MV 0x20
#define MADCTL_ML 0x10
#define MADCTL_RGB 0x00
#define MADCTL_BGR 0x08
#define MADCTL_MH 0x04

namespace _pxt_panic {

// target_panic has been called
static bool panicMode = false;

#define DELAY 0x80

class ST7735 {
    Pin *sck, *mosi, *dc, *cs;

    void sendBytes(uint8_t *ptr, uint32_t len);
    void sendCmd(uint8_t *buf, int len);
    void sendCmdSeq(const uint8_t *buf);
    void configure(uint8_t madctl, uint32_t frmctr1);

  public:
    uint16_t width, height;
    void fill(int color, int numpixels);
    void setAddrWindow(int x, int y, int w, int h);
    void init();
    void drawNumber(int idx, int x, int y, int color);
};

// clang-format off
static const uint8_t initCmds[] = {
    ST7735_SWRESET,   DELAY,  //  1: Software reset, 0 args, w/delay
      120,                    //     150 ms delay
    ST7735_SLPOUT ,   DELAY,  //  2: Out of sleep mode, 0 args, w/delay
      120,                    //     500 ms delay
    ST7735_INVOFF , 0      ,  // 13: Don't invert display, no args, no delay
    ST7735_COLMOD , 1      ,  // 15: set color mode, 1 arg, no delay:
      0x03,                  //     12-bit color

    ST7735_NORON  ,    DELAY, //  3: Normal display on, no args, w/delay
      10,                     //     10 ms delay
    ST7735_DISPON ,    DELAY, //  4: Main screen turn on, no args w/delay
      10,
    0, 0 // END
};
// clang-format on

static const uint8_t numbers[] = {
    0x06, 0x09, 0x09, 0x09, 0x06, // 0
    0x04, 0x06, 0x04, 0x04, 0x0e, // 1
    0x07, 0x08, 0x06, 0x01, 0x0f, // 2
    0x0f, 0x08, 0x04, 0x09, 0x06, // 3
    0x0c, 0x0a, 0x09, 0x1f, 0x08, // 4
    0x1f, 0x01, 0x0f, 0x10, 0x0f, // 5
    0x08, 0x04, 0x0e, 0x11, 0x0e, // 6
    0x1f, 0x08, 0x04, 0x02, 0x01, // 7
    0x0e, 0x11, 0x0e, 0x11, 0x0e, // 8
    0x0e, 0x11, 0x0e, 0x04, 0x02, // 9
    0x11, 0x00, 0x0e, 0x1b, 0x11, // :(
    // 0x11, 0x04, 0x04, 0x0a, 0x11, // :(
};

void ST7735::sendBytes(uint8_t *ptr, uint32_t len) {
    uint8_t mask = 0, b;
    for (;;) {
        if (!mask) {
            if (!len--)
                break;
            mask = 0x80;
            b = *ptr++;
        }
        mosi->setDigitalValue((b & mask) ? 1 : 0);
        sck->setDigitalValue(1);
        mask >>= 1;
        sck->setDigitalValue(0);
    }
}

void ST7735::fill(int color, int numpixels) {
    uint8_t cmd[20] = {ST7735_RAMWR};
    sendCmd(cmd, 1);

    dc->setDigitalValue(1);
    if (cs)
        cs->setDigitalValue(0);

    cmd[0] = color >> 4;
    cmd[1] = (color << 4) | (color >> 8);
    cmd[2] = color;

    int n = (numpixels + 1) >> 1;
    while (n--) {
        sendBytes(cmd, 3);
    }

    if (cs)
        cs->setDigitalValue(1);
}

void ST7735::sendCmd(uint8_t *buf, int len) {
    // make sure cmd isn't on stack
    dc->setDigitalValue(0);
    if (cs)
        cs->setDigitalValue(0);
    sendBytes(buf, 1);
    dc->setDigitalValue(1);
    len--;
    buf++;
    if (len > 0)
        sendBytes(buf, len);
    if (cs)
        cs->setDigitalValue(1);
}

static void busy_wait_us(int ms) {
    target_wait_us(ms);
    /*
    // this is for 120MHz
    while (ms--) {
        for (int i = 0; i < 30; ++i)
            asm volatile("nop");
    }
    */
}

void ST7735::sendCmdSeq(const uint8_t *buf) {
    uint8_t cmdBuf[32];

    while (*buf) {
        cmdBuf[0] = *buf++;
        int v = *buf++;
        int len = v & ~DELAY;
        // note that we have to copy to RAM
        memcpy(cmdBuf + 1, buf, len);
        sendCmd(cmdBuf, len + 1);
        buf += len;
        if (v & DELAY) {
            busy_wait_us(1000 * *buf++);
        }
    }
}

void ST7735::setAddrWindow(int x, int y, int w, int h) {
    w += x - 1;
    h += y - 1;
    uint8_t cmd0[] = {ST7735_RASET, 0, (uint8_t)x, (uint8_t)(w >> 8), (uint8_t)w};
    uint8_t cmd1[] = {ST7735_CASET, 0, (uint8_t)y, (uint8_t)(h >> 8), (uint8_t)h};
    sendCmd(cmd1, sizeof(cmd1));
    sendCmd(cmd0, sizeof(cmd0));
}

void ST7735::init() {
    mosi = LOOKUP_PIN(DISPLAY_MOSI);
    sck = LOOKUP_PIN(DISPLAY_SCK);
    cs = LOOKUP_PIN(DISPLAY_CS);
    dc = LOOKUP_PIN(DISPLAY_DC);
    auto bl = LOOKUP_PIN(DISPLAY_BL);
    auto rst = LOOKUP_PIN(DISPLAY_RST);

    if (cs)
        cs->setDigitalValue(1);
    dc->setDigitalValue(1);

    if (bl) {
        bl->setDigitalValue(1);
    }

    if (rst) {
        rst->setDigitalValue(0);
        busy_wait_us(20 * 1000);
        rst->setDigitalValue(1);
        busy_wait_us(20 * 1000);
    }

    uint32_t cfg0 = getConfig(CFG_DISPLAY_CFG0, 0x40);
    uint32_t frmctr1 = getConfig(CFG_DISPLAY_CFG1, 0x000603);
    auto madctl = cfg0 & 0xff;

    sendCmdSeq(initCmds);
    configure(madctl, frmctr1);

    width = getConfig(CFG_DISPLAY_WIDTH, 160);
    height = getConfig(CFG_DISPLAY_HEIGHT, 128);
}

void ST7735::configure(uint8_t madctl, uint32_t frmctr1) {
    uint8_t cmd0[] = {ST7735_MADCTL, madctl};
    uint8_t cmd1[] = {ST7735_FRMCTR1, (uint8_t)(frmctr1 >> 16), (uint8_t)(frmctr1 >> 8),
                      (uint8_t)frmctr1};
    sendCmd(cmd0, sizeof(cmd0));
    sendCmd(cmd1, cmd1[3] == 0xff ? 3 : 4);
}

#define SIZE 4

void ST7735::drawNumber(int idx, int x, int y, int color) {
    const uint8_t *src = &numbers[idx * 5];
    for (int i = 0; i < 5; i++) {
        uint8_t ch = *src++;
        for (int j = 0; j < 5; j++) {
            if (ch & (1 << j)) {
                setAddrWindow(x + j * SIZE, y + i * SIZE, SIZE - 1, SIZE - 1);
                fill(color, (SIZE - 1) * (SIZE - 1));
            }
        }
    }
}

static void drawPanic(int code) {
    if (!LOOKUP_PIN(DISPLAY_MOSI))
        return;

    ST7735 display;

    display.init();
    display.setAddrWindow(0, 0, display.width, display.height);
    display.fill(0, display.width * display.height);

    display.drawNumber(10, 70, 20, 0xf00);
    int x = 50;
    int y = 60;
    display.drawNumber((code / 100) % 10, x, y, 0xff0);
    x += 24;
    display.drawNumber((code / 10) % 10, x, y, 0xff0);
    x += 24;
    display.drawNumber((code / 1) % 10, x, y, 0xff0);
    x += 24;
}

extern "C" __attribute__((weak)) void platform_panic(int statusCode) {}

extern "C" void target_panic(int statusCode) {
    __disable_irq();      // low-level disable
    target_disable_irq(); // make sure they stay disabled in DMESG()

    DMESG("*** CODAL PANIC : [%d]", statusCode);

    __disable_irq(); // disable IRQ after DMESG() again just to make sure

    if (panicMode) {
        // avoid recursive panic invocation
        while (1) {
        }
    }

    gcFreeze();

    // remember first panic code
    panicMode = true;

    drawPanic(statusCode);

    platform_panic(statusCode);

    auto led = LOOKUP_PIN(LED);

    const int unit = 100000;
    const int dit = unit;
    const int dat = 3 * unit;
    const int intra = unit;
    const int inter = 2 * unit;
    const int word = 6 * unit;
    while (1) {
        if (led) {
            // SOS
            // . . .
            for (int i = 0; i < 3; ++i) {
                led->setDigitalValue(1);
                busy_wait_us(dit);
                led->setDigitalValue(0);
                busy_wait_us(intra);
            }
            // inter character space
            busy_wait_us(inter);
            // - - -
            for (int i = 0; i < 3; ++i) {
                led->setDigitalValue(1);
                busy_wait_us(dat);
                led->setDigitalValue(0);
                busy_wait_us(intra);
            }
            // inter character space
            busy_wait_us(inter);
            // . . .
            for (int i = 0; i < 3; ++i) {
                led->setDigitalValue(1);
                busy_wait_us(dit);
                led->setDigitalValue(0);
                busy_wait_us(intra);
            }
            // inter character space
            busy_wait_us(word);
        }
    }
}

} // namespace _pxt_panic