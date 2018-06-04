# love meter blocks challenges

Create a love meter with the @boardname@  

## Before we get started

You should work on these challenges after the following the [love meter activity](/lessons/love-meter/activity)

```blocks
input.onPinPressed(TouchPin.P0, () => {
    let x = Math.randomRange(0, 10)
    basic.showNumber(x)
})

```

## Challenge 1

Add a pause of 3000 milliseconds (3 seconds) after showing the number so that the number won't immediately disappear in the next challenge.


```blocks
input.onPinPressed(TouchPin.P0, () => {
    let x = Math.randomRange(0, 10)
    basic.showNumber(x)
    basic.pause(3000)
})
```

## Challenge 2

If the rating **x** is between *0* and *3* (strictly less than *4*), display the text "HORRIBLE!".


```blocks
input.onPinPressed(TouchPin.P0, () => {
    let x = Math.randomRange(0, 10)
    basic.showNumber(x)
    basic.pause(3000)
    if (x < 4) {
        basic.showString("HORRIBLE")
    }
})
```

## Challenge 3

**If** the rating is between 4 and 7, display the text "MEDIOCRE!" **else** display the text "MATCHED!"

```blocks
input.onPinPressed(TouchPin.P0, () => {
    let x = Math.randomRange(0, 10)
    basic.showNumber(x)
    basic.pause(3000)
    if (x < 4) {
        basic.showString("HORRIBLE")
    } else if (x < 8) {
        basic.showString("MEDIOCRE")
    } else {
        basic.showString("MATCHED")
    }

})
```

## Challenge 4

Use `show LEDs` to display images instead of text for each case.

