# Add Points with Buttons
### @explicitHints true


## Introduction @showdialog

Let's add a point to your score when a button is pressed on the @boardname@!

![A graphic depicting someone pressing a button](/static/mb/projects/points.png)


## {Step 2}

We 'll start by adding code to the ``||input:on button pressed||``<br/>
container already in the workspace.

💡 _You can click the arrow next to ``||input:A||`` and change to another button if you prefer._

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function() { })
```

## {Step 3}

Open the  ``||variables:Variables||`` category<br/>
and drag  ``||variables:change [score] by [1]||``<br/>
into the empty ``||input:on button [A] [pressed]||``.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function() {
    score += 1
    })
```

## {Step 4}

Update the LEDs after you change the score by opening the <br/>
``||basic:Basic||`` category and dragging ``||basic:show number [score]||``<br/>
into **the end** of the ``||input:on button [A] [pressed]||`` container already in the workspace.

#### ~ tutorialhint
```blocks
pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    score += 1
    basic.showNumber(score)
})
```


## {Step 4}

Click the A button in the simulator to give your code a try.

You should see the score go up each time the button is pressed.


## {Step 5}

**Add sound effects.**

Open the ``||music:Music||`` category and <br/>
drag ``||music:play [〰️] [in background]||`` <br/>
into **the end** of the ``||input:on button [A] [pressed]||`` container in the workspace.


#### ~ tutorialhint
```blocks
pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    score += 1
    basic.showNumber(score)
    music._playDefaultBackground(music.createSoundExpression(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
})
```


## {Step 6}

**Test again by pressing A**

Your program should play a sound and increase your points with each click.

💡 _You may need to unmute the simulator to hear your music._



## {Step 7}

If you have a @boardname@ connected, click ``|Download|`` and transfer your code.

Now you're ready to attach your @boardname@ to your project and try it out!



```blockconfig.global
    music._playDefaultBackground(music.createSoundExpression(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    basic.showNumber(score)
```


```template
input.onButtonPressed(Button.A, function() {})

let score = 0
score = 0
basic.showNumber(score)
```

```ghost
basic.showIcon(IconNames.Yes)
    score += 1


let score = 0
basic.showNumber(score)

```