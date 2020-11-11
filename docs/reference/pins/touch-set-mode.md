# touch Set Mode

Set the touch mode for a touch pin or touch button.

```sig
pins.touchSetMode(TouchTarget.P0, TouchTargetMode.Capacitive)
```

You can choose which method you want a touch target (pins or logo) to use to detect a touch.
There are two methods used for touch sensing on the @boardname@, capacitive or resistive:

* **Capacitive** touch sensing is when the @boardname@ detects a change in the capacitance of a pin or conductive surface (like the touch logo) as you finger touches or comes very near it. 
* **Resistive** sensing detects a flow of current from the pin that is touched to the **GND** pin. Your body needs a connection to **GND** (either by touching it or by connecting a wire from it to your clothing) while you touch the input pin to complete a circuit between the two pins. 

The default touch mode set for the pins is resistive and the default touch mode for the logo is capacitive.

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

[Pin touch on the micro:bit](https://support.microbit.org/support/solutions/articles/19000116318-pin-touch-on-the-micro-bit)