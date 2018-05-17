# Rando

Generate a random coordinate and display it on the LED screen.

```blocks
basic.forever(() => {
    led.toggle(Math.randomInt(5), Math.randomInt(5))
})
```