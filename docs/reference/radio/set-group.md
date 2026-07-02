# set Group

Set the group ID for sending and receiving messages over radio.

```sig
radio.setGroup(0)
```

A group is like a cable channel (a @boardname@ can only
send or receive date in one group at a time) and the group ID is like the channel number.

If you load the same program onto two different @boardname@s, they will be able
to talk to each other because they will have the same group ID.

## Parameters

* **id**: a radio group ID [number](/types/number) from ``0`` to ``255``.

### ~ reminder

#### Default radio group

If you haven't set a radio group for the @boardname@, it will use the default group number of **0**.

### ~

### ~ alert

#### Simulator

This function only works on the @boardname@, not in browsers.

### ~

## Example

Set a radio group to send and receive a [number](/types/number) between @boardname@s.

```blocks
radio.setGroup(1)
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(0)
    basic.clearScreen()
})
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(0)
})
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