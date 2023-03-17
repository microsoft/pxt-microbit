# Pause

Pause the program for a duration of the number milliseconds you say. 
You can use this function to slow your program down.

```sig
basic.pause(400)
```

## Parameters

* **ms**: the number of milliseconds (duration) of your pause time. To convert from seconds: 100 milliseconds = 1/10 second and 1000 milliseconds = 1 second.

## Example

Randomly turn on and off the LED pixels on the screen.

```blocks
let duration = 500
basic.forever(function () {
    led.toggle(randint(0, 4), randint(0, 4))
    basic.pause(duration)
})
```

## Advanced

If **ms** is an invalid number (`NaN`, not a number), the pause will default to `20` ms.

## See also

[while](/blocks/loops/while), [running time](/reference/input/running-time), [for](/blocks/loops/for)

