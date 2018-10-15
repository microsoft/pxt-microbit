# Tele-Potato

## @description The famous "Hot Potato" game revisit for @boardname@

## ~ avatar

Don't keep the potato too long or you might lose the game!

## ~

![A teleporting potato](/static/mb/projects/tele-potato.png)

Do you know the "Hot Potato" game? You toss around a potato while a timer counts down
and the person holding it when the timer is up loses... It's super fun.

In this project, we'll build a similar kind of game but instead we'll use a **virtual potato** and the @boardname@ radio.

## Teleporting potato?

Instead of passing a real potato around while a real clock counts down, we are going to **send a number** between @boardname@s. We can do that using the ``||radio:Radio||`` blocks. They use the antenna on the @boardname@ to send data over radio frequency signals, just like the phones or gadgets around you.

![Using radio to send a potato](/static/mb/projects/tele-potato/radio-potato.jpg)

Now, what does it mean to have a number represent a potato? Well, we need to **model** the clock as **a number** being tossed around with the potato. We do this so that we can play the game using the radio. So what is so special about this potato clock? It ticks down the time and when it reaches 0, it rings. 

To keep track of things, let's have a variable called **potato**:

* If the value of **potato** is positive, the player has the potato and the **potato** variable represents the **remaining time**
* if value of **potato** reaches 0, the game is over
* if the value of **potato** is negative, this means that the player doesn't have the potato in their hand

![A diagram of the potato representation](/static/mb/projects/tele-potato/model.jpg)

Now that we know what the potato is, we need to come up with the user interactions. This is how will the user play the game:

* press the ``A+B`` button to start the game and send the first potato
* when a potato is received, the screen displays some image
* when the player shakes the @boardname@, they send the potato to other players

## Let's get coding!

### Initialization

Let's start by creating the potato variable and initializing it to `-1` in ``||basic:on start||``. Remember, a negative potato value means you **don't** have the potato. We use [``||radio:radio set group||``](/reference/radio/set-group) to make sure players receive the messages.

```blocks
let potato = -1
radio.setGroup(1)
```

### Starting the game

To start the game, we respond to the ``A+B`` button press and assign a positive number to the **potato** variable.
To make the game less predictable, we use the ``||math:pick random||`` block to generate a value between `10` and `20`.

```blocks
let potato = 0
input.onButtonPressed(Button.AB, () => {
    potato = Math.randomRange(10, 20)
})
```

### Sending the potato

Sending the potato is done by shaking the @boardname@. If the **potato** variable is positive, 
we have the potato and we can send it. After sending it, we set the **potato** variable to `-1` since we don't have it anymore.

```blocks
let potato = 0
input.onGesture(Gesture.Shake, () => {
    if (potato > 0) {
        radio.sendNumber(potato)
        potato = -1
    }
})
```

### Receiving the potato

Receiving the potato is done in the [``||radio:on received number||``](/reference/radio/on-received-number) block.
The **receivedNumber** represents the potato and is stored in the **potato** variable.

```blocks
let potato = 0
radio.onReceivedNumber(function (receivedNumber) {
    potato = receivedNumber
})
```

### Ticking the clock

Making the clock tick down is done with a ``||loops:forever||`` loop. 

* If the **potato** is equal to `0` (``potato == 0``), KABOOM! you lose!
* If the **potato** variable is negative (``potato < 0``), we don't have the potato so we clear the screen.
* If the **potato** variable is positive (``potato > 0``), we display a potato image and decrease the variable by `1`.

```blocks
let potato = 0
basic.forever(() => {
    if (potato == 0) {
        basic.showIcon(IconNames.Skull)
    }
    if (potato < 0) {
        basic.clearScreen()
    }
    if (potato > 0) {
        basic.showIcon(IconNames.Chessboard)
        potato += -1
    }
})
```

### It's game time!

Get two or more @boardname@s and download the code to them. One player starts the game by pressing ``A+B`` to receive the first potato. Good luck!

## Full source

```blocks
let potato = 0
radio.onReceivedNumber(function (receivedNumber) {
    potato = receivedNumber
})
input.onGesture(Gesture.Shake, () => {
    if (potato > 0) {
        radio.sendNumber(potato)
        potato = -1
    }
})
input.onButtonPressed(Button.AB, () => {
    potato = Math.randomRange(10, 20)
})
radio.setGroup(1)
potato = -1
basic.forever(() => {
    if (potato == 0) {
        basic.showIcon(IconNames.Skull)
    }
    if (potato < 0) {
        basic.clearScreen()
    }
    if (potato > 0) {
        basic.showIcon(IconNames.Chessboard)
        potato += -1
    }
})
```

```package
radio
```