# dice roll challenges

Create a dice on the @boardname@. 

## Before we get started

Complete the following [guided tutorial](/lessons/dice-roll/activity), your code should look like this:

```blocks 
input.onGesture(Gesture.Shake, () => {
    let roll = Math.randomRange(0, 6);
    if (roll == 5) {
        basic.showLeds(`
. # . # .
. . . . .
. # . # .
. . . . .
. # . # .`);
    }
    else if (roll == 4) {
        basic.showLeds(`
. . . . .
. # . # .
. . # . .
. # . # .
. . . . .`);
    }
    else if (roll == 3) {
        basic.showLeds(`
. . . . .
. # . # .
. . . . .
. # . # .
. . . . .`);
    }
    else if (roll == 2) {
        basic.showLeds(`
# . . . .
. . . . .
. . # . .
. . . . .
. . . . #`);
    }
    else if (roll == 1) {
        basic.showLeds(`
. . . . .
. # . . .
. . . . .
. . . # .
. . . . .`);
    }
    else {
        basic.showLeds(`
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .`);
    }
});
```

## Challenge 1

Modify the line of code with `pick random` so that only number 1-4 can appear on the dice.


```blocks 
input.onGesture(Gesture.Shake, () => {
    let roll = Math.randomRange(0, 4);
    if (roll == 5) {
        basic.showLeds(`
. # . # .
. . . . .
. # . # .
. . . . .
. # . # .`);
    }
    else if (roll == 4) {
        basic.showLeds(`
. . . . .
. # . # .
. . # . .
. # . # .
. . . . .`);
    }
    else if (roll == 3) {
        basic.showLeds(`
. . . . .
. # . # .
. . . . .
. # . # .
. . . . .`);
    }
    else if (roll == 2) {
        basic.showLeds(`
# . . . .
. . . . .
. . # . .
. . . . .
. . . . #`);
    }
    else if (roll == 1) {
        basic.showLeds(`
. . . . .
. # . . .
. . . . .
. . . # .
. . . . .`);
    }
    else {
        basic.showLeds(`
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .`);
    }
});
```

## Challenge 2

Let's make a trick dice! Modify the line of code with `pick random` so that only numbers 3-6 can appear on the dice. Also note that we need to ensure `roll = 0` when only 1 dot is shown on the @boardname@.

```blocks 
input.onGesture(Gesture.Shake, () => {
    let roll = Math.randomRange(0, 4) + 2;
    if (roll == 5) {
        basic.showLeds(`
. # . # .
. . . . .
. # . # .
. . . . .
. # . # .`);
    }
    else if (roll == 4) {
        basic.showLeds(`
. . . . .
. # . # .
. . # . .
. # . # .
. . . . .`);
    }
    else if (roll == 3) {
        basic.showLeds(`
. . . . .
. # . # .
. . . . .
. # . # .
. . . . .`);
    }
    else if (roll == 2) {
        basic.showLeds(`
# . . . .
. . . . .
. . # . .
. . . . .
. . . . #`);
    }
    else if (roll == 1) {
        basic.showLeds(`
. . . . .
. # . . .
. . . . .
. . . # .
. . . . .`);
    }
    else {
        basic.showLeds(`
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .`);
    }
});
```

## Challenge 3

Add a couple more conditions so that the @boardname@ randomly chooses a number between 1 and 8.

