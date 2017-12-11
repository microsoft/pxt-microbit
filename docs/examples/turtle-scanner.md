# Turtle Scanner

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
microturtle=github:Microsoft/pxt-microturtle#master
```
