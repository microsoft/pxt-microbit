# Turtle Square

## Setting up your project

This project uses an **microturtle** Extension. You'll need to add it to your project to make it work.

* create a new project
* click on the gearwheel menu and click **Extensions**
* select the **microturtle** extension

After the project reloads, you should see the **turtle** category in the blocks.

## Moving the turtle

Imagine that a virtual turtle, as big as an LED, that you can control with commands. It starts in the center of the screen facing up.

You can use the ``||turtle:forward||`` and ``||turtle::turnRight||`` to move and turn the turtle.

```blocks
turtle.forward(2)
turtle.turnRight()
```

## Drawing a square

Drawing a square can be decomposed into a sequence of moves and turns. Since this is quite repetitive, you can use a **for** loop to repeat code.

```blocks
for (let i = 0; i < 4; i++) {
    turtle.forward(2)
    turtle.turnRight()
}
```

```package
microturtle=github:Microsoft/pxt-microturtle#master
```
