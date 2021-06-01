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

## Setting up the space

Your @boardname@ will need to send different messages depending on if you press or long press the logo. Let's set that up!

---

► From the ``||input:Input||`` category, find the ``||input:on logo [pressed]||`` container and add it to your workspace.
<br/>
► Repeat the above step.
<br/>
► Set the argument for one of your containers to be ``||input:on logo [long pressed]||``.

```blocks
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {

})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {

})
```

## Sending a Boolean

Now, we need to help your @boardname@ distinguish between if it is sending a dot or a dash.

---

► From the ``||radio:Radio||`` category, find the ``||radio:radio send number [0]||`` block and place it into your ``||input:on logo [long pressed]||`` container.
<br/>
► Set the number to be ``1``.
<br/>
► Drag another ``||radio:radio send number [0]||`` block into your ``||input:on logo [pressed]||`` container.

```blocks
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    radio.sendNumber(1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
```

## Receiving a message

Now, we will need to program your @boardname@ to receive a message that is sent to it.

---

► From the ``||radio:Radio||`` category, find the ``||radio:on radio received [receivedNumber]||`` container and add it to your workspace.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
	
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    radio.sendNumber(1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
```

## Setting the display conditional

Let us set up an [__*if then else*__](#ifthenelse "runs some code if a boolean condition is true and different code if the condition is false") conditional statement so you can tell your @boardname@ what to do based on if it needs to display a dot or a dash.

---

► Grab an ``||logic:if [true] then...else||`` block and place it in your ``||radio:on radio received [receivedNumber]||`` container.
<br/>
► Look in the ``||logic:Logic||`` category and drag the ``||logic:[0] = [0]||`` conditional to replace the ``||logic:[true]||`` argument in your ``||logic:if [0 = 0] then...else||`` block.
󠀢<br/>
► Drag the ``receivedNumber`` input into the first argument in your ``||logic:[receivedNumber] = [0]||`` conditional.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
    	
    } else {
    	
    }
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    radio.sendNumber(1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
```

## Displaying a message

The next step is to have your @boardname@ display the symbol it has received. 📃

---

► Grab an ``||basic:show leds||`` block and place it in your ``||logic:if then||`` section.
<br/>
► Set the LEDs to be a dot: .
󠀢<br/>
► We want to display a dash if the logo is long pressed. Get another ``||basic:show leds||`` block and place it in your ``||logic:else||`` section.
<br/>
► Set the new LED block to be a dash: -

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
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
    radio.sendNumber(1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
```

## Playing a sound

The new @boardname@s have built-in speakers! Let's use them to play a sound that corresponds to the message being sent. 🔊🎵

---

► From the ``||music:Music||`` category, drag a ``||music:play tone [Middle C] for [1 beat]||`` into the end of both the  ``||logic:if then||`` and  ``||logic:else||`` sections.
<br/>
► Dots are shorter than dashes! In the ``||logic:if then||`` section, set the tone to play for ``1/4 beat``.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
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
    radio.sendNumber(1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
```

## Clearing the screens

As a final step, we want to clear the receiving @boardname@'s LED screens when your messages have finished sending. 🗨️

---

► From the ``||basic:Basic||`` category, find the ``||basic:clear screen||`` block and drag one into the end of your ``||logic:if then||`` statement.
<br/>
► Drag another ``||basic: clear screen||`` block into the end of your ``||logic:else||`` statement.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
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
    radio.sendNumber(1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
```

## Testing in the simulator

Let's test what you've created! 👀

---

► Click on the logo in the simulator. You will notice that a second @boardname@ appears.
<br/>
&nbsp;&nbsp; 💡 If your screen is too small, the simulator might decide not to show it.
<br/>
► Click or hold the logo again to test your code!
<br/>
&nbsp;&nbsp;&nbsp;&nbsp; **Press** the logo to send a dot to your second @boardname@.
<br/>
&nbsp;&nbsp;&nbsp;&nbsp; **Long press** the logo (count to 3!) to send a dash to your second @boardname@.
<br/>
&nbsp;&nbsp; 🎵 Turn up the sound to hear the tone being played! 🎵
<br/>
► If you own multiple new @boardname@s, you can download this code and try it out!

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
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
    radio.sendNumber(1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
```