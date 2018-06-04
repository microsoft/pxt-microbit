# Activity: Animation and patterns

Guide the students to create programs using coordinates and LEDs. Each of these short exercises demonstrates how to use coordinates to control the LEDs. These programs can then be modified and used in the students’ more complex projects. 
 
* Smile animation - A short exercise in plotting and toggling LEDs to create a simple animation.
* Random Patterns generator - A short exercise using a loop to generate random LED patterns and then checking the status of a specific LED.
* Brightness - A short exercise in using the brightness settings for the micro:bit LEDs.

## Smile animation

A short exercise in plotting and toggling LEDs to create a simple animation.
* Though students can use the 'show leds' block for images and animation, there is another way to tell the micro:bit what LEDs to turn on and off using coordinates.
* We can still use the 'show leds' block to plan which LED coordinates to turn on
* Drag out a couple 'show leds' blocks from the Basic Toolbox drawer.
* Create a smiling face and a non-smiling face.

```block
basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    # # # # #
    . . . . .
`)
```

* From the LED Toolbox drawer, drag out 6 'plot x y' blocks.

>* Tip: you can also right-click on a block and select Duplicate to copy blocks

* Have the students compare the two face images and determine which LEDs are on in both images. 
* Plot these LEDs using the correct (x,y) coordinates.
* When done, place these 'plot x y' blocks inside an 'on start' block.

```blocks
led.plot(1, 0)
led.plot(3, 0)
led.plot(2, 1)
led.plot(1, 3)
led.plot(2, 3)
led.plot(3, 3)
```

Now we can code for the 4 LEDs that change back and forth, on and off, as we switch from one face to the other and back again over and over.

* From the LED Toolbox drawer, drag out 4 'toggle x y' blocks. 
* Replace the default values with the correct (x,y) coordinates. 
The 'toggle x y' block will change the status of an LED from on to off or off to on.
* Place these 4 'toggle x y' blocks in a 'forever' block. 
* Place the two 'toggle x y' blocks that create the smile first, followed by the two 'toggle x y' blocks for the non-smile.
* You may notice that the toggling happens too quickly. Let’s slow it down a bit by placing a 'pause' block between the two pairs of 'toggle x y' blocks.  Set the pause value to 250 milliseconds.

Here is the full program:

```blocks
basic.forever(() => {
   led.toggle(0, 2)
   led.toggle(4, 2)
   basic.pause(250)
   led.toggle(0, 3)
   led.toggle(4, 3)
})
led.plot(1, 0)
led.plot(3, 0)
led.plot(2, 1)
led.plot(1, 3)
led.plot(2, 3)
led.plot(3, 3)
```

## Mod this!
* Add a third image to the animation, perhaps a frown face. 
* Make your own custom animation! What LEDs stay the same and which need to be toggled?
 
## Random patterns generator
A short exercise using a loop to generate random LED patterns and then checking the status of a specific LED.
Pseudocode:
* On button A pressed we’ll use a loop to turn on a random set of LED lights on our micro:bit. 
* Our display will have one LED lit for each column or x coordinate value from 0 through 4.
Steps:
* From the Input Toolbox drawer, select the 'on button pressed' block
* From the Basic - More Toolbox drawer, drop in a 'clear screen' block
* From the Loops Toolbox drawer, drop in a 'for' block
* From the LED Toolbox drawer, drop a 'plot x y' block
* Use the variable 'index' for the x value
* From the Math Toolbox drawer, drop a 'pick random' block into the y value

```blocks
input.onButtonPressed(Button.A, () => {
   basic.clearScreen()
   for (let index = 0; index <= 4; index++) {
       led.plot(index, Math.randomRange(0, 5))
   }
})
```
 
Check the on/off state of an LED
* On button B pressed we’ll use an 'if...then...else' block from the Logic Toolbox drawer
* From the LED Toolbox drawer, drop a 'point x y' block into the 'if' condition to check the current on/off state of a specific LED.

>* If the LED is currently on, the point x y block will return true. 
* If the LED is currently off, the point x y block will return false. 

* For this exercise, we’ll use the two Yes/No built in icons to display the LED’s current status. From the Basic Toolbox drawer, drag 2 'show icon' blocks into each of the 'then' and 'else' clauses.  Select the check mark for Yes, and the X icon for No.
* For now, we’ll leave the default coordinate values (0,0).  But you can challenge your students to add a loop to test for all coordinates on the micro:bit.

Here is the complete program:

```blocks
input.onButtonPressed(Button.A, () => {
   basic.clearScreen()
   for (let index = 0; index <= 4; index++) {
       led.plot(index, Math.randomRange(0, 5))
   }
})
input.onButtonPressed(Button.B, () => {
   if (led.point(0, 0)) {
       basic.showIcon(IconNames.Yes)
   } else {
       basic.showIcon(IconNames.No)
   }
})
```

### Try it out!
* Download the program to your micro:bit
* Press button A to create a random pattern
* Press button B to check and display the status of the specific LED
 
## Brightness
A short exercise in using the brightness settings for the micro:bit LEDs.  Important to note - the brightness level of the micro:bit simulator LEDs will NOT appear to change! You must run your program on the actual micro:bit to see the different brightness levels.

We will check on, and numerically display the brightness level with our program, so we can verify with the simulator that it is working.

Pseudocode:
We’ll set the brightness level for the LEDs to the highest level on start and then use on button A pressed to decrease the brightness level and on button B pressed to increase the brightness level. We’ll use on button A+B pressed to check and display numerically the current brightness level.

Steps:
* Drag 3 'set brightness' blocks and 3 'brightness' blocks from the Led - More Toolbox drawer onto your coding workspace
* Place one 'set brightness' block in the 'on start' block
* Add a 'show icon' block after the 'set brightness' block so we will have an image to look at

```blocks
led.setBrightness(255)
basic.showIcon(IconNames.Heart)
```
 
* From the Input Toolbox drawer, drag out 3 'on button pressed' blocks onto your coding workspace
* Leave one 'on button pressed' block with the default setting of A and change the second one to B and the third one to A+B
* Place one 'set brightness' block in the 'on button A' pressed block, and the other 'set brightness' block in the 'on button B' pressed block
* From the Math Toolbox drawer, drag out an addition block and a subtraction block
* Place the addition block within the 'set brightness' block in the 'on button B pressed' block
* Place the subtraction block within the 'set brightness' block in the 'on button A pressed' block
* Place a 'brightness' block on the left side of each math expression
* Change the default value of 0 on the right side of each math expression to 25

```blocks
input.onButtonPressed(Button.A, () => {
   led.setBrightness(led.brightness() - 25)
})
input.onButtonPressed(Button.B, () => {
   led.setBrightness(led.brightness() + 25)
})
```
 
Since we cannot see if our program is working in the simulator, let’s add a check into our code.

* On button A+B pressed, we’ll clear the screen and get and display the current brightness level as a number.
* Then we’ll re-display the image we used on start.

Here is the complete program:

```blocks
input.onButtonPressed(Button.A, () => {
   led.setBrightness(led.brightness() - 25)
})
input.onButtonPressed(Button.B, () => {
   led.setBrightness(led.brightness() + 25)
})
input.onButtonPressed(Button.AB, () => {
   basic.clearScreen()
   basic.showNumber(led.brightness())
   basic.showIcon(IconNames.Heart)
})
led.setBrightness(255)
basic.showIcon(IconNames.Heart)
```

### Try it out!

What happens if adding 25 or subtracting 25 from the current brightness level would result in a sum or difference outside of the 0 to 255 brightness range? 
