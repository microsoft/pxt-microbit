# Pet Hamster

## {Introduction @unplugged}

![Pet hamster banner message](/static/mb/projects/pet-hamster.png)

## {Cyrus's asleep face}

Cyrus is a very sleepy hamster. In fact, Cyrus is almost always sleeping.

► From the ``||basic:Basic||`` category, find ``||basic:show icon [ ]||`` and snap it into your ``||basic:on start||`` container. Set it to show the asleep ``-_-`` face.  
💡 In the ``show icon`` dropdown menu options, you can hover to see what each design is called!

```blocks
//@highlight
basic.showIcon(IconNames.Asleep)
```

## {Giggly Cyrus}

Pressing Cyrus's logo tickles them!

► From ``||input:Input||``, find the ``||input:on logo [pressed]||`` container and drag it into your workspace.  
► Go to ``||basic:Basic||`` and grab **another** ``||basic:show icon [ ]||``. Snap it into your **empty** ``||input:on logo [pressed]||`` container. Set the icon (Cyrus's face) to happy ``:)``.

```blocks
//@highlight
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    //@highlight
    basic.showIcon(IconNames.Happy)
})
```

## {Tickle sound}

► From the ``||music:Music||`` category, get a ``||music:play melody [jump up] [in background]||`` and add it to the **bottom** of your ``||input:on logo [pressed]||`` container. Change the playback mode to ``||music:[until done]||``.

```blocks
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
    //@highlight
    music.play(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.UntilDone)
})
```

## {Dizzy Cyrus}

Whenever Cyrus is shaken, they get sad 🙁

► From ``||input:Input||``, find ``||input:on [shake]||`` and drag it into your workspace.  
► From the ``||basic:Basic||`` category, grab ``||basic:show icon [ ]||`` and snap it into your **new** ``||input:on [shake]||`` container. Set the icon (Cyrus's face) to sad ``:(``.

```blocks
//@highlight
input.onGesture(Gesture.Shake, function () {
    //@highlight
    basic.showIcon(IconNames.Sad)
})
```

## {Dizzy sound}

► From the ``||music:Music||`` category, find the ``||music:play melody [dadadum] [in background]||`` block and add it to the **bottom** of your ``||input:on [shake]||`` container. Change the playback mode to ``||music:[until done]||``.
► Click on the **dropdown** and set it so Cyrus plays a sad sound until done.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Sad)
    //@highlight
    music.play(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.UntilDone)
})
```

## {Cyrus's default face pt. 1}

Let's ensure that Cyrus will always go back to sleep after being shaken or tickled.

► Right click the ``||basic:show icon[-_-]||`` block in your workspace (inside the ``||basic:on start||`` container) and choose **Duplicate**.  
► Snap your copied block in at the **very bottom** of your ``||input:on [shake]||`` container.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Sad)
    music.play(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.UntilDone)
    //@highlight
    basic.showIcon(IconNames.Asleep)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
    music.play(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.UntilDone)
})
basic.showIcon(IconNames.Asleep)
```

## {Cyrus's default face pt. 2}

► Duplicate the ``||basic:show icon[-_-]||`` block again and this time snap it in at the **very bottom** of your ``||input:on logo [pressed]||`` container.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Sad)
    music.play(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.UntilDone)
    basic.showIcon(IconNames.Asleep)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
    music.play(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.UntilDone)
    //@highlight
    basic.showIcon(IconNames.Asleep)
})
basic.showIcon(IconNames.Asleep)
```

## {Testing in the simulator}

Check out the simulator and make sure your speakers are on 🔊

Play with Cyrus to see how they react 🐹  
**Click on the SHAKE button** to shake Cyrus.  
**Touch the gold logo at the top** to tickle Cyrus.

If you have a new @boardname@ (the one with the **shiny gold** logo at the top), download this code and try it out!

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Sad)
    music.play(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.UntilDone)
    basic.showIcon(IconNames.Asleep)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
    music.play(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.UntilDone)
    basic.showIcon(IconNames.Asleep)
})
basic.showIcon(IconNames.Asleep)
```

```validation.global
# BlocksExistValidator
```

```template
//
```