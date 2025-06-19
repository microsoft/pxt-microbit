# Flashing Heart

### @explicitHints true

## Code a Flashing Heart @unplugged

Code the lights on the micro:bit into a flashing heart animation! 💖

![Heart shape in the LEDs](/static/mb/projects/flashing-heart/sim.gif)

## {Step 1 @fullscreen}

Use the basic ``||basic:show icon||`` function to display the **HEART** icon. Type the code below, or drag a code snippet from the ``||basic:Basic||`` Toolbox category.

```spy
basic.showIcon(IconNames.Heart)
```

## {Step 2}

Use the ``||basic:clear screen||`` function followed by the ``||basic:pause||`` function to turn off the lights for **500** milliseconds (or half a second).

```spy
basic.showIcon(IconNames.Heart)
basic.clearScreen()
basic.pause(500)
```

## {Step 3}

Copy the code you've written and paste it at the end. In the copied code, change the ``||basic:Icon Names||`` to a **SMALL HEART**. Run your code in the on-screen micro:bit simulator. Do you see a big and small heart animation?

```spy
basic.showIcon(IconNames.Heart)
basic.clearScreen()
basic.pause(500)
basic.showIcon(IconNames.SmallHeart)
basic.clearScreen()
basic.pause(500)
```

## {Step 4}

Now let's make our hearts flash forever! Put a ``||basic:forever||`` loop around your code.

```spy
basic.forever(function() {
    basic.showIcon(IconNames.Heart)
    basic.clearScreen()
    basic.pause(500)
    basic.showIcon(IconNames.SmallHeart)
    basic.clearScreen()
    basic.pause(500)
})
```

## {Step 5}

If you have a @boardname@ device, connect it to your computer and click the ``|Download|`` button. Follow the instructions to transfer your code onto the @boardname@ and watch the hearts flash!  ⭐ Great job! ⭐ 