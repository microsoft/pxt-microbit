# Activity: Double coin flipper

![Example Board](/static/courses/csintro/booleans/fuzzies.jpg)

Let's create a program using Boolean variables and operators, using the pseudocode from Lesson A to code a double coin flipper program.

The pseudocode:

* Use the random function to get a true/false value for Coin A.
* Use the random function to get a true/false value for Coin B.
* Compare the current values of Coin A and Coin B.
>* If the current true/false values of Coin A and Coin B are the same, add a point to Player A's score.
>* Otherwise, the current true/false values of Coin A and Coin B must be different, so add a point to Player B's score.
* When players are done with their double coin flipping, show the final scores for each player.
 
## Initialize the Variables

In Microsoft MakeCode, have students start a new project and name it something like: Double coin flipper. They can leave the 'on start' block in the coding Workspace but can delete the 'forever' loop block.

* For the first step, let's create our variables. From the Variables Toolbox drawer, use the Make a variable button to create each of the following:
>* CoinAHeads
>* CoinBHeads
>* PlayerAScore
>* PlayerBScore
* Now, we need to initialize the variable values. Put four 'set' variable blocks inside the 'on start' block and use the drop-down menu to set the variable for each block to each of the new variables.
* The initial value of a variable is the value the variable will hold each time the program starts. By default:
>* a string variable is initialized to an empty string: ""
>* a number variable is initialized to: 0
>* a Boolean is initialized to: false

```blocks
let CoinAHeads = false
let CoinBHeads = false
let PlayerAScore = 0
let PlayerBScore = 0
basic.showLeds(`
    . # . . .
    # # # . .
    . # . # .
    . . # # #
    . . . # .
`)
```

Leave the number variables at 0 and initialize the Boolean variables to 'false'. You can find the 'false' hexagon blocks under the Boolean section of the Logic Toolbox drawer. Then add an image for the start screen, so the user knows the program has started and is ready. In the example below, the image is intended to look like two coins.
 
## Random coin flips

Let's use the micro:bit's *accelerometer* to mimic tossing a coin. The accelerometer measures the acceleration of your micro:bit; this component senses when the micro:bit is moved. It can also detect other actions like shake, tilt, and free fall. When the player shakes the micro:bit, we will code the micro:bit to give each of our Boolean variables a random true/false value.

* From the Input Toolbox drawer, drag an **'on shake'** block to the coding Workspace. Drag the two **'Set CoinAHeads'** and **'Set CoinBHeads'** blocks from the **'on start'** block into the **'on shake'** block.
* From the Math Toolbox drawer, drag two 'pick random true or false' blocks to the coding Workspace. Hover over this 'pick random' block and note that its pop-up description mentions coin flipping!

```blocks	
let CoinBHeads = false
let CoinAHeads = false
input.onGesture(Gesture.Shake, () => {
    CoinAHeads = Math.randomBoolean()
    CoinBHeads = Math.randomBoolean()
})
```

Now that the virtual CoinA and CoinB have been virtually flipped, we need to compare the outcomes to see if they are the same or different.

* From the Logic Toolbox drawer, drag an 'if...then...else' block to the coding workspace 
* Drag the 'if...then...else' block into the 'on shake' block under the 'set' variable blocks
* Drop one each of these 'pick random' blocks to the 'set' variable blocks in the 'on shake' block

```blocks
let CoinBHeads = false
let CoinAHeads = false
input.onGesture(Gesture.Shake, () => {
    CoinAHeads = Math.randomBoolean()
    CoinBHeads = Math.randomBoolean()
	if (true) {

    } else {

    }
})
```

That completes the first two steps of our pseudocode:

* Use the random function to get a true/false value for Coin A.
* Use the random function to get a true/false value for Coin B.

## Compare current values of both coins

Now that the virtual CoinA and CoinB have been virtually flipped, we need to compare the outcomes to see if they are the same or different, which is the next step of our pseudocode:

Compare the current values of Coin A and Coin B: If the current true/false values of Coin A and Coin B are the same, add a point to Player A's score. Otherwise, if the current true/false values of Coin A and Coin B are different, add a point to Player B's score.

