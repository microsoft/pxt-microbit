# Activity: Loops demos

Microsoft MakeCode has three different loop blocks:
* 'Repeat' block
* 'While' block
* 'For' block

To start, the students can code the same algorithm they created in the unplugged activity using a loop.

## ‘Repeat’ block
Code a Sprite to walk a square.  Have students click on the Loops category in the Toolbox, and look at the three choices available.
	
![Loops category](/static/courses/csintro/iteration/loops-category.png)

The very first one is the ‘repeat’ block! Have students drag the repeat block to the coding Workspace. They’ll notice that this block takes a **parameter**. 

A **parameter** is a type of variable used as input to a function or routine. In this case, the parameter tells the repeat block how many times we want the code within the block to repeat.

For now, we’ll leave the parameter at 4.

To create a **sprite** that will walk a square:

* Click on the Advanced category in the Toolbox.  This will open up a more advanced menu of blocks.
* Click on Game category, and drag a ‘create sprite’ block to the coding workspace.

![Game category](/static/courses/csintro/iteration/game-category.png)

* We’ll need two more blocks from the Game menu. Referring to their ‘Walk a Square’ pseudocode, see if the students can find the blocks they need for moving their sprite and turning their sprite.
* Drag out a ‘move by’ block and a ‘turn right by’ block.
* They now have these blocks in their coding workspace.  
* For this project, they can delete the default ‘forever’ block.

```block
let sprite: game.LedSprite = null
sprite = game.createSprite(2, 2)
```
```block
let sprite: game.LedSprite = null
sprite.move(1)
```
```block
let sprite: game.LedSprite = null
sprite.turn(Direction.Right, 45)
```

Time to fix those default parameter values!
* We want our sprite to start in the top left corner of the micro:bit screen, so change the parameters for both **x** and **y** to zero.
* To make the sprite move from one side of the screen to the other (as though walking around a chair), change the move by parameter to **4**.
* To make the sprite turn to walk a square, change the ‘turn right by’ degrees to **90**. For now, it's OK to leave the sprite turning right instead of left as we did in our pseudocode.

Your blocks now look like this:

```block
let sprite: game.LedSprite = null
sprite = game.createSprite(0, 0)
```
```block
let sprite: game.LedSprite = null
sprite.move(4)
```
```block
let sprite: game.LedSprite = null
sprite.turn(Direction.Right, 90)
```

Notice that the blocks are all grayed out. That’s because we have not yet attached them to any event handlers.

* On start, we want the sprite to appear. To make this happen, go to the Variables menu, create a new variable called 'sprite', and drag a ‘set sprite to’ block to the coding window.
* Place the ‘set sprite block’ into the ‘on start’ block.
* Attach the ‘create sprite’ block to the ‘set sprite’ block

```blocks
let sprite: game.LedSprite = null
sprite = game.createSprite(0, 0)
```

You should now see the sprite appear in the top left of the micro:bit simulator.

* To add more control for when our sprite moves, drag a ‘on button A pressed’ block from the Input menu.
* Place the ‘repeat’ block into the ‘on button A pressed’ block
* Place the ‘move by’ block into the ‘repeat’ block
* Place the ‘turn right by’ block into the ‘repeat’ block just under the ‘move by’ block.

```blocks
let sprite: game.LedSprite = null
sprite = game.createSprite(0, 0)

input.onButtonPressed(Button.A, () => {
   for (let i = 0; i < 4; i++) {
       sprite.move(4)
       sprite.turn(Direction.Right, 90)
   }
})
```
Go ahead and run the program. Make the sprite move by pressing button A.

What happened? Did you see the sprite move? No?

## Slo-Mo
A helpful feature of Microsoft MakeCode is "Slo-Mo", or slow-motion mode.  
* Click on the snail icon under the micro:bit simulator. 
This will slow down the execution (running) of the program, and highlight parts of your code so you can see step-by-step, which line of code is being processed.

![micro:bit sim in slo-mo](/static/courses/csintro/iteration/slo-mo.gif)

Now run your program several more times. Do you see the different lines of your code highlighted as the program runs? Do you see the sprite move?

