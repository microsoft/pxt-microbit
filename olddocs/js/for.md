# For

Repeat code a preset number of times.

### @parent javascript/language
 

Repeat code a fixed number of times.

### Block Editor

The Block Editor *for* loop is different than the Touch Develop *for* loop in an important way. The above for loop will iterate *five* times, with the loop variable *i* taking on values 0, 1, 2, 3, and 4. The Touch Develop for loop shown below will iterate four times:

```
for (let k = 0; k < 4; k++) {
}
```

### Touch Develop

### ~hide

```
let upper = 5
```

### ~

```
for (let k1 = 0; k1 < upper; k1++) {
    // Add code to repeat here, also called the `loop body`
}
```

where

* `0` is initial value of the loop index variable `k`
* the value of `k` increases by 1 after each execution of the `loop body`
* `upper` is the number of times the loop body will repeat

In other words, the index variable (`k`) starts at 0 and increases by 1 each time the `loop body` executes, until `k = upper`.

### Example: count to 5

The following example displays numbers 1 through 5 on the LED screen:

```
for (let i = 0; i < 5; i++) {
    basic.showNumber(i + 1, 100)
    basic.pause(500)
}
```

### Example: draw a box

The [LED screen](/device/screen) has a fixed number of rows and columns (5x5), which is ideal for a for loop. This example uses a for loop to turn on the LEDs along the edge of the screen, making a square.

```
for (let i1 = 0; i1 < 5; i1++) {
    led.plot(0, i1)
    led.plot(4, i1)
    led.plot(i1, 0)
    led.plot(i1, 4)
    basic.pause(500)
}
```

### ~hint 

Want to exit a loop early? The [break](/js/break) statement exits a loop before the end value is reached.

### ~

### Lessons

[looper](/lessons/looper), [strobe light](/lessons/strobe-light)

### See also

[while](/js/while), [break](/js/break), [if](/reference/logic/if)

