# smiley blocks quiz answers

This is the answer key for the [smiley quiz](/lessons/smiley/quiz).

## 1. Describe what `show LEDs` does

A function that will display an image on the LED screen

## 2. Why is there an extra empty frame after the smiley face?

![](/static/mb/lessons/smiley-0.png)

<br/>

The extra empty image with show LED creates a blinking smiley, allowing the @boardname@ to alternate between showing the smiley and the empty screen.

## 3. Draw the image created with this code

```blocks
basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
```

![](/static/mb/blocks/lessons/smiley-4.png)

## 4. Write the code to make this image

```blocks
basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
```

![](/static/mb/blocks/lessons/smiley-6.png)

