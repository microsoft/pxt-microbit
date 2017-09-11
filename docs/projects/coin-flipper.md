# Coin Flipper

## ~avatar avatar

Are you trying to choose whether to play soccer or go to the movies
instead, or which toppings to have on your pizza?  Build a coin
flipping machine with the @boardname@ to choose for you!

## ~

## Step 1

Place a ``||input:on button pressed||`` block to run code 
when button **A** is pressed.

```blocks
input.onButtonPressed(Button.A, () => {
})
```

## Step 2

Place a **if** block and check the value returned by the ``||Math:pick random true or false||`` block.

``||Math:pick random true or false||`` returns ``true`` or ``false`` randomly.

```blocks
input.onButtonPressed(Button.A, () => {
    if (Math.randomBoolean()) {
    } else {
    }
});
```

## Step 3

Place a ``||basic:show icon||`` block under the **if** and pick one of the images.

```blocks
input.onButtonPressed(Button.A, () => {
    if (Math.randomBoolean()) {
        basic.showIcon(IconNames.Skull)
    } else {
        basic.showIcon(IconNames.Square)
    }
});
```

## Step 4

Click ``|Download|`` to transfer your code in your @boardname@ and press button **A** to try it out.

## Step 5

Place multiple ``||basic:show icon||`` blocks before the **if** to create a coin flipping animation.

```blocks
input.onButtonPressed(Button.A, () => {
    basic.showIcon(IconNames.Diamond)
    basic.showIcon(IconNames.SmallDiamond)
    basic.showIcon(IconNames.Diamond)
    basic.showIcon(IconNames.SmallDiamond)
    if (Math.randomBoolean()) {
        basic.showIcon(IconNames.Skull)
    } else {
        basic.showIcon(IconNames.Square)
    }
})
```

## Step 6

Click ``|Download|`` to transfer your code in your @boardname@ and press button **A** to try it out!
