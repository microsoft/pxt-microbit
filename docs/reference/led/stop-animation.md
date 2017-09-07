# Stop Animation

Stop the animation that is playing and any animations that are waiting to
play.

```sig
led.stopAnimation()
```

## Example

This program sets up the ``stop animation`` part of the program,
and then shows a string that you can stop with button ``B``.

```blocks
input.onButtonPressed(Button.B, () => {
    led.stopAnimation();
});
basic.showString("STOP ME! STOP ME! PLEASE, WON'T SOMEBODY STOP ME?");
```

## ~hint

It's important to set up ``stop animation`` before showing the
animation, so the ``stop animation`` part of the program will be ready
to go.

## ~

## See Also

[show animation](/reference/basic/show-animation)
