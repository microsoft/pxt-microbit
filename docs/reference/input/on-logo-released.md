# on Logo Released

Run code when the @boardname@ logo is pressed.

```sig
input.onLogoReleased(function () {})
```

The logo on the @boardname@ works just like a touch pin. The logo will detect your touch. You can have code inside an event that will run when you stop pressing on the logo.

## Example

Show a message on the LEDs when the @boardname@ logo is released.

```blocks
input.onLogoReleased(function () {
    basic.showString("I was released!")
})
```

## See also

[on logo pressed](/reference/input/on-logo-pressed),
[logo is pressed](/reference/input/logo-is-pressed),
[on pin released](/reference/input/on-pin-released)