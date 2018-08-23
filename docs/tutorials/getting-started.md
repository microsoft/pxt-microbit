# Getting Started

## Step 1

Welcome! Place the ``||basic:show string||`` block in the ``||basic:on start||`` slot. Replace the ``"Hello"`` text with your name. Did you see it scroll in the simulator?

```blocks
basic.showString("Micro!")
```

## Step 2

Well, the text stopped scrolling. Place the ``||basic:show string||`` block in the ``||input:on button pressed||`` slot to scroll your name when button **A** is pressed.

```blocks
input.onButtonPressed(Button.A, () => {
    basic.showString("Micro!")
});
```

## Step 3

Place some blocks to display a smiley when button **B** is pressed.

Use the dropdown to find ``B``!

```blocks
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

## Step 4

Place the ``||basic:show number||`` and ``||Math:pick random||`` blocks in an ``||input:on shake||`` block to build a dice.

```blocks
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(Math.randomRange(0, 10))
})
```

## Step 5

A typical dice shows values from `1` to `6`. So, in ``||Math:pick random||``, don't forget to choose the right minimum and maximum values!

```blocks
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(Math.randomRange(1, 6))
})
```

## Step 6

If you have a @boardname@, connect a USB cable to it and click ``|Download|``. Save the program to the **@drivename@** drive. This transfers your code to the @boardname@!

## Step 7

On the @boardname@, press button **A** to scroll your text. Press button **B** to show a smiley. Shake the @boardname@ and see which number is chosen.

## Step 8

Well done! You've completed your first Microsoft MakeCode activity.
