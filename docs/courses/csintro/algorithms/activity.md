# Activity: Happy Face, Sad Face

The micro:bit itself is considered hardware.  It is a physical piece of technology.  In order to make use of hardware, we need to write software (otherwise known as "code" or computer programs). The software "tells" the hardware what to do, and in what order to do it using algorithms.  Algorithms are sets of computer instructions.

In this activity, we will discover how to use the micro:bit buttons as input devices, and write code that will make something happen on the screen as output. We will also learn about pseudocode, the MakeCode tool, event handlers, and commenting code.

## Pseudocode
What do you want your program to do?
The first step in writing a computer program is to create a plan for what you want your program to do. Write out a detailed step-by-step plan for your program. Your plan should include what type of information your program will receive, how this input will be processed, what output your program will create and how the output will be recorded or presented. Your writing does not need to be written in complete sentences, nor include actual code. This kind of detailed writing is known as pseudocode. Pseudocode is like a detailed outline or rough draft of your program. Pseudocode is a mix of natural language and code.

For the program we will write, the pseudocode might look like this:
* Start with a blank screen
* Whenever the user presses button A, display a happy face.
* Whenever the user presses button B, display a sad face.
	
## Microsoft MakeCode
Now that you have a plan for your program, in the form of pseudocode, let's start creating the real program.  In a browser window, open the Microsoft MakeCode for micro:bit tool (https://makecode.microbit.org). The MakeCode tool is called an IDE (Integrated Development Environment), and is a software application that contains everything a programmer needs to create, compile, run, test, and even debug a program.

## Tour of Microsoft MakeCode
* Simulator - on the left side of the screen, you will see a virtual micro:bit that will show what your program will look like running on a micro:bit. This is helpful for debugging, and instant feedback on program execution.
* Toolbox - in the middle of the screen, there are a number of different categories, each containing a number of blocks that can be dragged into the programming workspace on the right. 
* Workspace - on the right side of the screen is the Programming Workspace where you will create your program.  Programs are constructed by snapping blocks together in this area.

![IDE tour](/static/courses/csintro/algorithms/ide-tour.png)

The features highlighted here are:

1. Go to the **Home Screen** to start a new project or open an existing project
2. **Simulator** shows what your program will look like when running on a @boardname@
3. **Hide** or **Show** the simulator pane
4. Program in either **Blocks** or **JavaScript**
5. Programming **Workspace** where you will build you program
6. Blocks **Toolbox**
7. **Download** your program to the @boardname@
8. Name your project and **Save** it on your computer

## Event handlers
When you start a new project, there will be two blue blocks, ‘on start’ and ‘forever’ already in the coding workspace. These two blocks are event handlers.

In programming, an event is an action done by the user, such as pressing a key or clicking a mouse button.  An event handler is a routine that responds to an event.  A programmer can write code telling the computer what to do when an event occurs.

One fun unplugged activity you can do with kids to reinforce the idea of an action that waits for an event is the Crazy Conditionals activity.

Notes:

* Tooltips - Hover over any block until a hand icon appears and a small text box will pop up telling you what that block does. You can try this now with the ‘on start’ and ‘forever’ blocks.
	
>![Blocks tooltips](/static/courses/csintro/algorithms/blocks-tooltips.png)

> Hovering over the code in JavaScript has the same effect.
	
>![Code tooltips](/static/courses/csintro/algorithms/code-tooltips.png)

* Help/Documentation - You can also right-click on any block and select Help to open the reference documentation.

>![Help menu](/static/courses/csintro/algorithms/help-menu.png)

* Deleting blocks - Click on the 'forever' block and drag it left to the Toolbox area. You should see a garbage can icon appear. Let go of the block and it should disappear. You can drag any block back to the Toolbox area to delete it from the coding workspace.  You can also remove a block from your coding window by selecting the block and then pressing the "delete" key on your keyboard (or command-X on a mac).

>![Trash](/static/courses/csintro/algorithms/drag-to-trash.gif)

Looking at our pseudocode, we want to make sure to start a program with a clear screen.

* We can do this by going to the **Basic** toolbox category and under **...more**, choose a ``||basic:clear screen||`` block.

>![Clear screen block](/static/courses/csintro/algorithms/clear-screen-block.png)

* Drag the ‘clear screen’ block to the coding Workspace.

>Notice that the block is ‘grayed’ out. If you hover over the ‘grayed out’ block, a pop up text box will appear letting you know that since this block is not attached to an event handler block, it will not run.
>![Clear screen disabled](/static/courses/csintro/algorithms/clear-screen-disabled.png)

* Go ahead and drag the ‘clear screen’ block into the ‘on start’ block. Now the block is no longer grayed out, indicating that it will run when the event, the program starts, occurs.

```blocks
basic.clearScreen()
```

## Save early, save often!

