#include "pxt.h"

#if MICROBIT_CODAL
#include "neopixel.h"
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
#endif

namespace light {

/**
* Sends a color buffer to a light strip
**/
//% advanced=true
//%
void sendWS2812Buffer(Buffer buf, int pin) {
    if (!buf || !buf->length)
        return;
    neopixel_send_buffer(*pxt::getPin(pin), buf->data, buf->length);
}

/**
* Sets the light mode of a pin
**/
//% advanced=true
//%
void setMode(int pin, int mode) {

}

} // namespace light
