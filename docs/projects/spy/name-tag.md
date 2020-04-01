# Name Tag

## Introduction @unplugged

Tell everyone who you are. Show you name on the LEDs.

![Name scrolling on the LEDs](/static/mb/projects/name-tag/name-tag.gif)

## Step 1 @fullscreen

Add an event to repeat code ``||basic:forever||``.

```blocks
basic.forever(function() {
});
```

## Step 2

Place ``||basic:show string||`` in ``||basic:forever||`` to show text in a loop.

```blocks
basic.forever(function() {
    // @highlight
    basic.showString("MICRO");
});
```

## Step 3 @fullscreen

Look at the simulator and make sure it shows your name on the screen.

![Name scrolling on the LEDs](/static/mb/projects/name-tag/name-tag.gif)

## Step 4

Place more ``||basic:show string||`` to create your own story.

```blocks
basic.forever(function() {
    basic.showString("MICRO");
    // @highlight
    basic.showString("BIT");
})
```

## Step 5 @fullscreen

If you have a @boardname@ connected, click ``|Download|`` and transfer your code to the @boardname@!