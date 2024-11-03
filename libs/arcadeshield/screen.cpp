#include "pxt.h"

#include "Pin.h"
#define PinCompat codal::Pin

#include "ST7735.h"
#include "ILI9341.h"

// this is a hack because someone (don't know where) #defined SPI to be NRF52SPI,
// which messes with the include file below the #undef
#undef SPI
#include "SPIScreenIO.h"

#include "jddisplay.h"

#include "config_nrf.h"

typedef RefImage *Bitmap_;

namespace pxt {

class WDisplay {
  public:
    ScreenIO *io;
    ST7735 *lcd;
    JDDisplay *smart;

    uint32_t currPalette[16];
    bool present;
    bool newPalette;
    bool inUpdate;
    uint8_t *screenBuf;

    uint16_t width, height;
    uint16_t displayHeight;
    uint8_t offX, offY;
    bool doubleSize;
    uint32_t palXOR;

    WDisplay() {
        uint32_t cfg2 = MY_DISPLAY_CFG2;

        uint32_t cfg0 = MY_DISPLAY_CFG0;
        uint32_t frmctr1 = MY_DISPLAY_CFG1;

        int dispTp = MY_DISPLAY_TYPE;

        doubleSize = false;
        smart = NULL;

        auto miso = LOOKUP_PIN(DISPLAY_MISO);
        dispTp = smartConfigure(&cfg0, &frmctr1, &cfg2);

        if (dispTp != DISPLAY_TYPE_SMART)
            miso = NULL; // only JDDisplay needs MISO, otherwise leave free

        SPI *spi = new CODAL_SPI(*LOOKUP_PIN(DISPLAY_MOSI), *miso, *LOOKUP_PIN(DISPLAY_SCK));
        io = new SPIScreenIO(*spi);

        if (dispTp == DISPLAY_TYPE_ST7735) {
            width = 160;
            height = 128;
            lcd = new ST7735(*io, *LOOKUP_PIN(DISPLAY_CS), *LOOKUP_PIN(DISPLAY_DC));
        } else if (dispTp == DISPLAY_TYPE_SMART) {
            lcd = NULL;
            width = 160;
            height = 120;
            smart = new JDDisplay(spi, LOOKUP_PIN(DISPLAY_CS), LOOKUP_PIN(DISPLAY_DC));
        } else
            target_panic(128); // PANIC_SCREEN_ERROR

        palXOR = (cfg0 & 0x1000000) ? 0xffffff : 0x000000;
        auto madctl = cfg0 & 0xff;
        offX = (cfg0 >> 8) & 0xff;
        offY = (cfg0 >> 16) & 0xff;

        DMESG("configure screen: FRMCTR1=%p MADCTL=%p type=%d", frmctr1, madctl, dispTp);

        if (spi) {
            auto freq = (cfg2 & 0xff);
            if (!freq)
                freq = 15;
            spi->setFrequency(freq * 1000000);
            spi->setMode(0);
            // make sure the SPI peripheral is initialized before toggling reset
            spi->write(0);
        }

        auto rst = LOOKUP_PIN(DISPLAY_RST);
        if (rst) {
            rst->setDigitalValue(0);
            fiber_sleep(20);
            rst->setDigitalValue(1);
            fiber_sleep(20);
        }

        if (lcd) {
            auto bl = LOOKUP_PIN(DISPLAY_BL);
            if (bl) {
                bl->setDigitalValue(1);
            }

            lcd->init();
            lcd->configure(madctl, frmctr1);
        }

        displayHeight = height;
        setAddrMain();
        DMESG("screen: %d x %d, off=%d,%d", width, height, offX, offY);
        int sz = doubleSize ? (width >> 1) * (height >> 1) : width * height;
        screenBuf = (uint8_t *)app_alloc(sz / 2 + 20);
        inUpdate = false;
    }

