# screen wipe quiz blocks answers

Clear the screen by pressing the "A" button after an animation has been played

This is the answer key for the [screen wipe quiz](/lessons/screen-wipe/quiz).

## 1. What does the function "clear screen" do on the @boardname@? 

This function turns off all the LED lights on the LED screen.

## 2. Write the line of code that displays this image.

![](/static/mb/blocks/lessons/screen-wipe-4.png)

```blocks
basic.showLeds(`
    . # . # .
    . # . # .
    . . # . .
    # . . . #
    . # # # .
    `)
```

## 3. Write the condition that will detect on button A pressed

```blocks

input.onButtonPressed(Button.A, () => {

})

```

## 4. Write the code that will clear show LEDS from the screen after pressing button A 

```blocks
input.onButtonPressed(Button.A, () => {
    basic.clearScreen()
})
```

