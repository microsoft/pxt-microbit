# Ping

Send a ping and get the echo time or distance as a result

```sig
pins.ping(DigitalPin.P0, DigitalPin.P1, PingUnit.Centimeters, 500)
```

### Parameters

* **trigger**: the trigger pin
* **receiver**: the receiver pin
* **unit**: the unit of the returned number
* (optional) **max centimeter distance**: the maximum distance to scan for. Default is 500.

### Example

This program shows the measured distance in centimeters when the user presses the ``A`` button.

```blocks
input.onButtonPressed(Button.A, () => {
    basic.showNumber(pins.ping(DigitalPin.P0, DigitalPin.P1, PingUnit.Centimeters));
})
```

### See also

[@boardname@ pins](/device/pins)
