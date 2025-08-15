# Activity: Loops demos

For this lesson's coding activities, we'll use three different loop blocks in Microsoft MakeCode:

* 'repeat' block – This block repeats the code n number of times.
* 'while' block – This block runs the code as long as the condition inside of it is true.
* 'for' block – This block repeats the code n number of times but with a variable.

We'll do three coding activities to demonstrate how each type of loop block works.

## Coding activity 1: Code a sprite to walk a square with the 'repeat' loop
In this example, you'll be coding Sprite to walk in a square.

* In Microsoft MakeCode, start a new project and name it something like: **Sprite walking square**. You can leave the 'on start' block in the coding Workspace but can delete the 'forever' loop block.
	
![Loops category](/static/courses/csintro/iteration/loops-category.png)

* On start, we want the sprite to appear. To make this happen, go to the Variables Toolbox drawer, and select the “Make a Variable” button. Name the new variable *sprite* and select OK. Now, in the Variables Toolbox drawer, drag a 'set sprite to' block to the coding Workspace and drop it inside the 'on start' block.

### Create a Sprite

* Select the *Advanced* category at the bottom of the Toolbox. This will open up more of the Toolbox menu. Select the Game category and drag a 'create sprite' oval block to the coding Workspace. Drop it in the 'set sprite' block, replacing 0.

![Game category](/static/courses/csintro/iteration/game-category.png)

You should now see the 'sprite', or a red LED light, appear in the middle of the micro:bit simulator.

On the face of the micro:bit is a 5 x 5 grid of LED lights. The X coordinates are the horizontal light positions that go from 0-4, and the Y coordinates are the vertical light positions that go from 0-4 as well. We can see from the code blocks that we've created our sprite at X, Y position (2, 2). If we want to start our sprite in the top left of the screen, we'll have to change the starting coordinates to (0, 0).

### Moving the Sprite

Now let's make our sprite move around the face of the micro:bit. We'll activate this when we press a button.

* From the Input Toolbox drawer, drag a 'on button pressed' block onto the workspace.<br/><br/>We'll need two more blocks from the Game menu. Referring to the pseudocode, see if the you can find the blocks you need for moving your sprite forward and turning your sprite.
* From the Game Toolbox drawer, drag out a 'sprite move by' block and a 'sprite turn right by' block to the coding Workspace and drop into the 'on button pressed' block.
* To make the sprite move from one side of the screen to the other (as though walking around a chair), we'll need to move the sprite 4 places. So, change the value in the 'sprite move by' block from 1 to 4.
* To make the sprite turn to walk a square, change the 'turn right by' degrees from 45 to 90. For now, it's OK to leave the sprite turning right instead of left as we did in our pseudocode.

### Using the 'Repeat' block

Following our pseudocode, we could add three more Move and Turn blocks to make our sprite walk a square, but there is an easier, more efficient way to code this! By using a Repeat loop.

* Select the Loops category in the Toolbox. Drag the 'repeat' block to the coding Workspace and place it around the sprite 'move by' and 'turn' blocks.

Notice that the 'repeat' block contains a default value of 4. This means that it will repeat whatever blocks of code it contains four times.

Go ahead and run the program. Make the sprite move by pressing button A in the simulator.

What happened? Did you see the sprite move? No? Why? Because it happens so quickly, you can't see the sprite appear.

### Use Debug Mode

A helpful feature of Microsoft MakeCode is **Debug Mode.** Select the bug icon under the micro:bit simulator. This will halt the execution (running) of the program and allow you to press the Step button to run your program line by line. It will also highlight parts of your code so you can see at each step which line of code is being processed.

Now, run your program several more times. Do you see the different lines of your code highlighted as the program runs? Do you see the sprite move?

### Add a pause

So, the code is running and the sprite is moving! Sometimes we forget just how fast computers are. So that we can see the sprite move even in “regular” mode, let's add a pause to our program right after each time the sprite moves. This will give our human eyes a chance to see it move.

Select the bug icon again to turn off Debug Mode.

* From the Basic Toolbox category, drag a 'pause' block to the coding window and add it to our 'repeat' block right after the 'turn right by' block.

