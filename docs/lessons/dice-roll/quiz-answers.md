# dice roll quiz answers

Create a dice when the @boardname@ is shaken 

These are the answers to the [dice roll quiz](/lessons/dice-roll/quiz).

## 1. Create a variable named 'roll' that will be randomly assigned to a number between 0 and 5.

<br/>

```blocks
let roll = Math.randomRange(0, 6)
```

## 2. If the variable "roll" equals 5, write the code that will plot the image below

![](/static/mb/lessons/die-roll-0.png)

<br/>

```blocks
let roll = Math.randomRange(0, 6)
if (roll == 5) {
    basic.showLeds(`
. # . # .
. . . . .
. # . # .
. . . . .
. # . # .
`)
}
```

## 3. You will use an `else if` condition if "roll" is equal 4. Write the `else if` statement that will display the plot image below

![](/static/mb/lessons/die-roll-1.png)

<br />

```blocks

let roll = Math.randomRange(0, 6)
if (roll == 5) {
    basic.showLeds(`
. # . # .
. . . . .
. # . # .
. . . . .
. # . # .
`)
} else if (roll == 4) {
    basic.showLeds(`
. . . . .
. # . # .
. . # . .
. # . # .
. . . . .
`)
}
```

Note: students are only required to write the bottom half of this answer, starting with "else if".

## 4. You will use an `else if` condition if "roll" is equal 3. Write the `else if` statement that will display the plot image below

![](/static/mb/lessons/die-roll-2.png)

<br />

```blocks
let roll = Math.randomRange(0, 6)
if (roll == 4) {
    basic.showLeds(`
. . . . .
. # . # .
. . # . .
. # . # .
. . . . .
`)
} else if (roll == 3) {
    basic.showLeds(`
. . . . .
. # . # .
. . . . .
. # . # .
. . . . .
`)
}
```

Note: students are only required to write the bottom half of this answer, starting with "else if".

## 5. You will use an `else if` condition if "roll" is equal 2. Write the `else if` that will display the image below

![](/static/mb/lessons/die-roll-3.png)

<br />

```blocks
let roll = Math.randomRange(0, 6)
if (roll == 3) {
    basic.showLeds(`
. . . . .
. # . # .
. . . . .
. # . # .
. . . . .
`)
} else if (roll == 2) {
    basic.showLeds(`
# . . . .
. . . . .
. . # . .
. . . . .
. . . . #
`)
}
```

Note: students are only required to write the bottom half of this answer, starting with "else if".

