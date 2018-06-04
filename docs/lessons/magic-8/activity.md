# magic 8 activity

Welcome! This activity will help you create a magic 8 ball on the @boardname@. Let's get started!

Show a string to instruct the user how to play Magic 8! The magic 8 ball can only answer true or false questions.


```blocks
basic.showString("ASK A QUESTION")
```

Display the number 8.


```blocks
basic.showString("ASK A QUESTION")
basic.showNumber(8)
```

Create a condition for when the @boardname@ is shaken. Then use the block `clear screen` to clear the 8 from the display.

```blocks
basic.showString("ASK A QUESTION")
basic.showNumber(8)
input.onGesture(Gesture.Shake, () => {
    basic.clearScreen()
});
```

Create a variable of type number called **randomNumber**. Set **randomNumber** to a random number with a limit of 2. Remember the random function in the math library, picks a random number from 0 to the limit, but not including the limit unless it is 0.

```blocks
basic.showString("ASK A QUESTION")
basic.showNumber(8)
input.onGesture(Gesture.Shake, () => {
    basic.clearScreen()
    let randomNumber = Math.randomRange(0, 3)

});
```

Create an if statement for the condition `if randomNumber = 2`. If **randomNumber** is 2, display the string 'Yes'


```blocks
basic.showString("ASK A QUESTION")
basic.showNumber(8)
input.onGesture(Gesture.Shake, () =>  {
    basic.clearScreen();
    let randomNumber = Math.randomRange(0, 3);
    if (randomNumber == 2) {
        basic.showString("YES");
    }
});

```


Create an if statement for the condition `if randomNumber = 1`. If randomNumber is 1, display the string 'No'

```blocks
basic.showString("ASK A QUESTION")
basic.showNumber(8)
input.onGesture(Gesture.Shake, () => {
    basic.clearScreen()
    let randomNumber = Math.randomRange(0, 3)
    if (randomNumber == 2) {
        basic.showString("YES")
    } else if (randomNumber == 1) {
        basic.showString("NO")
    }
})
```

If **randomNumber** is not 2 or 1, it must be 0. This is the else condition. If **randomNumber** is 0, display the string 'I don't know'

```blocks
basic.showString("ASK A QUESTION")
basic.showNumber(8)
input.onGesture(Gesture.Shake, () =>  {
    basic.clearScreen()
    let randomNumber = Math.randomRange(0, 3)
    if (randomNumber == 2) {
        basic.showString("YES")
    } else if (randomNumber == 1) {
        basic.showString("NO")
    } else {
        basic.showString("I DON'T KNOW")

    }

})
```


Display the number 8 so users know they can ask the magic 8 ball another question!


```blocks
basic.showString("ASK A QUESTION")
basic.showNumber(8)
input.onGesture(Gesture.Shake, () =>  {
    basic.clearScreen()
    let randomNumber = Math.randomRange(0, 3)
    if (randomNumber == 2) {
        basic.showString("YES")
    } else if (randomNumber == 1) {
        basic.showString("NO")
    } else {
        basic.showString("I DON'T KNOW")
    }
    basic.showNumber(8)

})
```

## ~avatar avatar

Excellent, you're ready to continue with the [challenges](/lessons/magic-8/challenges)!

## ~

