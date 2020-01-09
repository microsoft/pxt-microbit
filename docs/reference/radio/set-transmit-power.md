# set Transmit Power

Make the ``radio`` signal of the @boardname@ stronger or weaker.

```sig
radio.setTransmitPower(7);
```

The signal can be as weak as `0` and as strong as `7`. Default is ``6``.

The scientific name for the strength of the ``radio`` signal is
**dBm**, or **decibel-milliwatts**. A signal strength of `0`
can be measured as -30 dBm, and a strength of `7` can be
measured as +4 dBm.

## Range

If your @boardname@ is sending with a strength of `7`, and you are in
an open area without many other computers around, the @boardname@ signal
can reach as far as 70 meters (about 230 feet).

## Parameters

* ``power`` is a [number](/types/number) between ``0`` and ``7`` that means how strong the signal is.

## Simulator

This function only works on the @boardname@, not in browsers.

## Example

This program makes the ``radio`` send at full strength.

```blocks
radio.setTransmitPower(7)
```

## See also

[received packet](/reference/radio/received-packet),
[send number](/reference/radio/send-number),
[send value](/reference/radio/send-value),
[send string](/reference/radio/send-string)

```package
radio
```