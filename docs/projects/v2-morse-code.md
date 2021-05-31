# Morse Code

## Introduction @unplugged

💬 Multiple @boardname@s can communicate with one another! 💬
<br/>
<br/>
One of the new @boardname@ features is a capacitive touch sensor (a bit like your phone!). This sensor is the logo button on your @boardname@.
<br/>
<br/>
In this tutorial, we will walk through how to use the logo press to send morse code messages between at least two of the new @boardname@s 🥳

_**Note:** Do not worry if you don't own multiple of the new @boardname@s. We will be able to simulate two in this tutorial._

## Creating a message variable

Let us begin by creating a [__*boolean*__](#boolean "has one of two possible values: true or false") variable that will change depending on if you need to send a dot or a dash.

---

► In the ``||variables:Variables||`` category, click on ``Make a Variable...``. From here, you can name your variable.
<br/>
&nbsp;&nbsp; 💡 We chose to name our variable ``dot`` because it is meant to keep track if the @boardname@ should be sending a dot or not.

## Setting up the space

Your @boardname@ will need to send different messages depending on if you press or long press the logo. Let's set that up!

---

► From the ``||input:Input||`` category, find the ``||input:on logo [pressed]||`` container and add it to your workspace.
<br/>
► Repeat the above step.
<br/>
► Set the argument for one of your containers to be ``||input:on logo [long pressed]||``.

```blocks
input.onLogoEvent(TouchButtonEvent.Pressed, function () {

})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {

})
```

## Setting the dot variable

Now, let's set your ``dot`` variable depending on how long the logo is pressed for.

---

► From the ``||variables:Variables||`` category, find the ``||variables:set [dot] to [0]||`` block and place it into your ``||input:on logo [pressed]||`` container.
<br/>
► Set ``||variables:dot||`` to be ``1``.
<br/>
► Drag another ``||variables:set [dot] to [0]||`` block into your ``||input:on logo [long pressed]||`` container.
<br/>
&nbsp;&nbsp; 💡 When Boolean variables, like ``dot``, are ``1``, they mean ``true``. When they are ``0``, they mean ``false``. Does it make sense why we are setting it as ``1`` and ``0`` in this code?

```blocks
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    dot = 1
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    dot = 0
})
```

## Sending a dot

Next, we need to program your @boardname@ to send your ``||variables:dot||`` var.

---

► Drag a ``||radio:radio send number ["name"] = [0]||`` block into your  ``||input:on logo [pressed]||`` container.
<br/>
► From the ``||variables:Variables||`` category, drag the ``||variables:dot||`` variable in as the first argument for your ``||radio:radio send value [dot] = [0]||`` block.
<br/>
► Set the second argument to be ``1``.

```blocks
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {

})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    let dot = ""
    radio.sendValue(dot, 1)
})
```

## Sending a dash

Similarly, we need to send a ``false`` dot, aka a dash, when you long press the @boardname@ logo.

---

► Drag a ``||radio:radio send value ["name"] = [0]||`` block into your  ``||input:on logo [long pressed]||`` container.
<br/>
► From the ``||variables:Variables||`` category, drag the ``||variables:dot||`` variable in as the first argument for your ``||radio:radio send value [dot] = [0]||`` block.

```blocks
let dot = ""
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    radio.sendValue(dot, 0)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendValue(dot, 1)
})
```

## Receiving a message

Now, we will need to program your @boardname@ to receive a message that is sent to it.

---

► From the ``||radio:Radio||`` category, find the ``||radio:on radio received [receivedNumber]||`` container and add it to your workspace.

```blocks
let dot = ""
radio.onReceivedNumber(function (receivedNumber) {
	
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    radio.sendValue(dot, 0)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendValue(dot, 1)
})
```

## Setting the display conditional

Let us set up an [__*if then else*__](#ifthenelse "runs some code if a boolean condition is true and different code if the condition is false") conditional statement so you can tell your @boardname@ what to do based on if it needs to display a dot or a dash.

---

► Grab an ``||logic:if [true] then...else||`` block and place it in your ``||radio:on radio received [receivedNumber]||`` container.
<br/>
► Look in the ``||variables:Variables||`` category and drag the ``||variables:dot||`` variable to replace the ``||logic:[true]||`` argument in your ``||logic:if [true] then...else||`` block.
󠀢<br/>
&nbsp;&nbsp; 💡 Because ``dot`` is a Boolean variable, it can be an argument for an ``if`` statement!

```blocks
let dot = ""
radio.onReceivedNumber(function (receivedNumber) {
    if (dot) {
    	
    } else {
    	
    }
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    radio.sendValue(dot, 0)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendValue(dot, 1)
})
```

## Displaying a message

The next step is to have your @boardname@ display the symbol it has received. 📃

---

► Grab an ``||basic:show leds||`` block and place it in your ``||logic:if then||`` section.
<br/>
► Set the LEDs to be a dot: .
󠀢<br/>
► We want to display a dash if ``dot`` is ``false``. Get another ``||basic:show leds||`` block and place it in your ``||logic:else||`` section.
<br/>
► Set the new LED block to be a dash: -

```blocks
let dot = ""
radio.onReceivedNumber(function (receivedNumber) {
    if (dot) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            `)
    }
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    radio.sendValue(dot, 0)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendValue(dot, 1)
})
```

## Playing a sound

The new @boardname@s have built-in speakers! Let's use them to play a sound that corresponds to the message being sent. 🔊🎵

---

► From the ``||music:Music||`` category, drag a ``||music:play tone [Middle C] for [1 beat]||`` into the end of both the  ``||logic:if then||`` and  ``||logic:else||`` sections.
<br/>
► Dots are shorter than dashes! In the ``||logic:if then||`` section, set the tone to play for ``1/4 beat``.

```blocks
let dot = ""
radio.onReceivedNumber(function (receivedNumber) {
    if (dot) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
        music.playTone(262, music.beat(BeatFraction.Quarter))
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            `)
        music.playTone(262, music.beat(BeatFraction.Whole))
    }
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    radio.sendValue(dot, 0)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendValue(dot, 1)
})
```

## Clearing the screens

As a final step, we want to clear the receiving @boardname@'s LED screens when your messages have finished sending. 🗨️

---

► From the ``||basic:Basic||`` category, find the ``||basic:clear screen||`` block and drag one into the end of your ``||logic:if then||`` statement.
<br/>
► Drag another ``||basic: clear screen||`` block into the end of your ``||logic:else||`` statement.

```blocks
let dot = ""
radio.onReceivedNumber(function (receivedNumber) {
    if (dot) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
        music.playTone(262, music.beat(BeatFraction.Quarter))
        basic.clearScreen()
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            `)
        music.playTone(262, music.beat(BeatFraction.Whole))
        basic.clearScreen()
    }
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    radio.sendValue(dot, 0)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendValue(dot, 1)
})
```

## Testing in the simulator

Let's test what you've created! 👀

---

► Press button **A** on the simulator. You will notice that a second @boardname@ appears.
<br/>
&nbsp;&nbsp; 💡 If your screen is too small, the simulator might decide not to show it.
<br/>
► Press **A** again and notice that the message you wrote gets displayed on the other @boardname@.

```blocks
input.onButtonPressed(Button.A, function() {
    radio.sendString("Hi!");
});
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString);
})
```