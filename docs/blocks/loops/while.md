# @extends

## #examples

## Example: diagonal line

The following example uses a while loop to make a diagonal line on the LED screen (points `0, 0`, `1, 1`, `2, 2`, `3, 3`, `4, 4`).

```blocks
input.onButtonPressed(Button.A, () => {
    let index = 4;
    while(index >= 0) {
        led.plot(index, index);
        index--;
    }
})
```
