# Red Light Green Light

This is a classic game where the game master is looking the opposite direction and saying commands to player.
When the game master says "red light" and turns around, all players should stop. If the game master stops a moving player, he has to go back to the start.
When the game master turns around and says "green light", all players move and try to touch the game master.

In this remake, we will use @boardname@, the radio and the accelerometer to enforce those rules!

## The game master

Let's start with the code running on the game master @boardname@. Don't use this code for players!

### States

We define two states, ``GREENLIGHT`` and ``REDLIGHT`` and a ``state`` variable to store the current game state.
When the game master presses ``A``, the game goes into "green light" mode. When he presses ``B``, 
the state goes in "red light" mode.

```blocks
let REDLIGHT = 0
let state = 0
let GREENLIGHT = 0
GREENLIGHT = 1
REDLIGHT = 2
```

### Communication

The radio group is set to ``1``. We will set the same group in the player code. The game state is streamed in a forever loop so that players receive constantly.

```blocks
let state = 0;
radio.setGroup(1)
basic.forever(function () {
    radio.sendNumber(state)
})
```

### Red light, green light

Use the ``||radio:on button pressed`` block to run code when button ``A`` and ``B`` are pressed.
When ``A`` is pressed, the game goes into ``GREENLIGHT`` mode. When ``B`` is pressed, the game
goes into ``B`` mode. We also use ``||basic:show icon||`` to display the current state.

```blocks
let REDLIGHT = 0
let state = 0
let GREENLIGHT = 0
input.onButtonPressed(Button.A, function () {
    state = GREENLIGHT
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.B, function () {
    state = REDLIGHT
    basic.showIcon(IconNames.No)
})
GREENLIGHT = 1
REDLIGHT = 2
```

### Game master code

All together the game master code looks like this:

```blocks
let REDLIGHT = 0
let state = 0
let GREENLIGHT = 0
input.onButtonPressed(Button.A, function () {
    state = GREENLIGHT
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.B, function () {
    state = REDLIGHT
    basic.showIcon(IconNames.No)
})
GREENLIGHT = 1
REDLIGHT = 2
radio.setGroup(1)
basic.forever(function () {
    radio.sendNumber(state)
})
```

### ~ hint

Make sure to rename this program to ``game master`` or something so that you don't confuse it with the player program!

### ~

### Improve the game

* Use ``||music:ring tone||`` to play a sound while the game is in ``GREENLIGHT`` mode.
* Attach a servo and move the arm based on the game state

## The players

The code for players needs to listen for the game master state.

### States

First, we redefine the state constant, ``GREENLIGHT``, ``REDLIGHT`` and set the radio to ``1``. 
We also add a ``state`` variable that will store the state of the game.

```blocks
let RED = 0
let state = 0
let GREEN = 0
GREEN = 1
RED = 2
radio.setGroup(1)
```

### Communication

We use the ``radio:on received number`` block to store the game master state into the ``state`` variable.

```blocks
let state = 0
radio.onReceivedNumber(function (receivedNumber) {
    state = receivedNumber
})
```

### Display

In a forever loop, we display different icons based on the game state. Use a ``||logic:if||`` and
``||basic:show icon||`` blocks to display the game state.

```blocks
let REDLIGHT = 0
let state = 0
let GREENLIGHT = 0
basic.forever(function () {
    if (state == GREENLIGHT) {
        basic.showIcon(IconNames.Yes)
    } else if (state == REDLIGHT) {
        basic.showIcon(IconNames.No)
    }
})
```

### Movement check

If the ``state`` is equal to ``REDLIGHT``, we need to check that the player is not moving. 
This is where the accelerometer comes into play. The accelerometer measures forces applied to the @boardname@.
If the player moves, it is likely that some small forces will be applied and the accelerometer will detect it.
At all times, gravity is applied to the @boardname@, so the acceleration strength at rest always near ``1000``mg.
If the acceleration strength is far from that value, say ``1100`` or ``900``, we can assume that the player is moving. To compute this we use this formula:

    moving = | acc strength - 1000 | > 1000

Now that we know the math, we can turn this into code.

```block
let REDLIGHT = 0
let state = 0
let GREENLIGHT = 0
let moving = false
if (state == REDLIGHT) {
    moving = Math.abs(input.acceleration(Dimension.Strength) - 1000) > 100
    if (moving) {
        game.gameOver()
    }
}
```

### Player code

All together:

```blocks
let moving = false
let REDLIGHT = 0
let state = 0
let GREENLIGHT = 0
radio.onReceivedNumber(function (receivedNumber) {
    state = receivedNumber
})
GREENLIGHT = 1
REDLIGHT = 2
radio.setGroup(1)
basic.forever(function () {
    if (state == GREENLIGHT) {
        basic.showIcon(IconNames.Yes)
    } else if (state == REDLIGHT) {
        basic.showIcon(IconNames.No)
    }
    if (state == REDLIGHT) {
        moving = Math.abs(input.acceleration(Dimension.Strength) - 1000) > 100
        if (state == REDLIGHT && moving) {
            game.gameOver()
        }
    }
})
```

### ~ hint

Make sure to rename this program to ``player`` or something so that you don't confuse it with the game master program!

### ~


### Tuning

Does the movement check work? Try changing the ``100`` value to tune the detection sensivity. Try ``64``.

### Improve the game

* Use ``||music:ring tone||`` to play a tone while in green mode.
* Use the packet signal strength to detect that you've reached the game master.