We now have a working program running on the micro:bit simulator! 
As you write your program, MakeCode will automatically compile and run your code on the simulator. The program doesn’t do much at this point, but before we make it more interesting, we should name our program and save it.

On the bottom left of the application window, to the right of the Download button, is a text box in which you can name your program. After naming your program, press the save button to save it.
![Save button](/static/courses/csintro/algorithms/save-button.png)
Important: Whenever you write a significant piece of code or just every few minutes, you should save your code. Giving your code a meaningful name will help you find it faster from a list of programs and will let others know what your program does.

## More event handlers
Now to make our program a bit more interesting by adding two more event handlers.

* From the Input menu, drag two ‘on button A pressed’ blocks to the coding window.

>Notice that the second block is grayed out. This is because, right now, they are the same block, both ‘listening’ for the same event ‘on button A pressed’.
>![Two on buttons](/static/courses/csintro/algorithms/two-on-buttons.png)

* Leave the first block alone for now, and using the drop-down menu within the second block, change the ‘A’ to ‘B’. Now this block will no longer be grayed out, as it is now listening for a different event, ‘on button B pressed’.

>![Make on button B](/static/courses/csintro/algorithms/on-button-b.png)

```blocks
input.onButtonPressed(Button.A, () => {
})
input.onButtonPressed(Button.B, () => {
})
```

## Show LEDs
Now we can use our LED lights to display different images depending on what button the user presses.
* From the Basic menu, drag two ‘show leds’ blocks to the coding workspace
* Place one ‘show leds’ block into the ‘on button A pressed’ event handler and the second ‘show leds’ block into the ‘on button B pressed’ event handler.
	
```blocks
input.onButtonPressed(Button.A, () => {
    basic.showLeds(`. . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
})
input.onButtonPressed(Button.B, () => {
    basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
})
```
* Click on the individual little boxes in the ‘show leds’ block that is in the ‘on button A pressed’ event handler to create the image of a happy face.
* Click on the individual little boxes in the ‘show leds’ block that is in the ‘on button B pressed’ event handler to create the image of a sad face.

```blocks
input.onButtonPressed(Button.A, () => {
   basic.showLeds(`
       . . . . .
       . # . # .
       . . . . .
       # . . . #
       . # # # .
       `)
})
input.onButtonPressed(Button.B, () => {
   basic.showLeds(`
       . . . . .
       . # . # .
       . . . . .
       . # # # .
       # . . . #
       `)
})
```

## Test your program!
Remember, MakeCode automatically compiles and runs your program, so all you need to do now is press button A and then button B in the simulator to see the output produced by your code. 

* Feel free to play around with turning LEDs on or off in the ‘show leds’ blocks until you get the images you want. 
* Remember to save your code. 

```sim
basic.forever(() => {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.pause(800)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        # . . . #
        `)
    basic.pause(800)
})
```

## Commenting your code
It is good practice to add comments to your code. Comments can be useful in a number of ways. Comments can help you remember what a certain block of code does and/or why you chose to program something the way you did. Comments also help others reading your code to understand these same things.

To comment a block of code:

* Right-click on the icon that appears before the words on a block.
* A menu will pop up. Select ‘Add Comment’.
	
![Add comment menu](/static/courses/csintro/algorithms/add-comment.png)

* This will cause a question mark icon to appear to the left of the previous icon.
* Click on the question mark and a small yellow box will appear into which you can write your comment.
	
![Write comment](/static/courses/csintro/algorithms/write-comment.png)

* Click on the question mark icon again to close the comment box when you are done.
* Click on the question mark icon whenever you want to see your comment again or to edit it.
	
Notes
* When you right-click on the icon that appears before the words on a block, notice that there are other options available to you that allow you to duplicate and delete blocks, as well as get help. Feel free to explore and use these as you code.
* In JavaScript, you can add a comment by using two forward slashes, then typing your comment. The two forward slashes tell JavaScript that the following text (on that same line) is a comment.

```typescript
// Display a happy face when button A is pressed.
```
## Cleaning up!

Clean up your coding workspace before you do a final save! What does this mean?

* It means that only the code and blocks that you are using in your program are still in the workspace.  
* Remove (delete) any other blocks that you may have dragged into the coding workspace as you were experimenting and building your program.
	
## Save and download
Now that your code is running just fine in the simulator, is commented, and your coding window is ‘clean’, save your program, download it to your micro:bit, and enjoy!

Here is the complete program:

```blocks
// Display a happy face when button A is pressed.
input.onButtonPressed(Button.A, () => {
   basic.showLeds(`
       . . . . .
       . # . # .
       . . . . .
       # . . . #
       . # # # .
       `)
})
// Display a sad face when button B is pressed.
input.onButtonPressed(Button.B, () => {
   basic.showLeds(`
       . . . . .
       . # . # .
       . . . . .
       . # # # .
       # . . . #
       `)
})
basic.clearScreen()
```




