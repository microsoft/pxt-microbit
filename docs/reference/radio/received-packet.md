# received Packet

Get one of the properties from the last received radio packet.

```sig
radio.receivedPacket(RadioPacketProperty.SignalStrength)
```

In addition to a [number](types/number), [string](/types/string), or name-value pair, the packet received also contains other information about the transmission of the packet. You can get this additional information by selecting a property from the packet.

## Parameters

* **type**: the property type to get from the packet. These are:
>* ``signal strength``: the strength of the radio signal when the packet was received.
>* ``serial number``: the serial number of the board sending the packet.
>* ``time``: the time when the packet was sent.

## Returns

* a [number](/types/number) that is the property selected in the **type** parameter:
>* ``signal strength``: the value ranges from `-128` to `-42` (`-128` means a weak signal and `-42` means a strong one.)
>* ``serial number``: the value is the serial number of the board sending the packet.
>* ``time``: the value is the system time, in microseconds, of the sender at the time when the packet was sent.

## Example

This program uses the signal strength from received packets to graph the
approximate distance between two @boardname@s.

```blocks
basic.forever(() => {
    radio.sendNumber(0)
})
radio.onReceivedNumber(function (receivedNumber) {
    led.plotBarGraph(
        Math.abs(radio.receivedPacket(RadioPacketProperty.SignalStrength) + 42),
        128 - 42
    )
})
```

## See also

[set transmit serial number](/reference/radio/set-transmit-serial-number)

```package
radio
```