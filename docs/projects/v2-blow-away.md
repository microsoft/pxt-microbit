# Blow Away

## Introduction @unplugged

👻 Oh, no! Your new @boardname@ has been infiltrated by a ghost 👻
<br/>
<br/>
Have no fear - you can get rid if it with just your voice 🎤
<br/>
<br/>
For this tutorial, we will learn how to blow the scary ghost away 🌬️

## Haunted ghost setup

To haunt your @boardname@, it first needs to display a ghost 👻

---

► From the ``||basic:Basic||`` category, find the ``||basic:show icon [ ]||`` block and add it to your ``||basic:on start||`` container.
<br/>
► Set it to show a ghost in LEDs.

```blocks
basic.showIcon(IconNames.Ghost)
```

## Loop setup

It will take four breath sounds to blow the ghost away 🔢 Let us set up the breaths using a [__*repeat loop*__](#repeatLoop "repeat code for a given number of times").

---

► From the ``||loops:Loops||`` category, find the ``||loops:repeat [4] times do||`` block and drag it into your ``||basic:forever||`` container.

```blocks
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    for (let index = 0; index < 4; index++) {
    	
    }
})
```

## Blow sound

Since you need to blow the ghost away, your ghost will need to be able to hear you!

---

► From the ``||logic:Logic||`` category, find the ``||logic:if [true] then||`` block and drag it into the loop.
<br/>
► Grab a ``||logic:[0] [=] [0]]||`` comparison and put it in as your ``if`` statement condition.
<br/>
► Set the comparison to be true ``if`` ``||input:sound level||`` ``> 128``.
<br/>
&nbsp;&nbsp; 💡 Look in the ``||input:Input||`` category to find ``||input:sound level||``.

```blocks
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    for (let index = 0; index < 4; index++) {
        if (input.soundLevel() > 128) {
        	
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
If you own a new @boardname@, you can download this code and try it out! Blow into the microphone to shoo the ghost away!

```blocks

```