![Slo-Mo in blocks](/static/courses/csintro/iteration/slo-mo-blocks.png)
Slo-Mo in Blocks

![Slo-mo-in JavaScript](/static/courses/csintro/iteration/slo-mo-javascript.png)
Slo-Mo in JavaScript

So, the code is running and the sprite is moving! Sometimes we forget just how fast computers are. So that we can see the sprite move even in ‘regular’ mode, lets add a pause to our program right after each time the sprite moves. This will give our human eyes a chance to see it move.

* Click the snail icon again to turn off Slo-Mo.
* From the Basic Toolbox category, drag a ‘pause’ block to the coding window and add it to our ‘repeat’ block right after the ‘turn right by’ block.

Your final program should look like this:

```blocks
let sprite: game.LedSprite = null
input.onButtonPressed(Button.A, () => {
   for (let i = 0; i < 4; i++) {
       sprite.move(4)
       sprite.turn(Direction.Right, 90)
       basic.pause(100)
   }
})
sprite = game.createSprite(0, 0)
```

Run your program again. Now we can see the sprite move. It still moves pretty quickly, but at least we can see it move.

If there is time, let the students experiment with changing the parameters to see how these changes affect their program.

We just used the first of the 3 different types of Loop blocks available to us. What about the other 2 loop blocks, ‘while’ and ‘for’?

## ‘For’ block: traveling light

The ‘for’ block is useful when you have a variable in your loop that you want to change by a fixed amount within a specific range each time through a loop.  What does this mean? Let’s look at an example.

Let’s make an led light move across the entire display from left to right, top row to bottom row. 

Our pseudocode for the first row might look like this:
```
Turn led x:0, y:0 on
Pause
Turn led x:0, y:0 off
Pause
Turn led x:1, y:0 on
Pause
Turn led x:1, y:0 off
Pause
Turn led x:2, y:0 on
Pause
Turn led x:2, y:0 off
Pause
Turn led x:3, y:0 on
Pause
Turn led x:3, y:0 off
Pause
Turn led x:4, y:0 on
Pause
Turn led x:4, y:0 off
```
That’s a lot of code, most of it repeated. Perfect for a loop.

* What is the only variable that is changing in this pseudocode? _The value of the x coordinate_.
* How much is the value of the x coordinate changing each time? _The value of the x coordinate is changing by 1 each time_.
* What is the range of values for the x coordinate? _The range of values for the x coordinate is 0 through 4_.

Now let’s code!

* From the Loops Toolbox drawer, drag a ‘for’ block to the coding workspace.
* Since we’ll be changing the value of the x coordinate, make a new variable, named **xindex**.
* We’ll plot and unplot the leds to turn them on and off. From the Led Toolbox drawer, drag a 'plot' block and an 'unplot' block to the coding workspace.
* From the Basic Toolbox drawer, drag two ‘pause’ blocks to the coding workspace.
* Place the following blocks into the ‘for’ block: the ‘plot’ block, a ‘pause’ block, the ‘unplot’ block, the second 'pause' block.
* Place the ‘for’ block inside a forever block.

```block
basic.forever(() => {
   for (let index = 0; index <= 4; index++) {
       led.plot(0, 0)
       basic.pause(100)
       led.unplot(0, 0)
       basic.pause(100)
   }
})
```

Let’s look at the parameters. 

* Change the ‘index’ in the ‘for’ block to the ‘xindex’ variable we made. 
* Change the value of the x coordinates in the plot and unplot blocks to this same variable. 

```blocks
let index = 0
basic.forever(() => {
   for (let xindex = 0; xindex <= 4; xindex++) {
       led.plot(xindex, 0)
       basic.pause(100)
       led.unplot(xindex, 0)
       basic.pause(100)
   }
})
```

We can use the default values for the rest of the parameters.

You should now see a light moving from left to right along the top row of the micro:bit simulator.

```sim
let index = 0
basic.forever(() => {
   for (let xindex = 0; xindex <= 4; xindex++) {
       led.plot(xindex, 0)
       basic.pause(100)
       led.unplot(xindex, 0)
       basic.pause(100)
   }
})
```

