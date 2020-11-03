# touch Set Mode

Set the touch mode for a touch pin or touch button.

```sig
pins.touchSetMode(TouchTarget.P0, TouchTargetMode.Capacitive)
```

Two common touch sensing methods are capacitive or resisitive. Capacitive touch sensing is when the @boardname@ detects a change in the capacitance of a pin or conductive surface (like the touch logo) as you finger touches or comes very near it. This is similar for resistive sensing except that the change in resistance is measured instead of capacitance.

You can choose which method you want a touch target (pins or logo) to use to detect touch.

### ~ reminder

![works with micro:bit V2 only image](/static/v2/v2-only.png)

This block requires the [micro:bit V2](/device/v2) hardware. If you use this block with a micro:bit v1 board, you will see the **927** error code on the screen.

### ~

## Paramters

* **target**: the pin or logo you want to set the touch mode for: ``P0``, ``P1``, ``P2``, or ``logo``.
* **mode**: the mode to use for touch detection: ``capacitive`` or ``resistive``.

## Example

Set the touch mode for the logo to ``resistive``.

```blocks
pins.touchSetMode(TouchTarget.LOGO, TouchTargetMode.Resistive)
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showString("I can't resist")
})
```

## See also

[on pin pressed](/reference/input/on-pin-pressed),
[on logo event](/reference/input/on-logo-event)