# Code
### @description code to make the Reaction Time interactive

This lesson uses the @boardname@ to measure the reaction time of a student by completing a circuit on a board. The student will be measuring his/her reaction time in an undistracted environment and a distracted environment.  

Connect each piece of foil to the appropriate pin on the @boardname@.  

### ~ hint

For the experiment we will **not** be utilizing the ``P2`` pin.

### ~

Test the apparatus by putting one hand on the ground pin and one hand on the ``P0`` pin.  This will complete the circuit and start the timer on the @boardname@ after a 3 second count down.

Once the timer starts, wait for the LED screen to light up and then press the Ground foil with one hand and and the ``P1`` with the other.  This will connect the circuit and shut off the timer.

The @boardname@ will then read off the time in milliseconds from when the timer starts and the circuit is completed.


## Step 1: Variables

In order for **Reaction Time** to follow the rules for determining the player's reaction speed, we need to add variables that will store data. Then we will assign (set) the value of the variables. We want to name the four (4) variables as follows: “start”, “end”, “false_start”, and “running”. Set the value of the variables, “start” and “end” to 0. Then set the value of the variable “false_start” and “running” to false. Modify your code so that your code looks like this.

In the code below: 
- the reaction time experiment will start and end at specific times based on the player's reaction.
- the code will keep track of when the experiment is running as well as when the player has a false start in the experiment.    

```blocks
let start = 0
let end = 0
let false_start = false
let running = false
running = false
false_start = false
end = 0
start = 0


```

## Step 2: On pin pressed

We want to register an event handler that will execute whenever the user holds the GND pin with one hand, and presses pin 0 or pin with the other hand, thus completing a circuit. When you run a script with this function in a web browser, click pins 0 or 1 in the simulator. The game will start on ``P0`` and the ``P1`` will detect when the player visualizes a single LED on the screen. Modify your code so that your code looks like this.

```blocks
let start = 0
let end = 0
let false_start = false
let running = false
input.onPinPressed(TouchPin.P0, () => {
	
})
input.onPinPressed(TouchPin.P1, () => {
	
})
running = false
false_start = false
end = 0
start = 0

```
## Step 3: Countdown timer

We want to code the countdown timer that will be displayed on pin pressed 0. We will insert three show number blocks to visually display the countdown: ``3 2 1``. Then we want to add a ``|basic|`` block clear screen to clear the numbers from the screen. Modify your code so that your code looks like this:

```blocks
let start = 0
let end = 0
let false_start = false
let running = false
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(3)
    basic.showNumber(2)
    basic.showNumber(1)
    basic.clearScreen()
})
input.onPinPressed(TouchPin.P1, () => {
	
})
running = false
false_start = false
end = 0
start = 0

```

## Step 4: Boolean 

We want to set variables, running and set false start to false. This occurs on pin 0 pressed. Those  blocks represent the true and false Boolean values. A Boolean has one of two possible values: true; false.

Modify your code so that your code looks like this:

```blocks
let start = 0
let end = 0
let false_start = false
let running = false
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(3)
    basic.showNumber(2)
    basic.showNumber(1)
    basic.clearScreen()
    running = false
    false_start = false
})
input.onPinPressed(TouchPin.P1, () => {
	
})
running = false
false_start = false
end = 0
start = 0

```


## Step 5: Begin reaction time randomly 

We want to introduce the reaction time experiment if there is not a false start on pin 0 pressed. Reaction time will randomly plot a LED on the x and y coordinates. Modify your code so that your code looks like this:

```blocks
let start = 0
let end = 0
let false_start = false
let running = false
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(3)
    basic.showNumber(2)
    basic.showNumber(1)
    basic.clearScreen()
    running = false
    false_start = false
    basic.pause(1000 + Math.random(2000))
})
input.onPinPressed(TouchPin.P1, () => {
	
})
running = false
false_start = false
end = 0
start = 0

```

## Step 6: Plot LED on X, Y coordinates randomly 

