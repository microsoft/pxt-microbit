# Reset

Reset the @boardname@ and start the program again.

This function is like pressing the reset button on the back of the @boardname@.

```sig
control.reset()
```
## ~hint

**Simulator**

The **reset** function works only on a real @boardname@ and not in the simulator.

## ~

## Example

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

## See also

[clear screen](/reference/basic/clear-screen), [game over](/reference/game/game-over)
