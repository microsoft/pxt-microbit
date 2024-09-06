# Countdown

## {Introduction @unplugged}

🎇3...🎇2...🎇1...  
🎆GO!🎆

Let's create a musical countdown using the new @boardname@ with sound!

![Countdown banner message](/static/mb/projects/countdown.png)

## {Setting up the loop}

We'll begin by using a [__*for loop*__](#forLoop "repeat code for a given number of times using an index") to recreate the same sound 3 times.

► From the ``||loops:Loops||`` category in your toolbox, find the ``||loops:for [index] from 0 to [4]||`` loop and add it to your ``||basic:on start||`` container.  
► Change your loop to count from ``0`` to **``2``**.  
💡 This means the loop will count 0-1-2 instead of what we want, which is 3-2-1. We will worry about this later!

```blocks
// @highlight
for (let index = 0; index <= 2; index++) {
	
}
```

## {Play music}

► From ``||music:Music||``, grab ``||music:play tone [Middle C] for [1 beat] [until done]||`` and snap it into your empty ``for`` loop.  
💡 Your simulator might start playing music. You can mute it if distracting.  
► 1 beat is a little long. Use the **dropdown** to set the tone to play for ``||music:1/4 beat||``.

```blocks
for (let index = 0; index <= 2; index++) {
    // @highlight
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
}
```

## {Showing a number}

With every tone, we also want to **display** our countdown.

► From ``||basic:Basic||``, find ``||basic:show number [0]||`` and snap it in at the **bottom** of your ``for`` loop.  
► From your ``||loops:for [index] from 0 to [2]||`` loop condition, click and drag out the **red** ``||variables:index||`` variable.  
► Use the ``||variables:index||`` that you dragged out to **replace** the ``0`` in ``||basic:show number [0]||``.

```blocks
for (let index = 0; index <= 2; index++) {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    // @highlight
    basic.showNumber(index)
}
```

## {Inverting the number}

If you take a look at your simulator, you'll notice the @boardname@ flashing 0-1-2. We want it to say 3-2-1! Let's learn a trick to change that.

► From the ``||math:Math||`` category, snap ``||math:[0] - [0]||`` in to **replace** ``||variables:index||`` in your ``||basic:show number [index]||`` block.  
💡 You should now have a greyed out ``index`` variable in your workspace. We'll use that in the next step.  
► Pick up the greyed out ``||variables:index||`` variable and snap it in to the **right side** of your ``||math:[0] - [0]||`` operator.  
💡 Can't find ``||variables:index||``? Try moving your ``||basic:on start||`` container to see if ``||variables: index||`` is hiding behind it!  
► Set the **left side** of your ``||math:[0]-[index]||`` operator to **``3``**.  
💡 Why does this work? Every time we loop, our ``index`` variable will grow by 1 and our @boardname@ will output: 3-0 = **3** ➡️ 3-1 = **2** ➡️ 3-2 = **1**!

```blocks
for (let index = 0; index <= 2; index++) {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    // @highlight
    basic.showNumber(3 - index)
}
```

## {Printing "GO!"}

► From ``||basic:Basic||``, grab ``||basic:show string ["Hello!"]||`` and snap it into the **very bottom** of your ``||basic:on start||`` container.  
► Replace ``Hello!`` with the word ``GO!``

```blocks
for (let index = 0; index <= 2; index++) {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    basic.showNumber(3 - index)
}
// @highlight
basic.showString("GO!")
```

## {Adding a "GO!" noise}

► From the ``||music:Music||`` category, grab ``||music:play tone [Middle C] for [1 beat] [until done]||`` and place it **above** your ``||basic:show string ["GO!"]||`` block and **below** your ``||loops:for||`` loop.  
💡 This will let your @boardname@ play the sound and show ``GO!`` at the same time.  
► Set the ``||music:tone||`` to be ``Middle G``.  
💡 ``Middle G`` is also tone ``392``.

```blocks
for (let index = 0; index <= 2; index++) {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    basic.showNumber(3 - index)
}
// @highlight
music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
basic.showString("GO!")
```

## {Testing in the simulator}

Make sure your speakers are on and check out the simulator!  

If you have a @boardname@ with sound (the one with the **shiny gold** logo at the top), no need to plug in an external speaker - just download this code and try it out!

```blocks
for (let index = 0; index <= 2; index++) {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    basic.showNumber(3 - index)
}
music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
basic.showString("GO!")
```

```validation.global
# BlocksExistValidator
```

```template
//
```