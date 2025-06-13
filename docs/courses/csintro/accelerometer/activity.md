# Coding Activity: Stand for Health!

In our modern world, most of us sit for long stretches of time without ever getting up to stretch our legs. Standing up every so often is good for our physical health.

We will use the micro:bit’s accelerometer to create a program that will let us know if we have been sitting too long.

1. Inside the Variables Toolbox: Create a variable to keep track of how much time has passed since the program started.
	- Name the variable **TimeStarted**.
	- Place the newly created ‘**set TimeStarted**’ block inside the ‘**on start**’ block. 
	- Set the value of this variable to **0 (zero)** each time the program starts.

```block
let TimeStarted = 0
```

2. From the Logic toolbox: Get and place an ‘**if…else**’ block inside the ‘**forever**’ block.
 - From the Logic toolbox: Get and place a **comparison** block into the ‘**true**’ space in the ‘**if**’ line of code.
 - From the Input Toolbox: Get and place the **acceleration** block into the **left side of the comparison block**.
 - In the **acceleration** block: Change the default value of ‘x’ to ‘z’.
 - Set the **comparison** block symbol to ‘**less than**’ (<).
 - Set the value on the **right-hand side of the comparison block** to **-700**.

```block
basic.forever(function () {
    if (input.acceleration(Dimension.Z) < -700) {
    	
    } else {
    	
    }
})

```
## Check for Understanding

This line of code tells the micro:bit to forever check the acceleration of the micro:bit and if the value of acceleration is less than -700, do something.

Remember that when the micro:bit is lying flat on a surface with the screen pointing up:

 x is 0, y is 0, z is -1023, and strength is 1023.
 
If the micro:bit is lying face up and flat, the Z value will be in this negative range. When your program is done, you can experiment with this number value, making it greater or less than the value used here to see how changing the value affects how the micro:bit reacts.

3. From the Basic Toolbox: Get two ‘show leds’ blocks.
 - Place one ‘show leds’ block under the ‘if’ line of code.
 - Make an image of a chair in this block to indicate sitting. (Feel free to change it to an image that works for you.)
 - Place the other ‘show leds’ block under the ‘else’ line of code. 
 - Make an image of a person standing in this block. (Feel free to change it to an image that works for you.)

```block
basic.forever(function () {
    if (input.acceleration(Dimension.Z) < -700) {
        basic.showLeds(`
            # . . . .
            # . . . .
            # # # # .
            # . . # .
            # . . # .
            `)
    } else {
        basic.showLeds(`
            . . # . .
            # # # # #
            . . # . .
            . # . # .
            . # . # .
            `)
    }
})

```

## Check for Understanding

Now our micro:bit will show the chair image if the micro:bit is lying face up and flat, and a person standing image if the position of the micro:bit changes from lying flat and face up.

Now, we will add in the time variable to keep track of how long we have been sitting.

4. From the Logic toolbox: Get and place an ‘**if**’ block directly under the first ‘**show leds**’ block.
 - From the Logic toolbox: Get and place a **comparison** block into the ‘**true**’ space in this ‘if’ line of code.
 - From the Math Toolbox: Get and place an **operation** block into the **left side of the comparison block**.
 - From the Input…more Toolbox: Get and place a ‘**running time(ms)**’ block into the **left side of the math operation block**.
 - Set the **math operation** to **minus (-)**.
 - From the Variables Toolbox: Get and place a ‘**TimeStarted**’ block into the **right side of the math operations block**.
 - Set the **comparison** block symbol to ‘**greater than**’ **(>)**.
 - Set the value on the **right-hand side of the comparison block** to **10000** (ten seconds).

```block
basic.forever(function () {
    if (input.acceleration(Dimension.Z) < -700) {
        let TimeStarted = 0
        basic.showLeds(`
            # . . . .
            # . . . .
            # # # # .
            # . . # .
            # . . # .
            `)
        if (input.runningTime() - TimeStarted > 10000) {
        	
        }
    } else {
        basic.showLeds(`
            . . # . .
            # # # # #
            . . # . .
            . # . # .
            . # . # .
            `)
    }
})
```

## Check for Understanding

This if statement tells the micro:bit to check the difference between when we started the program and now. If the difference between when the program started and now is greater than 10 seconds, do something.

We will have the micro:bit flash a message to indicate that you have been sitting longer than the desired time. 

