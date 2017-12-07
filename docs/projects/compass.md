# Compass

## ~avatar avatar

Welcome! This guided tutorial will show you how to program a script that displays which direction the @boardname@ is pointing. Let's get started!

## ~

![](/static/mb/projects/a5-compass.png)

Display the direction that the @boardname@ is facing using the compass.

## Step 1

Create a loop that will continuously update the reading of the compass.

```blocks
basic.forever(() => {
    
})
```

## Step 2

Store the reading of the @boardname@ in a variable called `degrees`.

```blocks
basic.forever(() => {
    let degrees = input.compassHeading()
})
```

## Step 3

If `degrees` is less than `45` or greater than `315`, 
then the compass heading is mostly pointing toward **North**. Display `N` on the @boardname@.

```blocks
basic.forever(() => {
    let degrees = input.compassHeading();
    if (degrees < 45 || degrees > 315) {
        basic.showString("N");
    }
});
```

## Step 4

If `degrees` is less than `135`, the @boardname@ is mostly pointing **East**. Display `E` on the @boardname@.

```blocks
basic.forever(() => {
    let degrees = input.compassHeading();
    if (degrees < 45 || degrees > 315) {
        basic.showString("N");
    }
    else if (degrees < 135) {
        basic.showString("E");
    }
});
```

## Step 5

If `degrees` is less than `225`, the @boardname@ is mostly pointing **South**. Display `S` on the @boardname@.

```blocks
basic.forever(() => {
    let degrees = input.compassHeading();
    if (degrees < 45 || degrees > 315) {
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

If none of these conditions returned true, then the @boardname@ must be pointing **West**. Display `W` on the @boardname@.

```blocks
basic.forever(() => {
    let degrees = input.compassHeading();
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
