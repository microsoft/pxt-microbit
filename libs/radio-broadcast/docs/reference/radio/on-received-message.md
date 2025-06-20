# on Received Message

Run part of a program when the @boardname@ receives a
message over ``radio``.

```sig
radio.onReceivedMessage(0, function() {})
```

## Parameters

* **msg**: The message to listen for. See [send message](/reference/radio/send-message)

## Example

Send a ``Hello`` message when button ``A`` is pressed, ``Goodbye`` when button ``B`` is pressed. If the messages are received, display either a ``heart`` or a ``scissor`` for the messages.

```blocks
enum RadioMessage {
    message1 = 49434,
    Hello = 49337,
    Goodbye = 16885
}
input.onButtonPressed(Button.A, function () {
    radio.sendMessage(RadioMessage.Hello)
})
radio.onReceivedMessage(RadioMessage.Hello, function () {
    basic.showIcon(IconNames.Heart)
})
input.onButtonPressed(Button.B, function () {
    radio.sendMessage(RadioMessage.Goodbye)
})
radio.onReceivedMessage(RadioMessage.Goodbye, function () {
    basic.showIcon(IconNames.Scissors)
})
```

## See also

[send message](/reference/radio/send-message),

```package
radio-broadcast
```
