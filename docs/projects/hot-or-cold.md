# Hot or Cold

## @description A Hot-or-Cold treasure hunt game

## ~avatar avatar

Find the hidden @boardname@ before the other players!

## ~

https://youtu.be/nbRfNug-RkY

## Beacons

In this game, players are looking for a hidden @boardname@ that emits a radio signal. 
Hidden @boardname@s are called **beacons**.

### Setting up the radio

We set the radio group to ``1`` and all the players use the same group. 
The @boardname@ transmits its serial number (that's a unique number that identifies it)
so that players can tell one beacon apart from another. Also, the power of the antenna is reduced to shorten the range of transmission.

```block
radio.setGroup(1)
radio.setTransmitSerialNumber(true)
radio.setTransmitPower(6)
```

### Beacon gotta beam

The beacon just needs to send a radio message every now and then. So, to pace the transmits and give some visual feedback, we add some ``||basic:show icon||`` blocks to animate the screen.

```blocks
basic.forever(() => {
    radio.sendNumber(0)
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
})
radio.setGroup(1)
radio.setTransmitSerialNumber(true)
radio.setTransmitPower(6)
```

### Hide the beacons

Download the code to each beacon @boardname@ and hide them!

## Hunters

The hunter @boardname@ looks for beacons. 

### Is the beacon close?

To determine how far away or how close they are, we use the signal strength of each radio packet sent by the beacons. The signal strength ranges from ``-128db`` (weak) to ``-42db`` (very strong). 

```blocks
let signal = 0;
radio.onReceivedNumber(function (receivedNumber) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    basic.showNumber(signal);
});
radio.setGroup(1)
```

Test and record the signal values as you move around a beacon, moving closer and farther away:

| | |
|-|-|
| Hot signal value: | ``_________________`` |
| Warm signal value: | ``_________________`` |
| Cold signal value: | ``_________________`` |

### Hot or cold?

The hunter's screen will display:

* ``SmallDiamond``: if the beacon is far (cold).
* ``Diamond``: if the beacon is relatively close (warm).
* ``Square``: if the beacon is really close (hot).

Use the ``signal`` values collected in the previous step to determine when to show each icon.

Here is an example that uses ``-95`` or less for cold, between ``-95`` and ``-80`` for warm, and ``-80`` or above for hot. You can change these values to account for your room setup or conditions of your hiding place.

To make the program more responsive, add a ``||led:stop animation||`` to cancel icon animations when a new beacon packet comes in.

```blocks
let signal = 0;
radio.onReceivedNumber(function (receivedNumber) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    if (signal < -90) {
        basic.showIcon(IconNames.SmallDiamond)
    } else if (signal < -80) {
        basic.showIcon(IconNames.Diamond)
    } else {
        basic.showIcon(IconNames.Square)
    }
})
radio.setGroup(1)
```

Download the code and play the game!

## Expand the game: multiple beacons

We'll making the game more interesting by counting how many beacons the hunting player has seen so far.

### Remember the beacons

Do you remember that the beacon was configured to transmit its serial number? We can use this information
to determine if a beacon is new or if it's one we've seen before.

To do so, we add an **[array](/types/array)** variable that will hold all the beacon serial numbers seen so far.

```block
let beacons: number[] = [0]
```

Whenever we receive a new packet, we are going to check if the ``beacons`` array already 
contains the serial number. If not, we add the serial number at the end of ``beacons`` and increment the ``||game:score||``.

To check if an array contains an certain element, we use the ``||arrays:find index of||`` block which returns ``-1`` if the element is not found.

```blocks
let beacons: number[] = [0]
let signal = 0;
let serialNumber = 0;
radio.onReceivedNumber(function (receivedNumber) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    serialNumber = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    if (signal > -50 && beacons.indexOf(serialNumber) < 0) {
        beacons.push(serialNumber)
        game.addScore(1)
        basic.showNumber(game.score())
    }
})
```

### Show my score

To see the current score, we add an ``||input:on button pressed||`` that displays the score on the screen when the **A** button is pressed.

```block
input.onButtonPressed(Button.A, () => {
    basic.showNumber(game.score())
})
``` 

### All together

The hunter code with all th pieces together looks like this now. Download and try it out with multiple beacons!

```blocks
let beacons: number[] = [0];
let signal = 0;
let serialNumber = 0;
radio.onReceivedNumber(function (receivedNumber) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    serialNumber = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    led.stopAnimation();
    if (signal < -95) {
        basic.showIcon(IconNames.SmallDiamond)
    } else if (signal < -80) {
        basic.showIcon(IconNames.Diamond)
    } else {
        basic.showIcon(IconNames.Square)
        if (signal > -50 && beacons.indexOf(serialNumber) < 0) {
            beacons.push(serialNumber)
            game.addScore(1)
            basic.showNumber(game.score())
        }
    }
})
input.onButtonPressed(Button.A, () => {
    basic.showNumber(game.score())
})
radio.setGroup(1)
```

```package
radio
```
