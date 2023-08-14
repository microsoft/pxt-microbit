# Connect a Circuit to Win
### @explicitHints true


## Introduction @showdialog

Let's detect a WIN when a circuit is completed on the @boardname@!

![A graphic depicting a sad micro:bit after loss](/static/mb/projects/clap-lights.png)


## {Step 2}

We 'll start by adding code to the ``||input:on pin [P0] [pressed]||``<br/>
container already in the workspace.

💡 _You can click the arrow next to ``||input:P0||`` and change it to another pin if you prefer._

#### ~ tutorialhint
```blocks
input.onPinPressed(TouchPin.P0, function () {})
```

## {Step 3}

Open the  ``||basic:Basic||`` category<br/>
and drag  ``||basic:show string ["WIN!"]||``<br/>
into the empty ``||input:on pin [P0] [pressed]||`` container to display a message.

#### ~ tutorialhint
```blocks
input.onPinPressed(TouchPin.P0, function () {
    basic.showString("WIN!")
})


```

## {Step 4}

Click the pin marked **0** in the simulator to give your code a try.

![An image of the pin you should click on the micro:bit](/static/mb/projects/p0.png)


## {Step 5}

**Add some drama with music.**

Open the ``||music:Music||`` category and <br/>
drag ``||music:play [melody] [in background]||`` <br/>
into **the top** of the ``||input:on pin [P0] [pressed]||`` container in the workspace.


#### ~ tutorialhint
```blocks
input.onPinPressed(TouchPin.P0, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
    basic.showString("WIN!")
})
```


## {Step 6}

**Test again by clicking P0 in the simulator**

Your program should play a song and scroll the word "WIN!".

💡 _You may need to unmute the simulator to hear your music._



## {Step 7}

If you have a @boardname@ connected, click ``|Download|`` and transfer your code.

Now you're ready to attach your @boardname@ to your project and try it out!


💡 _Note that the **pin pressed** block requires the pin to be pressed **and** released before it will trigger._




```blockconfig.global
    music.play(music.builtinPlayableSoundEffect(soundExpression.soaring), music.PlaybackMode.InBackground)
    basic.showString("WIN!")
```


```template
input.onPinPressed(TouchPin.P0, function () { })
```

```ghost
basic.showIcon(IconNames.Yes)
input.onButtonPressed(Button.A, function () {
    music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.InBackground)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Funeral), music.PlaybackMode.InBackground)
    basic.showString("Loss")
})
input.onPinPressed(TouchPin.P0, function () {
    music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.InBackground)
    basic.showString("WIN!")
})
```