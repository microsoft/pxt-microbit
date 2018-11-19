# Hello JavaScript

## ~ avatar

Want to learn to code the @boardname@ using JavaScript? Follow along this step-by-step project to get started.

## ~

## Step 1 - Flashing heart

Let's start with dragging out the blocks to create a **flashing heart** animation.
You can do that by stacking two ``||basic:show leds||`` blocks in a ``||basic:forever||`` loop.

```blocks
basic.forever(function () {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
```

## Step 2 - Converting blocks to JavaScript

Click on the **{} JavaScript** button on the top of the editor to **convert your blocks into JavaScript**.

![Toggle to JavaScript](/static/mb/blocks2js/toggle.gif)

Once the JavaScript editor is loaded, your code will look like this:

```typescript
basic.forever(function () {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
```

Although it looks really different, the JavaScript code (text) has the same meaning as your blocks. Let's add comments in the code to explain what it does. Comments are lines that start with ``//``.

```typescript
// this is the "forever" block.
// It makes the code inside of it run in a loop, over and over again.
basic.forever(function () {
    // this is the "show leds" block. 
    // It reads the text (. # . ...) to figure out which LED is on.
    // '.' means off and '#' means on
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        `)
    // this is the second "show leds" block. 
    // all LEDs are off so it only contains '.' characters.
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
// Every open bracket '{' or parenthesis '(' needs to be closed with a matching '}' or a ')'
})
```

The comments will show up in the blocks too. Quickly switch over to **Blocks** and back if you want to see what it looks like.

## Step 3 - Changing some LEDs

Let's draw a small heart in the second ``basic.show leds`` string. We'll do that by replacing some of the ``.`` characters with a ``#``. As you make your changes, the simulator should restart and modify the animation just like when you're coding with blocks.

```typescript
basic.forever(function () {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        `)
    // turning on a few LEDs
    basic.showLeds(`
        . . . . .
        . # # # .
        . # . # .
        . . # . .
        . . . . .
        `)
})
```

## Step 4 - "I broke my code!"

Javascript can be very picky with the _syntax_ (syntax is the proper use of words and symbols) of your code. Just one misplaced letter and it will refuse to run again. **It is quite normal to make lots of mistakes!** Let's see how you can handle most situations with a magical trick: **Undo**.

Let's break the code by adding some random text in the editor. After a few seconds, you should see squiggles show up under the code, just like you do a typo when writing a message.

![JavaScript with squiggles](/static/mb/blocks2js/squiggles.png)

The code editor really needs this error fixed before it can run your code. If you hover over the squiggle with your mouse, you'll get an explanation for what's wrong... that might sound even more confusing! 

![JavaScript with squiggles and message](/static/mb/blocks2js/squigglesmessage.png)

This is OK, simply use **Undo** to trace back your changes until you are back to code that does not have any errors.

* Click the **Undo** button (bottom toolbar) until your code is correct again. 
* If you go too far in undoing, click **Redo** to bring the previous code back.

## Step 5 - Dragging code from the toolbox

![Example of dragging a code snippet](/static/mb/blocks2js/dragblock.gif)

Writing new code is a bit harder than modifying it since you don't know the syntax yet.
Good news though, you can drag snippets of code from the toolbox... just like in blocks. Click on the **Basic** category, then drag the ``||basic:show leds||`` code block into the JavaScript editor to add a new image.

```typescript
basic.forever(function () {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        `)
    basic.showLeds(`
        . . . . .
        . # # # .
        . # . # .
        . . # . .
        . . . . .
        `)
    // this is the new code snippet dragged over from the toolbox
    basic.showLeds(`
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .
`)
})
```

## ~ avatar

Well done! You've just coded using a "text programming" language! Starting from blocks, you learned to convert them to JavaScript and then modify the code in the blocks as text. Wow, you're a pro now! Go back to [Blocks To JavaScript](/projects/blocks-to-javascript) to continue with another challenge.

## ~
