# On Button Pressed

Start an [event handler](/reference/event-handler) (part of the program that will run when something happens, like when a button is pressed). 
This handler works when button `A` or `B` is pressed, or `A` and `B` together.
When you are using this function in a web browser, click the buttons on the screen instead of the ones
on the @boardname@.

```sig
input.onButtonPressed(Button.A, () => {})
```

### Example: count button clicks

This example counts how many times you press the `A` button. 
Each time you press the button, the [LED screen](/device/screen) shows the `count` variable getting bigger.

```blocks
let count = 0
basic.showNumber(count)
input.onButtonPressed(Button.A, () => {
    count++;
    basic.showNumber(count);
})
```

### Example: roll dice

This example shows a number from 1 to 6 when you press the `B` button.

```blocks
input.onButtonPressed(Button.B, () => {
    let dice = Math.random(6) + 1
    basic.showNumber(dice)
})
```

### ~hint

This program adds a `1` to `random(6)` so the numbers on the dice will come out right.
Otherwise, sometimes they would show a `0`.

### ~

### See also

[button is pressed](/reference/input/button-is-pressed), [forever](/reference/basic/forever), [random](/blocks/math)

