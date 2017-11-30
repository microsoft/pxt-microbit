# Hey, @boardname@!

## Step 1

Welcome, let's code the @boardname@! Place the ``||basic:show string||`` block in the ``||basic:on start||`` slot. Change the ``"Hello"`` text to be your name instead. Did you see it scroll in the simulator?.

```blocks
basic.showString("My Name")
```

## Step 2

Well, you noticed that the text stopped. Place the ``||basic:show string||`` block in an ``||input:on button pressed||`` block to scroll your name whenever button **A** is pressed.

```block
input.onButtonPressed(Button.A, () => {
    basic.showString("My Name")
});
```

## Step 3

Ok, let's try to talk to the @boardname@ using a button. Change the text in ``||basic:show string||`` to ask the question "How are you?". Add another ``||basic:show string||`` with "....." to show that the @boardname@ is thinking.

```block
input.onButtonPressed(Button.A, () => {
    basic.showString("How are you?")
    basic.showString(".....");
})
```

## Step 4

Now, make the @boardname@ give an answer with a smiley face! Find the ``||basic:show leds||`` and draw a smiley face on the block by clicking on the LEDs. Press button **A** in the simulator and see the @boardname@ respond to your question.

```block
input.onButtonPressed(Button.A, () => {
    basic.showString("How are you?")
    basic.showString(".....");
    basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # . . . #
    . # # # .
    `)
})
```

## Step 5

OK, let's ask @boardname@ how it's feeling just now, but by a different method. We can use the shake gesture to ask the question. Go get an ``||input:on shake||`` block. Go grab your ``||basic:show leds||`` block from before and and put it in the ``||input:on shake||``.

```block
input.onGesture(Gesture.Shake, () => {
    basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # . . . #
    . # # # .
    `)
})
```
 
## Step 6

We want the @boardname@ to change how it feels at different times. It will have two moods, happy and sad. Go to **Logic** and get an ``||logic:if then else||``. Put it in the ``||input:on shake||`` and move the ``||basic:show leds||`` into the ``||logic:if then||`` slot.

```block
input.onGesture(Gesture.Shake, () => {
    if (true) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            # . . . #
            . # # # .
            `)
    } else {
    	
    }
})
```

## Step 7

Duplicate the ``||basic:show leds||`` block (right-click, then choose Duplicate). Put the new one into the ``||logic:else||`` part of the ``||logic:if then else||``. This time, turn that one into a frowny face.

```block
input.onGesture(Gesture.Shake, () => {
    if (true) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            # . . . #
            . # # # .
            `)
    } else {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            . # # # .
            # . . . #
            `)
    }
})
```

## Step 8

Test it's mood by changing the condition in the ``||logic:if||`` from `true` to `false` and then click the **SHAKE** spot in the simulator.

## Step 9

So, to make the @boardname@ more fickle, let's give it a random mood. Find the ``||math:pick random true or false||`` block in **Math**. Pull it out and use it in the ``||logic:if||`` condition instead of the `true` value.

```block
input.onGesture(Gesture.Shake, () => {
    if (Math.randomBoolean()) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            # . . . #
            . # # # .
            `)
    } else {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            . # # # .
            # . . . #
            `)
    }
})
```

## Step 10

Now, click the **SHAKE** spot a few times to see how the @boardname@ is feeling. Hmm, it's mood is different sometimes!

## Step 11

Awesome job! You've completed your Microsoft MakeCode activity. If you have a @boardname@ to use, click the `|Download|` button and try your code on the board.

