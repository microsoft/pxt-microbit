# Hot Or Cold

### @description A Hot-or-Cold treasure hunt game

### ~avatar avatar

Find the hidden @boardname@ before the other players!

### ~

https://youtu.be/nbRfNug-RkY

## Beacons

In this game, players are looking for hidden @boardname@ that emit radio signals. 
The hidden @boardname@ are called **beacons**.

### Setting up the radio

We set the radio group to ``1`` to make sure all the players are using the same group. 
We also tell the @boardname@ to transmit its serial number (that's a unique number that identifies it)
so that the player can tell apart each beacon. We also reduce the power of the antenna to reduce the range of transmission.

```block
radio.setGroup(1)
radio.setTransmitSerialNumber(true)
radio.setTransmitPower(6)
```

### Beacon gotta beam

The beacon simply needs to send a radio message every now and then. To pace it out, 
we add some ``|show icon|`` blocks to animate the screen.



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

Download the code to your beacon @boardname@ and hide them!

## Hunters

The hunter @boardname@ look for beacons. 

### Is the beacon close?

To determine how far or close, we use the signal strength of each radio packet sent by the beacons. The signal
strength ranges from ``-128db`` (weak) to ``-42db`` (very strong). 

```blocks
radio.onDataPacketReceived( ({ receivedNumber, signal }) =>  {
    basic.showNumber(signal)
});
radio.setGroup(1)
```

Take notes of the values as you move around the beacon.

* hot signal value: ``_________________``
* mild signal value: ``_________________``
* cold signal value: ``_________________``

### Hot or cold?

The hunter screen displays ``SmallDiamond`` on the screen if the beacon is far, ``Diamond`` mildly close and ``Square`` if it is close. Use the ``signal`` values collected in the previous step to determine when to show those letters.

Here is an example that uses ``-95`` and less for cold, between ``-95`` and ``-80`` for mild and above ``-80`` for hot. Use your own values based on the room setup or the hidding place.

To make the program more responsive, we add a ``|led stop animation|`` to cancel any icon animation when a new beacon packet comes.

```blocks
radio.onDataPacketReceived( ({ receivedNumber, signal }) =>  {
    led.stopAnimation();
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

## Extra: Multiple beacons

We're making the game more interresting by counting how many beacons a player has seen so far.

### Remember the beacons

Remember that the beacon was configured to transmit its serial number? We can use this information
to determine if we've visited a beacon for the first time.

To do so, we are going to add an **array** variable that will hold all the beacon serial numbers seen so far.

```block
let beacons: number[] = [0]
```

Whenever we receive a new packet, we are going to check if the ``beacons`` already 
contains the serial number. If not, we add the serial number at the end of ``beacons`` and increment the ``|game score|``.

To check if an ``array`` contains an element, we use the ``|find index of|`` block which returns ``-1``
if the value is not found.

```blocks
let beacons: number[] = [0]
radio.onDataPacketReceived( ({ receivedNumber, signal, serial }) =>  {
    if (signal > -50 && beacons.indexOf(serial) < 0) {
        beacons.push(serial)
        game.addScore(1)
        basic.showNumber(game.score())
    }
})
```

### Show my score

To see the current score, we add a ``|on button pressed|`` that displays the score on screen when ``A`` is pressed.

```block
input.onButtonPressed(Button.A, () => {
    basic.showNumber(game.score())
})
``` 

### All together

The hunter code with all th pieces together looks like this now. Download it and try it out with multiple beacons!

```blocks
let beacons: number[] = [0];
radio.onDataPacketReceived( ({ receivedNumber, signal, serial }) =>  {
    led.stopAnimation();
    if (signal < -95) {
        basic.showIcon(IconNames.SmallDiamond)
    } else if (signal < -80) {
        basic.showIcon(IconNames.Diamond)
    } else {
        basic.showIcon(IconNames.Square)
        if (signal > -50 && beacons.indexOf(serial) < 0) {
            beacons.push(serial)
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