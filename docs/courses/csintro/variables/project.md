# Project: Everything counts

This is an assignment for students to come up with a micro:bit program that counts something. 
Their program should keep track of **input** by storing values in variables, and provide **output** in some visual and useful way. 
Students should also perform mathematical operations on the variables to give useful output.

## Input
Remind the students of all the different inputs available to them through the micro:bit.

![micro:bit input list](/static/courses/csintro/variables/input-list.png)

## Project Ideas

### Duct tape wallet

You can see the instructions for creating a durable, fashionable wallet or purse out of duct tape: [Duct tape wallet](/projects/wallet). Create a place for the micro:bit to fit securely. Use Button A to add dollars to the wallet, and Button B to subtract dollars from the wallet.

**Extra mod:** Use other inputs to handle cents, and provide a way to display how much money is in the wallet in dollars and cents.

### Umpire’s baseball counter (pitches and strikes)

In baseball during an at-bat, umpires must keep track of how many pitches have been thrown to each batter. Use Button A to record the number of balls (up to 4) and the number of strikes (up to 3).

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
Homemade top with micro:bit revolution counter

![Duct tape wallet](/static/courses/csintro/variables/duct-tape-wallet.jpg)
Duct tape wallet with micro:bit display

![Baseball pitch counter](/static/courses/csintro/variables/baseball-counter.jpg)
Baseball pitch counter

## Process

In any design project, it's important to start by understanding the problem. You can begin this activity by interviewing people around you who might have encountered the problem you are trying to solve. For example, if you are designing a wallet, ask your friends how they store their money, credit cards, identification, etc. What are some challenges with their current system? What do they like about it? What else do they use their wallets for?

If you are designing something else, think about how you might find out more information about your problem through interviewing or observing people using current solutions.

Then start brainstorming. Sketch out a variety of different ideas. Remember that it's okay if the ideas seem far-out or impractical. Some of the best products come out of seemingly crazy ideas that can ultimately be worked into the design of something useful. What kind of holder can you design to hold the micro:bit securely? How will it be used in the real world, as part of a physical design?

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

Have students write a reflection of about 150–300 words, addressing the following points:

* What was the problem you were trying to solve with this project?
* What were the Variables that you used to keep track of information?
* What mathematical operations did you perform on your variables? What information did you provide?
* Describe what the physical component of your micro:bit project was (e.g., an armband, a wallet, a holder, etc.)
* How well did your prototype work? What were you happy with? What would you change?
* What was something that was surprising to you about the process of creating this project?
* Describe a difficult point in the process of designing this project, and explain how you resolved it.

## Assessment

**Competency scores**: 4, 3, 2, 1

### Variables
>**4 =** At least 3 different variables are implemented in a meaningful way.<br/>
**3 =** At least 2 variables are implemented in a meaningful way.<br/>
**2 =** At least 1 variable is implemented in a meaningful way.<br/>
**1 =** No variables are implemented.

### Variable names

>**4 =** All variable names are unique and clearly describe what information values the variables hold.<br/>
**3 =** The majority of variable names are unique and clearly describe what information values the variables hold.<br/>
**2 =** A minority of variable names are unique and clearly describe what information values the variables hold.<br/>
**1 =** None of the variable names clearly describe what information values the variables hold.<br/>

### Mathematical operations
>**4 =** Uses a mathematical operation on at least two variables in a way that is integral to the program.<br/>
**3 =** Uses a mathematical operation on at least one variable in a way that is integral to the program.<br/>
**2 =** Uses a mathematical operation incorrectly or not in a way that is integral to the program.<br/>
**1 =** No mathematical operations are used.

### micro:bit program
>**4 =** micro:bit program:<br/>
` *` Uses variables in a way that is integral to the program<br/>
` *` Uses mathematical operations to add, subtract, multiply, and/or divide variables<br/>
` *` Compiles and runs as intended<br/>
` *` Meaningful comments in code<br/>
**3 =** micro:bit program lacks 1 of the required elements.<br/>
**2 =** micro:bit program lacks 2 of the required elements.<br/>
**1 =** micro:bit program lacks 3 or more of the required elements.

### Collaboration reflection

>**4 =** Reflection piece addresses all prompts.<br/>
**3 =** Reflection piece lacks 1 of the required elements.<br/>
**2 =** Reflection piece lacks 2 of the required elements.<br/>
**1 =** Reflection piece lacks 3 of the required elements. 


