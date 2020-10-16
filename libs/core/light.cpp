#include "pxt.h"

#if MICROBIT_CODAL
#include "neopixel.h"

__attribute__((noinline)) static void
neopixel_send_buffer_brigthness(DevicePin &pin, const uint8_t *ptr, int numBytes, int br) {
    if (br == 255)
        neopixel_send_buffer(pin, ptr, numBytes);
    else {
        auto copy = mkBuffer(NULL, numBytes);
        for (int i = 0; i < numBytes; ++i) {
            copy->data[i] = (ptr[i] * br) >> 8;
        }
        neopixel_send_buffer(pin, copy->data, copy->length);
    }
}
#else
extern "C" void neopixel_send_buffer_core(DevicePin *pin, const uint8_t *ptr, int numBytes);
__attribute__((noinline)) static void neopixel_send_buffer(DevicePin &pin, const uint8_t *ptr,
                                                           int numBytes) {

    // setup pin as digital
    pin.setDigitalValue(0);
    __disable_irq();
    neopixel_send_buffer_core(&pin, ptr, numBytes);
    __enable_irq();
}

extern "C" void neopixel_send_buffer_brigthness_core(DevicePin *pin, const uint8_t *ptr,
                                                     int numBytes, int br);
__attribute__((noinline)) static void
neopixel_send_buffer_brigthness(DevicePin &pin, const uint8_t *ptr, int numBytes, int br) {

    // setup pin as digital
    pin.setDigitalValue(0);
    __disable_irq();
    neopixel_send_buffer_brigthness_core(&pin, ptr, numBytes, br);
    __enable_irq();
}
#endif

namespace light {

/**
 * Sends a color buffer to a light strip
 **/
//% advanced=true
void sendWS2812Buffer(Buffer buf, int pin) {
    if (!buf || !buf->length)
        return;
    neopixel_send_buffer(*pxt::getPin(pin), buf->data, buf->length);
}

/**
 * Sends a color buffer to a light strip
 **/
//% advanced=true
void sendWS2812BufferWithBrightness(Buffer buf, int pin, int brightness) {
    if (!buf || !buf->length)
        return;

    neopixel_send_buffer_brigthness(*pxt::getPin(pin), buf->data, buf->length, brightness);
}

/**
 * Sets the light mode of a pin
 **/
//% advanced=true
//%
void setMode(int pin, int mode) {}

} // namespace light
