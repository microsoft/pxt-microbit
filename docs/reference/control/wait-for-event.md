# wait For Event

Stop running the current code and wait for an event.

```sig
control.waitForEvent(0, 0)
```
You might want your code to stop for a while until some event you're expecting happens.
If you want your code to pause until a known event happens, use a ``||control:wait for event||`` block.
A known event is something you identify that happens on the board or in your program.
An event has both a source and a cause. The source is where the event comes from, like a sensor or
some condition in your program. The cause is what made the event happen at the source.

You assign numbers for your event sources and causes. These numbers are used by [``||control:raise event||``](/reference/control/raise-event) to announce to your program that an event just happened.

As an example, you could make a timer that always causes an event every 100 milliseconds. The source
number for the timer is `6` and the cause value is `1`. The program could wait for one of the time
events like this:

```blocks
const myTimer = 6;
const timerTimeout = 1;

control.runInParallel(function() {
    while (true) {
        control.waitMicros(100000)
        control.raiseEvent(myTimer, timerTimeout)
    }
})

control.waitForEvent(myTimer, timerTimeout)
```

## Parameters

* **id**: the identification [number](/types/number) (the source) of this event, such as: `10`.
* **value**: a [number](/types/number) tells what the cause of the event is, like: `4`.

## Example #example

Make a timeout timer to signal every 2 seconds. Wait two times and write to the
console each time.

```blocks
const myTimer = 6;
const timerTimeout = 1;

control.runInParallel(function() {
    while (true) {
        pause(2000)
        control.raiseEvent(myTimer, timerTimeout)
    }
})

control.waitForEvent(myTimer, timerTimeout)
console.log("Timer timeout")
control.waitForEvent(myTimer, timerTimeout)
console.log("Timer timeout")
```

**This is an advanced API.**  For more information, see the
[@boardname@ runtime messageBus documentation](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/).


## See also #seealso

[raise event](/reference/control/raise-event), [on event](/reference/control/on-event)