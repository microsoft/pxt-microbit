# flashing heart

### ~avatar avatar

Use the LEDs to display a flashing heart!

### ~

## Step 1

Use [show leds](/reference/basic/show-leds) and make your code look like this:

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`
    );
```

## Step 2

Add a [pause](/reference/basic/pause) to wait and [clear screen](/reference/basic/clear-screen) to turn off the LEDs.

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`);
basic.pause(500);
basic.clearScreen();
```

## Step 3

Put a [forever loop](/reference/basic/forever) around it to repeat the animation.

```blocks
basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`
        );
    basic.pause(500);
    basic.clearScreen();
})
```

## Step 4

Add a [pause](/reference/basic/pause) to wait after clearing the screen.

```blocks
basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`
        );
    basic.pause(500);
    basic.clearScreen();
    basic.pause(500);
})
```

## Send your heartbeats over radio!

Do you have a second @boardname@ at hand? You could use radio and send your heartbeats to other
@boardname@ and show a heart when you receive one.

* move the code in the **forever** inside 
a [on data packet received](/reference/radio/on-data-packet-received) handler. 
The handler will run whenever a message is received from another @boardname@.
* use [send number](/reference/radio/send-number) and [pause](/reference/basic/pause) 
to broadcast a packet of data every second.

```blocks
basic.forever(() => {
    radio.sendNumber(0)
    basic.pause(1000)
})
radio.onDataPacketReceived(({receivedNumber}) => {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`);
    basic.pause(500)
    basic.clearScreen()
    basic.pause(500)
})
```

Download the .hex file onto both @boardname@ and try it out!

```package
radio
```