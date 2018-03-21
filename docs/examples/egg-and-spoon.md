# Egg and Spoon race

The [Egg and Spoon](https://en.wikipedia.org/wiki/Egg-and-spoon_race) race is a game where a player carries an object (like an egg) across some distance without it falling out of a holder. In the case of the Egg and Spoon, the player must carefully walk with an egg held in a spoon. The egg must remain in the spoon until the player crosses the finish line. The egg can easily roll out of the spoon so the player needs skill and patience to balance the egg until finishing the race.

You can program your @boardname@ to be an egg and let your hand be the spoon. If you walk too fast or waver in holding the @boardname@, you might "drop the egg!". Try to keep the balance point in the center of the screen.

```blocks
let accY = 0
let accX = 0
let y = 0
let x = 0
basic.forever(() => {
    led.plot(x, y)
    accX = input.acceleration(Dimension.X)
    accY = input.acceleration(Dimension.Y)
    if (accX < -150 && x > 0) {
        x += -1
    } else if (accX > 150 && x < 4) {
        x += 1
    }
    if (accY < -150 && y > 0) {
        y += -1
    } else if (accY > 150 && y < 4) {
        y += 1
    }
    basic.pause(500)
    basic.clearScreen()
})
x = 2
y = 2
```
