# Coin Flipper

### @explicitHints true

## Introduction @unplugged

Let's create a coin flipping program to simulate a real coin toss. We'll use icon images to represent a ``heads`` or ``tails`` result.

![Simulating coin toss](/static/mb/projects/coin-flipper/coin-flipper.gif)

## Step 1

Add an event to run code when ``||input:button A pressed||``. We'll put our coin flipping
code in here.

```spy
input.onButtonPressed(Button.A, () => {
})
```

## Step 2

Inside the event for ``||input:button A pressed||``, put in code to check ``||logic:if||`` a ``||math:random boolean||`` value is `true` or `false`.

The ``||math:random boolean||`` value is used to determine a ``heads`` or ``tails`` result for
a coin toss.

```spy
input.onButtonPressed(Button.A, () => {
    if (Math.randomBoolean()) {
    } else {
    }
})
```

## Step 3

Now, ``||basic:show an icon||`` for a `skull` ``||logic:if||`` the ``||math:random boolean||`` value is ``true``. This means ``heads``. ``||basic:show and icon||`` of a ``square`` when ``false`` to mean
``tails``.

```spy
input.onButtonPressed(Button.A, () => {
    if (Math.randomBoolean()) {
        basic.showIcon(IconNames.Skull)
    } else {
        basic.showIcon(IconNames.Square)
    }
})
```

## Step 4

Press button **A** in the simulator to try the coin toss code.

## Step 5

You can animate the coin toss to add the feeling of suspense. ``||basic:show||`` different
icons before the check of the ``||math:random boolean||`` value to show that the
coin is flipping.

```spy
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

If you have a @boardname@, connect it to USB and click ``|Download|`` to transfer your code.

## Step 7

Press button **A** for a flip. Test your luck and guess ``heads`` or ``tails`` before the toss is over!
