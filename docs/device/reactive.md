# The micro:bit - a reactive system

## Computing systems

What sort of a *computing system* is the micro:bit?

## ~hint 

There are different types of computing systems, to address different kinds of problems that arise in practice: *transaction processing systems* are used by banks to handle huge numbers of financial transactions by their customers; *distributed systems* make a set of networked computers appear as one big computer (like Google’s search engine); there are also *parallel systems*, such as graphic cards, which perform a huge number of primitive operations simultaneously, using a great number of small processing cores.

## ~

The micro:bit is a *reactive system* – it reacts continuously to external events, such as a person pressing the **A** button of the micro:bit or shaking the device. The reaction to an event may be to perform a computation, update variables, and change the display.  After the device reacts to an event, it is ready to react to the next one. If this sounds like a computer game, that’s because most computer games are reactive systems too!

## Responsiveness

We want reactive systems to be responsive, which means to react in a timely manner to events. For example, when you play a computer game, it’s frustrating if you press a button to make a character jump, but it doesn’t immediately jump.  A delay in reacting, or lack of responsiveness, can be the difference between life and death, both in the real and virtual worlds.

Let’s consider a simple example: you want to program your micro:bit to accurately count the number of times the **A** button has been pressed and continuously display the current count on the 5x5 [LED screen](/device/screen).   Because the LED screen is small, we can only display one digit of a number at a time on it. The [show number](/reference/basic/show-number) function will scroll the digits of a number across the screen so you can read it.

Let’s say that the current count is 42 and the number 42 is scrolling across the LED screen. This means there is some code executing to perform the scroll.  So, what should happen if you press the **A** button during the scroll?  It would be a bad idea to ignore the button press, so some code should record the occurrence of the button press. But we just said there already is code running in order to scroll the number 42!  If we wait until the code scrolling the 42 has finished to look for a button press, we will miss the button press.  We want to avoid this sort of unresponsiveness.

## Concurrency

To be responsive, a reactive system needs to be able to do several things at the same time (concurrently), just like you can.  But the micro:bit only has one CPU for executing your program, which means it can only execute one program instruction at a time. It can, however, execute millions of instructions in a single second. This points the way to a solution.

Think about how a motion picture projector works - it projects only 24 frames per second, yet this is good enough to provide the illusion of fluid motion on the screen. The micro:bit can execute millions of instructions per second, so it seems quite possible for the device to both to smoothly scroll the number 42 across the LED screen while looking for button presses and counting them.

Let’s think about three sequences of instructions:

* Sequence **S1**: contains the instructions (let’s say several hundred thousand or so) that scroll the number 42 across the LED screen.
* Sequence **S2**: contains a few instructions to check if button **A** is pressed.
* Sequence **S3**: contains a few instructions to increment a counter.

In order to be responsive, we would like to *interrupt* the execution of sequence **S1** *periodically* to execute the sequence **S2**, which will check if button **A** is pressed, which looks like:

![Execution sequence diagram: S1 and S2](/static/mb/device/reactive-0.png)

The result is that it takes sequence **S1** a little longer to complete, due to the interruptions to execute sequence **S2**, but we are checking often enough to detect a press of button **A** .  When **S2** detects a press of button **A**, then the sequence **S3** can be executed before **S1** resumes:

![Execution sequence diagram: S1 and S2 with interrupt and one S3 slice](/static/mb/device/reactive-1.png)

As we’ll soon see, there are other choices for how the sequences can be ordered to achieve the desired result.

## The micro:bit scheduler and queuing up subprograms

The micro:bit’s *scheduler* provides the capability to concurrently execute different code sequences, relieving us of a lot of low-level programming.   In fact, scheduling is so useful that it is a part of every *operating system*!

The first job of the scheduler is to allow multiple *subprograms* to be queued up for later execution. For our purposes, a subprogram is just a statement or sequence of statements in the context of a larger program. Consider the program below for counting button presses.

```typescript
let count = 0

input.onButtonPressed(Button.A, () => {
    count++;
})

basic.forever(() => {
    basic.showNumber(count)
})
```

The program above contains three statements that execute in order from top to bottom. 
The first statement initializes the global variable `count` to zero.

```typescript
// statement 1
let count = 0
```

The second statement informs the scheduler that on each and every event of the **A** button being pressed, a subprogram (called the event handler) should be queued for execution. The event handler code is contained within the braces `{...}`; it increments the global variable `count` by one.  

```typescript
// statement 1
let count = 0
// statement 2
input.onButtonPressed(Button.A, () => {
    count++;
})
```

The third statement queues a `forever` loop for later execution by the scheduler; the body of this loop (also inside the braces `{...}`) displays the current value of global variable `count` on the LED screen.

```typescript
// statement 1
let count = 0
// statement 2
input.onButtonPressed(Button.A, () => {
    count++;
})
// statement 3
basic.forever(() => {
    basic.showNumber(count)
})
```

There are no more statements after the execution of these three statements, but this is not the end of program execution!  That’s because the program queued the `forever` loop for execution by the scheduler (and registered an event handler for presses of button A).

The second job of the scheduler is to periodically interrupt execution to read (poll) the various inputs to the micro:bit (the buttons, pins, etc.) and fire off events (such as “button A pressed”). Recall that the firing of an event causes the event handler subprogram associated with that event to be queued for later execution. The scheduler uses a timer built into the micro:bit hardware to interrupt execution every 6 milliseconds and poll the inputs, which is more than fast enough to catch the quickest press of a button.

