# bop it challenges

a game similar to "Simon Says" with the @boardname@.

## Before we get started

Complete the following guided tutorial. Your code should look like this:

```typescript
let action  = 0;
function newAction() {}
input.onButtonPressed(Button.A, () => {
    if (action == 0) {
        game.addScore(1);
        newAction();
    }
})
input.onGesture(Gesture.LogoDown, function () {
    if (action == 1) {
        game.addScore(1);
        newAction();
    }
}) 
input.onGesture(Gesture.Shake, () => {
    if (action == 2) {
        game.addScore(1);
        newAction();
    }
}) 
input.onButtonPressed(Button.B, () => {
    basic.showNumber(game.score(), 150);
    basic.pause(2000);
    newAction();
}) 
```

## Challenge 1

Now let's add some more types of instructions for the player to follow. Let's add `"PRESS PIN 0"`. 
Change the global variable `action` to `math.randomRange(0, 3)` so that we can add a new **IF** statement that checks if `action == 3`. If it does, display instructions to press pin 0.

```typescript
let action  = 0;
export function newAction() {
    action = Math.randomRange(0, 3)
    if (action == 0) {
        basic.showString("PUSH A", 150) // ***
    }
    if (action == 1) {
        basic.showString("LOGO DOWN", 150) // ***
    }
    if (action == 2) {
        basic.showString("SHAKE", 150) // ***
    }
    if (action == 3) {
        basic.showString("PRESS PIN 0", 150) // ***
    }
}
```

## Challenge 2

Now let's implement `PRESS PIN 0` in the main. Create a condition in an `input.onPinPressed` event that, whet pin `P0` is pressed, will add one to the score and then calls the `newAction` function.

```typescript
let action  = 0;
export function newAction() {
    // ...
}
input.onButtonPressed(Button.B, () => {
    basic.showNumber(game.score(), 150)
    basic.pause(2000)
    newAction()
})
input.onPinPressed(TouchPin.P0, () => {
    if (action == 3) {
        game.addScore(1)
        newAction()
    }
})
```

## Challenge 3

Add `POINT ME NORTH` to the list of possible commands.