We want to introduce the reaction time experiment if there is not a false start. Reaction time will randomly plot a LED on the x and y coordinates. Modify your code so that your code looks like this:

```blocks
let start = 0
let end = 0
let false_start = false
let running = false
input.onPinPressed(TouchPin.P1, () => {
	
})
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(3)
    basic.showNumber(2)
    basic.showNumber(1)
    basic.clearScreen()
    running = false
    false_start = false
    basic.pause(1000 + Math.random(2000))
    if (!(false_start)) {
        start = input.runningTime()
        running = true
        led.stopAnimation()
        basic.clearScreen()
        led.plot(Math.random(5), Math.random(5))
    }
})
running = false
false_start = false
end = 0
start = 0
```


## Step 7: Display feedback to reaction 

We want to add code to detect when the player presses the Ground foil with one hand and and the P1 with the other. This code will connect the circuit and shut off the timer. We will add code to have the @boardname@ read off the time in milliseconds from when the timer starts and the circuit is completed. This code also detects if there is a correct reaction or false start on pin 1 pressed.  

We want to display one of two images on pin 1 pressed. The first image displays if the player correctly completes the circuit between GND and P1. A correct reaction occurs to complete the circuit on pin 1 pressed after the randomly generated LED appears on the screen. The seconde image displays if the player completes a circuit between GND and P1 on a false start. A false start occurs when the player completes a circuit on pin 1 pressed before the LED randomly appears on the x, y coordinates. Modify your code so that your code looks like this:  


```blocks
let start = 0
let end = 0
let false_start = false
let running = false
input.onPinPressed(TouchPin.P1, () => {
    if (running) {
        running = false
        end = input.runningTime()
        basic.showLeds(`
            # # . . .
            # # . . .
            # # . . .
            # # . . .
            # # . . .
            `)
        basic.pause(1000)
        basic.showNumber(end - start)
    } else {
        false_start = true
        basic.showLeds(`
            . . . . .
            # . # . .
            . # . . .
            # . # . .
            . . . . .
            `)
    }
})
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(3)
    basic.showNumber(2)
    basic.showNumber(1)
    basic.clearScreen()
    running = false
    false_start = false
    basic.pause(1000 + Math.random(2000))
    if (!(false_start)) {
        start = input.runningTime()
        running = true
        led.stopAnimation()
        basic.clearScreen()
        led.plot(Math.random(5), Math.random(5))
    }
})
running = false
false_start = false
end = 0
start = 0

```

## Extension 

After the students have finished their experiments.  Have them play the game with a friend (using the P2 pin) and have competitons to see who is the quickest on the draw. 

You can find the code for this below:


```blocks
let start = 0
let end = 0
let false_start = false
let running = false
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(3)
    basic.showNumber(2)
    basic.showNumber(1)
    basic.clearScreen()
    running = false
    false_start = false
    basic.pause(1000 + Math.random(2000))
    if (!(false_start)) {
        start = input.runningTime()
        running = true
        led.stopAnimation()
        basic.clearScreen()
        led.plot(Math.random(5), Math.random(5))
    }
})
input.onPinPressed(TouchPin.P1, () => {
    if (running) {
        running = false
        end = input.runningTime()
        basic.showLeds(`
            # # . . .
            # # . . .
            # # . . .
            # # . . .
            # # . . .
            `)
        basic.pause(1000)
        basic.showNumber(end - start)
    } else {
        false_start = true
        basic.showLeds(`
            . . . . .
            # . # . .
            . # . . .
            # . # . .
            . . . . .
            `)
    }
})
input.onPinPressed(TouchPin.P2, () => {
    if (running) {
        running = false
        end = input.runningTime()
        basic.showLeds(`
            . . . # #
            . . . # #
            . . . # #
            . . . # #
            . . . # #
            `)
        basic.pause(1000)
        basic.showNumber(end - start)
    } else {
        false_start = true
        basic.showLeds(`
            . . . . .
            . . # . #
            . . . # .
            . . # . #
            . . . . .
            `)
    }
})

```
