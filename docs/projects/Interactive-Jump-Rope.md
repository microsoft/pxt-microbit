**Interactive Jump Rope**


**Step 1**


Go to the ``||variables:variable||`` option and create a Variable labled ``||variables:steps||``. 

Place the ``||variables:change steps by 1||`` block in the on ``||input:shake||`` block.

```blocks
let steps = 0
 input.onGesture(Gesture.Shake, () => {
    steps += 1
})

```

**Step 2**

Place the ``||variables:set steps to 0||`` block in the ``||basic:on start||`` block.

```blocks
let steps = 0

```

**Step 3**

Place the ``||basic:show leds||`` block in the ``||basic:on forever||`` block and draw a heart

```blocks

basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # . # . #
        # . . . #
        . # . # .
        . . # . .
        `)
    basic.showLeds(`
        . # . # .
        # . # . #
        # # . # #
        . . # . .
        . . . . .
        `)
})
```

**Step 4**

Place the ``||basic:show number||`` the ``||variables:steps||`` block in the ``||basic:forever||`` block 

```blocks
let steps = 0
basic.forever(() => {
basic.showNumber(steps)
})
```

**Step 5**

Place the ``||music:start melody||`` in the ``||basic:forever||`` block too.

```blocks
let steps = 0
basic.forever(() => {
basic.showNumber(steps)
music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Forever)
})
```

**Step 6**

Click ``||radio:Download||`` to transfer your code in your micro:bit!

