# Level

### @explicitHints true

## Introduction @unplugged

Is your table flat? Use the @boardname@ as a level!

![A level drawing](/static/mb/projects/level.png)


## Step 1

Make a variable ``||variables:x||`` and store the ``||input:acceleration x||`` value
in the ``||basic:forever||`` loop.

```spy
basic.forever(function() {
    // @highlight
    let x = input.acceleration(Dimension.X);
})
```

## Step 2

Make another variable ``||variables:y||`` and store the ``||input:acceleration y||`` value.

```spy
basic.forever(function() {
    let x = input.acceleration(Dimension.X);
    // @highlight
    let y = input.acceleration(Dimension.Y);
})
```

## Step 3

Add a code to test ``||logic:if||`` the ``||Math:absolute value||`` of ``||variables:x||``
is ``||logic:greater than||`` ``32``. If it is true, ``||basic:show an icon||`` to indicate
that the @boardname@ is not flat.

```spy
basic.forever(function() {
    let x = input.acceleration(Dimension.X);
    let y = input.acceleration(Dimension.Y);
    if (Math.abs(x) > 32) {
        // @highlight
        basic.showIcon(IconNames.Sad)        
    } else {

    }
})
```

## Step 4

Add another test ``||logic:if||`` the ``||Math:absolute value||`` of ``||variables:y||`` is
``||logic:greater than||`` ``32``. If it is true, ``||basic:show an icon||`` indicate that 
the  @boardname@ is very much not flat.

```spy
basic.forever(function() {
    let x = input.acceleration(Dimension.X);
    let y = input.acceleration(Dimension.Y);
    if (Math.abs(x) > 32) {
        basic.showIcon(IconNames.Sad)        
    } else if (Math.abs(y) > 32) {
        // @highlight
        basic.showIcon(IconNames.Angry)        
    } else {

    }
})
```

## Step 5

The code under the ``||logic:else||`` will run if both acceleration ``x`` and ``y`` directions
are small, which happens when the @boardname@ is laying flat. Add code to
``||basic:show a happy image||``.

```spy
basic.forever(function() {
    let x = input.acceleration(Dimension.X);
    let y = input.acceleration(Dimension.Y);
    if (Math.abs(x) > 32) {
        basic.showIcon(IconNames.Sad)        
    } else if (Math.abs(y) > 32) {
        basic.showIcon(IconNames.Angry)        
    } else {
        // @highlight
        basic.showIcon(IconNames.Square)        
    }
})
```

## Step 6

If you have a @boardname@ connected, click ``|Download|`` to transfer your code!
Try it out on tables in your house!

