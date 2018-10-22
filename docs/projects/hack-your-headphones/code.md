# Code

## ~avatar avatar

Have you ever tried to making beat box sounds based on the light level? Let's try making a beatbox with code!

## ~

Let's start by adding a variable where you can store data. Then rename the variable to "light". Then set the value of the variable to the block `light level` from the Input drawer. This will gets the `light level` from 0 (dark) to 255 (bright). The light is measured by using various LEDs from the screen. Modify your code so that your code looks like this.


```blocks
input.onButtonPressed(Button.A, () => {
    let light = input.lightLevel();
});
```

We want to play music on button pressed in order to register an event handler that will execute whenever when you run a script and click on button pressed on the simulator. We must start by opening the Input drawer and adding `on button pressed` A. Then add a block `rest` to plays nothing for a `1/16` beat. Modify your code so that your code looks like this.


```blocks
input.onButtonPressed(Button.A, () => {
    music.rest(music.beat(BeatFraction.Sixteenth));
    let light = input.lightLevel();
});
```

We click on the Logic drawer then insert a `if do` that will conditionally run code depending on whether the Boolean condition is true or false. Then insert the variable `light` into the first part of the inequality. The variable "light" will appear in the Variables drawer. Finally, we insert 25. Modify your code so that your code looks like this. If the `light level` is `less than` 25, play `ring tone` `C`. If this conditions is not true, play `ring tone` `A`.

```blocks
input.onButtonPressed(Button.A, () => {
    music.rest(music.beat(BeatFraction.Sixteenth));
    let light = input.lightLevel();
    if (light < 25) {
        music.ringTone(music.noteFrequency(Note.C));
    }
    else {
        music.ringTone(music.noteFrequency(Note.A));
    }
});
```

We click on the Logic drawer then insert a `less than` sign into the first `if` conditional that will conditionally run code depending on whether the Boolean condition is true or false. Continue this logic to continue with these conditional statements. Click on the Logic drawer. Then we want to add additional conditional statements by clicking on the gear to the left of the `if`. Add 05  `else if` and 01 `else` inside the `if do` block structure.  If the `light level` is `less than` 50, play `ring tone` ``D``. If the `light level` is `less than` 100, play `ring tone` ``E``. If the `light level` is `less than` 150, play `ring tone` ``F`` If the `light level` is `less than` 180, play `ring tone` ``G``. If these conditions are not true, `ring tone` ``A``.

```blocks
input.onButtonPressed(Button.A, () => {
    music.rest(music.beat(BeatFraction.Sixteenth));
    let light = input.lightLevel();
    if (light < 25) {
        music.ringTone(music.noteFrequency(Note.C));
    }
    else if (light < 50) {
        music.ringTone(music.noteFrequency(Note.D));
    }
    else if (light < 100) {
        music.ringTone(music.noteFrequency(Note.E));
    }
    else if (light < 150) {
        music.ringTone(music.noteFrequency(Note.F));
    }
    else if (light < 180) {
        music.ringTone(music.noteFrequency(Note.G));
    }
    else {
        music.ringTone(music.noteFrequency(Note.A));
    }
});
```

* click **Download** and run your code on the @boardname@.
