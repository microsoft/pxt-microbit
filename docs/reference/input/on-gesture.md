# On Gesture

Start an [event handler](/reference/event-handler) (part of the
program that will run when something happens) This handler works when
you do a **gesture** (like shaking the @boardname@).

```sig
input.onGesture(Gesture.Shake,() => {
})
```

## Parameters

* ``gesture`` means the way you hold or move the @boardname@. This can be `shake`, `logo up`, `logo down`, `screen up`, `screen down`, `tilt left`, `tilt right`, `free fall`, `3g`, or `6g`.

## Example: random number

This program shows a number from `0` to `9` when you shake the @boardname@.

```blocks
input.onGesture(Gesture.Shake,() => {
    let x = Math.random(10)
    basic.showNumber(x, 100)
})
```

