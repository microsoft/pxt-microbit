
# Fireflies

### ~ avatar

Turn your @boardname@ into fireflies.

### ~

https://youtu.be/ZGvtnE1Wy6U

## How do Fireflies synchronise?

Go to http://ncase.me/fireflies/ and read about the fireflies synchronization phenomenon.

## Code

We want to create virtual fireflies using multiple @boardname@ (each @boardname@ acts as a firefly).
Let's review some of the key points of the article:

### "Each firefly has its own individual internal clock"

A clock in this case is like a counter, so we will start by adding a ``clock`` variable to our program.

```block
// the clock ticker
let clock = 1
```

### "and every time the clock “strikes twelve”, it flashes."

We can use a [forever](/reference/basic/forever) loop to repeat code that increments the clock.
When the clock reaches "noon" (let's pick `8`), we turn on the screen briefly (by using the game score animation)

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

### Step 1: when you see a nearby firefly flash, nudge your clock a little bit forward.

The @boardname@ can send radio messages to neighbor @boardname@.
We can use these messages to simulate the "flashes" of light. 

* When a firefly flashes, it also sends a number over radio using [radio send number](/reference/radio/send-number).

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

* When a firefly receives a radio packet, it increments its clock by one.

```block
// the clock ticker
let clock = 0
radio.onDataPacketReceived(() => {
    // advance clock to catch up neighbors
    clock += 1
})
```

### Putting all together

https://youtu.be/XzZeB4yYnEw

Download this program on as many @boardname@ as you can find and try it out in a dark room!

(We've added a [radio set group](/reference/radio/set-group) block to specify which group the firefly will communicate on). 

```blocks
// the clock ticker
let clock = 0
radio.onDataPacketReceived(() => {
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
