# Tele-Potato

## @description The famous "Hot Potato" game revisit for @boardname@

Do you know the "Hot Potato" game? You usually toss around a potato with a timer
and the person that holds it when it finishes looses... It's super fun.

In this project, we'll build a similar kind of game but using **a virtual potato** and the @boardname@ radio.

## Teleporting potato?

Instead of sending a real potato clock around, we are going to **send a number** between @boardname@. We can do that using the **radio** blocks. They use the antenna on the @boardname@ to send data via radio frequency signals, just like the phones or gadgets around you.

![Using radio to send a potato](/static/mb/projects/tele-potato/radio-potato.jpg)


Now, what does it mean to represent a potato with a number? Well, we need to **model** the clock being tossed around as **a number** so that we can play the game using the radio. So what is so special about this potato clock? It ticks down the time and when it reaches 0, it ring. 

Let's consider a variable called **potato**.
* If the value of **potato** is positive, the player has the potato and the **potato** variable represents the **remaining time**
* if value of **potato** reaches 0, the game is over
* if the value of **potato** is negative, this means that the player does not have the potato in its hand.  

![A diagram of the potato representation](/static/mb/projects/tele-potato/model.jpg)

Now that we know what the potato is, we need to decide about the user interaction: how will the user play the game.

* press ``A+B`` starts the game and send the first potato
* when a potato is received, the screen display some image
* when the player shakes the @boardname@, he sends the potato to other players

## Let's get coding!

### Initialization

Let's start by creating the potato variable and initializing it to -1 in **on start**. Remember, a negative potato value means you **don't** have the potato. We use [radio set group](/reference/radio/set-group) to make sure players receive the messages.

```blocks
let potato = -1
radio.setGroup(1)
```

### Starting the game

To start the game, we handle the ``A+B`` button and assign a positive number to the **potato** variable.
To make the game less predictable, we use the random block to generate a value between 10 and 40.

```blocks
let potato = 0
input.onButtonPressed(Button.AB, () => {
    potato = 10 + Math.random(21)
})
```

### Sending the potato

Sending the potato is done by shacking the @boardname@. If the **potato** variable is positive, 
we have the potato and we can send. After sending it, we set the **potato** variable to -1 since we don't have it anymore.

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

Receiving the potato is done via the [on radio received](/reference/radio/on-data-packet-received) block.
The **receivedNumber** represents the potato and is stored in the **potato** variable.

```blocks
let potato = 0
radio.onDataPacketReceived( ({ receivedNumber }) =>  {
    potato = receivedNumber
})
```

### Ticking the clock

The clock ticking down is done with a ``forever`` loop. 

* If the **potato** is equal to 0 (``potato == 0``), KABOOM! you lost!
* If the **potato** variable is negative (``potato < 0``), we don't have the potato so we clear the screen.
* If the **potato** variable is positive (``potato > 0``), we display a potato image and decrease the variable by 1.

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

Get two or more @boardname@ and download the code into them. One player starts the game by pressing ``A+B`` to receive the first potato. Good luck!

## Full source

```blocks
let potato = 0
radio.onDataPacketReceived( ({ receivedNumber }) =>  {
    potato = receivedNumber
})
input.onGesture(Gesture.Shake, () => {
    if (potato > 0) {
        radio.sendNumber(potato)
        potato = -1
    }
})
input.onButtonPressed(Button.AB, () => {
    potato = 10 + Math.random(21)
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