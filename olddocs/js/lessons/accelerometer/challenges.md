# zoomer challenges

The acceleration function.

**Challenge 0**

Great job! You have successfully completed the [zoomer tutorial](https://test.microbit.co.uk/td/lessons/zoomer/challenges) . You have created a script that measures the acceleration on the @boardname@ in the "z" direction of a 3D world.

```
basic.forever(() => {
    let millig = input.acceleration("z")
    basic.showNumber(millig, 150)
    basic.pause(100)
})
```

**Challenge 1**

Create a new variable called milliX that holds the acceleration in the "x" direction or the horizontal direction.

```
basic.forever(() => {
    let millig1 = input.acceleration("z")
    basic.showNumber(millig1, 150)
    basic.pause(100)
    let milliX = input.acceleration("x") // ***
})
```

* Run the code to see if it works as expected.

**Challenge 2**

If Button `A` is pressed, we want to show the acceleration in the "x" direction by adding an if statement that checks to see if Button `A` is pressed and then calling the show number method passing in milliX as the number.

```
basic.forever(() => {
    let millig2 = input.acceleration("z")
    basic.showNumber(millig2, 150)
    basic.pause(100)
    let milliX1 = input.acceleration("x")
    if (input.buttonIsPressed("A")) {
        basic.showNumber(milliX1, 150) // ***
    }
})
```

* Run the code to see if it works as expected.

### Challenge 3

If Button `B` is pressed, program the @boardname@ to display the acceleration in the "y" direction.

You can do this by storing the acceleration in a variable: `var milliY := input->acceleration("y")`.

Then add an `if` statement that checks if Button `B` is pressed: `if input-> button is pressed ("B") then`.

Inside of the `if` statement, add `basic->show number(milliY, 150)`, which will display the acceleration in the "y" direction.

