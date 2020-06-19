# Flashing Heart

### @explicitHints true

## Introduction @unplugged

Learn how to use the LEDs and make a flashing heart! 
(Want to learn how lights work? [Watch this video](https://youtu.be/qqBmvHD5bCw)).

![Heart shape in the LEDs](/static/mb/projects/flashing-heart/sim.gif)

## Step 1 @fullscreen

Make the screen ``||basic:show an icon||``  of a **Heart**.

```spy
basic.showIcon(IconNames.Heart)
```

## Step 2

After the icon is displayed, ``||basic:clear screen||`` and  ``||basic:pause||`` for `500` milliseconds.

```spy
basic.showIcon(IconNames.Heart)
basic.clearScreen()
basic.pause(500)
```

## Step 3

Now, copy the code currently have and add it to the end. In the copied code, ``||basic:show an icon||`` of a **SmallHeart**. Your heart will flash from big to small.

```spy
basic.showIcon(IconNames.Heart)
basic.clearScreen()
basic.pause(500)
basic.showIcon(IconNames.SmallHeart)
basic.clearScreen()
basic.pause(500)
```

## Step 4

Add one more ``||basic:show icon||`` at the end to display another **Heart**.

```spy
basic.showIcon(IconNames.Heart)
basic.clearScreen()
basic.pause(500)
basic.showIcon(IconNames.SmallHeart)
basic.clearScreen()
basic.pause(500)
basic.showIcon(IconNames.Heart)
```

## Step 5

Do you want your heart to flash continuously? Remove the last ``||basic:show icon||`` and then put a ``||basic:forever||`` loop around your code.

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

## Step 6

If you have a @boardname@ connected, click ``|Download|`` and transfer your code to the @boardname@!