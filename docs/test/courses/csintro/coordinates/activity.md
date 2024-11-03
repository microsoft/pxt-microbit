# Activity: Animation and patterns

Each of these short exercises demonstrates how to use coordinates to control the LEDs. These programs can later be modified and used in your more complex projects.
 
* Smile animation - A short exercise in plotting and toggling LEDs to create a simple animation.
* Random Patterns generator - A short exercise using a loop to generate random LED patterns and then checking the status of a specific LED.
* Brightness - A short exercise in using the brightness settings for the micro:bit LEDs.

## Coding activity 1: Smile animation

A short exercise in plotting and toggling LEDs to create a simple animation. Although you can use the 'show leds' block for images and animation, there is another way to tell the micro:bit what LEDs to turn on and off using coordinates.

### Create a smiling and non-smiling face with ‘show leds’ blocks

We can still use the 'show leds' block to plan which LED coordinates to turn on.

* In Microsoft MakeCode, start a new project and name it something like **‘smile animation’.**
* From the Basic Toolbox drawer, drag out a couple of ‘show leds’ blocks from the Basic Toolbox drawer to the coding Workspace. Since we’ll be using them as a guide, **don’t** connect them to the ‘on start’ block. Remember, the blocks will be grayed out, but you can still create a smiling face in one and non-smiling face in the other by selecting the squares you want.

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

### Plot coordinates for LEDs that are in both images

* From the LED Toolbox drawer, drag out 6 **'plot x y'** blocks and connect them inside on the **'on start'** block.

>* Tip: you can also right-click on a block and select Duplicate to copy blocks

* Compare the two face images and determine which LEDs are on in both images.
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
### Code the toggle coordinates

Now we can code for the 4 LEDs that change back and forth, on and off, as we switch from one face to the other and back again over and over.

* From the LED Toolbox drawer, drag out 4 **'toggle x y'** blocks and connect them to the **'forever'** block. The **‘toggle x y’** block will change the status of an LED from on to off and off to on.
* Determine the coordinates for the LEDs that will toggle.
* First, update the default (0,0) coordinates with the correct (x,y) coordinates for the two LEDs to create the smile in the first two ‘toggle x y’ blocks. Then, update the other two ‘toggle x y’ blocks with the correct (x,y) coordinates for the two LEDs to create the non-smile.
* Run the code in the Simulator to check it out. It toggles all four blocks at the same time! Let’s fix it.

### Add a pause between the smile and non-smile

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
Solution link: [makecode.microbit.org/_AjmLfgc31EMk]()

### ~ hint

LEDs are amazing little devices. If you haven't seen this video about how they work, take a few minutes to learn more about them.

