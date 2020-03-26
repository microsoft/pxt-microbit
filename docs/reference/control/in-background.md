# Run In Background

Run part of a program while the rest of it is doing something else.

```sig
control.inBackground(() => {
})
```

## ~hint

For more information, read 
[The @boardname@ - a reactive system](/device/reactive).
It is pretty advanced!

## ~

## Example

This program shows how running in the background can say what is
stored in a variable like `num`, while another part (``on button pressed``)
changes what is stored there.

```blocks
let num = 0
control.inBackground(() => {
    while (true) {
        basic.showNumber(num)
        basic.pause(100)
    }
})
input.onButtonPressed(Button.A, () => {
    num++;
})
```

This program does the same thing, but in a more usual way,
with a ``forever`` loop.

```blocks
let num = 0
basic.forever(() => {
    basic.showNumber(num)
})
input.onButtonPressed(Button.A, () => {
    num++;
})
```

## See also

[while](/blocks/loops/while), [forever](/reference/basic/forever),
[on button pressed](/reference/input/on-button-pressed)

