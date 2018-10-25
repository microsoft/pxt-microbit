# send Message

Broadcast a coded message to other @boardname@s connected via ``radio``.

```sig
radio.sendMessage(0);
```

## Parameters

* **msg**: a coded message.


## Example: Broadcasting heart or skull

Sends a ``heart`` message when ``A`` is pressed, ``skull`` when ``B`` is pressed. On the side, display heart or skull for the message.

```blocks
enum RadioMessage {
    heart,
    skull
}
input.onButtonPressed(Button.A, function () {
    radio.sendMessage(RadioMessage.heart)
})
input.onButtonPressed(Button.B, function () {
    radio.sendMessage(RadioMessage.skull)
})
radio.onReceivedMessage(RadioMessage.heart, function () {
    basic.showIcon(IconNames.Heart)
})
radio.onReceivedMessage(RadioMessage.skull, function () {
    basic.showIcon(IconNames.Skull)
})
```

## See also

[on received number](/reference/radio/on-received-number)

```package
radio-broadcast
```