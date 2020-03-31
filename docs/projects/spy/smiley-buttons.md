# Smiley Buttons

## Introduction @unplugged

Code the buttons on the @boardname@ to show that it's happy or sad.
(Want to learn how the buttons works? [Watch this video](https://youtu.be/t_Qujjd_38o)).

![Pressing the A and B buttons](/static/mb/projects/smiley-buttons/sim.gif)

## Step 1 @fullscreen

Put in an ``||input:on button pressed||`` event to run code when button **A** is pressed.

```blocks
input.onButtonPressed(Button.A, function() { 
});
```

## Step 2

Place ``||basic:show leds||`` inside ``||input:on button pressed||`` to display a **:)** on the screen. Press the **A** button in the simulator to see the smiley.

```blocks
input.onButtonPressed(Button.A, function() { 
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

Place ``||input:on button pressed||`` and ``||basic:show leds||`` to display a **:(** when button **B** is pressed.

```blocks
input.onButtonPressed(Button.B, function() { 
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        . # # # .
        # . . . #`
        );
});
```

## Step 4

Add a secret mode that happens when **A** and **B** are pressed together. For this case, add multiple ``||basic:show leds||`` blocks to create an animation.

```blocks
input.onButtonPressed(Button.AB, function() {
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

## Step 5

Click ``|Download|`` to transfer your code to your @boardname@ (if you have one). Try buttons **A**, **B** and then **A** and **B** together.

## Step 6 @fullscreen

If you have a @boardname@ connected, click ``|Download|`` and transfer your code to the @boardname@!