# Morse Chat

## 1. Introducing Sky @unplugged

👋🐷 Meet Sky, the pig! Sky can only communicate using [__*morse code*__](#morsecode "an alphabet composed of dots (short signals) and dashes (long signals)").
<br/>
Luckily, you can use your new @boardname@ to talk to Sky 🐷👋

## 2. Introducing tutorial @unplugged
In this tutorial, we will walk through how to send morse code messages between two or more of the new @boardname@s 🥳

_**Note:** Don't worry if you don't own multiple @boardname@s. We will be able to simulate two in this tutorial._

## 3. Setup

⚙️ **Communication works best when set up properly** ⚙️

<hr/>

► From the ``||input:Input||`` category in the toolbox, grab an ``||input:on logo [pressed]||`` container and add it to your workspace.

► Get a **second** ``||input:on logo [pressed]||`` container and add it to your workspace.

► On the **greyed-out container**, click on the ``||input:[pressed]||`` **dropdown** and set it to ``||input:on logo [long pressed]||``.

```blocks
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {

})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {

})
```

## 4. Sending different messages

💬 **Make sure to send Sky two _different_ messages** 💬

<hr/>

► From the ``||radio:Radio||`` category, grab a ``||radio:radio send number [0]||`` block.

► Snap it into your ``||input:on logo [long pressed]||`` container.

► Set the number to be ``1``.

► From the ``||radio:Radio||`` category, get a **second** ``||radio:radio send number [0]||`` block and snap it into your **empty** ``||input:on logo [pressed]||`` container.

```blocks
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    radio.sendNumber(1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
```

## 5. Receiving different messages

Now that we've set up sending messages, let's make sure Sky can receive them!

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

## 5. Setting up the display conditional

To ensure Sky gets the right message, we will use an [__*if then else*__](#ifthenelse "runs some code if a boolean condition is true and different code if the condition is false") conditional statement.

---

► From the ``||logic:Logic||`` category, grab an ``||logic:if [true] then...else||`` statement and click it into your ``||radio:on radio received [receivedNumber]||`` container.
<br/>
► Look in the ``||logic:Logic||`` category again and find the ``||logic:[0] = [0]||`` conditional.
<br/>
► Drag the ``||logic:[0] = [0]||`` to replace the ``||logic:[true]||`` argument in your ``||logic:if then...else||`` statement.
󠀢
```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (0 == 0) {
    	
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

## 6. Conditioning on the input

Let's set it so the message Sky receives matches the one you send 🗨️🐖

---

► From your ``||radio:on radio received [receivedNumber]||`` container, click on the ``receivedNumber`` input and drag out a copy.
<br/>
► Place that ``receivedNumber`` into your ``||logic:if||`` statement so it reads ``||logic:if [receivedNumber] = [0] then||``.

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

## 7. Displaying a message

At this point, we have sent but not yet displayed messages for Sky to see. The next step is to have your @boardname@ display the symbol it has received. 📃

---

► We want to display a dash if the logo is pressed. Grab a ``||basic:show leds||`` block and place it in your ``||logic:if then||`` statement.
<br/>
► Set the LEDs to be a dot: .
󠀢<br/>
► We want to display a dash if the logo is long pressed. Get another ``||basic:show leds||`` block and place it in your ``||logic:else||`` statement.
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

## 8. Playing a sound

The new @boardname@s have built-in speakers! Let's use them to play a sound that corresponds to the message being sent to Sky. 🔊🎵

---

► From the ``||music:Music||`` category, drag a ``||music:play tone [Middle C] for [1 beat]||`` block into the end of your  ``||logic:if then||`` statement.
<br/>
► Dots are shorter than dashes! Set the tone to play for ``1/4 beat``.
<br/>
► Get another ``||music:play tone [Middle C] for [1 beat]||`` and place it at the end of your  ``||logic:else||`` statement. You can leave this to be 1 beat long.

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

## 9. Clearing the screens

As a final step, we want to make sure Sky knows when your message ends. We can do this by clearing the receiving @boardname@'s LED screens 🗨️

---

► From the ``||basic:Basic||`` category, find the ``||basic:clear screen||`` block and place one at the end of your ``||logic:if then||`` statement.
<br/>
► Get another ``||basic: clear screen||`` block and put it at end of your ``||logic:else||`` statement.

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

## 10. Testing in the simulator

🐷 **Let's test what you've created** 💬

---

► Click on the logo in the simulator. You will notice that a second @boardname@ appears.
<br/>
&nbsp;&nbsp; 💡 If your screen is too small, the simulator might decide not to show it.
<br/>
► Click or hold the logo again to test your code!
<br/>
&nbsp;&nbsp;&nbsp;&nbsp; **Press** the logo to send a dot to Sky.
<br/>
&nbsp;&nbsp;&nbsp;&nbsp; **Long press** the logo (count to 3!) to send a dash to Sky.
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