# Flashing Heart

## Step 1

Place the ``||basic:show leds||`` block in the ``||basic:on start||`` block 
and draw a heart.

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`
    );
```

## Step 2

Click ``|Download|`` to transfer your code in your @boardname@!

## Step 3

Place another ``||basic:show leds||`` block under the heart to make it blink.

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`);
basic.showLeds(`
    . # . # .
    # . # . #
    # . . . #
    . # . # .
    . . # . .`);
```

## Step 4

Move the blocks inside the ``||basic:forever||`` to repeat the animation.

```block
basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`
        );
    basic.showLeds(`
        . # . # .
        # . # . #
        # . . . #
        . # . # .
        . . # . .`);
})
```

## Step 5

Click ``|Download|`` to transfer your code in your @boardname@ and watch the hearts flash!

## Step 6

Place more ``||basic:show leds||`` blocks to create your own animation.

```blocks
basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`
        );
    basic.showLeds(`
        . # . # .
        # . # . #
        # . . . #
        . # . # .
        . . # . .`);
    basic.showLeds(`
        . . . . .
        . # . # .
        . # # # .
        . . # . .
        . . . . .`);
})
```

## Step 7

Click ``|Download|`` to transfer your code in your @boardname@!
