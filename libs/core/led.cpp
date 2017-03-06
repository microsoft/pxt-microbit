#include "pxt.h"

enum class DisplayMode_ {
    //% block="black and white"
    BackAndWhite = DISPLAY_MODE_BLACK_AND_WHITE,
    //% block="greyscale"
    Greyscale = DISPLAY_MODE_GREYSCALE,
    // TODO DISPLAY_MODE_BLACK_AND_WHITE_LIGHT_SENSE
};

//% color=#5C2D91 weight=97 icon="\uf205"
namespace led {

    /**
     * Turn on the specified LED using x, y coordinates (x is horizontal, y is vertical). (0,0) is upper left.
     * @param x TODO
     * @param y TODO
     */
    //% help=led/plot weight=78
    //% blockId=device_plot block="plot|x %x|y %y" blockGap=8
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    void plot(int x, int y) {
      uBit.display.image.setPixelValue(x, y, 1);
    }

    /**
     * Turn off the specified LED using x, y coordinates (x is horizontal, y is vertical). (0,0) is upper left.
     * @param x TODO
     * @param y TODO
     */
    //% help=led/unplot weight=77
    //% blockId=device_unplot block="unplot|x %x|y %y" blockGap=8
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    void unplot(int x, int y) {
      uBit.display.image.setPixelValue(x, y, 0);
    }

    /**
     * Get the on/off state of the specified LED using x, y coordinates. (0,0) is upper left.
     * @param x TODO
     * @param y TODO
     */
    //% help=led/point weight=76
    //% blockId=device_point block="point|x %x|y %y"
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    bool point(int x, int y) {
      int pix = uBit.display.image.getPixelValue(x, y);
      return pix > 0;
    }

    /**
     * Get the screen brightness from 0 (off) to 255 (full bright).
     */
    //% help=led/brightness weight=60
    //% blockId=device_get_brightness block="brightness" blockGap=8
    //% parts="ledmatrix"
    //% advanced=true
    int brightness() {
      return uBit.display.getBrightness();
    }

    /**
     * Set the screen brightness from 0 (off) to 255 (full bright).
     * @param value the brightness value, eg:255, 127, 0
     */
    //% help=led/set-brightness weight=59
    //% blockId=device_set_brightness block="set brightness %value"
    //% parts="ledmatrix"
    //% advanced=true
    //% value.min=0 value.max=255
    void setBrightness(int value) {
       uBit.display.setBrightness(value);
    }

    /**
     * Cancels the current animation and clears other pending animations.
     */
    //% weight=50 help=led/stop-animation
    //% blockId=device_stop_animation block="stop animation"
    //% parts="ledmatrix"
    //% advanced=true
    void stopAnimation() {
       uBit.display.stopAnimation();
    }

    /**
     * Sets the display mode between black and white and greyscale for rendering LEDs.
     * @param mode mode the display mode in which the screen operates
     */
    //% weight=1 help=led/set-display-mode
    //% parts="ledmatrix" advanced=true
    void setDisplayMode(DisplayMode_ mode) {
        uBit.display.setDisplayMode((DisplayMode)mode);
    }

    /**
    * Turns on or off the display
    */
    //% help=led/enable blockId=device_led_enable block="led enable %on"
    //% advanced=true parts="ledmatrix"
    void enable(bool on) {
        if (on) uBit.display.enable();
        else uBit.display.disable();
    }

    /**
     * Takes a screenshot of the LED screen and returns an image.
     */
    //% help=led/screenshot
    //% parts="ledmatrix"
    Image screenshot() {
      return uBit.display.screenShot().leakData();
        /*
        let Image img;
        img = image.createImage("");
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (led.point(i, j)) {
                    img.setPixel(i, j, true);
                }
            }
        }
        return img;
        */
    }
}
