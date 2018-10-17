# Compass

## Introduction @unplugged

![A compass](/static/mb/projects/a5-compass.png)

Welcome! This guided tutorial will show you how to program a script that displays which direction the @boardname@ is pointing. Let's get started!

## Step 1 @fullscreen

Create a loop that will continuously update the reading of the compass.

```blocks
basic.forever(() => {
    
})
```

## Step 2 @fullscreen

Store the reading of the @boardname@ in a variable called `degrees`.

```blocks
let degrees = 0;
basic.forever(() => {
    degrees = input.compassHeading()
})
```

## Step 3 @fullscreen

If `degrees` is less than `45` or greater than `315`, 
then the compass heading is mostly pointing toward **North**. Display `N` on the @boardname@.

```blocks
let degrees = 0;
basic.forever(() => {
    degrees = input.compassHeading()
    if (degrees < 45 || degrees > 315) {
        basic.showString("N");
    }
});
```

## Step 4 @fullscreen

If `degrees` is less than `135`, the @boardname@ is mostly pointing **East**. Display `E` on the @boardname@.

```blocks
let degrees = 0;
basic.forever(() => {
    degrees = input.compassHeading()
    if (degrees < 45 || degrees > 315) {
        basic.showString("N");
    }
    else if (degrees < 135) {
        basic.showString("E");
    } else {

    }
});
```

## Step 5 @fullscreen

If `degrees` is less than `225`, the @boardname@ is mostly pointing **South**. Display `S` on the @boardname@.

```blocks
let degrees = 0;
basic.forever(() => {
    degrees = input.compassHeading()
    if (degrees < 45 || degrees > 315) {
        basic.showString("N");
    }
    else if (degrees < 135) {
        basic.showString("E");
    }
    else if (degrees < 225) {
        basic.showString("S");
    } else {
        
    }
});
```

## Step 6 @fullscreen

If none of these conditions returned true, then the @boardname@ must be pointing **West**. Display `W` on the @boardname@.

```blocks
let degrees = 0;
basic.forever(() => {
    degrees = input.compassHeading()
    if (degrees < 45 || degrees > 315) {
        basic.showString("N");
    }
    else if (degrees < 135) {
        basic.showString("E");
    }
    else if (degrees < 225) {
        basic.showString("S");
    }
    else {
        basic.showString("W");
    }
});
```
