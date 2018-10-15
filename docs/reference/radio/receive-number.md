# Receive Number

> Note: This API has been deprecated! Use [on received number](/reference/radio/on-received-number) instead.

Receives the next number sent by a @boardname@ in the same ``radio`` group.

```sig
radio.receiveNumber();
```

## Returns

* the first  [number](/types/number) that the @boardname@ received. If it did not receive any numbers, this function will return `0`.

## Example: Simple number receiver

This example receives the number broadcasted another @boardname@ and shows it
as a bar graph.

```blocks
radio.onDataReceived(() => {
    led.plotBarGraph(radio.receiveNumber(), 1023);
})
```

## Example: Light level receiver

This example shows the light level from the [light level sender example](/reference/radio/send-number)
as a number.

```blocks
radio.setGroup(99)
basic.forever(() => {
    let level = radio.receiveNumber()
    basic.showNumber(level)
})
```

## Example: Mailbot

This example receives the light level from the [light level sender example](/reference/radio/send-number)
and shows a text string like **ALERT** if the light level becomes much brighter.
To find when the mail arrives, you can put the light level sender in your mailbox and it will
tell you when someone opens the box. You can try this with a normal
box too, like a present for a friend.

```blocks
radio.setGroup(99)
let max = 0
basic.forever(() => {
    let level = radio.receiveNumber()
    if (level > max) {
        max = level
    }
    if (max > 10) {
        basic.showString("ALERT")
    }
})
```

## See also

[send number](/reference/radio/send-number), [on data received](/reference/radio/on-data-received)

```package
radio
```