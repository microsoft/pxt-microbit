# Rando

Generate a random coordinate and display it on the LED screen.

```blocks
basic.forever(() => {
    led.toggle(Math.random(5), Math.random(5))
})
```