NOTE: We’re using 10 seconds here for demonstration and testing purposes. In reality, you would want to set the time somewhere closer to half an hour, which is 1,800,000 milliseconds.

5. From the Loops Toolbox: Get and place a ‘**repeat**’ block under the **if statement** we just created.
 - From the Basic Toolbox: Get one ‘**show leds**’ block, one ‘**clear screen**’ block, and two ‘**pause**’ blocks.
 - Place the ‘**show leds**’ block inside the ‘**repeat**’ block.
 - Create an arrow image or an image of your choosing in this block. This image will flash on the micro:bit screen to alert the user that it’s time to stand up!
 - Place one of the ‘**pause**’ blocks below this ‘**show leds**’ block.
 - Place the ‘**clear screen**’ block just below the ‘**pause**’ block.
 - Place the second ‘**pause**’ block just below the ‘**clear screen**’ block.



```blocks
basic.forever(function () {
    if (input.acceleration(Dimension.Z) < -700) {
        let TimeStarted = 0
        basic.showLeds(`
            # . . . .
            # . . . .
            # # # # .
            # . . # .
            # . . # .
            `)
        if (input.runningTime() - TimeStarted > 10000) {
            for (let index = 0; index < 4; index++) {
                basic.showLeds(`
                    . . # . .
                    . # # # .
                    # . # . #
                    . . # . .
                    . . # . .
                    `)
                basic.pause(100)
                basic.clearScreen()
                basic.pause(100)
            }
        }
    } else {
        basic.showLeds(`
            . . # . .
            # # # # #
            . . # . .
            . # . # .
            . # . # .
            `)
        basic.pause(100)
        basic.clearScreen()
        basic.pause(100)
    }
})
```

In addition to this flashing image, let’s add a message!

6. From the Basic Toolbox: Get and place a ‘**show string**’ block below the ‘**repeat**’ loop block.
 - Write a short message reminding the user to stand up!
 - When the user stands up, they will see the person standing image.
 - In case the user sits back down again, we need to reset the **TimeStarted** variable to the current program runtime.
 - From the Variables Toolbox: Get and place a ‘**set TimeStarted**’ block just below the image of the person standing in the else section of the code.
 - From the Input…more Toolbox: Get and place a ‘**running time(ms)**’ block into the right side of the ‘**set TimeStarted**’ block.

Note: You can also manually restart the program each time you sit back down by pressing the micro:bit’s reset button or by turning the battery pack on and off (if your battery pack has an on/off switch.)


## Complete program

Here is the complete Stand Up! program:

```blocks
let TimeStarted = 0
basic.forever(function () {
    if (input.acceleration(Dimension.Z) < -700) {
        basic.showLeds(`
            # . . . .
            # . . . .
            # # # # .
            # . . # .
            # . . # .
            `)
        if (input.runningTime() - TimeStarted > 10000) {
            for (let index = 0; index < 4; index++) {
                basic.showLeds(`
                    . . # . .
                    . # # # .
                    # . # . #
                    . . # . .
                    . . # . .
                    `)
                basic.pause(100)
                basic.clearScreen()
                basic.pause(100)
            }
            basic.showString("Stand Up!!")
        }
    } else {
        basic.showLeds(`
            . . # . .
            # # # # #
            . . # . .
            . # . # .
            . # . # .
            `)
        basic.pause(100)
        basic.clearScreen()
        basic.pause(100)
        TimeStarted = input.runningTime()
    }
})
```

Solution link: [https://makecode.microbit.org/S25983-43564-75646-69984]()

## Knowledge Check

**Questions:**

1. What does velocity measure?
2. What does acceleration measure?
3. In the **Stand for Health!** activity, what did the TimeStarted block measure?
4. Using pseudocode, describe what these code blocks do.

```blocks
basic.forever(function () {
    if (input.acceleration(Dimension.X) < -700) {
        basic.showLeds(`
            # . . . .
            # . . . .
            # # # # .
            # . . # .
            # . . # .
            `)
    } else {
        basic.showLeds(`
            . . # . .
            # # # # #
            . . # . .
            . # . # .
            . # . # .
            `)
    }
})
```

**Answers:**

1. Velocity measures how fast an object’s position is changing over time, in both speed and direction.
2. Acceleration measures an object’s change in velocity.
3. The TimeStarted block measured the number of milliseconds that had passed since the start of the program.
4. If the micro:bit is lying flat, the screen will display a chair. If its position changes from lying flat, it will show a person standing.