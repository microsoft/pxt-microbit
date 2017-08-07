# Plot Analog Pin

Use this program to graph the analog value on pin ``P0``, ``P1`` or ``P2``.
Press ``A`` to scroll the value on the screen.

```blocks
let reading = 0
basic.forever(() => {
    reading = pins.analogReadPin(AnalogPin.P0)
    led.plotBarGraph(
        reading,
        1023
    )
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(reading)
    }
})
```
