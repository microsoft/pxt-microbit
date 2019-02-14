# raise Event

Sends an event over radio to be raised in the event bus of other @boardname@. 

```sig
radio.raiseEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_BUTTON_A), control.eventValueId(EventBusValue.MICROBIT_EVT_ANY));
```

**This is an advanced API.**  For more information, see the
[@boardname@ runtime messageBus documentation](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/)

## See Also

[control raise event](/reference/control/raise-event)