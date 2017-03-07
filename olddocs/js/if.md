# If

Run code based on a condition.

### @parent javascript/language
 

Conditionally run code depending on whether a [Boolean](/reference/types/boolean) condition is true or false.

### Block Editor

In the Block Editor, click on the dark blue gear icon (see above) to add an *else* or *if* to the current block.

### Touch Develop

### ~hide

```
let condition = true
```

### ~

```
if (condition) {
    // this code runs if `condition` is `true`
} else {
    // this code runs if `condition` is `false`
}
```

### Example: adjusting screen brightness

If the screen [brightness](/reference/led/brightness) is `< 100`, this code sets the brightness to `255`:

```
if (led.brightness() < 100) {
    led.setBrightness(255)
}
```

You can leave the `then` or `else` blocks empty if they aren't needed.

### Else if: multiple if statements

You can chain together if statements by using `else if`. Like this:

### ~hide

```
let otherCondition = true
```

### ~

```
if (condition) {
    // this code runs if `condition` is `true`
} else if (otherCondition) {
    // this code runs if `other condition` is `true`
}
else {
    // this code runs if neither `condition` or `other condition` are `true`
}
```

### Example: compass heading

The following example gets the [compass heading](/reference/input/compass-heading) and then uses ``if-then-else`` statements to display a letter on the screen (N for north, E for East, S for South, and W for West).

```
while (true) {
    let degrees = input.compassHeading()
    if (degrees < 45) {
        basic.showString("N", 100)
    } else if (degrees < 135) {
        basic.showString("E", 100)
    }
    else if (degrees < 225) {
        basic.showString("S", 100)
    }
    else {
        basic.showString("W", 100)
    }
}
```

### Drag and drop

You can move an entire ``if`` block by clicking the ``if`` keyword and dragging and dropping.

### Lessons

[love meter](/lessons/love-meter), [zoomer](/lessons/zoomer), [offset image](/lessons/offset-image)

### See also

[while loop](/js/while), [for](/reference/loops/for), [boolean](/reference/types/boolean)

