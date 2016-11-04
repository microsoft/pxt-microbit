# Reset

Reset the @boardname@ and start the program again.

This function is like pressing the reset button on the back of the @boardname@.

```sig
control.reset()
```

### Example

This program will count as high as you like when you press button `A`.
When you get tired of counting, press button `B` to reset the
@boardname@ and start the program over.

```blocks
let item = 0;
basic.showNumber(item);
input.onButtonPressed(Button.A, () => {
    item = item + 1;
    basic.showNumber(item);
});
input.onButtonPressed(Button.B, () => {
    control.reset();
});
```

#### ~hint

This program works better on a real @boardname@ than in the simulator.

#### ~

### See Also

[clear screen](/reference/basic/clear-screen), [game over](/reference/game/game-over)
