# truth or dare quiz answers

a multi-player game that forces each player to reveal a secret or something funny.

This is the answer key for the [truth or dare quiz](/lessons/truth-or-dare/quiz).

## 1. Write the code that will randomly return 0 through 3  and stores the value inside a local variable called 'random'.

```blocks
let random = Math.randomRange(0, 4)
```

## 2. Write an if statement that will display the message "TRUTH" on the @boardname@  if the local variable 'random' equals 0. 

```blocks
let random = Math.randomRange(0, 4)
if (random == 0) {
    basic.showString("TRUTH", 150)
}
```

## 3. If the local variable 'random' equals 1, write the string that will be displayed. 

DARE

## 4.Write the code that will display this up arrow after pressing button "A".

![](/static/mb/lessons/truth-or-dare-0.png)

```blocks
input.onButtonPressed(Button.A, () => {
    basic.showLeds(`
        . . # . .
        . # # # .
        # # # # #
        . . # . .
        . . # . .
        `)
})

```

