# Fireflies

## ~ avatar

Turn your @boardname@ into fireflies.

## ~

https://youtu.be/ZGvtnE1Wy6U

## How do Fireflies synchronize?

Go to http://ncase.me/fireflies/ and read about the fireflies synchronization phenomenon.

## Code the firefly

We want to create virtual fireflies using multiple @boardname@s (each @boardname@ acts as a firefly).
Let's review some of the key points from the article:

### "Each firefly has its own individual internal clock..."

A clock in this case is like a counter, so we will start by adding a ``clock`` variable to our program.

```block
// the clock ticker
let clock = 1
```

### "...and every time the clock 'strikes twelve', it flashes."

We can use a ``||basic:forever||`` loop to repeat code that increments the clock.
When the clock reaches "noon" (let's pick `8` as noon), we turn on the screen briefly (by using the game score animation)

```block
// the clock ticker
let clock = 0
basic.forever(() => {
    // if clock "hits noon", flash the screen
    if (clock >= 8) {
        // flash
        game.addScore(1)
        // wait for 2 ticks
        basic.pause(200)
        // reset the clock
        clock = 0
    } else {
        // just wait a bit
        basic.pause(100)
        // increment the clock
        clock += 1
    }
})
```

### When you see a nearby firefly flash, nudge your clock a little bit forward

The @boardname@ can send radio messages to a neighbor @boardname@. We can use these messages to simulate the "flashes" of light. 

When a firefly flashes, it also sends a number over radio using ``||radio:radio send number||``:

```block
// the clock ticker
let clock = 0
basic.forever(() => {
    // if clock "hits noon", flash the screen
    if (clock >= 8) {
        // notify neighbors
        radio.sendNumber(0)
        // flash
        game.addScore(1)
        // wait for 2 ticks
        basic.pause(200)
        // reset the clock
        clock = 0
    } else {
        // just wait a bit
        basic.pause(100)
        // increment the clock
        clock += 1
    }
})
```

When a firefly receives a radio packet
**and** it is not sending packet
, it increments its clock by one:

```block
// the clock ticker
let clock = 0
radio.onReceivedNumber(function (receivedNumber) {
    // advance clock to catch up neighbors
    if (clock < 8) {
        clock += 1
    }
})
```

## Put it all together

https://youtu.be/XzZeB4yYnEw

Download this program on as many @boardname@s as you can find and try it out in the dark!

**Note:** We've added a ``||radio:radio set group||`` block to specify which group the firefly will communicate on. 

```blocks
// the clock ticker
let clock = 0
radio.onReceivedNumber(function (receivedNumber) {
    // advance clock to catch up neighbors
    clock += 1
})
basic.forever(() => {
    // if clock hits noon, flash the screen
    if (clock >= 8) {
        // notify neighbors
        radio.sendNumber(0)
        // flash
        game.addScore(1)
        // wait for 2 ticks
        basic.pause(200)
        // reset the clock
        clock = 0
    } else {
        // just wait a bit
        basic.pause(100)
        // increment the clock
        clock += 1
    }
})
radio.setTransmitPower(1)
radio.setGroup(12)
```

```package
radio
```