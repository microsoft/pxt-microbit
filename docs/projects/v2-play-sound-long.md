# Dance to the Beat

## 1. Introduction @unplugged

The new micro:bits have speakers, which leaves you free to move around in ways you weren't able to before!

Let's use movement to create a beat box of your own.

![Dance beat banner message](/static/mb/projects/dance-beat.png)


## 2. Understanding Input

Let's find out what numbers the micro:bit produces when you move it around.

---

⇼ Open the ``||serial:^ Advanced||`` category to show the ``||serial:Serial||`` label.

⇼ From ``||serial:Serial||``, drag the ``||serial:serial write value ["x"] = [0]||``
block into the ``||basic:forever||`` loop container.



```blocks
basic.forever(function(){
    serial.writeValue("x", 0)
})
```



## 3. See the Console

When your code runs again, you'll see a button below the micro:bit that says
"Show console Simulator".

Click that button to see what happens.

---

The graph for the simulator should stay flat at 0
and the text in the console below should say "x:0".



## 4. Acceleration Values

For the graph to change with the speed of your movement, we need to replace the "0"
with the micro:bit **acceleration** value.

---

⇼ Open the ``||input:Input||`` category and drag ``||input:acceleration (mg) [x]||``
over to replace "0" in the ``||serial:serial write value ["x"] = [0]||``
block.

⇼ Change "x" to "a" (for "acceleration".)



```blocks
basic.forever(function(){
    serial.writeValue("a", input.acceleration(Dimension.X))
})
```



## 5. Look Again

Click the  "Show console Simulator" button again.

---

Now you should see your graph and text change between **-1023** and **1023** as you click
around on the micro:bit simulator to pretend like you're swinging it around.



## 6. Compass Values

For the graph to change with the speed of your movement, we need to replace the "0" with
the micro:bit **acceleration** value.

---

⇼ Open the ``||input:Input||`` category and drag ``||input:acceleration (mg) [x]||``
over to replace "0" in the ``||serial:serial write value ["x"] = [0]||``
block.

⇼ Change "x" to "a" (for "acceleration".)



```blocks
basic.forever(function(){
    serial.writeValue("a", input.acceleration(Dimension.X))
})
```

## Finale

👏 **YOU DID IT!** 👏

Don't forget to test your code in the simulator!

If you have a new @boardname@ (the one with the **shiny gold** logo at the top), download this code and try it out!

```blocks
basic.forever(function () {
    serial.writeValue("Accel", input.acceleration(Dimension.X))
    serial.writeValue("Compass", input.compassHeading())
    music.playSoundEffect(music.createSoundEffect(
    WaveShape.Sine,
    input.acceleration(Dimension.X),
    input.compassHeading(),
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
    serial.writeValue("Compass", input.compassHeading())
    music.playSoundEffect(music.createSoundEffect(
    WaveShape.Sine,
    input.acceleration(Dimension.X),
    input.compassHeading(),
    255,
    0,
    500,
    SoundExpressionEffect.None,
    InterpolationCurve.Linear
    ), SoundExpressionPlayMode.UntilDone)
})

```