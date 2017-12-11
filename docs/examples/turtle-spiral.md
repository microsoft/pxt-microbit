# Turtle Spiral

The turtle goes to the center back and forth.

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
microturtle=github:Microsoft/pxt-microturtle#master
```
