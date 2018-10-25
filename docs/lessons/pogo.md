# pogo lesson

create a game that relies on precise instincts and timing reflexes #if #.

## Topic

Running Time

## Quick Links

* [activity](/lessons/pogo/activity)

## Prior learning/place of lesson in scheme of work

Learn how to use running time. We will be learning how to create a pogo game using variables, forever loop, conditionals, on button pressed, as well as simple commands, such as show LEDs and clear screen.

## Documentation
```cards
let jumps = 0
let acc = input.acceleration(Dimension.Y)
basic.showNumber(0)
led.stopAnimation()
radio.sendNumber(0)
basic.forever(() => { })
basic.showLeds(`
    . . . . .
    . # . # .
    . . # . .
    # . . . #
    . # # # .
    `)
basic.clearScreen()
if (true) {}
radio.onReceivedNumber(function (receivedNumber) { })
```
## Objectives

* learn how to create a function as a unit of code that performs a specific task and returns a result
* learn how arithmetic operators operate on numbers and return a number
* learn how to repeat code in the background forever
* learn how to conditionally run code depending on whether a condition is true or not
* learn how to run code when an input button is pressed
* learn how to pause your code for the specified number of milliseconds

```package
radio
```