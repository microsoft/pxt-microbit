# prank wifi challenges

create a fake wifi app to trick your friends.

## Before we get started

Complete the following exercise. Your code should look like this:

```blocks
basic.showString("Check Wifi", 150)
basic.forever(() => {
    let xAccel = Math.abs(input.acceleration(Dimension.X))
    let yAccel = Math.abs(input.acceleration(Dimension.Y))
    let zAccel = Math.abs(input.acceleration(Dimension.Z))
    let sum = xAccel + yAccel + zAccel
    if (sum < 1400) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . # # . .
            # # # . .
            `)
    } else if (sum >= 1400 && sum < 1680) {
        basic.showLeds(`
            . . . . .
            . . . # .
            . . # # .
            . # # # .
            # # # # .
            `)
    } else if (sum >= 1680) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # . . . .
            `)
    }
})

```

## Challenge 1

What if wanted to show the maximum connectivity of wifi instead of just 1, 3, or 4 bars?

Let's start by changing the first **IF** statement to `if sum <1200`.

Edit this line: if sum is greater than 1400 then just click on the `1400` and backspace until you can add your own number of `1200`.

```blocks
basic.showString("Check Wifi", 150)
basic.forever(() => {
    let xAccel1 = Math.abs(input.acceleration(Dimension.X))
    let yAccel1 = Math.abs(input.acceleration(Dimension.Y))
    let zAccel1 = Math.abs(input.acceleration(Dimension.Z))
    let sum1 = xAccel1 + yAccel1 + zAccel1
    if (sum1 < 1200) {
        basic.showLeds(`
. . . . .
. . . . .
. . # . .
. # # . .
# # # . .
`)
    } else if (sum1 >= 1400 && sum1 < 1680) {
        basic.showLeds(`
. . . . .
. . . # .
. . # # .
. # # # .
# # # # .
`)
    }
    else if (sum1 >= 1680) {
        basic.showLeds(`
. . . . .
. . . . .
. . . . .
. . . . .
# . . . .
`)
    }
})
```

## Challenge 2

Let's add an **IF** at the bottom of your code that checks to see if `sum >= to 1200` **and** if `sum <1400`

```blocks
basic.showString("Check Wifi", 150)
basic.forever(() => {
    let xAccel2 = Math.abs(input.acceleration(Dimension.X))
    let yAccel2 = Math.abs(input.acceleration(Dimension.Y))
    let zAccel2 = Math.abs(input.acceleration(Dimension.Z))
    let sum2 = xAccel2 + yAccel2 + zAccel2
    if (sum2 < 1200) {
        basic.showLeds(`
. . . . .
. . . . .
. . # . .
. # # . .
# # # . .
`)
    } else if (sum2 >= 1400 && sum2 < 1680) {
        basic.showLeds(`
. . . . .
. . . # .
. . # # .
. # # # .
# # # # .
`)
    }
    else if (sum2 >= 1680) {
        basic.showLeds(`
. . . . .
. . . . .
. . . . .
. . . . .
# . . . .
`)
    }
    if (sum2 >= 1200 && sum2 < 1400) {
        basic.showLeds(`
. . . . #
. . . # #
. . # # #
. # # # #
# # # # #
`) 
    }
})
```

## Challenge 3

Now it's your turn! Be creative and change the Wifi meter images to your own wifi image you're sure will prank your friends by editing the lines that call `showLeds()`.

