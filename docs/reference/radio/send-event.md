# Send Event

Broadcast an [event](/types/number) to other @boardname@s connected via ``radio``.
The event will trigger code registered with [on radio event received](/reference/radio/on-event-received).

## Parameters

* `event`, the event code

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

[on radio event received](/reference/radio/on-event-received)

