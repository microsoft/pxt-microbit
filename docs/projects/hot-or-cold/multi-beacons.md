# Multiple beacons

We'll making the game more interesting by counting how many beacons the hunting player has seen so far.

## Who are you beacon?

Modify your beacon code to transmit the serial number as well. We will use that number
to identify the beacon.

```block
radio.setGroup(1)
radio.setTransmitPower(6)
// @highlight
radio.setTransmitSerialNumber(true)
```

## Remember the beacons

Back in the seeker project, we add an **[array](/types/array)** variable that will hold all the beacon serial numbers seen so far.

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

## Show my score

To see the current score, we add an ``||input:on button pressed||`` that displays the score on the screen when the **A** button is pressed.

```block
input.onButtonPressed(Button.A, function () {
    basic.showNumber(game.score())
})
``` 

## All together

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
input.onButtonPressed(Button.A, function () {
    basic.showNumber(game.score())
})
radio.setGroup(1)
```

```package
radio
```
