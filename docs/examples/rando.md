# Rando

Generate a random coordinate and display it on the LED screen.

```blocks
basic.forever(() => {
    led.toggle(Math.randomRange(0, 5), Math.randomRange(0, 5))
})
```