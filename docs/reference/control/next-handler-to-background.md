# Next Handler To Background

The next handler to be registered will be placed in the background.
The background handlers for an event are executed in the order that
they were registered.

```sig
control.nextHandlerToBackground()
```

## Example

This program shows how to register multiple background handlers
for the ``on button pressed`` event (of button A):

```ts
// after this program runs, a press of button A
// will print the sequence 1, 2, 3
control.nextHandlerToBackground();
input.onButtonPressed(Button.A, () => {
    basic.showNumber(1);
})

let f = function() { basic.showNumber(2); }
control.nextHandlerToBackground();
input.onButtonPressed(Button.A, f);

input.onButtonPressed(Button.A, () => {
    basic.showNumber(3);
})

// on press of Button B, remove the handler that prints 2,
// so future presses of button A will print the sequence 1,3
input.onButtonPressed(Button.B, () => {
    control.removeFromBackground(f);
})
```

## See also

[remove from background]((/reference/comtrol/remove-from-background)