## Cooperative passing of control

How does the `forever` loop get to start execution? Furthermore, once the `forever` loop is running, how does any other subprogram (like the event handler that increments the count) ever get a chance to execute?

The answer is “cooperation” and “passing”.  Think of a football team doing a drill – there is one ball and each footballer gets to dribble the ball for a certain number of touches, after which they pass to another footballer. A footballer who never passes prevents all other footballers from dribbling.  A cooperative footballer always passes to some other footballer after taking a few touches.

If you hadn’t guessed already, a footballer represents subprogram and dribbling the ball corresponds to that subprogram executing. Only one subprogram gets to execute at a time, as there is only one ball (processor). Footballer Alice passing the ball to footballer Bob corresponds to stopping execution of Alice’s subprogram (and remembering where it stopped) and starting/resuming execution of Bob’s subprogram.

We will call this “passing control of execution” rather than “passing the ball”.  However, in the world of the micro:bit, the concurrently executing subprograms are not aware of each other, so they don’t actually pass control directly to one another.  Rather they pass control of execution back to the scheduler and the scheduler determines the subprogram to pass control to next.  The programmer inserts a call to the `pause` function to indicate a point in the subprogram where control of execution passes to the scheduler. Also, when a subprogram ends execution, control passes to the scheduler.

Let’s take a look at the implementation of the `basic.forever` function to see an example of cooperative scheduling:

```typescript
function forever(body: () => void) {
    control.inBackground(() => {
        while(true) {
            body()
            basic.pause(20)
        }
    })
}
```

The `forever` loop actually is a function that takes a subprogram (another function) as a parameter. The function uses the `control.inBackground` function of the micro:bit runtime to queue a `while true` loop for execution by the scheduler. The while loop has two statements. The first statement runs the subprogram represented by the `body` parameter. The second statement passes control to the scheduler (requesting to “sleep” for 20 milliseconds).

Though the `while true` loop will repeatedly execute the body subprogram, between each execution of the body it will permit the scheduler to execute other subprograms.  If the while loop did not contain the call to `pause`, then once control passed into the while loop, it would never pass back to the scheduler and no other subprogram would be able to execute (unless the body subprogram contained a call to `pause` itself).

## Round-robin scheduling

Now, we come to the third and final job of the scheduler, which is to determine which subprogram to pass control to next. The scheduler uses two queues to perform this task, the sleep queue and the run queue. The sleep queue contains the subprograms that have called the pause function and still have time left to sleep. The run queue contains all the non-sleeping subprograms, such as the event handlers queued by the firing of an event.

The scheduler  moves the subprogram that has just paused into the sleep queue and then removes the subprogram at the head of the run queue and resumes its execution. Once a subprogram’s sleep period is over, the scheduler moves it from the sleep queue to the back  of the run queue.

The property of such round-robin scheduling is that under the assumption that every subprogram periodically enters the sleep queue, then every subprogram will periodically get a chance to execute.

## Putting it all together

Let’s go back to the `count button presses` program and revisit its execution based on what we have learned about the micro:bit scheduler. As detailed before, the program executes three steps to:

1. Initialize the global variable `count` to zero
2. Set up the event handler for each press of button **A**
3. Queue the forever loop to the run queue

The program then ends execution and control passes back to the scheduler.  Let’s assume the user has not pressed any buttons . The scheduler finds the `forever` loop in the run queue and passes control to it. The loop first calls `basic.showNumber(0)`.  In the diagram below, we use “Show 0” to refer to the execution of this function:

![Execution sequence diagram: display loop with increment and interrupt](/static/mb/device/reactive-3.png)


While "Show 0" (the blue sequence) is running, periodic interrupts by the scheduler (every 6 milliseconds) poll for button presses and queue an event handler for each press of button **A**. Let’s say that one button press takes place during this time, as shown above. This will cause an event handler (labelled “inc”) to be queued for later execution by the scheduler. Once the "Show 0" has completed, the loop then calls `basic.pause(20)` to put the forever loop to sleep for 20 milliseconds and give the scheduler an opportunity to run any newly queued event handler. Control passes to the “inc” event handler which will increment the global variable `count` from 0 to 1 and then complete, returning control to the scheduler. At some point, the `forever` loop moves from the sleep queue to the run queue; the `forever` loop then will resume and call `basic.showNumber(1)`.

## Final thoughts

Through this example, we have seen that the micro:bit scheduler enables you to create a program that is composed of concurrent subprograms. In essence, the programmer needs to only think about the concurrent subprograms cooperatively passing control back to the scheduler, making sure no subprogram hogs control (or “dribbles the ball without passing”) for too long. While a subprogram runs, the scheduler polls the buttons and other IO peripherals at a high frequency in order to fire off events and queue event handlers for later execution, but this is invisible to the programmer.

As a result, you can easily add a new capability to the micro:bit by just adding a new subprogram. For example, if you want to add a reset feature to the counter program, all you need to do is add a new event handler for a press of button **B** that sets the global variable "count" to zero, as shown below:

```typescript
let count = 0

input.onButtonPressed(Button.A, () => {
    count = count + 1
})

basic.forever(() => {
    basic.showNumber(count)
})

input.onButtonPressed(Button.B, () => {
    count = 0
})
```

