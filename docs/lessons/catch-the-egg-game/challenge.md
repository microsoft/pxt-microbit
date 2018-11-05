# catch the egg game challenge

## Rebuild the game!

The blocks have been shuffled! Put them back together so that...

* an egg LED  falls from the top of the screen, row by row.
* a basket LED is on the bottom row and can be moved by using the accelerometer `X` data.
* if the egg LED reaches the last row, reset the egg position to the first row.

```blocks
let basketX = 2
let eggX = 2
let eggY = 0
let accX = input.acceleration(Dimension.X)
basic.forever(function () {
    basic.pause(300)
    eggY += 1
    led.plot(eggX, eggY)
    basic.pause(300)
    led.unplot(basketX, 4)
    led.unplot(eggX, eggY)
})
basketX = 2 + Math.min(2, Math.max(-2, accX / 200))
if (eggY > 4) {
    eggY = -1
    eggX = Math.randomRange(0, 4)
}
led.plot(basketX, 4) 
```
