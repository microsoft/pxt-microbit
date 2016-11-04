# screen wipe quiz answers

clear the screen by pressing the "A" button after an animation has been played.

This is the answer key for the [screen wipe quiz](/lessons/screen-wipe/quiz).

## 1. What does the function "clear screen" do on the @boardname@? 

This function turns off all the LED lights on the LED screen.

## 2. Write the line of code that creates and displays this animation.

![](/static/mb/lessons/screen-wipe-0.png)

<br/>

```
basic.showAnimation(`
# # # # . # # # # # . . . . . . . . . .
# # # # # # # # # # . . . . . . . . . .
. . . . . # # # # # # # # # # . . . . .
. . . . . # # # # # # # # # # # # # # #
. . . . . . . . . . . . . . . # # # # #
`, 400)
```

## 3. Write the condition that will detect when the @boardname@ is shaken.

<br/>

```
input.onGesture(Gesture.Shake, () => {
})
```

## 4. Write the code that will clear an animation from the screen after shaking the @boardname@.

<br/>

```
input.onGesture(Gesture.Shake, () => {
    basic.clearScreen()
})
```

