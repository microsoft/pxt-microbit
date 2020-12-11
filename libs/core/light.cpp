#include "pxt.h"

#if MICROBIT_CODAL

// WS2812B timings, datasheet v1
// 0 - 0.25-0.55us hi 0.70-1.00us low
// 1 - 0.65-0.95us hi 0.30-0.60us low
// datasheet v5
// 0 - 0.22-0.38us hi 0.58-1.00us low
// 1 - 0.58-1.00us hi 0.58-1.00us low

// nrf52 asm timings:
// 0 0.34 - 0.78
// 1 0.80 - 0.59

extern "C" void __attribute__((long_call, section(".data")))
neopixel_send_buffer_nrf52(void *port500, uint32_t pinbr, const uint8_t *ptr, int numBytes);

__attribute__((noinline)) static void
neopixel_send_buffer_brightness(DevicePin &pin, const uint8_t *ptr, int numBytes, uint32_t br) {
    if (br > 0x100)
        br = 0x100;

    pin.setDigitalValue(0);
    target_wait_us(300); // initial reset

    auto port = pin.name < 32 ? NRF_P0 : NRF_P1;

    __disable_irq();
    neopixel_send_buffer_nrf52((uint8_t *)(void *)port + 0x500, (pin.name & 31) | (br << 20), ptr,
                               numBytes);
    __enable_irq();
}

static void neopixel_send_buffer(DevicePin &pin, const uint8_t *ptr, int numBytes) {
    neopixel_send_buffer_brightness(pin, ptr, numBytes, 0x100);
}

#else
extern "C" void neopixel_send_buffer_core(DevicePin *pin, const uint8_t *ptr, int numBytes);
__attribute__((noinline)) static void neopixel_send_buffer(DevicePin &pin, const uint8_t *ptr,
                                                           int numBytes) {

    // setup pin as digital
    pin.setDigitalValue(0);
    wait_us(300); // initial reset
    __disable_irq();
    neopixel_send_buffer_core(&pin, ptr, numBytes);
    __enable_irq();
}

extern "C" void neopixel_send_buffer_brightness_core(DevicePin *pin, const uint8_t *ptr,
                                                     int numBytes, int br);
__attribute__((noinline)) static void
neopixel_send_buffer_brightness(DevicePin &pin, const uint8_t *ptr, int numBytes, int br) {

    // setup pin as digital
    pin.setDigitalValue(0);
    wait_us(300); // initial reset
    __disable_irq();
    neopixel_send_buffer_brightness_core(&pin, ptr, numBytes, br);
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

    neopixel_send_buffer_brightness(*pxt::getPin(pin), buf->data, buf->length, brightness);
}

/**
 * Sets the light mode of a pin
 **/
//% advanced=true
//%
void setMode(int pin, int mode) {}

} // namespace light
