# set Frequency Band

Change the transmission and reception band of the radio to the given channel. Default is 7.

```sig
radio.setFrequencyBand(50);
```

## Parameters

* ``band`` is a [number](/types/number) between ``0`` and ``83``. Each step is 1MHz wide, based at 2400MHz.

## Simulator

This function only works on the @boardname@, not in browsers.

## Example

This program makes the ``radio`` use frequency band 50.

```blocks
radio.setFrequencyBand(50)
```

## See also

[received packet](/reference/radio/received-packet),
[send number](/reference/radio/send-number),
[send value](/reference/radio/send-value),
[send string](/reference/radio/send-string)

```package
radio
```