Solution link: [Sprite Walking a Square](https://makecode.microbit.org/_D3k3ydYj28VY)

Download and run your program on the micro:bit. Now we can see the sprite move. It still moves pretty quickly, but at least we can see it move.

> Optional Mod
> 
> Try experimenting with changing the Pause value, the number of times to Repeat, or the number of spaces to move the Sprite to see how these changes affect your program.

## Coding activity 2: Code a traveling light with 'for' loops

Now we'll move on to code with the 'for' loop block. The 'for' block is useful when you have a variable in your loop that you want to change by a fixed amount within a specific range each time through a loop. What does this mean? Let's look at an example.

Let's make an LED light move across the entire micro:bit display from left to right, top row to bottom row.

### Pseudocode

Our pseudocode for the first row might look like:

```
Turn led (x:0, y:0) on
Pause
Turn led (x:0, y:0) off
Pause
Turn led (x:1, y:0) on
Pause
Turn led (x:1, y:0) off
Pause
Turn led (x:2, y:0) on
Pause
Turn led (x:2, y:0) off
Pause
Turn led (x:3, y:0) on
Pause
Turn led (x:3, y:0) off
Pause
Turn led (x:4, y:0) on
Pause
Turn led (x:4, y:0) off
```

That's a lot of code, and most of it repeats. It's perfect for a loop!

* What is the only variable that is changing in this pseudocode? _The value of the x coordinate_.
* How much is the value of the x coordinate changing each time? _The value of the x coordinate is changing by 1 each time_.
* What is the range of values for the x coordinate? _The range of values for the x coordinate is 0 through 4_.

Now let's code!

### Create variables to hold the x and y position

The first thing we'll want to do is create some Variables to hold the X and Y position values.

* Create a new project and name it something like: **Traveling light.** Then, select the Variables Toolbox drawer and select the **Make a Variable** button.
* Name the new variable something like: **Xvalue**. Then, create another variable and name it something like: **Yvalue**.<br/><br/>
Notice that these variable blocks now appear in the Variables Toolbox drawer. Now, we need to set the starting value for the x and y variables to be 0.
* From the Variable Toolbox drawer, drag two 'set (variable)' blocks onto the Workspace and drop into the 'on start' block. Then, in one of the 'set (variable)' blocks, use the dropdown menu to select the 'Xvalue' variable.

### Code the loop for the x values

* From the Loops Toolbox drawer, drag a 'for' block to the coding Workspace and drop it into the 'forever' loop.
* Instead of the default 'index' variable, we're going to use the 'Xvalue' variable that we created. From the Variables Toolbox drawer, drag the 'Xvalue' variable block out onto the Workspace and drop it into the 'for loop', replacing the 'index' block.<br/><br/>In this way, each time we iterate through the 'for' loop, our 'Xvalue' variable will increment its value—starting from 0 and going up to 4.
* We'll plot and unplot the LED lights to turn them on and off. From the Led Toolbox drawer, drag a 'plot' block and an 'unplot' block to the coding Workspace. Drop both into the 'for' loop.
* From the Basic Toolbox drawer, drag two 'pause' blocks to the coding Workspace. Drop them in the 'for' loop—one after the 'plot' block, and one after the 'unplot' block. This will slow things down a bit so we can see the lights turning on and off.
* Change the value of the x coordinates in the 'plot' and 'unplot' blocks to the x coordinate value from the 'for' loop. From the Variables Toolbox drawer, drag two 'Xvalue' variable blocks onto the Workspace and drop one each into the x coordinate of the 'plot' block, and the x coordinate of the 'unplot' block.

Now, you should see a light moving from left to right along the top row of the micro:bit simulator!

### Code the loop for the y values

To make our pattern continue through all the LEDs, we can change the value of the Y coordinate as well. To do this efficiently using the fewest lines of code, we can put a loop inside a loop. Loops inside other loops are known as nested loops.

* Drag out another 'for' loop block from the Loops Toolbox drawer and place it around our original 'for' block, all within the 'forever' block.
* From the Variables Toolbox drawer, drag out the 'Yvalue' variable block and drop into the outer 'for' loop, replacing the default 'index' variable.
* Change the value of the y coordinates in the 'plot' and 'unplot' blocks to this same variable (just like we did for the x coordinate earlier).

### Solution and discussion

Solution link: [For Loop](https://makecode.microbit.org/_Kf4hF0PHPaYz)

Be sure that you can explain the complete code in words:

Here is what is happening to the values of the x and y coordinates as the program steps through each line and loop inside the 'forever' block:

1. In the outer of the two for loops, the value of the y coordinate is set to 0.
2. The nested inner loop then sets the value of the x coordinate to 0.
3. The corresponding led at (x:0, y:0) is plotted and then unplotted.
4. Then the value of the x coordinate is increased by 1, and step 3 runs again with the coordinates now at (x:1, y:0).
5. Then the value of the x coordinate is increased by 1 again, and step 3 runs again with the coordinates now at (x:2, y:0).
6. The inner loop keeps running like this until it has completed its loop with the value of the x coordinate now at 4.
7. With the inner loop complete, the program now runs the second iteration of the outer loop, increasing the value of the y coordinate by 1, then back to the inner loop which runs 4 more times stepping through values for x from 0 through 4.

## Knowledge Check

### Use Debug to count loops:

Use Debug Mode to watch the program step through the loops. Then, answer the following questions:

1. By the end of the program run, how many times has the inner loop executed?
2. Other than knowing that there are 25 LEDs and each is lit up once, how else can you figure this out?

**Answers:**

1. 25
2. The outer loop loops 5 times altogether, once for every value of the y coordinate from 0 through 4.
Each time the outer loop runs, the inner loop runs 5 times, once for every value of the x coordinate from 0 through 4. **5** runs of the outer loop **x 5** runs of the inner loop **= 25 times** the inner loop executes.

> Mods:
> 
> Experiment with changing the parameters to see how these changes affect your program:
> 
> * What happens if you switch the positions of the nested loops, so the outer loop loops through the xindex values and the inner loop loops through the yindex values?
* What happens if you remove the 'unplot' block and the 'pause' block below it?
	
## Coding activity 3: Code a micro:bit alarm with a 'while' loop

The 'while' block is useful when you want your program to loop until a certain event happens or a different condition is met. For example, maybe you want an alarm to sound if someone shakes your micro:bit. In order to turn the alarm off, you press the button A. Until you press the button, the alarm should continue to sound. You can use a 'while' block with a nested 'repeat' block.

### The 'while' loop

* Create a new project in MakeCode and name it: Alarm Clock. Delete the default 'on start' and 'forever' blocks from the coding Workspace. Then from the Input Toolbox drawer, drag an 'on shake' block onto the Workspace.
* From the Loops Toolbox drawer, drag a 'while' block to the Workspace and drop it inside the 'on shake' block

Notice that there is a <true> condition attached to the 'while' loop. Recall from the previous lesson that a conditional expression may evaluate to true or false. In this case, the default <true> block always evaluates to true, so this 'while' loop will repeat forever!

* *Have you come across another block that loops over and over forever?* **Answer:** the 'forever' block

### Alarm 'on shake'

We'll come back to the while loop condition. For now, let's code our alarm sound.

* From the Music Toolbox drawer, drag two 'play tone' blocks to the coding Workspace and drop them inside the 'while' loop.
* In the 'play tone' blocks, use the dropdown menu to change the beat value to '½' a beat. In the second 'play tone' block, change the tone from 'Middle C', to 'High C'.

Try your code in the Simulator. What happens when you shake the micro:bit? **Warning:** You may want to turn down the volume on your computer!

Our alarm goes off, and because the 'while' loop repeats continuously, there's no way to turn off our alarm! 

### Turn off alarm when press button

Let's add a condition to our 'while' loop that will turn off the alarm when the user presses a button.

* From the Logic Toolbox drawer, scroll down to the Boolean section. Drag a 'not' hexagon block to the workspace. Drop it in the 'while' loop, replacing <true>.
* From the Input Toolbox drawer, drag the 'button A is pressed' hexagon-shaped block onto the Workspace and drop it into the 'not' block in the 'while' loop.

**Hint:** Make sure you hover the 'button A is pressed' hexagon over the 'not' hexagon until only the empty hexagon shows the yellow outline so you don't replace the entire 'not' hexagon.

Now, our 'while' loop will only repeat as long as button A has not been pressed.

### Complete Code

Solution link: [Alarm Clock](https://makecode.microbit.org/_2cxF9yfCc1Ax)

Test the code in the simulator.

## Knowledge Check

**Questions:**

1. Match the following types of loops with their definitions:<br>
**Loops:**<br>for, while, repeat<br>
**Definitions:**<br>Runs a command n times<br>Runs a command n times with a variable to increment each time<br>Runs a command as long as a certain condition is met.
2. How could you rewrite this pseudocode with loops?

```
Step forward
Turn left
Step forward
Turn left
Step forward
Turn left
Step forward
Turn left
```

**Answers:**

1. **Repeat loop:** Runs a command n times; **For loop:** Runs a command n times with a variable to increment each time; **While loop:** Runs a command as long as a certain condition is met
2. Repeat 4 times: Step forward, Turn left