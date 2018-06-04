# Crocodile clips

The large holes at the bottom of the board are designed to attach alligator/crocodile clips 
to create electrical circuit with other components.

# ~hint

**No crocodile clips!?!?!** Use [wires or aluminium foil](/device/foil-circuits)!

# ~


## Connecting crocodile clips

The hole for ``P0`` and ``GND`` allow to grab the board on the side which makes for a great grip.

![](/static/mb/device/croc-clips/crocclipsclamped.jpg)

Pass one jaw in the hole and grab the side of the board with the other jaw.

![](/static/mb/device/croc-clips/sideclamp.jpg)

For the center holes, ``P1`` and ``P2``, you can also grab the bottom of the board but they are a bit harder to grip.

You can also grip the board between the jaws. In which case, you will want to make sure to avoid overlapping the jaws 
with the other pins as it will create short-circuit in the board.

![](/static/mb/device/croc-clips/badclamp.jpg)

Adding a little tape helps keeping the crocodile clips in place.

![](/static/mb/device/croc-clips/frontclamp.jpg)

## Example: on pin pressed with random numbers

This example displays a random number every time the crocodile clip holds  `GND` then connects and disconnects the `P0` pin. 
Each time the crocodile clip is firmly connected and disconnected from pin `P0`, 
the @boardname@ will return a random Number between 0 and the parameter limit.

```blocks
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(Math.randomRange(0, 10))
})
```

## See also

[micro:bit pins](/device/pins)
