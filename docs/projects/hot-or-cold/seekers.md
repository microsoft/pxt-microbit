# Hot or Cold Seeker

## Introduction @unplugged

In this tutorial, you will create the code for the **seeker**
in the Hot-Or-Cold game. The seekers @boardname@ look for @boardname@ beacons and display hot or cold hints
based on the distance.

## Setting up the radio group

We set the radio group to ``1`` and all the players use the same group.

```blocks
radio.setGroup(1)
```

## Is the beacon close?

To determine how far away or how close they are, we use the signal strength of each radio packet sent by the beacons. The signal strength ranges from ``-128db`` (weak) to ``-42db`` (very strong). 

```blocks
let signal = 0;
radio.onReceivedNumber(function (receivedNumber) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    basic.showNumber(signal)
});
radio.setGroup(1)
```

## Test out your seeker @unplugged

Test and record the signal values as you move around a beacon, moving closer and farther away:

| | |
|-|-|
| Hot signal value: | ``_________________`` |
| Warm signal value: | ``_________________`` |
| Cold signal value: | ``_________________`` |

## Cold

The seeker's screen will display ``SmallDiamond``: if the beacon is far (cold). Use the ``signal`` values collected in the previous step to determine when to show each icon.

### ~ hint
Here is an example that uses ``-95`` or less for cold, between ``-95`` and ``-80`` for warm, and ``-80`` or above for hot. You can change these values to account for your room setup or conditions of your hiding place.

### ~

```blocks
let signal = 0
radio.onReceivedNumber(function (receivedNumber) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    if (signal < -90) {
        basic.showIcon(IconNames.SmallDiamond)
    }
})
```

## Warm

The seeker's screen will display ``Diamond``: if the beacon is relatively close (warm).

```blocks
let signal = 0;
radio.onReceivedNumber(function (receivedNumber) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    if (signal < -90) {
        basic.showIcon(IconNames.SmallDiamond)
    } else if (signal < -80) {
        basic.showIcon(IconNames.Diamond)
    }
})
```

## Hot

The seeker's screen will display ``Square``: if the beacon is really close (hot).

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
```

```package
radio
```
