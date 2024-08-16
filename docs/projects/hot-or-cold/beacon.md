# Hot-Or-Cold Beacon

## Introduction @unplugged

In this tutorial, you will create the code for the **beacon**
in the Hot-Or-Cold game. The seekers @boardname@ look for @boardname@ beacons and display hot or cold hints
based on the distance.

## Setting up the radio group

We set the radio group to ``1`` and all the players use the same group. 
The power of the antenna is reduced to shorten the range of transmission.

```blocks
radio.setGroup(1)
radio.setTransmitPower(6)
```

## Beacon gotta beam

The beacon just needs to send a radio message every now and then. So, to pace the transmits and give some visual feedback, we add some ``||basic:show icon||`` blocks to animate the screen.

```blocks
basic.forever(function () {
    radio.sendNumber(0)
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
})
radio.setGroup(1)
radio.setTransmitPower(6)
```

## Hide the beacons

Download the code to the @boardname@ beacons and hide them!