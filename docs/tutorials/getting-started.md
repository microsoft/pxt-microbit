# Getting started

### Step 1

Welcome! Place the ``||basic:show string||`` block in the ``||basic:on start||`` slot to scroll your name.

```blocks
basic.showString("Micro!")
```

### Step 2

Click ``|Download|`` to transfer your code in your @boardname@!

### Step 3

The text stopped. Place the ``||basic:show string||`` block in the ``||input:on button pressed||``
slot to scroll your name when button **A** is pressed.

```block
input.onButtonPressed(Button.A, () => {
    basic.showString("Micro!")
});
```

### Step 4

Click ``|Download|`` to transfer your code
then press button **A** to scroll your text.

### Step 5

Place blocks to display a smiley when button **B** is pressed.

####   

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

### Step 6

Place the ``||basic:show number||`` and ``||Math:pick random||`` blocks
in the ``||input:on shake||`` slot to build a dice.

####   

When the @boardname@ is shaken, the random number between ``0`` and ``6`` will be displayed
on the scren.

```block
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(Math.random(7))
})
```

### Step 7

Well done! You have completed this activity.