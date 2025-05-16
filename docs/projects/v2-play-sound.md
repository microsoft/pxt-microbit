# Dance to the Beat

## Introduction @unplugged

The new micro:bit has speakers so you can hear sounds without being tied down!

Let's use movement to create an electronic beat of our own.

![Dance beat banner message](/static/mb/projects/dance-beat.png)


## Add Play Sound Block

To start your electronic beat, you'll want to repeat a sound forever.

---

⇼ Open the ``||music:Music||`` category and drag the ``||music:play sound [♫ ∿∿∿∿ +] [until done]||``
block into the empty ``||basic:forever||`` loop container.



```blocks
basic.forever(function(){
    music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
})
```



## Listen Close

When your code runs again, you should hear a short laser/alarm
sound that repeats over and over forever.

---

💡 _You can press the stop button (_⏹️_) beneath the simulator to prevent the noise from bothering you while you're coding._





## Make a Change

For the sound to change with your speed of movement, we need to put the
micro:bit **acceleration** value in the sound block.

---

⇼ On the ``||music:play sound [♫ ∿∿∿ +] [until done]||`` block, click the plus icon (**+**)
to show the start frequency value of 5000.

⇼ From the ``||input:Input||`` category, drag the ``||input:acceleration (mg) [x]||``
value block to replace **5000**.


```blocks
basic.forever(function(){
    music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, input.acceleration(Dimension.X), 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
})
```



## Listen Again

Run your code again.

---

This time, hover around above the micro:bit to simulate swinging it from side to side.
You should hear the sound change as the micro:bit moves.



## Rotation Values

You can make the beat even more fun by changing the end frequency as the micro:bit rotates.

---

⇼ From the ``||input:...more||`` category, drag the ``||input:rotation (°) [pitch]||``
value block to replace the frequency **0**.


```blocks
basic.forever(function(){
    music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, input.acceleration(Dimension.X), input.rotation(Rotation.Pitch), 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
})
```



## Listen Again

Run your code again.


This time, roll over the micro:bit in all directions to simulate turning it while you
swing it around.

---

You should hear the sound change from high to low and low to high.

Try moving the micro:bit in different ways. Can you make a fun beat?



## Customize Your Beat

Try changing the **duration** of the beat to something other than **500**. <br/>
Then, change the dropdown selection inside both the **acceleration** and **rotation**
blocks.

What else can you click on to edit your sound?




## Finale

👏 **YOU DID IT!** 👏

Imagine how exciting this project will be when it's loaded on a micro:bit!

If you have a micro:bit v2 (the one with the **shiny gold** logo at the top),
download this code and hold your micro:bit while you dance.

Congratulations, you are your own DJ!



```blocks
basic.forever(function () {
    music.playSoundEffect(music.createSoundEffect(
    WaveShape.Sine,
    input.acceleration(Dimension.X),
    input.rotation(Rotation.Pitch),
    255,
    0,
    500,
    SoundExpressionEffect.None,
    InterpolationCurve.Linear
    ), SoundExpressionPlayMode.UntilDone)
})
```

```ghost

basic.forever(function () {
    serial.writeValue("Accel", input.acceleration(Dimension.X))
    serial.writeValue("Rotation", input.rotation(Rotation.Pitch),)
    music.playSoundEffect(music.createSoundEffect(
    WaveShape.Sine,
    input.acceleration(Dimension.X),
    input.rotation(Rotation.Pitch),
    255,
    0,
    500,
    SoundExpressionEffect.None,
    InterpolationCurve.Linear
    ), SoundExpressionPlayMode.UntilDone)
})

```