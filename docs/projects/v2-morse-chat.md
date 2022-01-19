# Morse Chat

## 1. Introducing Sky @unplugged

🐷 Meet Sky, the pig! Sky can only communicate using [__*morse code*__](#morsecode "an alphabet composed of dots (short signals) and dashes (long signals)").

Luckily, you can use your @boardname@ with sound to talk to Sky 👋

![Morse chat banner message](/static/mb/projects/morse-chat.png)

## 2. Setup

⚙️ **Communication works best when set up properly** ⚙️

---

► From the ``||input:Input||`` category in the toolbox, drag an ``||input:on logo [pressed]||`` container into to your workspace.

► From the ``||radio:Radio||`` category, get ``||radio:radio send number [0]||`` and snap it into your empty ``||input:on logo [pressed]||`` container.

```blocks
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
```

## 3. Sending different messages pt. 1

💬 **Sending Sky two _different_ messages** 💬

---

► From ``||input:Input||``, grab **another** ``||input:on logo [pressed]||`` container and add it to your workspace.  
💡 This container is greyed out because it matches another. Let's change that!

► On the greyed-out ``||input:on logo [pressed]||`` container, click on the **``pressed``** dropdown and set it to ``||input:long pressed||``.

```blocks
// @highlight
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
```

## 4. Sending different messages pt. 2

► From the ``||radio:Radio||`` category, get a ``||radio:radio send number [0]||`` block and snap it into your **empty** ``||input:on logo [long pressed]||`` container.  

► Set the number to be ``1``.

```blocks
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    // @highlight
    radio.sendNumber(1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
```

## 5. Receiving different messages

To ensure Sky gets the right message, we will use an [__*if then / else*__](#ifthenelse "runs some code if a boolean condition is true and different code if the condition is false") conditional statement.

---

► From ``||radio:Radio||``, find the ``||radio:on radio received [receivedNumber]||`` container and add it to your workspace.

► From ``||logic:Logic||``, grab an ``||logic:if <true> then / else||`` statement and snap it into your **new** ``||radio:on radio received [receivedNumber]||`` container.

► Go back to the ``||logic:Logic||`` category, grab ``||logic:<[0] [=] [0]>||``, and click it in to **replace** the ``||logic:<true>||`` argument in your ``||logic:if <true> then / else||`` statement.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    // @highlight
    if (0 == 0) {
    	
    } else {
    	
    }
})
```

## 6. Conditioning on the input

► From your ``||radio:on radio received [receivedNumber]||`` container, grab the **``receivedNumber``** input and drag out a copy.

► Use your copy of **``receivedNumber``** to replace the ``[0]`` on the **left side** of ``||logic:<[0] [=] [0]>||``.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    // @highlight
    if (receivedNumber == 0) {
    	
    } else {
    	
    }
})
```

## 7. Displaying a message pt. 1

📃 **Dashing through the lights** 📃

► We want to display a dash if the logo is long pressed.  From ``||basic:Basic||``, grab ``||basic:show leds||`` and snap it into the empty **bottom container** of your ``||logic:if then / else||`` statement.

► Turn on 3 LEDs in a row to be a dash: -

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
    } else {
        // @highlight
        basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            `)
    }
})
```

## 8. Playing a sound pt. 1

🎵 **Adding sound** 🎵

---

► From the ``||music:Music||`` category, grab a ``||music:play tone [Middle C] for [1 beat]||`` block and snap it at the **end** of the **bottom container** in your ``||logic:if then / else||`` statement.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            `)
        // @highlight
        music.playTone(262, music.beat(BeatFraction.Whole))
    }
})
```

## 9. Displaying a message pt. 2

⚫ **Dot dot dot** ⚫

---

► We want to display a dot if the logo is pressed. From ``||basic:Basic||``, grab another ``||basic:show leds||`` and snap it into the **top container** of your ``||logic:if then / else||`` statement.

► Turn on a single LED to make a dot: .

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        // @highlight
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
        music.playTone(262, music.beat(BeatFraction.Whole))
    }
})
```

## 10. Playing a sound pt. 2

► From the ``||music:Music||`` category, grab ``||music:play tone [Middle C] for [1 beat]||`` and snap it in at the **end** of the **top container** in your ``||logic:if then / else||`` statement.

► Dots are shorter than dashes! Set the tone to play for ``1/4 beat``.

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
        // @highlight
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
```

## 11. Clearing the screens

🗨️ **Clear the lights once the messages are sent** 🗨️

---

► From ``||basic:Basic||``, find ``||basic:clear screen||`` and snap it in at the **very bottom** of your ``||radio:on radio received [receivedNumber]||`` container.

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
    // @highlight
    basic.clearScreen()
})
```

## 12. Testing in the simulator

🐷 **Test what you've created** 💬

Remember to turn your sound on!

---

► Touch the gold **micro:bit logo** at the top of your @boardname@ on the simulator. You'll notice that a second @boardname@ appears.  
💡 If your screen is too small, you might not be able to see it.

► Touch the logo again to send messages to Sky 🐖  
**Press** to send a dot.  
**Long press** (count to 3!) to send a dash.

► If you have multiple @boardname@s with sound (they have **shiny gold** logos at the top), download this code and try it out!

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