* From the Logic Toolbox drawer, drag an **'if…then…else'** block to the coding Workspace. Then, drag the **'if…then…else'** block into the **'on shake'** block under the **'set'** variable blocks.
* Because we were able to visualize our blocks as we wrote our pseudocode, we already know what blocks we will use and also that we have simplified our code as much as possible! We can now simply add this to our current code and provide user feedback by adding some visuals.
* From the Logic Toolbox drawer, in the Comparison section, drag a **'0 = 0'** hexagon block to the coding Workspace and replace the 'true' hexagon in the **'if…then…else'** block. Then, from the Variables Toolbox drawer, drag a **'CoinAHeads'** variable to replace the first 0. You could drag the **'CoinBHeads'** variable to replace the second 0, but another option is to duplicate the **'CoinAHeads'** variable, snap it into the second 0, and use the drop-down menu to select **'CoinBHeads'** option.
* To add a point to Player A's score, go to the Variables Toolbox drawer and drag a **'change (variable) by 1'** block into the **'then'** option and make sure it's set to the **'PlayerAScore'** variable. Then to give a visual cue that Player A got the point, go to the Basic Toolbox drawer, drag a **'show leds'** block and **'pause'** block onto the coding Workspace and connect them into the **'then'** option above the **'change PlayerBScore by 1'** block. In the **'show leds'** block, select the boxes to show the letter A.
* Do the same for Player B in the 'else' option. Instead of dragging the needed blocks from the Toolbox drawers, duplicate the blocks and change the 'show leds' block and 'change PlayerAScore' variable accordingly.
* To signify the end of the on-shake coin toss, let's show the two-coin image on the micro:bit again. From the Basic Toolbox drawer, drag a **'show leds'** block to the coding Workspace and connect it below the conditional blocks. Select the boxes to show the two coins.
* Now, test the code in the Simulator to make sure it works as intended.

```blocks
let PlayerBScore = 0
let PlayerAScore = 0
let CoinBHeads = false
let CoinAHeads = false
input.onGesture(Gesture.Shake, () => {
    CoinAHeads = Math.randomBoolean()
    CoinBHeads = Math.randomBoolean()
    if (CoinAHeads == CoinBHeads) {
        basic.showLeds(`
            . . # . .
            . # . # .
            . # # # .
            . # . # .
            . # . # .
            `)
        basic.pause(100)
        PlayerAScore += 1
    } else {
        basic.showLeds(`
            . # # . .
            . # . # .
            . # # . .
            . # . # .
            . # # . .
            `)
        basic.pause(100)
        PlayerBScore += 1
    }
    basic.showLeds(`
        . # . . .
        # # # . .
        . # . # .
        . . # # #
        . . . # .
        `)
})
```

## Show each player's score

To finish our program, we'll complete the last step of the pseudocode.

When players are done with their double coin flipping, show the final scores for each player.

We'll use button A to do this.

* From the Input Toolbox drawer, drag an 'on button A pressed' block to the coding Workspace. Duplicate the 'show leds' block with the letter A and connect it inside the 'on button A pressed' block. Then, from the Basic Toolbox drawer, drag the 'show number' block to the Workspace and connect it below the 'show leds' block.
* From the Variables Toolbox drawer, drag a 'PlayerAScore' variable to replace the 0.
* Let's add a pause before showing Player B's score. Use the drop-down menu and select 500 ms. Then, follow the previous steps to show Player B's score. Try to complete this without going into the Toolbox! Hint: Use duplicates and drop-down menus.
* The final steps are to add another 500 ms pause and have the micro:bit show the double coins to signify it's ready for another on-shake coin toss.

Here is the complete program for our Double Coin Flipper.

```blocks
let PlayerBScore = 0
let PlayerAScore = 0
let CoinBHeads = false
let CoinAHeads = false
input.onButtonPressed(Button.A, () => {
    basic.showString("A:" + PlayerAScore)
    basic.pause(100)
    basic.showString("B:" + PlayerAScore)
})
input.onGesture(Gesture.Shake, () => {
    CoinAHeads = Math.randomBoolean()
    CoinBHeads = Math.randomBoolean()
    if (CoinAHeads == CoinBHeads) {
        basic.showLeds(`
            . . # . .
            . # . # .
            . # # # .
            . # . # .
            . # . # .
            `)
        basic.pause(100)
        PlayerAScore += 1
    } else {
        basic.showLeds(`
            . # # . .
            . # . # .
            . # # . .
            . # . # .
            . # # . .
            `)
        basic.pause(100)
        PlayerBScore += 1
    }
    basic.showLeds(`
        . # . . .
        # # # . .
        . # . # .
        . . # # #
        . . . # .
        `)
})
```

Solution link: [Random Coin Toss](https:/makecode.microbit.org/_YHuAxKere6vM)

## Test, Download, and Play! Try it out!

Test your code on the Simulator. Then, download to the micro:bit and try it out! Play a few more rounds of the Double Coin Flip using your new micro:bit Double Coin Flipper!

## Knowledge Check

Questions:

1. How many values can a Boolean have?
2. Name the three common Boolean operators we have discussed in this unit?
3. Why do we set the initial value of a variable inside the **'on start'** block?

Answers:

1. A Boolean data type has only two values: true or false.
2. And, Or, Not
3. The initial value of a variable is the value the variable will hold each time the program starts.