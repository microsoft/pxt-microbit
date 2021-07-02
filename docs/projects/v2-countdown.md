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

► From ``||basic:Basic||``, find ``||basic:show number [0]||`` and snap it in at the **bottom** of your loop.

► **Click and drag out** the **red** ``||variables:index||`` variable from your ``||loops:for [``||variables:index||``] from 0 to [4]||`` loop.

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

► From the ``||math:Math||`` category, find the ``||math:[0] - [0]||`` operation.

► Use ``||math:[0] - [0]||`` to **replace** ``||variables:index||`` in your ``||basic:show number [index]||`` block.  
💡 You should now have a greyed out ``index`` variable in your workspace.

► Pick up the displaced ``||variables:index||`` variable and set the subtraction to read ``||math:[3] - [index]||``.  
💡 Why does this work? Every time we loop, our ``index`` variable will grow by 1 and our math will output: 3-0 = **3** ➡️ 3-1 = **2** ➡️ 3-2 = **1**!

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    // @highlight
    basic.showNumber(3 - index)
}
```

## 6. Printing "GO!"

✨ **You had me at "GO!"** ✨

---

► From ``||basic:Basic||``, grab ``||basic:show string ["Hello!"]||`` and put it at the **bottom** of your ``||basic:on start||`` container.

► Replace ``Hello!`` with the word ``GO!``

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.showNumber(3 - index)
}
// @highlight
basic.showString("GO!")
```

## 7. Adding a "GO!" noise

🕬 **And we're off!** 🏇

---

► From the ``||music:Music||`` category, grab ``||music:play tone [Middle C] for [1 beat]||`` and place it **above** your ``||basic:show string ["GO!"]||`` block and **below** your ``||loops:for||`` loop.  
💡 This will let your @boardname@ play the sound and show ``GO!`` at the same time.

► Set the tone to be ``Middle G``.  
💡 ``Middle G`` is also tone ``392``.

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.showNumber(3 - index)
}
// @highlight
music.playTone(392, music.beat(BeatFraction.Whole))
basic.showString("GO!")
```

## 8. Testing in the simulator

🚦 **Test what you've created** 🚦

Make sure your speakers are on and check out the simulator!  

If you have a @boardname@ with sound (the one with the **shiny gold** logo at the top), download this code and try it out!

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.showNumber(3 - index)
}
music.playTone(392, music.beat(BeatFraction.Whole))
basic.showString("GO!")
```