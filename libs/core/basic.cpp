#include "pxt.h"


/**
 * Provides access to basic micro:bit functionality.
 */
//% color=#0078D7 weight=100 icon="\uf00a"
namespace basic {

    /**
     * Scroll a number on the screen. If the number fits on the screen (i.e. is a single digit), do not scroll.
     * @param interval speed of scroll; eg: 150, 100, 200, -100
     */
    //% help=basic/show-number
    //% weight=96
    //% blockId=device_show_number block="show|number %number" blockGap=8
    //% async
    //% parts="ledmatrix"
    void showNumber(int value, int interval = 150) { 
      if (interval <= 0)
        interval = 1;
      ManagedString t(value);
      if (value < 0 || value >= 10) {
        uBit.display.scroll(t, interval);
      } else {
        uBit.display.printChar(t.charAt(0), interval * 5);
      }
    }

    /**
     * Draws an image on the LED screen.
     * @param leds the pattern of LED to turn on/off
     * @param interval time in milliseconds to pause after drawing
     */
    //% help=basic/show-leds 
    //% weight=95 blockGap=8
    //% imageLiteral=1 async
    //% blockId=device_show_leds
    //% block="show leds" icon="\uf00a"
    //% parts="ledmatrix"
    void showLeds(ImageLiteral leds, int interval = 400) {
      uBit.display.print(MicroBitImage(imageBytes(leds)), 0, 0, 0, interval);
    }

    /**
     * Display text on the display, one character at a time. If the string fits on the screen (i.e. is one letter), does not scroll.
     * @param text the text to scroll on the screen, eg: "Hello!"
     * @param interval how fast to shift characters; eg: 150, 100, 200, -100
     */
    //% help=basic/show-string 
    //% weight=87 blockGap=8
    //% block="show|string %text" 
    //% async
    //% blockId=device_print_message
    //% parts="ledmatrix"
    void showString(StringData *text, int interval = 150) {
      if (interval <= 0)
        interval = 1;
      ManagedString s(text);
      int l = s.length();
      if (l == 0) {
        uBit.display.clear();
        fiber_sleep(interval * 5);
      } else if (l > 1) {
        uBit.display.scroll(s, interval);
      } else {
        uBit.display.print(s.charAt(0), interval * 5);
      }
    }

    /**
     * Turn off all LEDs
     */
    //% help=basic/clear-screen weight=79
    //% blockId=device_clear_display block="clear screen"
    //% parts="ledmatrix"
    //% advanced=true
    void clearScreen() {
      uBit.display.image.clear();
    }

    /**
     * Shows a sequence of LED screens as an animation.
     * @param leds pattern of LEDs to turn on/off
     * @param interval time in milliseconds between each redraw
     */
    //% help=basic/show-animation imageLiteral=1 async
    //% parts="ledmatrix"
    void showAnimation(ImageLiteral leds, int interval = 400) {
      uBit.display.animate(MicroBitImage(imageBytes(leds)), interval, 5, 0, 0);
    }

    /**
     * Draws an image on the LED screen.
     * @param leds pattern of LEDs to turn on/off
     */
    //% help=basic/plot-leds weight=80
    //% parts="ledmatrix"
    void plotLeds(ImageLiteral leds) {
      MicroBitImage i(imageBytes(leds));
      uBit.display.print(i, 0, 0, 0, 0);
    }

    void forever_stub(void *a) {
      while (true) {
        runAction0((Action)a);
        fiber_sleep(20);
      }
    }

    /**
     * Repeats the code forever in the background. On each iteration, allows other codes to run.
     * @param body code to execute
     */
    //% help=basic/forever weight=55 blockGap=8 blockAllowMultiple=1
    //% blockId=device_forever block="forever" icon="\uf01e"
    void forever(Action a) {
      if (a != 0) {
        incr(a);
        create_fiber(forever_stub, (void*)a);
      }
    }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=basic/pause weight=54
    //% async block="pause (ms) %pause"
    //% blockId=device_pause icon="\uf110"
    void pause(int ms) {
      fiber_sleep(ms);
    }
}
