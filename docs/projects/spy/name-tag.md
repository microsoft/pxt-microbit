# Name Tag

## Introduction @unplugged

Tell everyone who you are. Show you name on the LEDs.

![Name scrolling on the LEDs](/static/mb/projects/name-tag/name-tag.gif)

```template
forever(function() {})
```

## Step 1 @fullscreen

Place ``||basic:show string||`` in ``||basic:forever||`` to show text in a loop.

```blocks
basic.forever(() => {
    // @highlight
    basic.showString("MICRO");
});
```

## Step 2 @fullscreen

Look at the simulator and make sure it shows your name on the screen.

![Name scrolling on the LEDs](/static/mb/projects/name-tag/name-tag.gif)

## Step 3

Place more ``||basic:show string||`` to create your own story.

```blocks
basic.forever(() => {
    basic.showString("MICRO");
    // @highlight
    basic.showString("BIT");
})
```

## Step 4 @fullscreen

If you have a @boardname@ connected, click ``|Download|`` and transfer your code to the @boardname@!