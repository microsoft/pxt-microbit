# Calibrate Compass

Runs the compass calibration sequence.

```sig
input.calibrateCompass();
```

## Calibration

The calibration will ask you to draw a circle or fill the LED screen by tilting the
@boardname@.

If you are calibrating or using the compass near metal, it might
confuse the @boardname@.

## Example

This example runs the calibration when the user presses **A+B** buttons.

```blocks
input.onButtonPressed(Button.AB, () => {
    input.calibrateCompass();
})
```

## See also

[compassHeading](/reference/input/compass-heading)
