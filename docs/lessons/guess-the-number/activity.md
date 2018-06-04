# guess the number activity

Guess the number with math random. 

## ~avatar avatar

Welcome! This tutorial will help you create a guess the number game! Let's get started!

## ~

Add an event handler when button `A` is pressed.


```blocks
input.onButtonPressed(Button.A, () => {
})

```

Create a local variable of type number `x` and set it to a random number using `pick random`. `pick random` 9 generates a random number between `0` and `9`.

```blocks
input.onButtonPressed(Button.A, () => {
    let x = Math.randomRange(0, 10)
})

```

Show the random number on the screen.


```blocks
input.onButtonPressed(Button.A, () => {
    let x = Math.randomRange(0, 10)
    basic.showNumber(x)
})

```

## ~avatar avatar

Excellent, you're ready to continue with the [challenges](/lessons/guess-the-number/challenges)!

## ~

