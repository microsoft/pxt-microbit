# guess the number lesson

Learn to create a random number with input from button A.

## Topic

Math - Pick Random

## Quick links

* [activity](/lessons/guess-the-number/activity)
* [tutorial](/lessons/guess-the-number/tutorial)
* [challenges](/lessons/guess-the-number/challenges)
* [quiz](/lessons/guess-the-number/quiz)
* [quiz answers](/lessons/guess-the-number/quiz-answers)

## Prior learning/place of lesson in scheme of work

Learn how to create numbers randomly by using the input of the @boardname@. We will be learning how to create random numbers with input using a local variable as well as simple commands, such as pick number and show number.

## Documentation

```cards
input.onButtonPressed(Button.A, () => {})
let x = 0
basic.showNumber(0)
Math.randomRange(0, 3)
basic.clearScreen()
```

## Objectives

* learn how to run code when an input button is pressed
* learn how a variable is a place where you can store data
* learn how to set the value of a local variable
* learn how to returns a random number
* learn how to show a number on the LED screen, one digit at a time (scrolling left to right)
* learn how to turn off all the LED lights on the LED screen
