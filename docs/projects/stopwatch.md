# Stopwatch

![A @boardname@ stopwatch toon image](/static/mb/projects/stopwatch.png)

This project turns the @boardname@ into a simple stopwatch. Pressing **A** will start the timer. Pressing **A** again will show the amount of elapsed time and reset the timer. Let's get started.

## ~ hint

If you built a watch in the [make](/projects/watch/make) portion of the of the [Watch](/projects/watch) project, you can use the code from this project with it too.

## ~

## Program state

When coding we often use the idea of _state_ to decide what action needs to happen next. The state of the program is the condition or situation of the program depending on what events it's concerned about. It may decide to remain in its current state or take an action to change the state.

We do this in real life too. For example, if you feel hungry, your present state is **hunger**. Eating a meal will change your state from **hunger** to **satisfied**. Also, if you're thirsty, drinking enough water might change your state from **thirst** to **satisfied**. But, if you wait too long to eat or drink, you're state could change back to **hunger** or **thirst**.

The stopwatch has two states: it is either **(1) stopped** or **(2) measuring time**. Let's create a new variable ``start_time`` to track the state:

* if ``start_time`` is equal to ``0``, the watch is stopped - **state 1**
* if ``start_time`` is **not** equal to ``0``, the watch is running and the value of ``start_time`` is the time recorded when started - **state 2**

## Pseudo code

This is the _rough_ outline of the code:

>When a user presses **A**, we start by determining which state we're in.

>If the watch is stopped, (``start_time`` is `0` and this means we're in **state 1**), we start the counter and store the current time. The watch now goes from **state 1** to **state 2**.

>If the watch is running (``start_time`` is not `0` and this means we're in **state 2**), we calculate the time duration and reset ``start_time`` to `0`. The watch goes back from **state 2** to **state 1**.

The ``||input:running time||`` block returns the number of **milli**-seconds elapsed since the @boardname@ was turned on. To compute the duration in seconds, we use the following formula:

```
duration in seconds = (current time - start time) / 1000.0
```

In pseudo code, it could look like this:

```
on button pressed
    if start time is 0
        store current time into start time      
    else
        show duration
        reset start time
``` 

## Real code

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
