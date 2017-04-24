# Code 

Let's build the code that, when the user presses the button ``A`` on a @boardname@, will send an impulse over a wire to the receiving @boardname@ and turn an LED on there.

Make sure that the sending and receiving wires run symmetrically across: pin ``P1`` on one @boardname@ is connected to pin ``P2`` on the other, and vice versa, as shown on the pictures in the "Make" section. This way we can use the same code on both @boardname@s .

### Step 1

We start with a block that digitally writes **high** (value ``1``) to the sending @boardname@'s pin ``P1``. This block can be found in _Pins_ drawer of the Advanced section.

```blocks
pins.digitalWritePin(DigitalPin.P1, 1)
```

### Step 2

To show what we are sending, we add a block to turn on an LED in the centre of the LED display (2,2) using _plot x, y_ :

```blocks
pins.digitalWritePin(DigitalPin.P1, 1)
led.plot(2, 2)
```

### Step 3

Now that we know how to send the signal, we only want to be doing it while the button ``A`` is pressed. 
Pick an _if_ block from the _Logic_ drawer (you'll need the version with _else_ part that will remain empty for now). Add a check whether the button ``A`` is pressed from the _Input_ drawer and move the blocks from the previous step into _then_ part :

```blocks
if (input.buttonIsPressed(Button.A)) {
    pins.digitalWritePin(DigitalPin.P1, 1)
    led.plot(2, 2)
} else { }
```


### Step 4

For the _else_ branch (while the button A is not pressed) we want to do the opposite of what we did in the _then_ branch: take the value of pin ``P1`` to **low** (0) and unplot the corresponding LED on the sending @boardname@ :

```blocks
if (input.buttonIsPressed(Button.A)) {
    pins.digitalWritePin(DigitalPin.P1, 1)
    led.plot(2, 2)
} else {
    pins.digitalWritePin(DigitalPin.P1, 0)
    led.unplot(2, 2)
}
```

### Step 5

Let's wrap it all in a forever loop so this code runs in the background, forever checking the button ``A`` and sending the appropriate signal to the receiver.
Modify your code so that your code looks like this. Download the code into one of the @boardname@s, press and release button ``A`` a few times.

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

The sending part is done, so we are going to add the receiving part.

### Step 6

The receiver needs to digitally read from the pin to which the sending @boardname@ will be writing (``P2``) over the wire. Let's start by going to the _Pin_ drawer, adding digital read pin ``P0`` and changing the pin value to ``P2``.
Now we want to examine the value read from ``P2`` and check whether it is **high** (value ``1``) or not. Go to the _Logic_ drawer, first pick an _if_ block, then come back for a comparison operator (=). Plug in our digital read block as one operand and the value ``1`` as the other.
We shall turn the LED in the bottom right corner (4,4) on to indicate that we received **high** and turn it off otherwise.
Your code should look as follows:

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

### Step 7

* Connect the first @boardname@ to your computer using your USB cable and download the telegraph script to it.
* Connect the second @boardname@ to your computer using your USB cable and download the telegraph script to it.
* The first person and second person can take turns pressing button A on their @boardname@s to play the telegraph game!
