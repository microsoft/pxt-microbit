# Turtle Square

## Introduction @unplugged

Imagine that a virtual turtle, as big as an LED, that you can control it with commands.
In this tutorial, you will learn to use the turtle and draw a square.

## Moving the turtle @fullscreen

The turtle starts in the center of the screen facing up. Place a ``||turtle:forward||`` block to make it move up.

```blocks
turtle.forward(1)
```

## Turning and moving @fullscreen

Place a ``||turtle:turnRight||`` to turn the turtle and place another ``||turtle:forward||`` block to make it move again.

```blocks
turtle.forward(1)
turtle.turnRight()
turtle.forward(1)
```

## Drawing a square

If you add enough ``||turtle:turnRight||`` and ``||turtle:forward||`` block, the turtle 
will eventually draw a square. 

You can move the blocks in a ``||input:on button pressed||`` to easily run the code again.

```blocks
input.onButtonPressed(Button.A, function() {
    turtle.forward(1)
    turtle.turnRight()
    turtle.forward(1)
    turtle.turnRight()
    turtle.forward(1)
    turtle.turnRight()
    turtle.forward(1)
    turtle.turnRight()
})
```

## "For" is for repetition

Have you notice the repetition pattern in the blocks needed to draw a square?
Try to use a ``for`` loop to achieve the same effect.

```blocks
input.onButtonPressed(Button.A, function() {
    for(let i = 0; i <=4; ++i) {
        turtle.forward(1)
        turtle.turnRight()
    }
})
```


## Leaving a trail

The turtle holds a pen that turns on LEDs. If you add the ``||turtle:pen||`` block,
it will leave a trail as it moves.

```blocks
input.onButtonPressed(Button.A, function() {
    turtle.pen(TurtlePenMode.Down)
    for(let i = 0; i <=4; ++i) {
        turtle.forward(1)
        turtle.turnRight()
    }
})
```

```package
microturtle=github:Microsoft/pxt-microturtle#v0.0.9
```
