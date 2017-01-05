# number psych quiz answers

a 4-player game in which each player must outwit his opponents.

## Name

## Directions

Use this activity document to guide your work in the [number psych console tutorial](/lessons/number-psych-console/tutorial) and the [number psych controller tutorial](/lessons/number-psych-controller/tutorial).

Answer the questions while completing the tutorial. Pay attention to the dialogues!

**Questions 1-9 are concerned with 'number pysch console tutorial'**

## 1. Create a 'collection of options' and save them in a local variable named 'options'.

<br/>

```
let options = (<number[]>[])
```

## 2. Add the options '1', '3', and '5' into the local variable 'options'.

<br/>

```
options.push(1)
options.push(3)
options.push(5)
```

## 3. Create a collection of scores and add four values of '0' into the collection.  

<br />

```
let scores = (<number[]>[])
```

## 4. Write the code that reads a byte that indicates a controller is asking for a player number. (Don't bother checking if the byte received is 255.) Next, write the code that transfers the player number to the controller. 

<br />

```
scores = (<number[]>[])
for (let i2 = 0; i2 < 4; i2++) {
    scores.push(0)
}
```

## 5.Write the code that transfers the three options.

<br />

```
for (let i5 = 0; i5 < 3; i5++) {
    micro_bitTransfer.transferByte(options[i5])
    basic.pause(200)
}
```

## 6.Write the code that requests each player to send their choice in the player order number. Don't worry about reading their choice. (Hint: look at the four loop with 'k' as the index.)

<br />

```
for (let k = 0; k < 4; k++) {
    micro_bitTransfer.transferByte(101 + k)
}
```

## 7.Write the code to create two collections. One collection ("choices") stores all the choices, while the other collection ("has common") stores whether or not the choice is unique. (If the choice is not unique, then "has common" will be set to true for that particular choice.)

<br />

```
let choices = (<number[]>[])
let hasCommon = (<boolean[]>[])
```

## 8. Write the code that compares each of the choices with each other. If the two choices are the same, then set the appropriate value inside 'has common' to true. (Hint: look at the for loops with 'l' and 'n' as their indexes.)

<br />

```
for (let l = 0; l < 4; l++) {
    for (let n = 0; n < 4; n++) {
        // ### ~avatar avatar
        // If the choice at `l` and `n` are the same, assuming `l` isn't equal to `n`, then there is a match.
        // {stcode}
        // MACRO: stcode
        // ### ~
        if (choices[l] == choices[n] && ! (l == n)) {
            // ### ~avatar avatar
            // Set `has common` at `l` and `n` to true.
            // {stcode}
            // MACRO: stcode
            // ### ~
            hasCommon[l] = true
            hasCommon[n] = true
        }
    }
}
```

## 9. For each value inside 'has common', transfer a '1' if there is a match and transfer a '0' if there isn't a match. Add a pause of 100 milliseconds at the beginning of each transfer.)

<br />

```
for (let i4 = 0; i4 < 4; i4++) {
    basic.pause(100)
    if (hasCommon[i4]) {
        micro_bitTransfer.transferBit(1)
    } else {
        micro_bitTransfer.transferBit(0)
    }
}
```

**Questions 10-14 are concerned with 'number pysch controller tutorial'**

## 10. Write the code that asks for a player number if button 'A' is pressed on the BBC controller @boardname@.

<br />

```
input.onButtonPressed(Button.A, () => {
    if (gameMode == 0 && playerNumber == 0) {
        micro_bitTransfer.transferByte(255)
    }
})
```

## 11. Write the code that adds the three transferred options to the "options" collection. (Hint: look at the for loop with 'k' as the index.)

<br />

```
for (let k1 = 0; k1 < 3; k1++) {
    options.push(micro_bitTransfer.readByte())
}
```

## 12. Write the code that detects when button 'B' is pressed. Inside this condition, if 'game mode' is 2, set 'game mode' back to 1 and plot a waiting image.

<br />

```
input.onButtonPressed(Button.B, () => {
    if (gameMode == 2) {
        gameMode = 1
        basic.plotImage(`
. . . . .
. . . . .
. # # # .
. . . . .
. . . . .
`)
    }
})
```

## 13. Create a while loop that first reads which controller the console @boardname@ is requesting data from. Plot a waiting image, and then write an IF statement to check if the request corresponds to the controller. (Don't worry about writing anything inside the if statement).

<br />

```
while (true) {
    let playerRequest = micro_bitTransfer.readByte()
    basic.plotImage(`
. . . . .
. . . . .
. # # # .
. . . . .
. . . . .
`)
    if (playerRequest == 100 + playerNumber) {
    }
}
```

## 14. Write the code that displays an "X" on the @boardname@ if 'result' is 1. Otherwise, display a "check mark".

<br />

```
if (result == 1) {
    basic.plotImage(`
# . . . #
. # . # .
. . # . .
. # . # .
# . . . #
`)
} else {
    basic.plotImage(`
. . . . .
. . . . #
. . . # .
# . # . .
. # . . .
`)
}
```

