# Activity: Double coin flipper

![Example Board](/static/courses/csintro/booleans/fuzzies.jpg)

Guide the students to create a program using Boolean variables and operators.
We’ll use our pseudocode from the previous activity to code a double coin flipper program.
 
For the first step, let’s create our variables.
Make a variable for each of the following:
* `CoinAHeads`
* `CoinBHeads`
* `PlayerAScore`
* `PlayerBScore`
 
Now we need to initialize the variable values.
Put a 'set' variable block for each of these 4 variables inside the 'on start' block.
 
The initial value of a variable is the value the variable will hold each time the program starts. 
By default: 
* a string variable is initialized to an empty string `""`
* a number variable is initialized to `0`
* a Boolean is initialized to `false`
 
Initialize the number variables to zero and the Boolean variables to `false`.
 
You can find the false blocks under the Logic menu.

![Logic menu](/static/courses/csintro/booleans/logic-menu.png)

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

Notice that we also added an image for the start screen, so the user knows the program has started and is ready. Does the image look like two coins?
 
## Random coin flips

When the player shakes the micro:bit, we will code the micro:bit to give each of our Boolean variables a random true/false value.
 
* From the Input Toolbox drawer, drag an 'on shake' block to the coding workspace
* From the Variables Toolbox drawer, drag 2 'set' variable blocks to the coding workspace
* Drag the 2 'set' blocks into the 'on shake' block
* Change the default `item` to `CoinAHeads` and `CoinBHeads`
* From the Math Toolbox drawer, drag 2 'pick random true or false' blocks to the coding workspace
* Hover over this 'pick random' block and note that its pop-up description mentions coin flipping!
 
![Pick Math random boolean](/static/courses/csintro/booleans/math-random-boolean.png)

* Attach these 'pick random' blocks to the 'set' variable blocks in the 'on shake' block

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

Now our logic block is ready for the next steps of our pseudocode.
1. Compare the current values of Coin A and Coin B.
2. If the current true/false values of Coin A and Coin B are the same, add a point to Player A’s score.
3. Otherwise, if the current true/false values of Coin A and Coin B are different, add a point to Player B’s score.
 
Because we were able to visualize our blocks as we wrote our pseudocode, we already know what blocks we will use and also know that we have simplified our code as much as possible!
 
* We can now simply add this to our current code
* And provide user feedback by adding some visuals

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

To finish our program, we’ll display the players’ current scores on button A pressed.

Here is the complete program for our Double Coin Flipper.

```blocks
let PlayerBScore = 0
let PlayerAScore = 0
let CoinBHeads = false
let CoinAHeads = false
input.onButtonPressed(Button.A, () => {
    CoinAHeads = Math.randomBoolean()
    CoinBHeads = Math.randomBoolean()
    PlayerAScore = 0
    PlayerBScore = 0
    basic.showLeds(`
        . # . . .
        # # # . .
        . # . # .
        . . # # #
        . . . # .
        `)
})
input.onGesture(Gesture.Shake, () => {
    CoinAHeads = true
    CoinBHeads = true
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

Try it out!
Have the students play a few more rounds of the Double Coin Flip using their new micro:bit Double Coin Flipper!
 
## Boolean operator NOT in a Loop

```block
input.onGesture(Gesture.Shake, () => {
    while (!(input.buttonIsPressed(Button.A))) {
    	for (let i = 0; i < 2; i++) {
            music.playTone(262, music.beat(BeatFraction.Half))
            music.playTone(523, music.beat(BeatFraction.Half))
        }
    }
})
```

Do you remember this code from our micro:bit Alarm?
Can you read this code and tell what it does?

_If the micro:bit is shaken, the micro:bit will play two tones twice and keep repeating this action until button A is pressed. So, after shaking, as long as ‘is button A pressed?’ is false, the two tone alarm will continue to repeat._
