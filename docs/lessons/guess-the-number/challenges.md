# guess the number challenges

Coding challenges for the guess the number tutorial. 

## Before we get started

Complete the following [guided tutorial](/lessons/guess-the-number/activity), and your code should look like this:

```blocks
input.onButtonPressed(Button.A, () => {
    let x = Math.randomRange(0, 9)
    basic.showNumber(x)
})
```

## Challenge 1

When button `B` is pressed, we want to clear the screen. This will make it so users can play your game over and over again! Add an event handler to handle this case.

```blocks
input.onButtonPressed(Button.A, () => {
    let x = Math.randomRange(0, 9)
    basic.showNumber(x)
})
input.onButtonPressed(Button.B, () => {
    basic.clearScreen()
})
```

## Challenge 2

Show an animation when you clear the screen! Choose what animation makes most sense to you. Be creative!

