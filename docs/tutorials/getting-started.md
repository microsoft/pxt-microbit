# Getting started

## Step 1

Welcome! Place the ``||basic:show string||`` block in the ``||basic:on start||`` slot. Replace the ``"Hello"`` text with your name. Did you see it scroll?

```blocks
basic.showString("Micro!")
```

## Step 2

Connect a USB cable to the @boardname@ and click ``|Download|``. Save the program to the **@drivename@** drive. This transfers your code to the @boardname@!

## Step 3

Well, the text stopped. Place the ``||basic:show string||`` block in the ``||input:on button pressed||`` slot to scroll your name when button **A** is pressed.

```block
input.onButtonPressed(Button.A, () => {
    basic.showString("Micro!")
});
```

## Step 4

Click ``|Download|`` to save and transfer your code again, then press button **A** to scroll your text.

## Step 5

Place some blocks to display a smiley when button **B** is pressed.

###   

Use the dropdown to find ``B``!

```block
input.onButtonPressed(Button.B, () => {
    basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # . . . #
    . # # # .
    `)
})
```

## Step 6

Place the ``||basic:show number||`` and ``||Math:pick random||`` blocks
in an ``||input:on shake||`` slot to build a dice.

###   

When the @boardname@ is shaken, a random number between ``0`` and ``6`` is displayed
on the screen.

```block
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(Math.random(7))
})
```

## Step 7

Well done! You've completed your first Microsoft MakeCode activity.

