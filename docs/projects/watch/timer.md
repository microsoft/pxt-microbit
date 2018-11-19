# Countdown Timer

### ~avatar avatar

Let's make a countdown timer and see the seconds tick by on your @boardname@ watch.

### ~

## Duration: ~10 minutes

## Make the time variable

We need a variable to keep track of how many seconds are left on the watch.

1. Go into **Basic** in the toolbox and pull an ``||basic:on start||`` on to the workspace.
2. Ok, in **Variables** click on `Make a Variable`. Name the variable as `seconds`. Drag out a ``||variables:set to||`` block and change the name with the dropdown to `seconds`. Place the variable into the ``||basic:on start||`` block.

```blocks
let seconds = 0
```

## Set the time with buttons
There has to be a way to set the time on your watch. We'll use the buttons to set the amount of time by adding both 10 seconds and single seconds. We'll use one button for adding `10` seconds and another button for adding just `1` second.

### Set seconds by ten

We'll use button `A` to add `10` seconds to our time count. The time count of `seconds` will increase by `10` each time the button is pressed.

1. In **Input**, find an ``||input:on button pressed||`` an put it somewhere on the workspace.
2. Get an ``||logic:if then||`` block from **Logic** and put it in the ``||input:on button pressed||``.
3. From the same **Logic** category, get a ``||logic:0 < 0||`` and replace the `false` condition with it.
4. Change the left `0` in the condition to the `seconds` variable. Change `0` on the right to `50`. This limits time to just one minute.
5. In the ``||logic:then||`` section, put a ``||variables:change by||`` there. Select the `seconds` variable name from the dropdown and change the `0` on the right to `10`.
6. Add a ``||basic:show number||`` below the ``||variables:change by||``. Change the value to the `seconds` variable. Then, put a ``||basic:clear screen||`` under that.

```blocks
let seconds = 0;
input.onButtonPressed(Button.A, () => {
    if (seconds < 50) {
        seconds += 10;
        basic.showNumber(seconds)
        basic.clearScreen()
    }
})
```

### Set seconds by one

Now, we'll use the `B` button to add just `1` second the time count. The time count in `seconds` will only increase by `1` when this button is pressed.

1. In **Input**, find an ``||input:on button pressed||`` an put it somewhere on the workspace.
2. Get an ``||logic:if then||`` block from **Logic** and put it in the ``||input:on button pressed||``.
3. From the same **Logic** category, get a ``||logic:0 < 0||`` and replace the `false` condition with it.
4. Change the left `0` in the condition to the `seconds` variable. Change `0` on the right to `60`. Again, this limits the time to just one minute.
5. In the ``||logic:then||`` section, put a ``||variables:change by||`` there. Select the `seconds` variable name from the dropdown.
6. Add a ``||basic:show number||`` below the ``||variables:change by||``. Change the value to the `seconds` variable. Then, put a ``||basic:clear screen||`` under that.

```blocks
let seconds = 0;
input.onButtonPressed(Button.B, () => {
    if (seconds < 60) {
        seconds += 1;
        basic.showNumber(seconds)
        basic.clearScreen()
    }
})
```

## Shake off the time

Ok, now we'll get the timer going and show how many seconds are left. This will happen when the watch is shaken!

1. Get an ``||input:on shake||`` block and place it in the workspace.
2. Pull out a ``||loops:while||`` from **Loops**  and put it in the ``||input:on shake||``. Replace the `true` condition with the ``||logic:0 < 0||`` conditon from **Logic**. Make the `<` go to `>`. Change the `0` on the left to the `seconds` variable.
3. Take out another ``||basic:show number||`` and put it inside the ``||loops:while||``. Change the `0` to the `seconds` variable. Put a ``||basic:pause||`` under that and set the time to `1000` milliseconds. This means our timer will count down by **1000** milliseconds, which is actually one second, each time through the loop.
4. To change the number of seconds left, get a ``||variables:change by||`` and place it below the ``||loops:pause||``. Find the ``||math:0 - 0||`` block in **Math** and put it in the ``||variables:change by||``. Set the `0` on the right of the minus to be a `1`.

```blocks
let seconds = 0;
input.onGesture(Gesture.Shake, () => {
    while (seconds > 0) {
        basic.showNumber(seconds);
        basic.pause(1000);
        seconds -= 1;
    }
})
```
## Be alarming!

Add a few ``||basic:show icon||`` blocks at the bottom of the ``||loops:while||`` to make an alarm to show that the time is up! We have some diamonds and the 'X' symbol for ours right now.

```blocks
let seconds = 0;
input.onGesture(Gesture.Shake, () => {
    while (seconds > 0) {
        basic.showNumber(seconds);
        basic.pause(1000);
        seconds -= 1;
    }
    basic.showIcon(IconNames.Diamond)
    basic.showIcon(IconNames.SmallDiamond)
    basic.showIcon(IconNames.No)
})
```

## All Done!

Nice! You've got your timer coded now. Go press the ``|Download|`` button and put your code on the @boardname@. When you shake it, it counts down from the time you have set.

At first, there are zero seconds set. To add ten seconds to the count, press the **A** button. To increase the count by one second, press the **B** button.