    uint32_t smartConfigure(uint32_t *cfg0, uint32_t *cfg1, uint32_t *cfg2) {
        uint32_t hc;
        present = false;

        DMESG("74HC: waiting...");

        // wait while nothing is connected
        for (;;) {
            auto rst = LOOKUP_PIN(DISPLAY_RST);
            if (rst) {
                rst->setDigitalValue(0);
                target_wait_us(10);
                rst->setDigitalValue(1);
                fiber_sleep(3); // in reality we need around 1.2ms
            }

            hc = readButtonMultiplexer(17);
            if (hc != 0)
                break;

            fiber_sleep(100);

            // the device will run without shield when the following is specified in user program:
            // namespace userconfig { export const DISPLAY_CFG0 = 0x02000080 }
            if (*cfg0 & 0x2000000) {
                DMESG("74HC: no wait requested");
                return DISPLAY_TYPE_ST7735;
            }
        }
        present = true;

        DMESG("74HC: %x", hc);

        // is the line forced up? if so, assume JDDisplay
        if (hc == 0x1FFFF) {
            disableButtonMultiplexer();
            return DISPLAY_TYPE_SMART;
        }

        hc = hc >> 1;

        // SER pin (or first bit of second HC) is orientation
        if (hc & 0x0010)
            *cfg0 = 0x80;
        else
            *cfg0 = 0x40;

        uint32_t configId = (hc & 0xe0) >> 5;


        switch (configId) {
        case 1:
            *cfg1 = 0x0603; // ST7735
            break;
        case 2:
            *cfg1 = 0xe14ff; // ILI9163C
            *cfg0 |= 0x08;   // BGR colors
            break;
        case 3:
            *cfg1 = 0x0603;     // ST7735
            *cfg0 |= 0x1000000; // inverted colors
            break;
        default:
            target_panic(129);  // PANIC_SCREEN_ERROR
            break;
        }

        DMESG("config type: %d; cfg0=%x cfg1=%x", configId, *cfg0, *cfg1);

        // for some reason, setting SPI frequency to 32 doesn't
        // work with ST77735 in pxt-microbit
        *cfg2 = 16; // Damn the torpedoes! 32MHz

        return DISPLAY_TYPE_ST7735;
    }

    void setAddrMain() {
        if (lcd)
            lcd->setAddrWindow(offX, offY, width, displayHeight);
        else
            smart->setAddrWindow(offX, offY, width, displayHeight);
    }
    void waitForSendDone() {
        if (lcd)
            lcd->waitForSendDone();
        else
            smart->waitForSendDone();
    }
    int sendIndexedImage(const uint8_t *src, unsigned width, unsigned height, uint32_t *palette) {
        if (lcd)
            return lcd->sendIndexedImage(src, width, height, palette);
        else
            return smart->sendIndexedImage(src, width, height, palette);
    }
};

SINGLETON_IF_PIN(WDisplay, DISPLAY_MOSI);

//%
int setScreenBrightnessSupported() {
    auto display = getWDisplay();
    if (display && display->smart)
        return 1;

    auto bl = LOOKUP_PIN(DISPLAY_BL);
    if (!bl)
        return 0;
#ifdef SAMD51
    if (bl->name == PA06)
        return 0;
#endif
#ifdef NRF52_SERIES
    // PWM not implemented yet
    return 0;
#else
    return 1;
#endif
}

//%
void setScreenBrightness(int level) {
    if (level < 0)
        level = 0;
    if (level > 100)
        level = 100;

    auto display = getWDisplay();
    if (display && display->smart) {
        display->smart->brightness = level;
        return;
    }

    auto bl = LOOKUP_PIN(DISPLAY_BL);
    if (!bl)
        return;

    if (level == 0)
        bl->setDigitalValue(0);
    else if (level == 100)
        bl->setDigitalValue(1);
    else {
        if (setScreenBrightnessSupported()) {
            bl->setAnalogPeriodUs(1000);
            bl->setAnalogValue(level * level * 1023 / 10000);
        }
    }
}

//%
void setPalette(Buffer buf) {
    auto display = getWDisplay();
    if (!display)
        return;

    if (48 != buf->length)
        target_panic(130); // PANIC_SCREEN_ERROR
    for (int i = 0; i < 16; ++i) {
        display->currPalette[i] =
            (buf->data[i * 3] << 16) | (buf->data[i * 3 + 1] << 8) | (buf->data[i * 3 + 2] << 0);
        display->currPalette[i] ^= display->palXOR;
    }
    display->newPalette = true;
}

//%
bool displayPresent() {
    auto display = getWDisplay();
    if (!display)
        return false;
    return display->present;
}

//%
int displayHeight() {
    auto display = getWDisplay();
    if (!display)
        return -1;
    return display->displayHeight;
}

//%
int displayWidth() {
    auto display = getWDisplay();
    if (!display)
        return -1;
    return display->width;
}

//%
void updateScreen(Bitmap_ img) {
    auto display = getWDisplay();
    if (!display)
        return;

    if (display->inUpdate)
        return;

    display->inUpdate = true;

    auto mult = display->doubleSize ? 2 : 1;

    if (img) {
        if (img->bpp() != 4 || img->width() * mult != display->width ||
            img->height() * mult != display->displayHeight)
            target_panic(131);  // PANIC_SCREEN_ERROR

        // DMESG("wait for done");
        display->waitForSendDone();

        auto palette = display->currPalette;

        if (display->newPalette) {
            display->newPalette = false;
        } else {
            // smart mode always sends palette
            if (!display->smart)
                palette = NULL;
        }

        memcpy(display->screenBuf, img->pix(), img->pixLength());

        // DMESG("send");
        display->sendIndexedImage(display->screenBuf, img->width(), img->height(), palette);
    }

    display->inUpdate = false;
}

//%
void updateStats(String msg) {
    // ignore...
}

} // namespace pxt