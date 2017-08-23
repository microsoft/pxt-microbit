# Send Event

Register code to run when a broadcased radio event, sent with [radio send event](/reference/radio/send-event) is received.

## Parameters

* `event`, the event code to match

## Examples

In this example, pressing the ``A`` button send a ``0`` event which shows ``A`` on the other @boardname@.
Pressing ``B`` sends ``1`` which then shows ``B`` on the screen.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendEvent(0)
})
radio.onEventReceived(0, () => {
    basic.showString("A")
})
input.onButtonPressed(Button.B, () => {
    radio.sendEvent(1)
})
radio.onEventReceived(1, () => {
    basic.showString("B")
})
```

## See Also

[radio send event](/reference/radio/send-event)

