/**
 * Control of the LED screen.
 */
//% color=#5C2D91 weight=101 icon="\uf205"
namespace led {
    /**
     * Get the on/off state of the specified LED using x, y coordinates. (0,0) is upper left.
     * @param x the horizontal coordinate of the LED
     * @param y the vertical coordinate of the LED
     */
    //% help=led/point weight=76
    //% blockId=device_point block="point|x %x|y %y"
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1
    export function point(x: number, y: number): boolean {
        return led.pointBrightness(x, y) > 0;
    }

    // what's the current high value
    let barGraphHigh = 0;
    // when was the current high value recorded
    let barGraphHighLast = 0;
    
    /**
     * Controls where plotbargraph prints to the console
     **/ 
    export let barGraphToConsole = true

    /**
     * Displays a vertical bar graph based on the `value` and `high` value.
     * If `high` is 0, the chart gets adjusted automatically.
     * @param value current value to plot
     * @param high maximum value. If 0, maximum value adjusted automatically, eg: 0
     */
    //% help=led/plot-bar-graph weight=20
    //% blockId=device_plot_bar_graph block="plot bar graph of %value up to %high" icon="\uf080" blockExternalInputs=true
    //% parts="ledmatrix"
    export function plotBarGraph(value: number, high: number): void {
        const now = input.runningTime();
        if (barGraphToConsole)
            console.logValue("", value);
        if (isNaN(value)) {
            basic.clearScreen()
            return
        }
        value = Math.abs(value);

        // auto-scale "high" is not provided
        if (high > 0) {
            barGraphHigh = high;
        } else if (value > barGraphHigh || now - barGraphHighLast > 10000) {
            barGraphHigh = value;
            barGraphHighLast = now;
        }

        // normalize lack of data to 0..1
        if (barGraphHigh < 16 * Number.EPSILON)
            barGraphHigh = 1;

        // normalize value to 0..1
        const v = value / barGraphHigh;
        const dv = 1 / 16;
        let k = 0;
        for (let y = 4; y >= 0; --y) {
            for (let x = 0; x < 3; ++x) {
                if (k > v) {
                    unplot(2 - x, y);
                    unplot(2 + x, y);
                } else {
                    plot(2 - x, y);
                    plot(2 + x, y);
                }
                k += dv;
            }
        }
    }

    /**
     * Toggles a particular pixel
     * @param x pixel column
     * @param y pixel row
     */
    //% help=led/toggle weight=77
    //% blockId=device_led_toggle block="toggle|x %x|y %y" icon="\uf204" blockGap=8
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1
    export function toggle(x: number, y: number): void {
        if (led.point(x, y)) {
            led.unplot(x, y);
        } else {
            led.plot(x, y);
        }
    }

    /**
     * Turns all LEDS on
     */
    //% help=led/plot-all
    //% parts="ledmatrix"
    export function plotAll(): void {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                led.plot(i, j);
            }
        }
    }

    /**
     * Inverts the current LED display
     */
    //% help=led/toggle-all
    //% parts="ledmatrix"
    export function toggleAll(): void {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                led.toggle(i, j);
            }
        }
    }

    /**
     * Fades in the screen display.
     * @param ms fade time in milliseconds
     */
    //% help=led/fade-in
    //% parts="ledmatrix"
    export function fadeIn(ms: number = 700): void {
        if (ms < 20) {
            led.setBrightness(255);
            return;
        }
        let dt = 50;
        let brightness = led.brightness();
        let start = input.runningTime();
        let elapsed = 0;
        while (elapsed < ms) {
            led.setBrightness(brightness + ((255 - brightness) * elapsed) / ms);
            basic.pause(dt);
            elapsed = input.runningTime() - start;
        }
        led.setBrightness(255);
    }

    /**
     * Fades out the screen brightness.
     * @param ms fade time in milliseconds
     */
    //% help=led/fade-out
    //% parts="ledmatrix"
    export function fadeOut(ms: number = 700): void {
        if (ms < 20) {
            led.setBrightness(0);
            return;
        }
        let brightness = led.brightness();
        let dt = 50;
        let start = input.runningTime();
        let elapsed = 0;
        while (elapsed < ms) {
            led.setBrightness(brightness - (brightness * elapsed) / ms);
            basic.pause(dt);
            elapsed = input.runningTime() - start;
        }
        led.setBrightness(0);
    }
}
