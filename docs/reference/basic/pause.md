# Pause

Pause the program for the number of milliseconds you say. 
You can use this function to slow your program down.

```sig
basic.pause(400)
```

## Parameters

* ``ms`` is the number of milliseconds that you want to pause (100 milliseconds = 1/10 second, and 1000 milliseconds = 1 second).

## Example: diagonal line

This example draws a diagonal line by turning on LED `0, 0` (top left) through LED `4, 4` (bottom right). 
The program pauses 500 milliseconds after turning on each LED. 
Without `pause`, the program would run so fast that you would not have time to see each LED turning on.

```blocks
for (let i = 0; i < 5; i++) {
    led.plot(i, i)
    basic.pause(500)
}
```

## See also

[while](/blocks/loops/while), [running time](/reference/input/running-time), [for](/blocks/loops/for)

