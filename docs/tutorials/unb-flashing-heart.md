# UNB Flashing Heart

## Make a flashing heart @unplugged

Welcome to your first UNB micro:bit tutorial! Create a heart animation using the LED display.

## {Step 1}

From ``||basic:Basic||``, drag a ``||basic:show icon||`` block into the ``||basic:forever||`` loop. Choose the heart icon.

```blocks
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
})
```

## {Step 2}

Add a ``||basic:pause||`` block after the heart. Set the pause to `500` milliseconds.

```blocks
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
})
```

## {Step 3}

Add a ``||basic:clear screen||`` block, followed by another `500` millisecond pause. The blank screen between hearts creates the flashing effect.

```blocks
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.clearScreen()
    basic.pause(500)
})
```

## {Step 4}

Watch the simulator. The heart should appear for half a second and disappear for half a second. Try changing both pause values to make it flash faster or slower.

## {Step 5}

Connect your @boardname@ and select ``|Download|`` to run the flashing heart on the device. You completed the UNB flashing-heart tutorial!

```template
basic.forever(function () {
})
```

```package
core
```
