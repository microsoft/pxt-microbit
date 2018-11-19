# Code 

Let's build the code that, when the user presses the button **A** on a @boardname@, will send an impulse over a wire to the receiving @boardname@ and turn on an LED there.

Make sure that the sending and receiving wires run "symmetrically" between the two boards. That is: pin **1** on one @boardname@ is connected to pin **2** on the other, and vice versa. Just like it's shown in the pictures in the **[make](./make)** section. This way we can use the same code on both @boardname@s .

## Step 1

We start with a block that digitally writes **high** value (a digital ``1``) to ``P1`` which sends the value to @boardname@'s pin **1**. This block is found in **Pins** drawer of the Advanced section of the Toolbox.

```blocks
pins.digitalWritePin(DigitalPin.P1, 1)
```

## Step 2

To show that we are sending the ``1``, we add a block to turn on an LED in the center of the LED display (2, 2) using ``||led:plot x y||``:

```blocks
pins.digitalWritePin(DigitalPin.P1, 1)
led.plot(2, 2)
```

## Step 3

Now that we know how to send the signal, we only want to do it while the button **A** is pressed. 
Pick an ``||logic:if then else||`` block from the **Logic** drawer (you'll leave the ``||logic:else||`` part empty for now). Add a check for when button **A** is pressed. Get an ``||input:on button pressed||`` from the **Input** drawer and move the blocks from the previous step into ``||logic:then||`` part of the ``||logic:if then else||``:

```blocks
if (input.buttonIsPressed(Button.A)) {
    pins.digitalWritePin(DigitalPin.P1, 1)
    led.plot(2, 2)
} else { }
```


## Step 4

For the ``||logic:else||`` section (while button **A** is not pressed) we want to do the opposite of what we did in the ``|logic:then||`` section. Which is, make the value of pin ``P1`` go to **low** (digital 0) and unplot the corresponding LED on the sending @boardname@:

```blocks
if (input.buttonIsPressed(Button.A)) {
    pins.digitalWritePin(DigitalPin.P1, 1)
    led.plot(2, 2)
} else {
    pins.digitalWritePin(DigitalPin.P1, 0)
    led.unplot(2, 2)
}
```

## Step 5

Let's wrap it all in a forever loop so this code is running in the background always checking button **A** and sending the appropriate signal to the receiver.
Modify your code to add the blocks below. Download the code onto one of the @boardname@s, press and release button **A** a few times.

```blocks
basic.forever(() => {
    if (input.buttonIsPressed(Button.A)) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        led.plot(2, 2)
    } else {
        pins.digitalWritePin(DigitalPin.P1, 0)
        led.unplot(2, 2)
    }
})
```

The sending part is done, so now we'll add the receiving part.

## Step 6

The receiver needs to digitally read from the pin where the other @boardname@ sends its value to pin **2** across the wire. Let's start by going to the **Pins** drawer, adding a ``||pins:digital read pin||`` and change the pin value to ``P2``.

Now, we want to examine the value read from ``P2`` and check whether it's **high** (``1``) or **low** (``0``). Go to the **Logic** drawer and pick an ``||logic:if then else||`` block, then come back for the comparison operator ``||logic:0 = 0||``. Plug in our ``||pins:digital read pin||`` block as one operand and the value ``1`` as the other.

We'll turn the LED in the bottom right corner (4, 4) on to show that we received a **high** value and turn it off in not.

Make sure your code looks like this:

```blocks
basic.forever(() => {
    if (input.buttonIsPressed(Button.A)) {
        pins.digitalWritePin(DigitalPin.P1, 1);
        led.plot(2, 2);
    } else {
        pins.digitalWritePin(DigitalPin.P1, 0);
        basic.clearScreen();
    }
    if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        led.plot(4, 4);
    } else {
        led.unplot(4, 4);
    }
});
```

Your telegraph is ready!

## Step 7

Ok, let's try it out:

1. Connect the first @boardname@ to your computer using your USB cable and download the telegraph code to it.
2. Disconnect the first @boardname@.
3. Connect the second @boardname@ to your computer using your USB cable and download the telegraph code to it.
4. Disconnect the second @boardname@.
5. Connect the battery holder to one of the @boardname@s.
6. The first person, and then second person, can take turns pressing button **A** on their own @boardname@s to play the telegraph game!
