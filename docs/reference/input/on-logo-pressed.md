# on Logo Pressed

Run some code in your program when the @boardname@ logo is pressed.

```sig
input.onLogoPressed(function () {})
```

The logo on the @boardname@ works just like a touch pin. The logo will detect your touch. You can have code inside an event that will run when the logo is pressed.

## Example

Show a message on the LEDs when the @boardname@ logo is pressed.

```blocks
input.onLogoPressed(function () {
    basic.showString("I was pressed!")
})
```

## See also

[on logo released](/reference/input/on-logo-released),
[logo is pressed](/reference/input/logo-is-pressed),
[on pin pressed](/reference/input/on-logo-released)
