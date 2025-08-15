# Project: Everything counts

In this assignment, you'll come up with a micro:bit program that counts something. Your program should keep track of input by storing values in variables and provide output in some visual and useful way. You should also perform mathematical operations on the variables to give useful output.

## Input
Review all the different inputs available to you through the micro:bit.

![micro:bit input list](/static/courses/csintro/variables/input-list.png)

* Acceleration
* Light level
* Button is pressed
* Compass heading
* Temperature
* Running time
* On shake
* On button pressed
* On logo down
* On logo up
* One pin pressed
* On screen down
* On screen up
* Pin is pressed

## Project Ideas

### Duct tape wallet

You can see the instructions for creating a durable, fashionable wallet or purse out of duct tape: [Duct tape wallet](/projects/wallet). Create a place for the micro:bit to fit securely. Use Button A to add dollars to the wallet, and Button B to subtract dollars from the wallet.

**Extra mod:** Use other inputs to handle cents, and provide a way to display how much money is in the wallet in dollars and cents.

### Umpire’s baseball counter (balls and strikes)

During an at-bat, baseball umpires must keep track of what type of pitches have been thrown to each batter. Use Button A to record the number of balls (up to 4) and the number of strikes (up to 3).

**Extra mod:** Create a way to reset both variables to zero, create a way to see the number of balls and strikes on the screen at the same time.

### Shake counter

Using the 'On Shake' block, you can detect when the micro:bit has been shaken and increment a variable accordingly. Try attaching the micro:bit to a lacrosse stick and keep track of how many times you have successfully thrown the ball up in the air and caught it.

**Extra mod:** Make the micro:bit create a sound of increasing pitch every time you successfully catch the ball.

### Pedometer

See if you can count your steps while running or doing other physical activities carrying the micro:bit. Where is it best mounted? 

**Extra Mod:** Design a wearable band or holder that can carry the micro:bit securely so it doesn’t slip out during exercise.

### Calculator

Create an adding machine. Use Button A to increment the first number, and Button B to increment the second number. Then, use Shake or Buttons A + B to add the two numbers and display their sum.

**Extra mod:** Find a way to select and perform other math operations.

![micro:bit top and spin counter](/static/courses/csintro/variables/microbit-spinner.png)
_Homemade top with micro:bit revolution counter_

![Duct tape wallet](/static/courses/csintro/variables/duct-tape-wallet.jpg)
_Duct tape wallet with micro:bit display_

![Baseball pitch counter](/static/courses/csintro/variables/baseball-counter.jpg)
_Baseball pitch counter_

## Process

In any design project, it's important to start by understanding the problem. You can begin this activity by interviewing people around you who might have encountered the problem you are trying to solve. For example, if you are designing a wallet, ask your friends how they store their money, credit cards, identification, etc. What are some challenges with their current system? What do they like about it? What else do they use their wallets for?

If you are designing something else, think about how you might find out more information about your problem through interviewing or observing people using current solutions.

Then start brainstorming. Sketch out a variety of different ideas. Remember that it's okay if the ideas seem far-out or impractical. Some of the best products come out of seemingly wild ideas that can ultimately be worked into the design of something useful. What kind of holder can you design to hold the micro:bit securely? How will it be used in the real world, as part of a physical design?

Use the simulator to do your programming, and test out a number of different ideas. What is the easiest way to keep track of data? If you are designing for the accelerometer, try to see what different values are generated through different actions (you can display the value the accelerometer is currently reading using the 'Show Number' block; clear the screen afterward so you can see the reading).

```blocks
basic.forever(() => {
    basic.showNumber(input.acceleration(Dimension.X))
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
    `)
})
```

## Reflection

Write a short reflection (150–300 words) about your project, addressing the following points:

* What was the problem you were trying to solve with this project?
* What were the Variables that you used to keep track of information?
* What mathematical operations did you perform on your variables? What information did you provide?
* Describe what the physical component of your micro:bit project was (e.g., an armband, a wallet, a holder, etc.)
* How well did your prototype work? What were you happy with? What would you change?
* What was something that was surprising to you about the process of creating this project?
* Describe a difficult point in the process of designing this project, and explain how you resolved it.


