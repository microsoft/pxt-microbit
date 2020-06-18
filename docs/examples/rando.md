# Rando

Generate a random coordinate and display it on the LED screen.

```blocks
basic.forever(() => {
    led.toggle(randint(0, 4), randint(0, 4))
})
```