To make our pattern continue through all the leds, we can change the value of the y coordinate as well.

To do this efficiently, using the fewest lines of code, we can even put a loop inside a loop. Loops inside other loops are known as **nested loops**.

* So that we can change the value of the y coordinate, make a new variable, named **yindex**.
* Drag out another ‘for’ block from the Loops Toolbox drawer.
* Place this new ‘for’ block around our original ‘for’ block, all within the forever block.
* Change the ‘index’ in the outer ‘for’ block to the ‘yindex’ variable we made. 
* Change the value of the y coordinates in the plot and unplot blocks to this same variable. 

```blocks
let index = 0
let yindex = 0
basic.forever(() => {
   for (let yindex = 0; yindex <= 4; yindex++) {
       for (let xindex = 0; xindex <= 4; xindex++) {
           led.plot(xindex, yindex)
           basic.pause(100)
           led.unplot(xindex, yindex)
           basic.pause(100)
       }
   }
})
```

There! With only a half dozen or so lines of code, we have made our light travel through all the coordinates on the micro:bit screen.

```sim
let index = 0
let yindex = 0
basic.forever(() => {
   for (let yindex = 0; yindex <= 4; yindex++) {
       for (let xindex = 0; xindex <= 4; xindex++) {
           led.plot(xindex, yindex)
           basic.pause(100)
           led.unplot(xindex, yindex)
           basic.pause(100)
       }
   }
})
```

**Check:** Make sure the students can read this code.

Here is what is happening to the values of the x & y coordinates as the program steps through each line and loop inside the forever block:

1. In the outer of the two for loops, the value of the y-coordinate is set to 0.
2. The nested inner loop then sets the value of the x-coordinate to zero.
3. The corresponding led (x:0, y:0) is plotted and then unplotted.
4. Then the value of the x-coordinate is increased by 1 and step #3 runs again with the coordinates now (x:1, y:0).
5. Then the value of the x-coordinate is increased by 1 again and step #3 runs again with the coordinates now (x:2, y:0).
6. The inner loop keeps running like this until it has completed its loop with the value of the x coordinate now 4.
7. With the inner loop complete, the program now runs the second iteration of the outer loop, increasing the value of the y-coordinate by 1, then back to the inner loop which runs 4 more times stepping through values for x from 0 through 4.
	
Have the students use the Slo-Mo mode to watch the program step through the loops.

* By the end of the program run, how many times has the inner loop executed? 25
* Other than knowing that there are 25 LEDs and each is lit up once, how can you figure this out?
>_The outer loop loops 5 times altogether, once for every value of the y coordinate from 0 through 4. Each time the outer loop runs, the inner loop runs 5 times, once for every value of the x coordinate from 0 through 4. 5 runs of the outer loop x 5 runs of the inner loop = 25 times the inner loop executes._

## Mods
* If there is time, let the students experiment with changing the parameters to see how these changes affect their program.
* What happens if you switch the positions of the nested loops, so the outer loop loops through the xindex values and the inner loop loops through the yindex values?
* What happens if you remove the ‘unplot’ block and the ‘pause’ block below it?
	
## ‘While’ block: micro:bit alarm!
The while block is useful when you want your program to loop until a certain event happens or a different condition is met.

For example, maybe you want an alarm to sound if someone shakes your micro:bit!
In order to turn the alarm off, you press the button A. Until you press the button, the alarm should continue to sound!

You can use a 'while' block with a nested ‘repeat’ block like this:

```blocks
input.onGesture(Gesture.Shake, () => {
   while (!(input.buttonIsPressed(Button.A))) {
       for (let i = 0; i < 2; i++) {
           music.playTone(262, music.beat(BeatFraction.Half))
           music.playTone(523, music.beat(BeatFraction.Half))
       }
   }
})
```

* Can you read what this code does?
* Can you write out pseudocode that describes what this code does?

Example Pseudocode:

_When someone shakes the micro:bit, while button A is not pressed, play the two tone alarm twice. Keep playing the alarm tones until the user presses the A button._

To use sound with your micro:bit, you will need to connect it to some speakers or headphones. See how to do this here: [Hack you headphones](/projects/hack-your-headphones).
