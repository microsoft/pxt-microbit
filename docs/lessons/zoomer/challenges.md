# zoomer blocks challenges

Coding challenges for zoomer.

## Before we get started

Complete the following [activity](/lessons/zoomer/activity) and your finished code should look like this:

```blocks
basic.forever(() => {
    let az = input.acceleration(Dimension.Z)
    basic.showNumber(az)
})
```
## Challenge 1



We'll modify the code to display the `x` acceleration if the `A` button is pressed. For that, we need to store `acceleration (x)` in a new variable `ax` and use a `button (A) is pressed` to detect if the button is pressed.

```blocks
basic.forever(() => {
    let az = input.acceleration(Dimension.Z)
    let ax = input.acceleration(Dimension.X)
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(ax)
    }
    basic.showNumber(az)
})
```

* Run the code to see if it works as expected.

## Challenge 2

Display the `y` acceleration when `B` is pressed by adding another `if` statement using `button (B) is pressed`.

