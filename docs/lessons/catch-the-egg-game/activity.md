# catch the egg game challenges

## Before we get started

Your starting code should look like this:

```blocks
let basketX = 2
let eggX = 2
let eggY = 0
basic.forever(function() {
    led.unplot(basketX, 4)
    led.unplot(eggX, eggY)
    eggY += 1
    led.plot(eggX, eggY)
    basic.pause(300)
    let accX = input.acceleration(Dimension.X)
    basketX = 2 + Math.min(2, Math.max(-2, accX / 200))
    led.plot(basketX, 4)
    if (eggY > 4) {
        eggY = -1
        eggX = Math.randomRange(0, 4)
    }
    basic.pause(300)
})
```

## Challenge 1

### ~avatar avatar impressed

Let's use an **IF** statement to detect if the egg and the basket are lined up.

Now that we know when an egg is caught, we can keep track of the score! We need to use the `add score` function built into the game library to add `1` point for every egg that is caught. However, let's not forget to `remove life` if an egg falls off the display before it's caught!

### ~

```blocks
let basketX1 = 2
let eggX1 = 2
let eggY1 = 0
basic.forever(function() {
    led.unplot(basketX1, 4)
    led.unplot(eggX1, eggY1)
    eggY1 += 1
    led.plot(eggX1, eggY1)
    basic.pause(300)
    let accX = input.acceleration(Dimension.X)
    basketX1 = 2 + Math.min(2, Math.max(-2, accX / 200))
    led.plot(basketX1, 4)
    if (eggY1 > 4) {
        eggY1 = -1
        eggX1 = Math.randomRange(0, 4)
    }
    if (eggY1 == 4) {
        if (basketX1 == eggX1) {
            game.addScore(1) 
        } else {
            game.removeLife(1)
        }
    }
    basic.pause(300)
})
```

* Press the `run` button to test out your game.

## Challenge 2

### ~avatar avatar encourage

Catching eggs gets easier with practice so let's make the eggs fall faster every 5 catches. We can do this by tracking how long the egg pauses in each position while falling with a global variable called **falling pause**. Let's create this variable and set it to `300` initially. Don't forget to also create a condition that will be true every 5 catches.

### ~

```blocks
let basketX2 = 2
let eggX2 = 2
let eggY2 = 0
let fallingPause = 300
basic.forever(function() {
    led.unplot(basketX2, 4)
    led.unplot(eggX2, eggY2)
    eggY2 += 1
    led.plot(eggX2, eggY2)
    basic.pause(300)
    let accX2 = input.acceleration(Dimension.X)
    basketX2 = 2 + Math.min(2, Math.max(-2, accX2 / 200))
    led.plot(basketX2, 4)
    if (eggY2 > 4) {
        eggY2 = -1
        eggX2 = Math.randomRange(0, 4)
    }
    if (eggY2 == 4) {
        if (basketX2 == eggX2) {
            game.addScore(1)
            if (game.score() %5 == 0) {
            }
        } else {
            game.removeLife(1)
        }
    }
    basic.pause(300)
})
```

## Challenge 3

### ~avatar avatar surprised

Let's make the egg fall faster by decreasing the amount of time it pauses in each position by decreasing **falling pause** by `25` every 5 catches. Now, instead of pausing for 300 milliseconds we can pause for the value of **falling pause**.

### ~

```blocks
let basketX3 = 2
let eggX3 = 2
let eggY3 = 0
let fallingPause1 = 300
basic.forever(function() {
    led.unplot(basketX3, 4)
    led.unplot(eggX3, eggY3)
    eggY3 += 1
    led.plot(eggX3, eggY3)
    basic.pause(300)
    let accX3 = input.acceleration(Dimension.X)
    basketX3 = 2 + Math.min(2, Math.max(-2, accX3 / 200))
    led.plot(basketX3, 4)
    if (eggY3 > 4) {
        eggY3 = -1
        eggX3 = Math.randomRange(0, 4)
    }
    if (eggY3 == 4) {
        if (basketX3 == eggX3) {
            game.addScore(1)
            if (game.score()% 5 == 0) {
                fallingPause1 = fallingPause1 - 25
            }
        } else {
            game.removeLife(1)
        }
    }
    basic.pause(fallingPause1) 
})
```

Fantastic! Your game is now ready to show off.

* Press the `run` button to see your finished game!
