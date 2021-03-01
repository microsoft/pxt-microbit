# Neopixel matrix width

For Neopixel matrix (strip) on the specified [pin](/device/pins),
set the width of that matrix. This informs the simulator to display
the Neopixel strip as a matrix.

```sig
pins.setMatrixWidth(Digital.P1, 16)
```

## Parameters

* ``name``: The @boardname@ hardware pin to configure (``P0``-``P20``)
* ``width``: a [number](/types/number) (for example, from `2` through `16`)

## Example

To use the example below, you should add the Neopixel extension to your
project and then copy the JavaScript code below over to your project. 
The example creates a strip of 25 neopixels corresponding to a 5x5 matrix and then draws 
an `X` on the matrix. Try changing the value of the variable `width`
to get matrices of different sizes.

```blocks
let width = 5
let strip = neopixel.create(DigitalPin.P1, width * width, NeoPixelMode.RGB)
strip.setMatrixWidth(width)
pins.setMatrixWidth(DigitalPin.P1, width)
for (let i = 0; i <= width - 1; i++) {
    strip.setMatrixColor(i, i, neopixel.colors(NeoPixelColors.Red))
    strip.setMatrixColor(width - (i + 1), i, neopixel.colors(NeoPixelColors.Blue))
}
strip.show()
```

