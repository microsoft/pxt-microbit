# pogo activity

Construct a counter that uses acceleration.

Welcome! This activity will teach how to construct a pendulum that glows using acceleration. Let's get started!

Create a **forever** loop that will constantly display the appropriate brightness on the LED display.  Now let's measure the acceleration on the `y` axis and store that value in a variable. The `acceleration(y)` function will provide the value.

```blocks
basic.forever(() => {
    let acc = input.acceleration(Dimension.Y)
})
```

Since the @boardname@ will be swinging up and down, we need to store the variable called jumps. We will set the variable called jumps to 0 to store the number 0.

```blocks
let jumps = 0
basic.forever(() => {
    let acc = input.acceleration(Dimension.Y)
})
```

The function `acceleration(y)` gets the acceleration value (milli g-force), in the `y` dimension. If the `acceleration(y)`is greater than 2000 milli g-force, we will change jumps by 1. If jumping is greater than 2000 milli-gravities, then change jumps by 1 and display a smiley on the @boardname@. Finally, we will remove the smiley image from the screen


```blocks
let jumps = 0
basic.forever(() => {
    let acc = input.acceleration(Dimension.Y)
    if (acc > 2000) {
        jumps = jumps + 1;
        basic.showLeds(`
            . . . . .
            . # . # .
            . . # . .
            # . . . #
            . # # # .
            `)
        basic.clearScreen()
    }
})
```

Now let's register an event handler that will execute whenever an input button (A) is pressed during program execution. If you press button A, then show the number of jumps greater than 2000 milli-gravities on the @boardname@.

```blocks
let jumps = 0
basic.forever(() => {
    let acc = input.acceleration(Dimension.Y)
    if (acc > 2000) {
        jumps = jumps + 1;
        basic.showLeds(`
            . . . . .
            . # . # .
            . . # . .
            # . . . #
            . # # # .
            `)
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.A, () => {
    basic.showNumber(jumps)
})
```

If you press button A+B together, then reset the jump counter to 0 on the @boardname@. Finally, we will show the show the jump counter on the @boardname@


```blocks
let jumps = 0
basic.forever(() => {
    let acc = input.acceleration(Dimension.Y)
    if (acc > 2000) {
        jumps = jumps + 1;
        basic.showLeds(`
            . . . . .
            . # . # .
            . . # . .
            # . . . #
            . # # # .
            `)
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.A, () => {
    basic.showNumber(jumps)
})
input.onButtonPressed(Button.AB, () => {
    let jumps = 0
    basic.showNumber(jumps)
})

```

We want to setup the radio communication between an additional @boardname@. We first must send number for jumps. The additional @boardname@ will receive the number and show number on data received. We are now displaying the current jump count on the second @boardname@

```blocks
let jumps = 0
basic.forever(() => {
    let acc = input.acceleration(Dimension.Y)
    if (acc > 2000) {
        jumps = jumps + 1;
        radio.sendNumber(jumps)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . # . .
            # . . . #
            . # # # .
            `)
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.A, () => {
    basic.showNumber(jumps)
})
input.onButtonPressed(Button.AB, () => {
    let jumps = 0
    basic.showNumber(jumps)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
})

```
We want to stop animation so every time the number of jumps increase by 1 the second @boardname@ will not also display smiley from show leds. So we add the code stop animation

```blocks
let jumps = 0
basic.forever(() => {
    let acc = input.acceleration(Dimension.Y)
    if (acc > 2000) {
        jumps = jumps + 1;
        radio.sendNumber(jumps)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . # . .
            # . . . #
            . # # # .
            `)
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.A, () => {
    basic.showNumber(jumps)
})
input.onButtonPressed(Button.AB, () => {
    let jumps = 0
    basic.showNumber(jumps)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
    led.stopAnimation()
})

```


Connect the first @boardname@ to your computer using your USB cable and run the pogo script on it.
Connect the second @boardname@ to your computer using your USB cable and run the pogo script on it.
The first person and second person take turns jumping in the “y” direction while the other player uses the @boardname@ to track the results on the @boardname@!

```package
radio
```