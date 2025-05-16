# Shake or Fall to Lose
### @explicitHints true

## Introduction @showdialog

Let's detect a loss when the @boardname@ shakes or drops!

![A graphic depicting a sad micro:bit after loss](/static/mb/projects/lose.png)

## {Step 2}

We 'll start by adding code to the ``||input:on shake||`` container already in the workspace.

💡 _You can also click the arrow next to ``||input:shake||`` and change the action to ``||input:free fall||`` or another event in the library._

#### ~ tutorialhint
```blocks
input.onGesture(Gesture.Shake, function() { })
```

## {Step 3}

Open the  ``||basic:Basic||`` category<br/>
and drag  ``||basic:show string ["Loss"]||``<br/>
into the empty ``||input:on shake||`` container to display a message.

#### ~ tutorialhint
```blocks
input.onGesture(Gesture.Shake, function() {
    basic.showString("Loss")
})


```

## {Step 4}

Click the little white circle in the simulator next to **SHAKE** to give your code a try.

![An image of the word SHAKE above the B button](/static/mb/projects/shake.png)


## {Step 5}

**Add some drama with music.**

Open the ``||music:Music||`` category and <br/>
drag ``||music:play [melody] [in background]||`` <br/>
into **the top** of the ``||input:on shake||`` container in the workspace.


#### ~ tutorialhint
```blocks
input.onGesture(Gesture.Shake, function() {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
    basic.showString("Loss")
})
```


## {Step 6}

**Test again by clicking ⚬SHAKE**

Your program should play a song and scroll the word "Loss".

💡 _You may need to unmute the simulator to hear your music._



## {Step 7}

If you have a @boardname@ connected, click ``|Download|`` and transfer your code.

Now you're ready to attach your @boardname@ to your project and try it out!



```blockconfig.global
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Funeral), music.PlaybackMode.InBackground)
    basic.showString("Loss")
    basic.showIcon(IconNames.Yes)
```


```template
input.onGesture(Gesture.Shake, function() {})
```

```ghost
basic.showIcon(IconNames.Yes)
input.onButtonPressed(Button.A, function () {
    music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.InBackground)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Funeral), music.PlaybackMode.InBackground)
    basic.showString("Loss")
})
```