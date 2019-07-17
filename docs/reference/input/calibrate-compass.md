# Calibrate Compass

Runs the compass calibration sequence.

```sig
input.calibrateCompass();
```

## Calibration

The calibration will ask you to draw a circle or fill the LED screen by tilting the
@boardname@.

The compass calibration is stored in memory by the @boardname@, so next time you press the reset button or remove and replace the power the calibration will be remembered.

When you flash a new program to your @boardname@ via USB, this memory is cleared so you will have to re-calibrate it.

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
