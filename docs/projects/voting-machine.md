# Voting Machine

## ~ avatar

Build a voting machine using many @boardname@s!

## ~

https://youtu.be/77HOqf8BaNg

In this project, a **voter** program is loaded onto a player's @boardname@. The player uses the buttons to vote either``yes`` or ``no`` 
and the vote is sent to a **dashboard** @boardname@ using the radio. 
The dashboard allocates one LED per player and turns it on or off based on the vote.

## The voter program

Assuming button ``A`` is for a NO vote and ``B`` is for YES, the voter program works like this:

### Transmit a NO vote

When button ``A`` is pressed, a number ``0`` is sent via radio and the ``X`` symbol is shown on the screen.

```block
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(0)
    basic.showIcon(IconNames.No)
})
```

### Transmit a YES vote

When button ``B`` is pressed, a number ``255`` is sent via radio and the ``Y`` symbol is shown on the screen.

```block
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(255)
    basic.showIcon(IconNames.Yes)
})
```

### Set device serial number

In order to track the votes, we tell the radio to also transmit the device serial number.

```block
radio.setTransmitSerialNumber(true)
```
### Set the radio group

We arbitrarily choose ``4`` as the group used for the communications.

```block
radio.setGroup(4)
```

Putting all the parts together, here's the complete voter program:

```blocks
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(0)
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(255)
    basic.showIcon(IconNames.Yes)
})
radio.setGroup(4)
radio.setTransmitSerialNumber(true)
basic.showIcon(IconNames.Ghost)
```

## The dashboard

The dashboard code is in the [radio dashboard](/examples/radio-dashboard) example.

Download the code from that example into the @boardname@ that will be used to display the result.

When the dashboard receives a message from a @boardname@, it find a pixel for that board (and remembers it)
and uses the number received as the brightness of the LED.

When a message hasn't been received by a board for some time, it's pixel will start to blink. After more time, it will simply turn off. 

```package
radio
```
