# speed button challenges

Coding challenges for the speed button tutorial.

## Before we get started

Complete the following guided tutorial:

Your starting code should look like this:

```blocks
let counter = 0
let fastPress = false
input.onButtonPressed(Button.A, () => {
    counter = counter + 1
})
```

## Challenge 1

We need to know when the user has hit button `A` 15 times. The user wins when he/she is able to accomplish this in less than 5000 milliseconds (5 seconds). We can check for both conditions by using an `and` operator. When using an `and` operator, both conditions need to be true in order for the condition to be true.

```blocks
let counter1 = 0
let fastPress1 = false
input.onButtonPressed(Button.A, () => {
    counter1 = counter1 + 1
    if (counter1 == 15 && input.runningTime() < 5000) {
    }
})
```

Next, if the user has won, let's set our boolean to true. This indicates that he or she has won.

```blocks
let counter2 = 0
let fastPress2 = false
input.onButtonPressed(Button.A, () => {
    counter2 = counter2 + 1
    if (counter2 == 15 && input.runningTime() < 5000) {
        fastPress2 = true // ***
    }
})
```

## Challenge 2

We want to set `fastPress` to false if the user was too slow. To do so, we need another condition to see if the user took more than 5000 milliseconds (5 seconds). In the `if` statement, set `fastPress` to false.

```blocks
let counter3 = 0
let fastPress3 = false
input.onButtonPressed(Button.A, () => {
    counter3 = counter3 + 1
    if (counter3 == 15 && input.runningTime() < 5000) {
        fastPress3 = true
    }
    if (counter3 == 15 && input.runningTime() > 4999) {
        fastPress3 = false // ***
    }
})
```

## Challenge 3



Now let's display if the user won or lost. To do so, we need to check the status of `fastPress` when the game is finished, and then show the correct message.

```blocks
let counter4 = 0
let fastPress4 = false
input.onButtonPressed(Button.A, () => {
    counter4 = counter4 + 1
    if (counter4 == 15 && input.runningTime() < 5000) {
        fastPress4 = true
    }
    if (counter4 == 15 && input.runningTime() > 4999) {
        fastPress4 = false
    }
    if (counter4 == 15 && fastPress4) {
        basic.showString("YOU WIN!", 150) // ***
    }
    if (counter4 == 15 && ! fastPress4) {
        basic.showString("TOO SLOW!", 150) // ***
    }
})
```

* Click the `run` button to see if the code runs properly.

## Challenge 4



Modify the code to change the difficulty level. Increasing the time will make it easier, while decreasing the time will make it harder. For example, changing the 5000 milliseconds to 6000 milliseconds will make the difficulty easier.

