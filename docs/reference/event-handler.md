# event handler

Event handlers - how they work.

An event handler is code that is associated with a particular event, such as "button A pressed". You create (or register) the association between an event and an event handler by calling a function named "on <event>".  After registering an event handler with an event, then whenever that event occurs, the event handler code executes.

## Registering an event handler

Functions named "on <event>" create an association between an event and the event handler code.  For example, the following code registers the event handler (the code between the `do` and `end` keywords) with the event of a press of button A:

```blocks
input.onButtonPressed(Button.A, () => {
    basic.showString("hello", 150)
})
```

After this code executes, then whenever button A is pressed in the future, the string "hello" will be printed.

## Event handlers are active for the entire program execution

Once you have registered an event handler for an event, like above, that event handler is active for the rest of the program execution. If you want to stop the string "hello" from printing each time button A is pressed then you need to arrange for the following code to execute:

```blocks
input.onButtonPressed(Button.A, () => {
})
```

The above code associated an event handler that does nothing with the event of a press of button A.

## There is only one event handler per event

The above example also illustrates that there is only one event handler for each event. What is the result of the following code?

```blocks
input.onButtonPressed(Button.A, () => {
    basic.showString("hello", 150)
})
input.onButtonPressed(Button.A, () => {
    basic.showString("goodbye", 150)
})
```

The answer is that whenever button A is pressed, the string "goodbye" will be printed. If you want both the strings "hello" and "goodbye" to be printed, you need to write the code like this:

```blocks
input.onButtonPressed(Button.A, () => {
    basic.showString("hello", 150)
    basic.showString("goodbye", 150)
})
```

## To learn more

To learn more about how the @boardname@ queues up and schedules event handlers, see [the @boardname@ - a reactive system](/device/reactive)

## see also

[on button pressed](/reference/input/on-button-pressed), [on pin up](/reference/input/on-pin-pressed), [on shake](/reference/input/on-gesture)

