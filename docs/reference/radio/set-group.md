# Set Group

Make a program have the group ID you tell it for sending and receiving
with ``radio``.  A group is like a cable channel (a micro:bit can only
send or receive in one group at a time). A group ID is like the cable
channel number.

If you do not tell your program which group ID to use with this
function, it will figure out its own group ID by itself.  If you load
the very same program onto two different micro:bits, they will be able
to talk to each other because they will have the same group ID.

```sig
radio.setGroup(0);
```

### Parameters

* ``id`` is a [number](/reference/types/number) from ``0`` to ``255``.

### Simulator

This function only works on the micro:bit, not in browsers.

### Example

This program makes the group ID equal 128.

```blocks
radio.setGroup(128)
```

### See also

[on data packet received](/reference/radio/on-data-packet-received),
[send number](/reference/radio/send-number),
[send value](/reference/radio/send-value),
[send string](/reference/radio/send-string)

```package
radio
```