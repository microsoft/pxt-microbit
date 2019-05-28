# Best Friends

## @description A game to find your "best friend" among the other players.

## ~ avatar

You have a friend out there. Send out messages to find your best friend!

## ~

![Sending your friend message](/static/mb/projects/best-friends.png)

You’ve lost the ability to speak. Oh no! However, even in silence you can make new friends. A new discovery has been made, radio transmission. Eureka! Now you must find the other person in your group who you are friends with by sending and receiving messages.

## Playing the game

You play "Best Friends" with lots of people like in a class full of students or as a party game. The number of players is even so that everyone will eventually find their own best friend. When using radio with the @boardname@, you transmit and receive with a _group_ number. This is like a channel number. Each pair of best friends will have their own group number.

### Assign group numbers

Make small pieces of paper to write group numbers on for every player. Write down the same group number, starting with `1`, on two pieces of paper. Now, write the next group number `2` on two more pieces. Continue to write the next group numbers on pairs of paper until they all have numbers on them. Put all the pieces into a box, bag, bucket, or other container and have each player pull out a number. Players will code their game using their own group number.

### Finding your friend

Your radio group number is what will help you find your new friend. They will have the same number as you. Also, by setting your radio transmit power to `1`, the distance your message is sent is about one foot, so make sure you are close to whoever is trying to receive your message.

When you press **A**, the program sends a number  `1` and when you press **B**, it sends a `2`. You must also be able to receive messages from your friend by following these display clues:

* At the beginning, show a half heart.
* When receiving a `1` number, show a Smiley Face (friends).
* When receiving a `2` number, show a Heart (best friends).

```sim
let toggleIcon = false
basic.forever(function () {
    basic.showLeds(`
        . # . . .
        # # # . .
        # # # . .
        . # # . .
        . . # . .
        `)
    basic.pause(1000)
    if (toggleIcon) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showIcon(IconNames.Happy)
    }
    toggleIcon = !(toggleIcon)
    basic.pause(500)
})
```

## Code the game

### Set group and power

Get the ``||radio:radio set transmit power||`` block from ``||radio:Radio||`` and put it into the ``||basic:on start||``. Set the power level to `1`. Pull out the ``||radio:radio set group||`` and put it right after ``||radio:radio set transmit power||``. Change the group number to be the one that was assigned to you.

```blocks
radio.setTransmitPower(1)
radio.setGroup(212)
```

### Initial expression

At first you haven't found your friend yet. So, you need an initial expression that shows this. Make this expression be a half heart. Drag out a ``||basic:show leds||`` block from ``||basic:Basic||`` and put it in the ``||basic:on start||`` block too. Draw a half heart in the LEDs.

```blocks
radio.setTransmitPower(1)
radio.setGroup(212)
basic.showLeds(`
    . # . . .
    # # # . .
    # # # . .
    . # # . .
    . . # . .
    `)
```

### Be friendly

When you come close to another player, you can decide to be friendly. If you want to just be friends, you try and send them a `1`. Get an ``||input:on button A pressed||`` from ``||input:Input||``. Go over to ``||radio:Radio||`` again and get a ``||radio:radio send number||``. Place it inside the ``||input:on button A pressed||``. Make the number you send be a `1`.

```blocks
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
```

If you think you want to be best friends with a player you're close to, you try to send them the number `2`. Copy the ``||input:on button A pressed||`` block you already have in your workspace (right click on it and choose **Duplicate**). In the new block, change the button from **A** to **B**. Set the number you send to be `2` in the ``||radio:radio send number||``.

```blocks
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
```

### Are we friends?

If someone near you is your friend, you'll receive either the number `1` or `2` on the radio group assigned to you. Use the ``||radio:radio on received receivedNumber||`` block to get a friend message from another player. Go find it in ``||radio:Radio||`` and put it in the Workspace.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
})
```

When you receive a message on your group, you need to check for the number in the message that says the other player is a friend or a best friend. From ``||logic:Logic||`` get an ``||logic:if then else||`` block an put inside the receive block. Go back to ``||logic:Logic||`` and get the ``||logic:0 = 0||`` condition. Place that after the ``||logic:if||`` on the ``||logic:if then else||``. 

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (0 == 0) {
    } else {

    }
})
```

Pull the ``||variables:receivedNumber||`` variable down from the ``||radio:radio on received receivedNumber||`` and put it in first slot of the ``||logic:0 = 0||``. Change the `0` in the second slot to `1`.


```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {

    } else {

    }
})
```

Click the **(+)** at the bottom of the ``||logic:else||`` to open up another condition. Copy the ``||logic:receivedNumber = 1||`` and place the new block into the condition of the ``||logic:else if||``. Change the number in that block from `1` to `2`.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {

    } else if (receivedNumber == 2) {

    } else {

    }
})
```

Inside the ``||logic:if then||`` section, put in a ``||basic:show icon||`` from ``||basic:Basic||``. Set the icon to the ``Smiley Face`` to mean that you're friends. Either copy that block or get another ``||basic:show icon||`` and put it into the ``||logic:else if||`` section. Change the icon for that one to be a ``Heart`` meaning you're best friends.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        basic.showIcon(IconNames.Happy)
    } else if (receivedNumber == 2) {
        basic.showIcon(IconNames.Heart)
    } else {

    }
})
```

You don't need the final ``||logic:else||`` section so click the **(-)** at the side of the last ``||logic:else||`` to hide it.

```blocks

radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        basic.showIcon(IconNames.Happy)
    } else if (receivedNumber == 2) {
        basic.showIcon(IconNames.Heart)
    }
})
```

### We're friends!

Your game is ready! Now go find your friend. Do you want to be a friend or best friends?

```package
radio
```