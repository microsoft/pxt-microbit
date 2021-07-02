# Countdown

## 1. Introduction @unplugged

🎇3...  
🎇2...  
🎇1...  
🎆GO!

Let's create a musical countdown using the new @boardname@ with sound! 

## 2. Setting up the loop

➰ **All looped up** ➰

We'll begin by using a [__*for loop*__](#forLoop "repeat code for a given number of times using an index") to recreate the same sound 3 times.

---

► From the ``||loops:Loops||`` category in your toolbox, find the ``||loops:for [index] from 0 to [4]||`` loop and add it to your ``||basic:on start||`` container.

► Change your loop to **count** from ``0`` to **``2``**.  
💡 This means the loop will count 0-1-2 instead of what we want, which is 3-2-1. We will worry about this later!

```blocks
// @highlight
for (let index = 0; index <= 2; index++) {
	
}
```

## 3. Play music

🎵 **Musical loops** 🎵

---

► From ``||music:Music||``, grab ``||music:play tone [Middle C] for [1 beat]||`` and snap it into your empty loop.  
💡 Your simulator might start playing music. You can mute it if distracting.

► 1 beat is a little long. Set your new block to play a tone for **``1/4 beat``**.

```blocks
for (let index = 0; index <= 2; index++) {
    // @highlight
    music.playTone(262, music.beat(BeatFraction.Quarter))
}
```

## 4. Showing a number

🔢 **Counting down** 🔢

With every tone, we also want to display our countdown.

---

► From ``||basic:Basic||``, find the ``||basic:show number [0]||`` block and put it at the **bottom** of your loop.

► **Click and drag out** the **red** ``||variables:index||`` variable from your ``for [``||variables:index||``] from 0 to [4]`` loop.

► Snap it in to **replace** the ``0`` in ``||basic:show number [0]||``.

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    // @highlight
    basic.showNumber(index)
}
```

## 5. Inverting the number

If you take a look at your simulator, you will notice the LEDs flashing 0-1-2. We want it to say, 3-2-1! Let's learn a trick to invert the numbers.

---

► From ``||math:Math||``, find the ``||math:[0] - [0]||`` operation and use it to replace the ``index`` variable in the ``||basic:show number [index]||`` block.

► Pick up the displaced ``||variables:index||`` variable and set the subtraction to be ``||math:[3] - [index]||``.
<br/>
&nbsp;&nbsp; 💡 Now, we will see: 3-0 = 3 on the first iteration, 3-1 = 2 on the second, and 3-2 = 1 on the last, which is what we want 🎉

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.showNumber(3 - index)
}
```

## 6. Printing "GO!"

Almost there! We finished the countdown, but now we need to wrap it up with a "GO!"

---

► From the ``||basic:Basic||`` category, find the ``||basic:show string ["Hello!"]||`` block and put it at the end of your ``||basic:on start||`` container.
<br/>
► Set the string to be ``GO!``

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.showNumber(3 - index)
}
basic.showString("GO!")
```

## 7. Adding a "GO!" noise

The last thing we need to do is add a sound for the "GO!" 🕬

---

► From the ``||music:Music||`` category, grab the ``||music:play tone [Middle C] for [1 beat]||`` block and place it before your ``||basic:show string ["GO!"]||`` block.
<br/>
&nbsp;&nbsp; 💡 If you put this after, your @boardname@ will finish showing the string before playing any sound.
<br/>
► Set the tone to be ``Middle G``.
<br/>
&nbsp;&nbsp; 💡 ``Middle G`` is also tone ``392``.

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.showNumber(3 - index)
}
music.playTone(392, music.beat(BeatFraction.Whole))
basic.showString("GO!")
```

## 8. Testing in the simulator

🚦 **Let's test what you've created** 🚦
<br/>
<br/>
Check out the simulator!
<br/>
► Make sure your speakers are on 🔊
<br/>
► If you have a new @boardname@ with sound (the one with the **shiny gold** logo at the top), download this code and try it out!

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.showNumber(3 - index)
}
music.playTone(392, music.beat(BeatFraction.Whole))
basic.showString("GO!")
```