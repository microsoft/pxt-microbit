# Button A and button B

### ~avatar avatar

Buttons are great to build games!

### ~

This program will show the word **ANTEATER** on the LED
screen when you press button `A`.

```blocks
input.onButtonPressed(Button.A, () => {
    basic.showString("ANTEATER");
});
```

#### ~hint

The `[basic.showString("HI")]` block can show letters, numbers, and punctuation
on the @boardname@ screen.

#### ~

Now try to unscramble these blocks in the editor so that the @boardname@
shows **BANANA** when you press button `B`.

```shuffle
input.onButtonPressed(Button.B, () => {
    basic.showString("BANANA");
});
```
#### ~hint

You can find the letter `B` by clicking the letter `A` on the
`[input.onButtonPressed(Button.A, () => {})]` block.

#### ~

Click **Download** to move your program to the @boardname@!

#### Your turn!

Can you combine these blocks so your program shows your real name
instead of **ANTEATER** when you press `A`, but _your secret agent
name_ instead of **BANANA** when you press `B`?

### Pins

You can also use the pins as buttons.  (The pins are the holes in the
metal stripe at the bottom of the @boardname@ board.)  For example, hold
the ``GND`` button with one hand and touch the ``0`` pin (called
``P0``) with your other hand to tell the @boardname@ you're pressing it.

Unscramble the blocks in the editor to show a heart when you touch
pin ``P0``.

```shuffle
input.onPinPressed(TouchPin.P0, () => {
    basic.showLeds(`
. # . # .
# . # . #
# . . . #
. # . # .
. . # . .`);
});
```
Click **Download** to move your program to the @boardname@!

## ~hint

Try this experiment: find a friend and hold hands. Touch the ``GND``
pin while your friend presses the ``P0`` pin. You should see the
heart! The electric current is going through your bodies and across
your handshake to make it happen!

## ~

### ~button /getting-started/shake
NEXT: SHAKE
### ~