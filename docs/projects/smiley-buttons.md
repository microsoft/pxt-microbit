# Smiley Buttons

## Step 1

Place a ``||input:on button pressed||`` block to run code when button **A** is pressed.

```blocks
input.onButtonPressed(Button.A, () => { 
});
```

## Step 2

Place a ``||basic:show leds||`` block inside ``||input:on button pressed||``
to display a smiley on the screen.

```blocks
input.onButtonPressed(Button.A, () => { 
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        # . . . #
        . # # # .`
        );
});
```

## Step 3

Click ``|Download|`` to transfer your code in your @boardname@ and try pressing button **A**.

## Step 4

Add ``||input:on button pressed||`` and ``||basic:show leds||`` blocks to
display a frowney when button **B** is pressed.

```blocks
input.onButtonPressed(Button.B, () => { 
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        . # # # .
        # . . . #`
        );
});
```

## Step 5

Click ``|Download|`` to transfer your code in your @boardname@ and try pressing button A or B.

## Step 6

Add a secret mode where ``A`` and ``B`` are pressed together. 
In that case, add multiple ``||basic:show leds||`` blocks to create an animation...

```blocks
input.onButtonPressed(Button.AB, () => {
    basic.showLeds(`
        . . . . .
        # . # . .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . . # . #
        . . . . .
        # . . . #
        . # # # .
        `)    
})
```

## Step 7

Click ``|Download|`` to transfer your code in your @boardname@ 
and show it off to your friends!

