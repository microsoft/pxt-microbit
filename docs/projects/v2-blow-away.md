# Blow Away

## 1. Introduction @unplugged

👻 Oh, no! Your new @boardname@ has been infiltrated by a ghost named Haven 👻
<br/>
<br/>
Have no fear - you can get rid if Jasmine with just your voice 🎤
<br/>
<br/>
For this tutorial, we will learn how to blow the scary ghost away 🌬️

## 2. Haunted ghost setup

To show your @boardname@ is haunted by Haven, let's have it display a ghost 👻

---

► From the ``||basic:Basic||`` category, find the ``||basic:show icon [ ]||`` block and add it to your ``||basic:on start||`` container.
<br/>
► Set it to show a ghost in LEDs.
<br/>
&nbsp;&nbsp; 💡 In the ``show icon`` dropdown menu options, if you hover over them, you can see what they're called!

```blocks
basic.showIcon(IconNames.Ghost)
```

---

## 3. Conditional setup

Haven hates noise and will only blow away if they hear noise. So, we will need an [__*if statement*__](#ifstatement "if this condition is met, do something").

---

► From the ``||logic:Logic||`` category, grab an ``||logic:if [true] then||`` statement and place it in your ``||basic:forever||`` container.

```blocks
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    if (true) {
    	
    }
})
```

## 4. Blow sound

Since Haven will be blown away, let's set a sound threshold so they can hear you 👂

---

► From the ``||logic:Logic||`` category, get a ``||logic:[0] [<] [0]||`` comparison and replace the ``[true]`` input for your ``||logic:if then||`` block.
<br/>
► Look in the ``||input:Input||`` category and drag a ``||input:sound level||`` into your workspace.
<br/>
► Set your comparison to say: ``[`` ``||input:sound level||`` ``] [>] [128]``.
<br/>
&nbsp;&nbsp; 💡 You can adjust the sound level based on what works best for you!

```blocks
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    if (input.soundLevel() > 128) {
    	
    }
})
```

## 5. Loop setup

We want to blow Haven away quickly, so we will be using a [__*repeat loop*__](#repeatLoop "repeat code for a given number of times") to displace multiple LEDs at once whenever it hears a sound.

---

► From the ``||loops:Loops||`` category, find the ``||loops:repeat [4] times do||`` loop and drag it into your ``||logic:if else||`` statement.

```blocks
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    if (input.soundLevel() > 128) {
        for (let index = 0; index < 4; index++) {
        	
        }
    }
})
```

## 6. Making variables

In order to blow Haven away, we will need to create some [__*variables*__](#variable "a holder for information that may change").

---

►  In the ``||variables:Variables||`` category, click on ``Make a Variable...`` and make a variable named ``row``.
<br/>
►  Make another variable and name it ``col``.
<br/>
&nbsp;&nbsp; 💡 ``col`` is short for "column".

```blocks
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    if (input.soundLevel() > 128) {
        for (let index = 0; index < 4; index++) {
        	
        }
    }
})
```

## 7. Displace LEDs part 1

As the Haven blows away, random LEDs will move off the board. Let's begin to set this up.

---

► Your ``||variables:Variables||`` category should now have the option to ``||variables:set [col] to [0]||``. Drag that block into your ``||logic:if then||`` statement.
<br/>
► Set it to say ``||variables:set [row] to [0]||``.
<br/>
► Go into your ``||variables:Variables||`` category and drag another ``||variables:set [col] to [0]||`` block into the end of your ``||logic:if then||`` statement

```blocks
let col = 0
let row = 0
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    if (input.soundLevel() > 128) {
        for (let index = 0; index < 4; index++) {
            row = 0
            col = 0
        }
    }
})
```

## 8. Displace LEDs part 2

Right now, we are always choosing row 0 and column 0. Let's instead set a random point so Haven eventually gets fully blown away 💨

---

► From the ``||math:Math||`` category, find the ``||math:pick random [0] to [10]||`` function and drag it in to replace the ``[0]`` in your ``||variables:set [row]||`` block.
<br/>
► Get another ``||math:pick random [0] to [10]||`` function and drag it in to replace the ``[0]`` in your ``||variables:set [col]||`` block.
<br/>
► Set both of your ``||math:pick random||`` functions to read: ``||math:pick random [0] to [4]||``.
<br/>
&nbsp;&nbsp; 💡 We are doing this because the @boardname@ LED board only has 5 rows and columns that index from 0 to 4.

```blocks
let col = 0
let row = 0
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    if (input.soundLevel() > 128) {
        for (let index = 0; index < 4; index++) {
            row = randint(0, 4)
            col = randint(0, 4)
        }
    }
})
```

## 9. Conditioning on one point

Almost there! Let's make sure we move only the LED at the random row and column that we found.

---

► From the ``||logic:Logic||`` category, grab an ``||logic:if [true] then||`` statement and place it inside and at the end of your ``||logic:if [sound level] [>] [128]||`` statement.
<br/>
► From the ``||led:LED||`` category, find the ``||led:point x [0] y [0]||`` condition and drag it in to replace the ``||logic:true||`` condition in the ``||logic:if then||`` statement you just added.
<br/>
► Go into the ``||variables:Variables||`` category and drag out variables to set your condition to say: ``if point x [col] y [row] then``.

```blocks
let col = 0
let row = 0
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    if (input.soundLevel() > 128) {
        for (let index = 0; index < 4; index++) {
            row = randint(0, 4)
            col = randint(0, 4)
        }
        if (led.point(col, row)) {
        	
        }
    }
})
```

## 10. Unplotting and replotting LEDs

To move Haven's LEDs around, we will need to unplot and replot them.

---

► From the ``||led:LED||`` category, find the ``||led:unplot x [0] y [0]||`` block and put it into the empty ``||logic:if then||`` statement.
<br/>
► Go into the ``||variables:Variables||`` category and drag out variables to set the block to say: ``unplot x [col] y [row]``.
<br/>
► From the ``||led:LED||`` category, find the ``||led:plot x [0] y [0]||`` block and put it after your ``||led:unplot x [col] y [row]||`` block.
<br/>
► Drag out variables to set the block to say: ``plot x [col] y [row]``.

```blocks
let col = 0
let row = 0
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    if (input.soundLevel() > 128) {
        for (let index = 0; index < 4; index++) {
            row = randint(0, 4)
            col = randint(0, 4)
        }
        if (led.point(col, row)) {
            led.unplot(col, row)
            led.plot(col, row)
        }
    }
})
```

## 11. Moving LEDs

Right now, we're not actually moving any LEDs. Let's fix that by blowing Haven off the right side of the board!

---

► From the ``||math:Math||`` category, find the ``||math:[0] [+] [0]||`` operation and use it to replace the ``||variables:col||`` in your ``||led:plot x [col] y [row]||`` block.
<br/>
► Set the operation to use the ``||variables:col||`` variable that you just displaced (or get a new one!) so the operation reads ``[col] [+] [1]``.

```blocks
let col = 0
let row = 0
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    if (input.soundLevel() > 128) {
        for (let index = 0; index < 4; index++) {
            row = randint(0, 4)
            col = randint(0, 4)
        }
        if (led.point(col, row)) {
            led.unplot(col, row)
            led.plot(col + 1, row)
        }
    }
})
```

## Testing in the simulator

🌬️ **Let's test what you've created** 👻
<br/>
<br/>
Check out the simulator!
<br/>
► Click on the pink bar underneath the microphone icon 🎤. Drag it up and down. Every time you drag it above the sound level you chose is one breath.
<br/>
► If you own a new @boardname@, you can download this code and try it out! Blow into the microphone to shoo Haven away!
<br/>
&nbsp;&nbsp; 💡 Use the reset button on your @boardname@ to bring Haven back 👻

```blocks
let col = 0
let row = 0
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    if (input.soundLevel() > 128) {
        for (let index = 0; index < 4; index++) {
            row = randint(0, 4)
            col = randint(0, 4)
        }
        if (led.point(col, row)) {
            led.unplot(col, row)
            led.plot(col + 1, row)
        }
    }
})
```