# Magnetic Force

Find the amount of magnetic force (the strength of a magnet) in the direction you say.

```sig
input.magneticForce(Dimension.X);
```

## ~hint

The @boardname@ measures magnetic force with **microteslas**.

## ~


## Parameters

* ``dimension`` means which direction the @boardname@ should measure
  magnetic force in: either `Dimension.X` (the left-right direction),
  `Dimension.Y` (the forward/backward direction), or `Dimension.Z`
  (the up/down direction)

## Returns

* a [number](/types/number) of microteslas that means the strength of the magnet

## Example: metal detector

This program makes the center LED of the @boardname@ get brighter when
the magnetic force is stronger, and dimmer when it is weaker.

```blocks
led.plot(2, 2)
basic.forever(() => {
    let f = input.magneticForce(Dimension.X)
    led.setBrightness(f / 2000)
})
```

## See also

[compass heading](/reference/input/compass-heading)
