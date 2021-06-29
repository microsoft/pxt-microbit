# Morse Chat

## 1. Introducing Sky @unplugged

👋🐷 Meet Sky, the pig! Sky can only communicate using [__*morse code*__](#morsecode "an alphabet composed of dots (short signals) and dashes (long signals)").

Luckily, you can use your new @boardname@ to talk to Sky 🐷👋

## 2. Introducing tutorial @unplugged
In this tutorial, we will walk through how to send morse code messages between two or more of the new @boardname@s 🥳

_**Note:** Don't worry if you don't own multiple @boardname@s. We will be able to simulate two in this tutorial._

## 3. Setup

⚙️ **Communication works best when set up properly** ⚙️

<hr/>

► From the ``||input:Input||`` category in the toolbox, grab an ``||input:on logo [pressed]||`` container and add it to your workspace.

► Get a **second** ``||input:on logo [pressed]||`` container and add it to your workspace.

► On the **greyed-out container**, click on the ``||input:[pressed]||`` **dropdown** and set it to ``||input:[long pressed]||``.

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

► Snap it into your ``||input:[long pressed]||`` container.

► Set the number to be ``1``.

► From the ``||radio:Radio||`` category, get **another** ``||radio:radio send number [0]||`` block and snap it into your **empty** ``||input:on logo [pressed]||`` container.

```blocks
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    radio.sendNumber(1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
```

## 5. Receiving different messages

To ensure Sky gets the right message, we will use an [__*if then else*__](#ifthenelse "runs some code if a boolean condition is true and different code if the condition is false") conditional statement.

<hr/>

► From the ``||radio:Radio||`` category, find the ``||radio:on radio received [receivedNumber]||`` container and add it to your workspace.

► From the ``||logic:Logic||`` category, grab an ``||logic:if [true] then...else||`` statement and snap it into your ``||radio:on radio received [receivedNumber]||`` container.

► Go back to the ``||logic:Logic||`` category, grab the ``||logic:[0] = [0]||``, and click it in to replace the ``||logic:[true]||`` argument in your ``||logic:if then...else||`` statement.

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

► From your ``||radio:on radio received [receivedNumber]||`` container, grab the ``receivedNumber`` input and drag out a **copy**.

► Place the ``receivedNumber`` **copy** into your ``||logic:if||`` statement so it reads ``||logic:if [receivedNumber] = [0] then||``.

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

📃 **Let's make sure Sky sees your message** 📃

<hr/>

► We want to display a dot if the logo is pressed. From the ``||basic:Basic||`` category, grab a ``||basic:show leds||`` block and snap it into your ``||logic:if then||`` statement.

► Set the LEDs to be a dot: .

► We want to display a dash if the logo is long pressed. Get **another** ``||basic:show leds||`` block and snap it into your ``||logic:else||`` statement.

► Set the **new** LED block to be a dash: -

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

🎵 **Adding sound** 🎵

<hr/>

► From the ``||music:Music||`` category, drag a ``||music:play tone [Middle C] for [1 beat]||`` block into the **end** of your ``||logic:if then||`` statement.

► Dots are shorter than dashes! Set the tone to play for ``1/4 beat``.

► From the ``||music:Music||`` category, get **another** ``||music:play tone [Middle C] for [1 beat]||`` and snap it at the **end** of your ``||logic:else||`` statement.

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

🗨️ **Make sure to clear the screen after messages are sent** 🗨️

<hr/>

► From the ``||basic:Basic||`` category, find the ``||basic:clear screen||`` block and snap it at the **end** of your ``||radio:on radio received [receivedNumber]||`` container.

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
    basic.clearScreen()
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

Remember to turn your sound on!

<hr/>

► Touch the gold logo (it looks like a pig snout 🐽) on the simulator. You will notice that a second @boardname@ appears.
<br/>
&nbsp;&nbsp; 💡 If your screen is too small, the simulator might decide not to show it.

► Touch the 🐽 again to send messages!
<br/>
&nbsp;&nbsp; **Press** to send a dot.
<br/>
&nbsp;&nbsp; **Long press** (count to 3!) to send a dash.

► If you own multiple @boardname@s with sound, download this code and try it out!

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
    basic.clearScreen()
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    radio.sendNumber(1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
```