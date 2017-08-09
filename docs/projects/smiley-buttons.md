# smiley buttons

### ~avatar

Use buttons to show a smiley face! 

### ~

## Step 1

Use [show leds](/reference/basic/show-leds) to make a smiley face:

```blocks
basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # . . . #
    . # # # .`
    );
```

## Step 2

Add an input block for when [button A is pressed](/reference/input/button-is-pressed), 
and **move** the smiley face inside it:

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

Try pressing button A!

## Step 3

Add blocks so that when [button B is pressed](/reference/input/on-button-pressed), 
a frowney appears:

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

Try pressing ``A`` or ``B``!

## Step 4

You can also have a secret mode where ``A`` and ``B`` are pressed together. 
In that case, add multiple ``||basic:show leds||`` blocks to create an animation...

```blocks
input.onButtonPressed(Button.AB, () => {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # # # # #
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        # . . . #
        `)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # # # # #
        . . . # #
        `)
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

## Send your smileys over radio

Do you have a second @boardname@ at hand? You could use radio and send your smileys or frownies to other
@boardname@.

Since radio can send numbers, we decide that ``0`` is the code for displaying a smiley 
and ``1`` is the code for a frowney.

Change your code as follows: 
* [radio send number](/reference/radio/send-number) sends a number
to any other @boardname@ in range
* [radio on data packet received](/reference/radio/on-data-packet-received) runs code
when data is received over radio

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0)
})
input.onButtonPressed(Button.B, () => {
    radio.sendNumber(1)
})
radio.onDataPacketReceived(({receivedNumber}) => {
    if (receivedNumber == 0) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            # . . . #
            . # # # .
            `)
    } else {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            . # # # .
            # . . . #
            `)
    }
})
```

```package
radio
```
