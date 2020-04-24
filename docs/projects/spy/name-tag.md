# Name Tag

### @explicitHints true

## Introduction @unplugged

Tell everyone who you are. Show you name on the LEDs.

![Name scrolling on the LEDs](/static/mb/projects/name-tag/name-tag.gif)

## Step 1

Use the ``||basic:forever||`` loop to run some code continuously.

```spy
basic.forever(function() {

});
```

## Step 2

Show your name using ``||basic:show string||`` inside the ``||basic:forever||`` loop. Set your
name as the string value for ``||basic:show string||``.

```spy
basic.forever(function() {
    // @highlight
    basic.showString("MICRO");
});
```

## Step 3

Look at the simulator and make sure it shows your name on the screen.

![Name scrolling on the LEDs](/static/mb/projects/name-tag/name-tag.gif)

## Step 4

Place more ``||basic:show strings||`` to create a longer message.

```spy
basic.forever(function() {
    basic.showString("MICRO");
    // @highlight
    basic.showString("BIT");
})
```

## Step 5

If you have a @boardname@ connected, click ``|Download|`` and transfer your code to the @boardname@!