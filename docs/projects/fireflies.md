
# Fireflies

### ~ avatar

Turn your @boardname@ into fireflies.

### ~

https://youtu.be/ZGvtnE1Wy6U

## How do Fireflies synchronise?

Go to http://ncase.me/fireflies/ and read about the fireflies synchronization phenomenon.

## Code

The goal of this project is to create virtual fireflies using @boardname@ that mimic the real fireflies. 
After reading the article, there are a few sentences that stand out to help.

### "Each firefly has its own individual internal clock"

A clock in this case is like a counter, so we will start by adding a ``clock`` variable to our program.

```block
// the clock ticker
let clock = 1
```

### "and every time the clock “strikes twelve”, it flashes."

So we need a [forever](/reference/basic/forever) loop to increment the clock.
When the clock reaches "noon" (let's pick 8), we turn on the screen breifly.

```block
// the clock ticker
let clock = 0
basic.forever(() => {
    // if clock "hits noon", flash the screen
    if (clock >= 8) {
        // flash
        game.addScore(1)
        // wait for 2 ticks + a tiny bit
        basic.pause(220)
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

We will use radio messages to simulate the vision of fireflies. 

* When a firefly flashes, it also sends a number over radio using [radio send number](/reference/radio/send-number).
* When a firefly receives a radio packet, it increments its clock by one just like the fireflies.

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


Now that we have all the parts needed to build our firefly simulator, we can assemble it into a program.

We've add a [radio set group](/reference/radio/set-group) block to specify which group the firefly will communicate on. Download this program on as many @boardname@ as you can find and try it out in a dark room!

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
        radio.sendNumber(clock)
        // flash
        game.addScore(1)
        // wait for 2 ticks + a tiny bit
        basic.pause(220)
        // reset the clock
        clock = 0
    } else {
        // just wait a bit
        basic.pause(100)
        // increment the clock
        clock += 1
    }
})
// short range radio transmission
radio.setTransmitPower(1)
radio.setGroup(12)
```