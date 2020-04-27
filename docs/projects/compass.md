# Compass

## Introduction @unplugged

This tutorial will show you how to program a script that displays which direction the @boardname@ is pointing. Let's get started!

![A cartoon of a compass](/static/mb/projects/a5-compass.png)

## Step 1

Store the ``||input:compass heading||`` of the @boardname@ in a variable called ``||variables:degrees||`` in the ``||basic:forever||`` loop.

```blocks
basic.forever(() => {
    let degrees = input.compassHeading()
})
```

## Step 2

``||logic:If||`` ``||variables:degrees||`` is ``||logic:less than||`` `45`, 
then the compass heading is mostly pointing toward **North**. ``||basic:Show||`` `N` on the @boardname@.

```blocks
basic.forever(() => {
    let degrees = input.compassHeading();
    if (degrees < 45) {
        basic.showString("N");
    }
});
```

## Step 3

``||logic:If||`` ``||variables:degrees||`` is less than `135`, the @boardname@ is mostly pointing **East**. ``||basic:Show||`` `E` on the @boardname@.

```blocks
basic.forever(() => {
    let degrees = input.compassHeading();
    if (degrees < 45) {
        basic.showString("N");
    }
    else if (degrees < 135) {
        basic.showString("E");
    }
});
```

## Step 4

Go to the simulator and rotate the @boardname@ logo to simulate changes in the compass heading.

## Step 5

``||logic:If||`` ``||variables:degrees||`` is less than `225`, the @boardname@ is mostly pointing **South**. ``||basic:Show||`` `S` on the @boardname@.

```blocks
basic.forever(() => {
    let degrees = input.compassHeading();
    if (degrees < 45) {
        basic.showString("N");
    }
    else if (degrees < 135) {
        basic.showString("E");
    }
    else if (degrees < 225) {
        basic.showString("S");
    }
});
```

## Step 6

``||logic:If||`` ``||variables:degrees||`` is less than `315`, the @boardname@ is mostly pointing **West**. ``||basic:Show||`` `W` on the @boardname@.

```blocks
basic.forever(() => {
    let degrees = input.compassHeading();
    if (degrees < 45) {
        basic.showString("N");
    }
    else if (degrees < 135) {
        basic.showString("E")
    } else if (degrees < 225) {
        basic.showString("S")
    } else if (degrees < 315) {
        basic.showString("W")
    }
});
```

## Step 7

``||logic:If||`` none of these conditions returned true, then the @boardname@ must be pointing **North** again. Display `N` on the @boardname@.

```blocks
basic.forever(() => {
    let degrees = input.compassHeading();
    if (degrees < 45) {
        basic.showString("N");
    }
    else if (degrees < 135) {
        basic.showString("E");
    }
    else if (degrees < 225) {
        basic.showString("S");
    } 
    else if (degrees < 315) {
        basic.showString("W")
    } 
    else {
        basic.showString("N")
    }
});
```

## Step 8 @unplugged

If you have a @boardname@, click `|Download|` and follow the screen instructions. 
You will have to follow the screen instructions to calibrate your compass.

https://youtu.be/IL5grHtz_MU