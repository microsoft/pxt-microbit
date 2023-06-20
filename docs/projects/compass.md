# Compass

## {Introduction @unplugged}

This tutorial shows you how to create a program that displays which direction the @boardname@ is pointing. Let's get started!

![A cartoon of a compass](/static/mb/projects/a5-compass.png)

## {Step 1}

Before we use the compass for the first time on a @boardname@, we need to calibrate it. Let's make a simple program to just ``||input:calibrate compass||``.

```blocks
input.calibrateCompass()
```

## {Step 2}

If you have a @boardname@, click `|Download|` and follow the screen instructions to calibrate your compass.

## {Step 3}

Remove the ``||input:calibrate compass||`` from before. Now, store the ``||input:compass heading||`` of the @boardname@ in a variable called ``||variables:degrees||`` in the ``||basic:forever||`` loop.

```blocks
basic.forever(function() {
    let degrees = input.compassHeading()
})
```

## {Step 4}

``||logic:If||`` ``||variables:degrees||`` is ``||logic:less than||`` `45`, 
then the compass heading is mostly pointing toward **North**. ``||basic:Show||`` `N` on the @boardname@.

```blocks
basic.forever(function() {
    let degrees = input.compassHeading()
    if (degrees < 45) {
        basic.showString("N")
    }
})
```

## {Step 5}

``||logic:If||`` ``||variables:degrees||`` is less than `135`, the @boardname@ is mostly pointing **East**. ``||basic:Show||`` `E` on the @boardname@.

```blocks
basic.forever(function() {
    let degrees = input.compassHeading()
    if (degrees < 45) {
        basic.showString("N")
    }
    else if (degrees < 135) {
        basic.showString("E")
    }
})
```

## {Step 6}

Go to the simulator and rotate the @boardname@ logo to simulate changes in the compass heading.

## {Step 7}

``||logic:If||`` ``||variables:degrees||`` is less than `225`, the @boardname@ is mostly pointing **South**. ``||basic:Show||`` `S` on the @boardname@.

```blocks
basic.forever(function() {
    let degrees = input.compassHeading()
    if (degrees < 45) {
        basic.showString("N")
    }
    else if (degrees < 135) {
        basic.showString("E")
    }
    else if (degrees < 225) {
        basic.showString("S")
    }
})
```

## {Step 8}

``||logic:If||`` ``||variables:degrees||`` is less than `315`, the @boardname@ is mostly pointing **West**. ``||basic:Show||`` `W` on the @boardname@.

```blocks
basic.forever(function() {
    let degrees = input.compassHeading()
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
})
```

## {Step 9}

``||logic:If||`` none of these conditions returned true, then the @boardname@ must be pointing **North** again. Display `N` on the @boardname@.

```blocks
basic.forever(function() {
    let degrees = input.compassHeading()
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
})
```

## {Step 10 @unplugged}

If you have a @boardname@, click `|Download|` to run your program.

https://youtu.be/IL5grHtz_MU
