# dice roll activity

Create a dice on the @boardname@

## ~avatar avatar

Welcome! This tutorial will help you create a dice. Let's get started!

## ~

Let's create a condition for when the @boardname@ is shaken.


```blocks
input.onGesture(Gesture.Shake, () => {
    
})
```

We need to show a random value from 1 to 6 on our dice. So let's make a local variable called **roll**.

```blocks
input.onGesture(Gesture.Shake, () => {
    let roll = Math.randomRange(0, 6)
})
```

We need a condition for if **roll** is 5. We will show a `6` if **roll** is 5 because **roll** has a range from 0 to 5. We can use `show LEDs` to display the side of a dice that shows 6.


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
});
```


Let's use an `else if` condition for if **roll** is 4. If **roll** is 4 we can show 5 dots on the dice.


```blocks
input.onGesture(Gesture.Shake, ()=> {
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
});

```


Now we need to repeat the same steps for if **roll** is 3. If **roll** is 3 we will show `4` on the dice.


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
});
```


Let's also repeat these steps to show the 3, 2, and 1 on the dice. We are almost done with our dice!

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


## ~avatar avatar

Excellent, you're ready to continue with the [challenges](/lessons/dice-roll/challenges)!

## ~

