# Voting Machine

### ~ avatar

Build a voting machine using many @boardname@s!

### ~

https://youtu.be/77HOqf8BaNg


In this project, a **voter** program is uploaded on the player's @boardname@. The player uses the buttons to vote ``yes`` or ``no`` 
and the vote is sent to the **dashboard** @boardname@ via radio. 
The dashboard allocates one LED per player and turns it on or off based on the vote.

## The voter program

Assuming button ``A`` is no and ``B`` is yes, the voter program works as follows:

* when button ``A`` is pressed, a number ``0`` is sent via radio and the ``X`` symbol is shown on the screen.

```block
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0)
    basic.showIcon(IconNames.No)
})
```

* when button ``B`` is pressed, a number ``255`` is sent via radio and the ``Y`` symbol is shown on the screen.

```block
input.onButtonPressed(Button.B, () => {
    radio.sendNumber(255)
    basic.showIcon(IconNames.Yes)
})
```

* In order to track the votes, we tell the radio to also transmit the device serial number.

```block
radio.setTransmitSerialNumber(true)
```

* we arbritrarily choose ``4`` as the group used for the communications

```block
radio.setGroup(4)
```

Combined together, the voter program looks as follows:

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0)
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.B, () => {
    radio.sendNumber(255)
    basic.showIcon(IconNames.Yes)
})
radio.setGroup(4)
radio.setTransmitSerialNumber(true)
basic.showIcon(IconNames.Ghost)
```

## The dashboard

The dashboard code can be found at [/examples/radio-dashboard](/examples/radio-dashboard).

Download the code from that example into the @boardname@ that will be used to display the result.

When the dashboard receives a message from a @boardname@, it find a pixel for that board (and remembers it)
and uses the number received as the brightness of the LED.

When a message hasn't been received by a board for some time, it's pixel will start to blink. After more time, it will simply turn off. 


```package
radio
```
