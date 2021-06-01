# Clap Lights

## Introduction @unplugged

The new @boardname@s have a microphone! 🎤 Let's learn how switch your new @boardname@'s LED lights on and off when you clap 👏 

## Setting up the sound input

Let's begin by setting up your workspace! For this program, we want to trigger lights when your @boardname@ hears a noise.

---

► From the ``||input:Input||`` category, find the ``||input:on [loud] sound||`` container and add it to your workspace.

```blocks
input.onSound(DetectedSound.Loud, function () {

})
```

## Creating a lightsOn variable

Now, let's create a variable that keeps track of if your new @boardname@'s LEDs should be on or off.

---

► In the ``||variables:Variables||`` category, click on ``Make a Variable...``. From here, you can name your variable.
<br/>
&nbsp;&nbsp; 💡 We chose to name our variable ``lightsOn`` because it is meant to keep track if the @boardname@'s lights should be on or off.
<br/>
► Your ``||variables:Variables||`` category should now have the option to ``||variables:set [lightsOn] to [0]||``. Drag that block into your ``||input:on [loud] sound||`` container.

```blocks
let lightsOn = 0
input.onSound(DetectedSound.Loud, function () {
    lightsOn = 0
})
```

## Setting the lightsOn variable

``lightsOn`` is a [__*boolean*__](#boolean "has one of two possible values: true or false") variable. Boolean logic is a fundamental building block of computer hardware and software. This tutorial will provide an example of how useful this kind of variable can be.

---

► From the ``||logic:Logic||`` category, find the ``||logic:not []||`` operator and use it to replace the ``||variables:[0]||`` in the ``||variables:set [lightsOn] to [0]||`` block.
<br/>
► From ``||variables:Variables||``, locate the ``||variables:lights on||`` variable and put it into the ``||logic:not||`` operator
<br/>
&nbsp;&nbsp; 💡 This means that, whenever your @boardname@ hears a loud sound, it will flip the value of your ``lightsOn`` variable: from ``true`` to ``false`` or vice versa!

```blocks
let lightsOn = false
input.onSound(DetectedSound.Loud, function () {
    lightsOn = !(lightsOn)
})
```

## Displaying LEDs part 1

The next step is to set up an [__*if then else*__](#ifthenelse "runs some code if a boolean condition is true and different code if the condition is false") conditional statement so you can tell your @boardname@ what to do based on if the lights are on or off 🔆

---

► From the ``||logic:Logic||`` category, grab an ``||logic:if [true] then...else||`` block and place it at the end of your ``||input:on [loud] sound||`` container.
<br/>
► Look in the ``||variables:Variables||`` category and drag the ``||variables:lightsOn||`` variable to replace the ``||logic:[true]||`` argument in your ``||logic:if then...else||`` block.
󠀢<br/>
&nbsp;&nbsp; 💡 Because ``lightsOn`` is a Boolean variable, it can be an argument for an ``if`` statement!
<br/>

```blocks
let lightsOn = false
input.onSound(DetectedSound.Loud, function () {
    lightsOn = !(lightsOn)
    if (lightsOn) {
    	
    } else {
    	
    }
})
```

## Displaying LEDs part 2

Now, let's set your @boardname@'s display based on your ``||variables:lightsOn||`` variable's value.

---

► We want to turn the lights on if ``lightsOn`` is ``true``. So, from the ``||basic:Basic||`` category, grab a ``||basic:show LEDs||`` block and place it into the ``||logic:if then||`` section.
<br/>
► Set the LEDs to a pattern you like! We chose to light up the whole display.
󠀢<br/>
► We want to turn off the lights if ``lightsOn`` is ``false``. From the ``||basic:Basic||`` category, find the ``||basic:clear screen||`` block and put it into the ``||logic:else||`` section.

```blocks
let lightsOn = false
input.onSound(DetectedSound.Loud, function () {
    lightsOn = !(lightsOn)
    if (lightsOn) {
    	basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
    	basic.clearScreen()
    }
})
```

## Set loud sound threshold

Depending on what is happening around you, your @boardname@ might detect some sounds and turn on or off when you don't mean for it to. It is possible that your @boardname@ is hearing sounds that aren't yours! If you need to change how loud your @boardname@ thinks a `loud` sound is, you can set a sound threshold 🔉🔊

---

► In the ``||input:Input ... more||`` category, find the ``||input:set [loud] sound threshold to [128]||`` block and place it into your ``||basic: on start||`` container.
<br/>
&nbsp;&nbsp; 💡 After you test your code (next step), if you need to increase/decrease the threshold at which your @boardname@ detects sound when turning the LEDs on or off, modifying the ``128`` number could help!

```blocks
let lightsOn = false
input.onSound(DetectedSound.Loud, function () {
    lightsOn = !(lightsOn)
    if (lightsOn) {
    	basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
    	basic.clearScreen()
    }
})
input.setSoundThreshold(SoundThreshold.Loud, 128)
```

## Testing in the simulator

💡 **Let's test what you've created** 💡
<br/>
<br/>
Check out the simulator!
<br/>
► Click on the pink bar underneath the microphone icon 🎤. Drag it up and down. Every time you drag it above the loud sound threshold that you have set, your LEDs will turn on if they are off and vice versa 💡
<br/>
► If you own a new @boardname@, you can download this code onto it and try it out! Try to set your sound threshold so that every time you clap, your LEDs will turn on if they are off and vice versa 👏

```blocks
let lightsOn = false
input.onSound(DetectedSound.Loud, function () {
    lightsOn = !(lightsOn)
    if (lightsOn) {
    	basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
    	basic.clearScreen()
    }
})
input.setSoundThreshold(SoundThreshold.Loud, 128)
```