# Code

## ~avatar avatar

Have you ever tried to making beat box sounds based on the light level? Let's try making a beatbox with code!

## ~

Let's start by playing music when the **A** button is pressed. To do that, register an event handler that will execute whenever you click on the **A** button. Open the ``||input:Input||`` drawer and get out an ``||input:on button A pressed||`` block. Next, add a ``||music:rest||`` to play nothing for `1/16` of a beat.

```blocks
input.onButtonPressed(Button.A, function () {
    music.rest(music.beat(BeatFraction.Sixteenth))
});
```

We also want to add a variable where you can store data. Name the variable ``light`` and ``||variables:set||`` the value of the variable to the  ``||input:light level||`` block from the ``||input:Input||`` drawer. This will get the light level as some value between `0` (dark) and `255` (bright). The light is measured by using various LEDs from the screen. Your code will look like this:

```blocks
input.onButtonPressed(Button.A, function () {
    music.rest(music.beat(BeatFraction.Sixteenth))
    let light = input.lightLevel()
});
```

Click on the ``||logic:Logic||`` drawer and find an ``||logic:if||`` block to use so that some of your code will run conditionally depending on whether a [Boolean](/types/boolean) condition is either `true` or `false`. Go get the ``||logic:0 < 0||`` comparison block an put it in as the condition for the ``||logic:if||``. Then insert the variable ``||variables:light||`` into the part of the inequality where the first `0` is. You'll find the variable ``||variables:light||`` in the ``||variables:Variables||`` drawer. Finally, insert `25` in the second part of the comparison instead of `0`. Modify your code so that it checks the light level like this:

* If ``||logic:light < 25||``, play ``||music:ring tone||`` for ``Middle C``
* If this condition is not `true`, play ``||music:ring tone||`` for ``Middle A``

```blocks
input.onButtonPressed(Button.A, function () {
    music.rest(music.beat(BeatFraction.Sixteenth))
    let light = input.lightLevel()
    if (light < 25) {
        music.ringTone(music.noteFrequency(Note.C))
    }
    else {
        music.ringTone(music.noteFrequency(Note.A))
    }
});
```

Now, we want to add more conditional statements by clicking on the **(+)** at the bottom of the `if`. Add **5**  ``||logic:else if||`` and **1** final ``||logic:else||`` inside the ``||logic:if||`` block structure. Set the comparison blocks inside the new conditionals as:

* If ``||logic:light < 50||``, play ``||music:ring tone||`` ``Middle D``
* If ``||logic:light < 100||``, play ``||music:ring tone||`` ``Middle E``
* If ``||logic:light < 150||``, play ``||music:ring tone||`` ``Middle F``
* If ``||logic:light < 180||``, play ``||music:ring tone||`` ``Middle G``
* If these conditions are not true, play ``||music:ring tone||`` ``Middle A``

```blocks
input.onButtonPressed(Button.A, function () {
    music.rest(music.beat(BeatFraction.Sixteenth))
    let light = input.lightLevel()
    if (light < 25) {
        music.ringTone(music.noteFrequency(Note.C))
    }
    else if (light < 50) {
        music.ringTone(music.noteFrequency(Note.D))
    }
    else if (light < 100) {
        music.ringTone(music.noteFrequency(Note.E))
    }
    else if (light < 150) {
        music.ringTone(music.noteFrequency(Note.F))
    }
    else if (light < 180) {
        music.ringTone(music.noteFrequency(Note.G))
    }
    else {
        music.ringTone(music.noteFrequency(Note.A))
    }
});
```

Alright, now click **Download** and run your code on the @boardname@!
