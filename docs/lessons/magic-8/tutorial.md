# Magic 8 tutorial

Show a string to instruct the user how to play Magic 8! The magic 8 ball can only answer questions with "YES", "NO", or "MAYBE"...

## Rebuild the game!

The blocks have been shuffled! Put them back together so that...
* show "ASK A QUESTION" on the screen
* when the @boardname@ is shaken,
  * generate a random number between 0 and 2.
  * if the number is `2`, show "YES"
  * if the number is `1`, show "NO"
  * otherwise show "MAYBE"...

```shuffle
basic.showString("ASK A QUESTION")
input.onGesture(Gesture.Shake, () =>  {
    let randomNumber = Math.randomRange(0, 3)
    if (randomNumber == 2) {
        basic.showString("YES")
    } else if (randomNumber == 1) {
        basic.showString("NO")
    } else {
        basic.showString("MAYBE")
    }
})
```
