# LED screen

```sim
    basic.showLeds(`
        # . # . #
        . # . # .
        # . # . #
        . # . # .
        # . # . #
        `);
```

The micro:bit LED screen has 25 red LED lights arranged in a 5X5 grid (5 LEDs across by 5 LEDs down).
In the screen above, we created a checkerboard pattern using the LEDs.

## Which LED?

You use `(x ,y)` coordinates to specify a particular LED in the grid; 
where `x` is the horizontal position (0,1,2,3,4) and `y` is the vertical position 
(0, 1, 2, 3, 4). 

To figure out the ``x``, ``y`` coordinates, position your micro:bit horizontally, like a credit card (see picture above).

Here are the x, y coordinates for the LEDs in the 5X5 grid:

`(0,0)` `(1,0)` `(2,0)` `(3,0)` `(4,0)`

`(0,1)` `(1,1)` `(2,1)` `(3,1)` `(4,1)`

`(0,2)` `(1,2)` `(2,2)` `(3,2)` `(4,2)`

`(0,3)` `(1,3)` `(2,3)` `(3,3)` `(4,3)`

`(0,4)` `(1,4)` `(2,4)` `(3,4)` `(4,4)`

The x, y coordinates for the LED in the center of the grid are `(2,2)`. Starting from `(0,0)` count over 2 columns and then down 2 rows.

## Check your understanding

Which LEDs are turned on in the checkboard pattern above? 

## Row, column - 1

Since the row and column numbers start at 0, an easy way to figure out the (x,y) coordinates 
is to subtract 1 from the row and column number (when counting from 1). 
In other words, to specify the LED in the 4th column 5th row, subtract 1 from each number to get coordinates `(3,4)`.

## Turn a LED on/off

Use [plot](/reference/led/plot) and [unplot](/reference/led/unplot) to turn a LED on or off

```blocks
led.plot(0,0);
led.plot(1,1);
basic.pause(1000);
led.unplot(0,0);
basic.pause(1000);
led.unplot(1,1);
```

## Is a LED on/off?

Use the [point](/reference/led/point) function to find out if a LED is on or off.

```blocks
if(led.point(0,0)) {
}
```

## Display images, strings and numbers

Instead of turning individual LEDs on or off, as above, you can display an [image](/reference/images/image) directly to the screen or show text and numbers on screen using the [show number](/reference/basic/show-number) and [show string](/reference/basic/show-string) functions.

## The display buffer

The micro:bit runtime keeps a representation of the state of all 25 LEDS in memory. This state is known as the "display buffer" and controls which LEDs are on and which are off. The plot, unplot, and point functions access the display buffer directly. On the other hand, the functions that show an image, number, or string overwrite the buffer completely. To illustrate this, first try running this code sequence

```blocks
basic.showString("d")
led.plot(0, 0)
```

You will see the letter "d" displayed as well as the LED in position `0,0` lit up. Now try reversing the order of the two statements above:

```blocks
led.plot(0, 0)
basic.showString("d")
```

You will not see the LED at position `0,0` lit up because the `show string` function overwrites the whole display buffer.

## Pins: P3, P4, P6, P7, P9, P10

These pins are coupled to the LED matrix display and also to the display's associated ambient light sensing mode.
To disable the display driver feature (which will automatically disable the light sensing feature) use the function [led.enable](/reference/led/enable). 

More information at http://tech.microbit.org/hardware/edgeconnector_ds/ .
