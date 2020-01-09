# Packet

A packet that was received by the radio.

## Properties

* `receivedNumber` - The [number](/types/number) that was sent in this packet or `0` if this packet did not contain a number. See [send number](/reference/radio/send-number) and [send value](/reference/radio/send-value)
* `receivedString` - The [string](/types/string) that was sent in this packet or the empty string if this packet did not contain a string. See [send string](/reference/radio/send-string) and [send value](/reference/radio/send-value)
* `time` - The system time of the @boardname@ that sent this packet at the time the packet was sent.
* `serial` - The serial number of the @boardname@ that sent this packet or `0` if the @boardname@ did not include its serial number.
* `signal` - How strong the radio signal is. The exact range of values varies, but it goes approximately from `-128` dB (weak) to `-42` dB (strong).

## Packet layout

This section documents the data layout of the packet if you need to interpret the data outside of MakeCode.

    Packet byte layout
    | 0              | 1 ... 4       | 5 ... 8           | 9 ... 28
    ----------------------------------------------------------------
    | packet type    | system time   | serial number     | payload

* Serial number defaults to 0 unless enabled by user
* system time is milli-seconds since started, it will wrap around after a month or so

### Packet types

* PACKET_TYPE_NUMBER 0

    payload: number (9 ... 12)


* PACKET_TYPE_VALUE 1

    payload: number (9 ... 12), name length (13), name (14 ... 26)

* PACKET_TYPE_STRING 2

    payload: string length (9), string (10 ... 28)

* PACKET_TYPE_BUFFER 3

    payload: buffer length (9), buffer (10 ... 28)

* PACKET_TYPE_DOUBLE 4

    payload: number (9 ... 16)

* PACKET_TYPE_DOUBLE_VALUE 5

    payload: number (9 ... 16), name length (17), name (18 ... 26)

## See also

[on data packet received](/reference/radio/on-data-packet-received),

```package
radio
```