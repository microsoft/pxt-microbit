# catch the egg game tutorial

## Rebuild the game!

The blocks have been shuffled! Put them back together so that...
* an egg LED  falls from the top of the screen, row by row.
* a basket LED is on the bottom row and can be moved by using the accelerometer `X` data.
* if the egg LED reaches the last row, reset the egg position to the first row.

```shuffle
let basketX = 2
let eggX = 2
let eggY = 0
basic.forever(() => {
    led.unplot(basketX, 4)
    led.unplot(eggX, eggY)
    eggY = eggY + 1
    led.plot(eggX, eggY)
    basic.pause(300)
    let accX = input.acceleration(Dimension.X)
    basketX = 2 + Math.min(2, Math.max(-2, accX / 200))
    led.plot(basketX, 4)
    if (eggY > 4) {
        eggY = -1
        eggX = Math.random(5)
    }
    basic.pause(300)
})
```
