# set Group

Make a program have the group ID you tell it for sending and receiving
with radio.

```sig
radio.setGroup(0);
```

A group is like a cable channel (a @boardname@ can only
send or receive in one group at a time). A group ID is like the cable
channel number.

If you do not tell your program which group ID to use with this
function, it will figure out its own group ID by itself.  If you load
the very same program onto two different @boardname@s, they will be able
to talk to each other because they will have the same group ID.

## Parameters

* **id**: a [number](/types/number) from ``0`` to ``255``.

### ~ reminder

#### Default radio group

If you haven't set a radio group for the @boardname@, it will use one selected randomly. If you are transmiting data to a @boardname@ that has a different hardware version from the sending @boardname@, it will select a random default group that is not the same as the other @boardname@. To be certain that your program will send or receive data using the same radio group, you will need to first choose and set a radio group for your program if you want it to work between different versions of the @boardname@.

### ~

## Simulator

This function only works on the @boardname@, not in browsers.

## Example

This program makes the group ID equal 128.

```blocks
radio.setGroup(128)
```

## See also

[on received number](/reference/radio/on-received-number),
[on received string](/reference/radio/on-received-string),
[on received value](/reference/radio/on-received-value),
[send number](/reference/radio/send-number),
[send value](/reference/radio/send-value),
[send string](/reference/radio/send-string)

```package
radio
```