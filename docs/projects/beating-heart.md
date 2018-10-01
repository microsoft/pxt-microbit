# Beating Heart

## ~ avatar

Want to learn to code the @boardname@ using JavaScript? Follow along this step-by-step project to get started.

## ~

## Step 1 Flashing heart

Let's start with dragging the blocks to create a **flashing heart** animation.
You can do that by stacking ``||basic:show leds||`` blocks in a ``||basic:forever||`` loop.

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

## Step 2 Converting blocks to JavaScript

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
// this is the "forever" block. It grabs the function and runs it in a loop.
basic.forever(function () {
    // this is the "show leds" block. It reads the text (. # . ...) to figure out which LED is on.
    // . means off and # means on
    // Note how the text starts and ends with a backtick ` character...
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        `)
    // this is the second "show leds" block. 
    // Since all LEDs are off, it only contains . characters.
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
// Every open bracket { or parenthesis ( needs to be closed by } or )... more about this later
})
```

## Step 3 Changing some LEDs

Let's draw a small heart in the second ``basic.show leds`` string. We'll do that by replace ``.`` with ``#``. As you make your changes, the simulator should restart and modify the animation just like when you're coding with blocks.

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

## Step 4 "I broke my code!"

Javascript can be very picky with the syntax of your code. A single misplaced letter and it will refuse to run again. It is quite normal to make tons of mistakes! Let's see how you can handle most situations with a magical trick: **Undo**.

Let's brake the code by adding  some random text in the editor. 

```typescript-ignore
ABRACADABRA // not really somethign JavaScript understands...
basic.forever(function () {
```

After a few seconds, you should see squiggles show up under the code. This is the code editor telling you that a syntax error has creeped in into your code. Sometimes, the explanation may sound cryptic and you won't know what to do. This is OK, simply use **Undo** to trace back your changes until you are back to code that does not have errors.

* Click the **Undo** button (bottom toolbar) until your code is correct again. 
* If you go too far in time, click **Redo**

## Step 5 Dragging code from the toolbox

![Example of dragging a code snippet](/static/mb/blocks2js/dragblock.gif)

Writing new code is a bit harder to modifying it since you don't know the syntax yet.
Good news, you can drag snippets of code from the toolbox... just like in blocks. Click on the **basic**, then drag the **show leds** code block into the JavaScript editor to add a new image.

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
    // this is the new code snippet dragged from the toolbox
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

Well done! You've just coded with a "text programming" language! Starting from blocks, you learned to convert them to JavaScript and modify them. Go back to [Block To JavaScript](/projects/blocks-to-javascript) to continue with more challenges.

## ~