[https://www.youtube.com/watch?v=qqBmvHD5bCw]()

### ~

## Mod this!
* Add a third image to the animation, perhaps a frown face.
* Make your own custom animation! What LEDs stay the same and which need to be toggled?

## Coding activity 2: Random patterns generator
A short exercise using a loop to generate random LED patterns and then checking the status of a specific LED.

Pseudocode:

* On button A pressed we’ll use a loop to turn on a random set of LED lights on our micro:bit.
* Our display will have one LED lit for each column or x coordinate value from 0 through 4.

### Code button A

* Start a new MakeCode project and name it. We don’t need the ‘on start’ or ‘forever’ blocks in this activity, so delete them from the coding Workspace or move them to the side.
* From the Input Toolbox drawer, select the ‘on button pressed’ block.
* From the Basic – More Toolbox drawer, drop a ‘clear screen’ block in the ‘on button pressed’ block.
* From the Loops Toolbox drawer, drop in a ‘for’ block under the ‘clear screen’ block.
* From the LED Toolbox drawer, drop a ‘plot x y’ block into the ‘for’ block.
* From the Variable Toolbox drawer, drag an ‘index’ variable into the x value in the ‘plot x y’ block.
* From the Math Toolbox drawer, drag a ‘pick random’ block into the y value and change the second parameter from 0 to 4.

### Code button B

Now, we’ll code to check the on/off state of one of the LEDs with button B.

* From the Input Toolbox drawer, drag an ‘on button pressed’ block to the coding Workspace and use the dropdown menu to select B.
* On button B pressed, we’ll use an ‘If then else’ block from the Logic Toolbox drawer.
* From the LED Toolbox drawer, drop a ‘point x y’ block into the ‘if’ condition to check the current on/off state of a specific LED. This means:
	* If the LED located at (0,0) on the micro:bit is currently on, the ‘point x y’ block will return true.
	* If the LED located at (0,0) is currently off, the ‘point x y’ block will return false.
* For this exercise, we’ll use the two built-in icons to display the LED’s current status. From the Basic Toolbox drawer, drag two ‘show icon’ blocks into each of the ‘then’ and ‘else’ clauses
* Use the dropdown menu to select the check mark for Yes, and the X icon for No.

Solution link: [makecode.microbit.org/_hT458oiDR7AL]()

### Try it out!
* Download the program to your micro:bit
* Press button A to create a random pattern
* Press button B to check and display the status of the specific LED

### Mod this!
Add a loop to test for all coordinates on the micro:bit when button B is pressed instead of testing only for the (0, 0) LED.

## Coding activity 3: Brightness
A short exercise in using the brightness settings for the micro:bit LEDs. Our program will change the brightness of the LEDs and numerically display the brightness level.

### Pseudocode

* We’ll set the brightness level for the LEDs to the highest level on start and then use on button A pressed to decrease the brightness level, and on button B pressed to increase the brightness level.
* We’ll use on button A+B pressed to check and display numerically the current brightness level.

### Code for the start

* Start a new project in MakeCode and name it.
* Select the LED Toolbox drawer. You’ll notice a **“…more”** Toolbox drawer appear; select that and drag a **‘set brightness’** block onto the coding Workspace. Drop this into the **‘on start’** block.
* From the Basic Toolbox drawer, drag a **‘show icon’** block and drop it after the **‘set brightness’** block so we will have an image to look at.

### Code for button A and button B

* From the Input Toolbox drawer, drag out three **‘on button pressed’** blocks onto your coding Workspace.
* Leave one **‘on button pressed’** block with the default setting of A and use the dropdown menu to change the other to B, and the third to A+B (this is when buttons A and B are pressed together)
* From the LED …more Toolbox drawer, drag out two more **‘set brightness’** blocks and drop one each into the **‘on button A pressed’** and **‘on button B pressed’** blocks.
* From the Math Toolbox drawer, drag out an **addition** block and a **subtraction** block.
* Drop the addition block within the **‘set brightness’ **block in the **‘on button B pressed’** block, and the subtraction block within the **‘set brightness’** block in the **‘on button A pressed’** block, replacing the default value of ‘255’.
* From the LED …more Toolbox drawer, drag out two **‘brightness’** value blocks to the Workspace and drop one into the **first slot of the subtraction block,** and drop the second one into the **first slot of the addition block.**
* Change the default value of 0 on the right side of each math expression to 25.

### Code for button A + B together

Since we can't see if our program is working in the simulator, let’s add a check into our code.

* From the Basic …more Toolbox drawer, drag a **‘clear screen’** block onto the Workspace and drop it into the **‘on button A+B pressed’** block.
* From the Basic Toolbox drawer, drag a **‘show number’** block onto the Workspace and drop it below the **‘clear screen’** block.
* From the LED …more Toolbox drawer, drag another **‘brightness’** value block onto the Workspace and drop it into the **‘show number’** block, replacing the default 0 value. This will clear the screen when buttons A and B are pressed and display the current brightness level as a number on the micro:bit screen.
* Now, from the Basic Toolbox drawer, drag a **‘show icon’** block to the coding Workspace and connect it below the **‘show number’** block. This will re-display the image we used on start of the program

Solution link: [makecode.microbit.org/_JjwMLL6Da3jP]()

### Try it out!

Check it in the simulator first, then download the program to the micro:bit to run the program.

### Mod this!

What happens if adding 25, or subtracting 25, from the current brightness level would result in a sum or difference outside of the 0 to 255 brightness range?

## Knowledge Check

**Questions:**

1. How many coordinate pairs are represented on the micro:bit LED screen?
2. We’ve learned how to light LEDs on the micro:bit screen using blocks from three different Toolbox drawers. What are the three Toolbox drawers?
3. What type of variable is the (x,y) coordinate?

**Answers:**

1. 25
2. **Basic** (i.e., ‘show leds’ and ‘show icon’ blocks); **Led** (i.e., ‘plot’, ‘unplot’, ‘toggle’, and ‘point’); and **Game** under Advanced (i.e., ‘sprite move by’, ‘sprite turn’)
3. sprite