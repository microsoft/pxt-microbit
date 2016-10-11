# smiley buttons

![](/static/mb/projects/a2-buttons.png)

Use buttons to show a smiley or frowny face. 

## Step 1

Use [show leds](/reference/basic/show-leds) to make a smiley face:

```blocks
basic.showLeds(`
. # . # .
. # . # .
. . . . .
# . . . #
. # # # .`);
```

## Step 2

Add an input block for when [button A is pressed](/reference/input/button-is-pressed), and put a
frowny face inside it:

```blocks
basic.showLeds(`
. # . # .
. # . # .
. . . . .
# . . . #
. # # # .`);
input.onButtonPressed(Button.A, () => { 
    basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    . # # # .
    # . . . #`);
});
```

## Step 3

Now add blocks so that when [button B is pressed](/reference/input/button-is-pressed), a smiley appears:

```blocks
basic.showLeds(`
. # . # .
. # . # .
. . . . .
# . . . #
. # # # .`);
input.onButtonPressed(Button.A, () => { 
    basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    . # # # .
    # . . . #`);
});
input.onButtonPressed(Button.B, () => { 
    basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .`);
});
```
