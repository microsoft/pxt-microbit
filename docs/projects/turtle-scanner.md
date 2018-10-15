# Turtle Scanner

## Setting up your project

This project uses an **microturtle** Extension. You'll need to add it to your project to make it work.

* create a new project
* click on the gearwheel menu and click **Extensions**
* select the **microturtle** extension

After the project reloads, you should see the **turtle** category in the blocks.

## Code

The turtle scans the display over and over again.

```blocks
turtle.setPosition(0, 0)
turtle.turnRight()
turtle.setSpeed(20)
basic.forever(() => {
    turtle.forward(4)
    turtle.turnRight()
    turtle.forward(1)
    turtle.turnRight()
    turtle.forward(4)
    turtle.turnLeft()
    turtle.forward(1)
    turtle.turnLeft()
})
```

```package
microturtle=github:Microsoft/pxt-microturtle#v0.0.9
```
