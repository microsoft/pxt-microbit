# @extends

## Example #example

Send a ``Hello`` message when button ``A`` is pressed, ``Goodbye`` when button ``B`` is pressed. If the messages are received, display either a ``heart`` for the ``Hello`` message or a ``scissor`` for the ``Goodbye`` message.

```blocks
enum RadioMessage {
    message1 = 49434,
    Hello = 49337,
    Goodbye = 16885
}
radio.setGroup(3)
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