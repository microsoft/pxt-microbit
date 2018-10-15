# Turtle Spiral

## Setting up your project

This project uses an **microturtle** Extension. You'll need to add it to your project to make it work.

* create a new project
* click on the gearwheel menu and click **Extensions**
* select the **microturtle** extension

After the project reloads, you should see the **turtle** category in the blocks.

## Code

A turtle that spirals into the center of the display and back out again.

```blocks
let index = 0
turtle.setPosition(0, 0)
turtle.turnRight()
basic.forever(() => {
    for (let index = 0; index <= 4; index++) {
        turtle.forward(4 - index)
        turtle.turnRight()
    }
    for (let index = 0; index <= 4; index++) {
        turtle.turnLeft()
        turtle.back(index)
    }
})
```

```package
microturtle=github:Microsoft/pxt-microturtle#v0.0.9
```
