# Countdown

## Introduction @unplugged

Have you ever played a racing game? If you have, you may have encountered a countdown consisting of some images and noises that represent a "3...2...1..GO!" sequence. 🚥
<br/>
<br/>
Today, let's recreate this using the new @boardname@'s microphone and LEDs! 🎤 

## Setting up the loop

Since we need to produce the same sound 3 times, we will be using a [__*for loop*__](#forLoop "a loop that repeats code for a given number of times using an index"). Let's begin by setting that up!

---

► From the ``||loops:Loops||`` category, find the ``||loops:for [index] from 0 to [4]||`` block and add it to your ``||basic:on start||`` container.
<br/>
► Set your loop's counter to go to ``2``.
<br/>
&nbsp;&nbsp; 💡 This means the loop will count 0-1-2 instead of what we want, which is 3-2-1. We will worry about this later!

```blocks
for (let index = 0; index <= 2; index++) {
	
}
```

## Play music

Every time our loop runs, we want to play a tone. 🎵

---

► In the ``||music:Music||`` category, find the ``||music:play tone [Middle C] for [1 beat]||`` block and drag it into your loop.
<br/>
&nbsp;&nbsp; 💡 Your simulator might start playing music. You can mute it if distracting.
<br/>
► 1 beat is a little long. Set your block to play for ``1/4 beat``.

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
}
```

## Showing a number

With every tone, we also want to display our countdown. 🔢

---

► From the ``||basic:Basic||`` category, find the ``||basic:show number [0]||`` block and put it at the end of your loop.
<br/>
► We want the number to change every time the loop runs. Drag the ``||variables:index||`` variable from the ``||loops:for||`` loop and use it as your ``||basic:show number||`` input.

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.showNumber(index)
}
```

## Inverting the number

If you take a look at your simulator, you will notice the LEDs flashing 0-1-2. We want it to say, 3-2-1! Let's learn a trick to invert the numbers.

---

► From the ``||math:Math||`` category, find the ``||math:[0] - [0]||`` operation and use it to replace the ``index`` variable in the ``||basic:show number [index]||`` block.
<br/>
► Pick up the displaced ``||variables:index||`` variable and set the subtraction to be ``||math:[3] - [index]||``.
<br/>
&nbsp;&nbsp; 💡 Now, we will see: 3-0 = 3 on the first iteration, 3-1 = 2 on the second, and 3-2 = 1 on the last, which is what we want 🎉

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.showNumber(3 - index)
}
```

## Printing "GO!"

Almost there! We finished the countdown, but now we need to wrap it up with a "GO!"

---

► From the ``||basic:Basic||`` category, find the ``||basic:show string ["Hello!"]||`` block and put it at the end of your ``||basic:on start||`` block.
<br/>
► Set the string to be ``GO!``

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.showNumber(3 - index)
}
basic.showString("GO!")
```

## Adding a "GO!" noise

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

## Testing in the simulator

🚦 **Let's test what you've created** 🚦
<br/>
<br/>
Check out the simulator!
<br/>
► Make sure your speakers are on 🔊
<br/>
► If you own a new @boardname@, you can download this code and try it out!

```blocks
for (let index = 0; index <= 2; index++) {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.showNumber(3 - index)
}
music.playTone(392, music.beat(BeatFraction.Whole))
basic.showString("GO!")
```