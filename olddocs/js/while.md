# While

Repeat code in a loop while a condition is true.

### @parent javascript/language
 

Repeat code while a [Boolean](/reference/types/boolean) `condition` is true.

### ~hide

```
let condition = false
```

### ~

### Block Editor


### Touch Develop

```
while (condition) {
    // This code runs if `condition` is `true`
}
```

The while loop has a *condition* that evaluates to a [Boolean](/reference/types/boolean) value. After the `do` keyword, add the code that you want to run while the `condition` is `true`. The while loop concludes with `end while`.

The condition is tested before any code runs. Which means that if the condition is false, the code inside the loop doesn't execute. Use the [break statement](/js/break) to exit a while loop before it's complete.

### Example: diagonal line

The following example uses a while loop to make a diagonal line on the LED screen (points `0, 0`, `1, 1`, `2, 2`, `3, 3`, `4, 4`).

// index is set to 4

```
let index = 4
while (index >= 0) {
    led.plot(index, index)
    // // subtract 1 from `index` each time through loop
    index = index - 1
}
```

### Example: count until A button pressed

The following example shows numbers on the screen(0, 1, 2, 3...), until the "A" button is pressed.

```
let x = 0
while (true) {
    basic.showNumber(x, 100)
    let pressed = input.buttonIsPressed("A")
    if (pressed) {
        break
    } else {
        x = x + 1
    }
    basic.pause(1000)
}
```

### Lessons

[rotation animation](/lessons/rotation-animation), [digi yoyo](/lessons/digi-yoyo)

### See also

[on button pressed](/reference/input/on-button-pressed), [for](/reference/loops/for), [if](/reference/logic/if), [break](/js/break), [forever](/reference/basic/forever), [in background](/reference/control/in-background)

