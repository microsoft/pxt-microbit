# Name Tag

## Introduction @unplugged

Tell everyone who you are. Show you name on the LEDs.

![Name scrolling on the LEDs](/static/mb/projects/name-tag/name-tag.gif)

## Step 1

Place the ``||basic:show string||`` block in the ``||basic:forever||`` block to repeat it. Change the text to your name.

```blocks
basic.forever(() => {
    basic.showString("MICRO");
});
```

## Step 2

Look at the simulator and make sure it shows your name on the screen.

![Name scrolling on the LEDs](/static/mb/projects/name-tag/name-tag.gif)

## Step 3

Place more ``||basic:show string||`` blocks to create your own story.

```blocks
basic.forever(() => {
    basic.showString("MICRO");
    basic.showString("<3<3<3");
})
```

## Step 4

If you have a @boardname@ connected, click ``|Download|`` to transfer your code and watch your name scroll!
