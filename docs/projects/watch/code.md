# Code

### ~avatar avatar

Let's make a counter for your watch to remember all the motions you make when you walk or move your arm.

### ~

## Duration: ~5 minutes

## Make a count variable

We need a variable to keep track of how many motions you make.

1. Go into **Basic** in the toolbox and pull an ``||basic:on start||`` on to the workspace.
2. Ok, in **Variables** click on `Make a Variable`. Name the variable as `motions`. Drag out a ``||variables:set to||`` block and change the name with the dropdown to `motions`. Place the variable into the ``||basic:on start||`` block.
3. Let's show that there are no motions counted yet. Get a ``||basic:show number||`` from **Basic** and put it after the variable. Now, change the `0` to the `motions` variable from the **Variables** category in the toolbox.

```blocks
let motions = 0;
motions = 0;
basic.showNumber(motions);
```

## Count your movements

Ok, now we'll count and show all of your movements.

1. Get an ``||input:on shake||`` block from **Input** and place it in the workspace.
2. To count each of your movements, get a ``||variables:change by||`` and place it in the ``||input:on shake||``. Change the variable from `item` to `motions`.
3. Grab another ``||basic:show number||`` and put it at the bottom of the ``||input:on shake||``. Find `motions` again back over in **Variables** and replace the `0` with it.

```blocks
let motions = 0;
input.onGesture(Gesture.Shake, () => {
    motions += 1;
    basic.showNumber(motions);
})
```

## Reset!

If we want to start over from zero, then we need to have a way to reset the motion count. Let's use one of the buttons to do it.

1. Go over to **Input** and get an ``||input:on button pressed||``. Place a ``||variables:set to||`` inside. Change the variable name to `motions`.
2. Grab another ``||basic:show number||`` and change the `0` to the a `motions` variable.

```blocks
let motions = 0;
input.onButtonPressed(Button.A, () => {
    motions = 0;
    basic.showNumber(motions);
})
```

## Finished!

Yeah! You're ready to count your movements. Press the ``|Download|`` button to move the code to the @boardname@. Walk around, move you arm, and watch it count! Press the **A** button if you want to start over.

## More watch coding projects

Are you up for a bigger challenge? How about making your watch turn into a countdown timer or even a real digital watch? Take a look at some other coding projects for the @boardname@ watch:

* [Countdown timer](/projects/watch/timer)
* [Digital watch](/projects/watch/digital-watch)