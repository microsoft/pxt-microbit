# WaitMicros

Blocks the current fiber for the given amount of micro-seconds.

```sig
control.waitMicros(4)
```

## Example

This program sends a 10 micro-second HIGH pulse through pin ``P0``. 

```blocks
// ensure pin is low to send a clean pulse
pins.digitalWritePin(DigitalPin.P0, 0)
control.waitMicros(2)
// set pin to 1 and wait 10 micros
pins.digitalWritePin(DigitalPin.P0, 1)
control.waitMicros(10)
// finish pulse
pins.digitalWritePin(DigitalPin.P0, 0)
```

### ~hint

This function is not supported in the simulator.

### ~

## See Also

[pause](/reference/basic/pause)
