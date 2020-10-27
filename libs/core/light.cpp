#include "pxt.h"

#if MICROBIT_CODAL

// WS2812B timings, +-0.15uS
// 0 - 0.40uS hi 0.85uS low
// 1 - 0.80uS hi 0.45uS low

__attribute__((noinline, long_call, section(".data"))) static void
neopixel_send_buffer(Pin &pin, const uint8_t *ptr, int numBytes) {
    pin.setDigitalValue(0);

    auto port = pin.name < 32 ? NRF_P0 : NRF_P1;
    uint32_t PIN = 1 << (pin.name & 31);

    // min. 50uS reset time; give it 100uS
    system_timer_wait_cycles(100 * 64);

    uint32_t mask = 0x80;
    int i = 0;

    __disable_irq();
    for (;;) {
        uint32_t d0 = ptr[i] & mask ? 5 : 1;
        uint32_t d1 = ptr[i] & mask ? 2 : 6;

        mask = mask >> 1;
        if (mask == 0) {
            mask = 0x80;
            i++;
        }

        port->OUTSET = PIN;

        system_timer_wait_cycles(d0);

        port->OUTCLR = PIN;
        system_timer_wait_cycles(d1);

        if (i >= numBytes)
            break;
    }
    __enable_irq();
}

__attribute__((noinline)) static void
neopixel_send_buffer_brigthness(DevicePin &pin, const uint8_t *ptr, int numBytes, int br) {
    if (br == 255)
        neopixel_send_buffer(pin, ptr, numBytes);
    else {
        auto copy = mkBuffer(NULL, numBytes);
        registerGCObj(copy);
        for (int i = 0; i < numBytes; ++i) {
            copy->data[i] = (ptr[i] * br) >> 8;
        }
        neopixel_send_buffer(pin, copy->data, copy->length);
        unregisterGCObj(copy);
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
