# blocks - if statements

An introduction to conditions for the Block Editor.

## Introduction to conditions

In the introduction to code, we made the @boardname@ automatically shows the message ‘hello world!’:

```blocks
basic.showString("hello world!")
```

This statement, or code, will happen as soon as the @boardname@ is activated. This means it is unconditional. We can add a condition to make code function in certain ways:

* A calculator waits for the user in input numbers and a function, before outputting a result
* A game waits for the user to press a button at the right time before outputting their score
* A quiz waits for the user to choose the correct option, and if they are wrong the quiz will tell the user

In programming we use an ‘if’ statement: if this condition is met, do something. Lets add an if statement to the code we had before; the @boardname@ will wait for the user to press a button before showing the image.

```blocks
basic.forever(() => {
    if (input.buttonIsPressed(Button.A)) {
        basic.showString("hello world!")
    }
})
```

Again, test the code in the simulator. Try clicking **Button A** to display the "hello, world!" message every time the `button is pressed`.

## More 'if' statements

You could now add additional conditions to your 'if statement'. Here are some ideas:

* Change the 'get button' to ask for button B
* Add another 'if' statement within the current one, and make it so both buttons must be pressed to show the message
* Create a mini quiz that asks for one button to be pressed which represents an answer

## Else

What if the user does not press a button? What if the user presses the wrong button? We call this an else, because if the criteria of the if statement are not met then something else is done.

For example, we could make it so our @boardname@ tells us to press the A button. Remove the `button pressed` and `show string` blocks from the `if` block and right click it and select **Delete**. Now click the **If** category and drag out an `else if` block. Plug the `button pressed` and `show string` blocks in the correct places.

We want the message "Press A!" to scroll across the @boardname@, so right-click the `show string` block and select **Duplicate**. Drag this new block into the `else` section and replace the “hello, world!” with "Press A!". Your code should look like this:

```blocks
basic.forever(() => {
    if (input.buttonIsPressed(Button.A)) {
        basic.showString("hello world!")
    } else {
        basic.showString("PRESS A")        
    }
})
```

So, to recap: the `forever` block makes sure our code runs forever. The @boardname@ checks if the user is pressing the left button, if the user is not then the “Press the button!” message will scroll across the LEDs. If the user is pressing the button then the “hello, world!” message will scroll across the screen. Check this in the simulator or attach the @boardname@ to the computer then click **Download** to send the code onto the @boardname@.

## What is a condition?

A condition is criteria that the user must meet for a certain function to be carried out.

