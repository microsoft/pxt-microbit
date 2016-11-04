# night light quiz answers

Answers to the night light quiz.

This is the answer key for the [night light quiz](/lessons/night-light/quiz).

## 1. Define the function "set brightness" 

This function sets the brightness of the LED screen.

## 2. Consider the following image

![](/static/mb/lessons/night-light-0.png)

If the rectangle above represents the @boardname@, write the code to set all the LEDs to full brightness and to turn on all the LEDs.

<br />

```blocks
led.setBrightness(255)
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
```

## 3. Consider the following image

![](/static/mb/lessons/night-light-1.png)

If the rectangle above represents the @boardname@, write the code to set the screen brightness to 50% (128) and turns on all the LEDs.

<br/>

```blocks
led.setBrightness(128)
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
```

## 4. Consider the following image

![](/static/mb/lessons/night-light-2.png)

If the rectangle above represents the @boardname@, write the code to turn off all the LEDs.

```blocks
led.setBrightness(0)
```

