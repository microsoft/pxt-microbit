# bop it quiz answers

a game where you have to keep up with the commands.

## Name

## Directions

Use this activity document to guide your work in the [bop it activity](/lessons/bop-it/activity).

Answer the questions while completing the tutorial. Pay attention to the dialogues!

## 1. Write the code that will store the global variable named 'action' and returns a random number between 0 and 2

```blocks
let action = Math.randomRange(0, 3)
```

## 2. Write the code that will display the string, "PUSH A" if the global variable called 'action' is equal to 0

```blocks
let action = Math.randomRange(0, 3)
if (action == 0) {
    basic.showString("PUSH A")
}
```

## 3. Write the code that increments the score if button A is pressed when the global variable called 'action' is equal to 1

```blocks
input.onButtonPressed(Button.A, () => {
    let action = Math.randomRange(0, 3)
    if (action == 0) {
        game.addScore(1)
    }
})
```

## 4. Write the code that will display the string "LOGO DOWN" if the global variable called 'action' is equal to 1

```blocks
let action = Math.randomRange(0, 3)
if (action == 1) {
    basic.showString("LOGO DOWN")
}
```

## 5. Write the code that increments the score if the @boardname@ logo is tilted down when the global variable called 'action' is equal to 1

```blocks
input.onGesture(Gesture.LogoDown, function () {
    let action = Math.randomRange(0, 3)
    if (action == 1) {
        game.addScore(1)
    }
})
```

## 6. Write the code that will display the string "SHAKE" if the global variable called 'action' is equal to 2

```blocks
let action = Math.randomRange(0, 3)
if (action == 2) {
    basic.showString("SHAKE")
}
```

## 7. Write the code that increments the score if the @boardname@ is shaken when the global variable called 'action' is equal to 2

```blocks
input.onGesture(Gesture.LogoDown, function () {
    let action = Math.randomRange(0, 3)
    if (action == 1) {
        game.addScore(1)
    }
})
```
