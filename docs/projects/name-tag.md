# Name Tag

## Step 1 @fullscreen

Place the ``||basic:show string||`` block in the ``||basic:on start||`` block. Change the text to your name.

```blocks
basic.forever(() => {
    basic.showString("MICRO");
});
```

## Step 2

Look at the simulator and make sure it shows up your name on the screen.

## Step 3 @fullscreen

Place more ``||basic:show leds||`` or ``||basic:show string||`` blocks to create your own animation.

```blocks
basic.forever(() => {
    basic.showString("MICRO");
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`
        );
    basic.showString("<3<3<3");
})
```

## Step 4 @unplugged

If you have a @boardname@ connected, click ``|Download|`` to transfer your code and watch your name scroll!
