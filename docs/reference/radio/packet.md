# Packet

A packet that was received by the radio.

## Properties

* `receivedNumber` - The [number](/types/number) that was sent in this packet or `0` if this packet did not contain a number. See [send number](/reference/radio/send-number) and [send value](/reference/radio/send-value)
* `receivedString` - The [string](/types/string) that was sent in this packet or the empty string if this packet did not contain a string. See [send string](/reference/radio/send-string) and [send value](/reference/radio/send-value)
* `time` - The system time of the @boardname@ that sent this packet at the time the packet was sent.
* `serial` - The serial number of the @boardname@ that sent this packet or `0` if the @boardname@ did not include its serial number.
* `signal` - How strong the radio signal is from `255` (weak) to `0` (strong).

## See also

[on data packet received](/reference/radio/on-data-packet-received),

```package
radio
```