# Stop watch

![A @boardname@ stop watch toon image](/static/mb/projects/stop-watch.png)

This project turns the @boardname@ into a simple stop-watch. You can use it the [Watch project]
if you've build it already. Pressing **A** will start the timer
and pressing **A** again will display the resulting time. Let's get started.

## Program state

The stop watch has two states: it is either stopped or measuring time. 
Let's create a new variable ``start_time`` to track the state:
* if ``start_time`` is equal to ``0``, the watch is stopped.
* if ``start_time`` is **not** equal to ``0``, the watch is running and the value of ``start_time`` is
the time it started.

## Pseudo code

The rough outline of the code is as follows: when a user presses **A**, we start by determining in which
state we are. If the watch is stopped (``start time`` is 0), we start the counter and store the current time. If the watch is running (``start time`` is not 0), we compute the duration and reset ``start time`` to 0.

The ``||input:runningTime||`` block returns the number of **milli**-seconds elapsed since the @boardname@ was turned on. To compute the duration in seconds, we use the following formula:

    duration in seconds = (current time - start time) / 1000.0

In pseudo code, this could look like this:
```
on button pressed
    if start time is 0
        store current time into start time      
    else
        show duration
        reset start time
``` 

If you translate the pseudo-code line by line into blocks, it might end up like this.

```blocks
let start_time = 0
input.onButtonPressed(Button.A, function () {
    // is the watch running?
    if (start_time == 0) {
        // store current time
        start_time = input.runningTime()
        basic.showIcon(IconNames.Butterfly)
    } else {
        // compute duration and display it
        basic.showNumber(Math.idiv(input.runningTime() - start_time, 1000))
        // reset watch state
        start_time = 0
    }
})
start_time = 0
```
