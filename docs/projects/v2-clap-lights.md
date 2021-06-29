# Clap Lights

## 1. Introduction @unplugged

The new @boardname@s have a microphone which allows it to detect sounds around it 🎤

Let's learn how to use a clap 👏 to switch your @boardname@'s LEDs on and off! 

## 2. Setting up the sound input

🔊 **Reacting to sound** 🔊

<hr/>

► From the ``||input:Input||`` category, find the ``||input:on [loud] sound||`` container and add it to your workspace.

```blocks
input.onSound(DetectedSound.Loud, function () {

})
```

## 3. Creating a lightsOn variable

🤿 **Diving right in** 🤿

Let begin by creating a [__*variable*__](#variable "a holder for information that may change") to keep track of your @boardname@'s lights.

<hr/>

► In the ``||variables:Variables||`` category, click on ``Make a Variable...`` and make a variable named ``lightsOn``.
<br/>
&nbsp;&nbsp; 💡 ``lightsOn`` will keep track of whether the @boardname@'s lights are on or off.

## 4. Displaying LEDs part 1

🔆 **On or off?** 🌑

In this step, we'll be using an [__*if then else*__](#ifthenelse "runs some code if a Boolean condition is true and different code if the condition is false") statement to change the ``lightsOn`` variable.

<hr/>

► From the ``||logic:Logic||`` category, grab an ``||logic:if [true] then...else||`` block and snap it into your ``||input:on [loud] sound||`` container.

► Look in the ``||variables:Variables||`` category. Take the ``||variables:lightsOn||`` variable and snap it in to **replace** the ``||logic:[true]||`` argument in your ``||logic:if then...else||`` statement.

```blocks
input.onSound(DetectedSound.Loud, function () {
    if (lightsOn) {
    	
    } else {
    	
    }
})
```

## 5. Displaying LEDs part 2

🌞 **Lighting the display** 🌞

<hr/>

► From the ``||basic:Basic||`` category, grab a ``||basic:show LEDs||`` block and snap it into your ``||logic:if then||`` section.

► Set the LEDs to a pattern you like!
<br/>
&nbsp;&nbsp; 💡 Feel free to make your own design 🎨 In the hint, we chose to light up the whole display.

```blocks
input.onSound(DetectedSound.Loud, function () {
    if (lightsOn) {
    	basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
    }
})
```

## 6. Clearing the screen

► From the ``||basic:Basic||`` category, find the ``||basic:clear screen||`` block and snap it into the ``||logic:else||`` section.
<br/>
&nbsp;&nbsp; 💡 This will turn the display off if ``lightsOn`` is ``False``.

```blocks
let lightsOn = 0
input.onSound(DetectedSound.Loud, function () {
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

## 7. Setting the lightsOn variable

🎬 **Lights, camera, _action_** ✨

We want the ``lightsOn`` variable will be either ``True`` or ``False`` depending on if the @boardname@’s lights are *On* or *Off*.  This type of variable is called a [__*Boolean*__](#boolean "has one of two possible values: true or false").

<hr/>

► From ``||variables:Variables||``, locate the ``||variables:set [lightsOn] to [0]||`` block and snap it in at the **top** of your ``||input:on [loud] sound||`` container.

► From the ``||logic:Logic||`` category, find the ``||logic:not []||`` operator and use it to **replace** the ``||variables:[0]||`` in the ``||variables:set [lightsOn] to||`` block.

► From ``||variables:Variables||``, locate the ``||variables:lights on||`` variable and snap it into the **empty part** of the ``||logic:not []||`` operator.

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

## 8. Testing in the simulator

💡 **Let's test what you've created** 💡

<hr/>

► Check out the simulator!

► Click on the pink bar underneath the microphone icon 🎤. Drag it up and down.
<br/>
&nbsp;&nbsp; 💡 Every time you drag it above the default loud sound threshold of 128, your LEDs should turn on if they are off and vice versa.

► If you own a new @boardname@, you can download this code onto it and try it out!

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

## 8. Set loud sound threshold

Your @boardname@ might detect sounds when you don't want it to. Setting a [__*sound threshold*__](#soundThreshold "a number for how loud a sound needs to be to trigger an event. 0 = silence to 255 = maximum noise") could help 🔉🔊

<hr/>

► In the ``||input:Input ... more||`` category, find the ``||input:set [loud] sound threshold to [128]||`` block and place it into your ``||basic: on start||`` container.
<br/>
&nbsp;&nbsp; 💡 Try to set your sound threshold so that every time you clap, your LEDs will turn on if they are off and vice versa.

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

## 9. Testing, round 2 @unplugged

👏 **You did it** 👏

Don't forget to test your code in the simulator!