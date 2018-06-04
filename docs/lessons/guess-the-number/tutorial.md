# guess the number tutorial

## ~avatar avatar

This tutorial will help you create a guess the number game! Let's get started!

## ~

## Rebuild the game!

The blocks have been shuffled! Put them back together so that...
* when the user presses button ``A``,
  * generate a random number
  * show the number on screen


```shuffle
input.onButtonPressed(Button.A, () => {
    let x = Math.randomRange(0, 10)
    basic.showNumber(x)
})
```

