# Getting started

## Step 1

Welcome! Place the ``||basic:show string||`` block in the ``||basic:on start||`` slot. Replace the ``"Hello"`` text with your name. Did you see it scroll in the simulator?

```blocks
basic.showString("Micro!")
```

## Step 2

Well, the text stopped. Place the ``||basic:show string||`` block in the ``||input:on button pressed||`` slot to scroll your name when button **A** is pressed.

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

Place the ``||basic:show number||`` and ``||Math:pick random||`` blocks in an ``||input:on shake||`` slot to build a dice. A typical dice can show values from 1 to 6, so don't forget to choose the right minimum and maximum values!

When the @boardname@ is shaken, a random number between ``1`` and ``6`` is displayed on the screen.

```blocks
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(Math.randomRange(1, 6))
})
```

## Step 5

If you have a @boardname@, connect a USB cable it and click ``|Download|``. Save the program to the **@drivename@** drive. This transfers your code to the @boardname@!

## Step 6

On the @boardname@, press button **A** to scroll your text. Press button **B** to show a smiley. Shake the @boardname@ and see which number is chosen.

## Step 7

Well done! You've completed your first Microsoft MakeCode activity.
