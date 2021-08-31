# Comments

For simple programs, is easy to understand the steps and the flow the program might take when it runs. If you have just a few steps in your program that run one after the other in a sequence, it's fairly easy to understand what's happening at each place in your program.

The following program does 4 simple things:

1. Show a "Hello" message
2. Display a smiley face as part of a greeting
2. Pause for a second so you can see the smiley
3. Clear the screen

```blocks
basic.showString("Hello!")
basic.showIcon(IconNames.Happy)
basic.pause(1000)
basic.clearScreen()
```

It's quite obvious what this program is doing. Each block does one thing, the next block runs after the previous one in a sequence, then the program ends. Let's say you want the user to show that they saw the greeting. You could add button press event that shows a check mark icon.

```blocks
basic.showString("Hello!")
basic.showIcon(IconNames.Happy)
basic.pause(1000)
basic.clearScreen()
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Yes)
})
```

You know, of course, that the button press event means that the user has acknowleged your greeting. If you shared your program with someone else though, they might not understand why you wanted to add the button press to the program. 

## Block comments

To let others know what certain parts of your program are supposed to do, you can add **comments**. Comments are a text description that says what that part of your program is doing. To put a comment on a block, open the block menu and select **Add comment**.

![Block menu](/static/blocks/block-menu.jpg)

A place for your comment will appear and you can type in your description of what that block is for and what it's supposed to do.

![Insert the comment](/static/blocks/insert-comment.jpg)

Once a comment is added to a block, a comment icon will show in the upper-left corner of the block. Here's our program with the comment on the ``||input:on button A press||``.

```blocks
// Signal that the greeting was seen
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Yes)
})
basic.showString("Hello!")
basic.showIcon(IconNames.Happy)
basic.pause(1000)
basic.clearScreen()
```

In the Blocks editor, the comment is displayed when you click on the comment icon. If you view the JavaScript or Python code, you'll see a comment line directly above the button press code.

```typescript
// Signal that the greeting was seen
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Yes)
})
basic.showString("Hello!")
basic.showIcon(IconNames.Happy)
basic.pause(1000)
basic.clearScreen()
```

When a program contains conditionals, loops, or functions, adding comments becomes important to help understand what's happening at those places in your program. The program can take a different path based on a condition, result from a function, or some other action.

### ~ hint

#### Workspace comments

You can add comments an notes about your project with **Workspace Comments**. Just right-click on the Workspace background and choose **Add Comment** to insert your comments for the project.

```block
/**
 * This is a workspace comment.
 * 
 * Use this space to make comments
 * 
 * and notes about your project.
 */
// Display a message
function showMessage () {
    basic.showString("Workspaces have comments!")
}
```

### ~

The following example has a conditional inside a loop to choose one of three different mood values. For each mood, a function will display an icon for it. Each block has a comment that describes what it will do. Take a look at the JavaScript or Python code to see the comments on the code text also.

```blocks
/**
 * The mood icon project.
 * 
 * TODO: add more moods
 * 
 * 1. Sad
 * 
 * 2. Confused
 */
// Display an emotion of love
function heart () {
    basic.showIcon(IconNames.Heart)
}
// Show a surprised expression
function surprised () {
    basic.showIcon(IconNames.Surprised)
}
// Display a smiley mood
function smiley () {
    basic.showIcon(IconNames.Happy)
}
// My program that shows three mood icons
// Run the loop to show 3 icons
for (let index = 0; index <= 2; index++) {
    // Select an icon based on the index
    if (index == 0) {
        smiley()
    } else if (index == 1) {
        heart()
    } else {
        surprised()
    }
    // Pause for a second between moods
    basic.pause(1000)
}
```