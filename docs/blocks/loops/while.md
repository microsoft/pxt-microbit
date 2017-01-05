# While

Repeat code while a [Boolean](/blocks/logic/boolean) `condition` is true.

```block
while(true) {
}
```

The while loop has a *condition* that evaluates to a [Boolean](/blocks/logic/boolean) value. After the `do` keyword, add the code that you want to run while the `condition` is `true`. The while loop concludes with `end while`.

The condition is tested before any code runs. Which means that if the condition is false, the code inside the loop doesn't execute.

### Example: diagonal line

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

### See also

[on button pressed](/reference/input/on-button-pressed), [for](/blocks/loops/for), [if](/blocks/logic/if), [forever](/reference/basic/forever)

