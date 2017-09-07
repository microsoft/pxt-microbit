# blocks - rendering graphics

An introduction to graphics for the Block Editor.

## Before we get started

Ensure you have completed the 'Hello, world!' and Loop tutorials and tested them on a simulator or on @boardname@.

```blocks
basic.showString("HI!");
```

The @boardname@ has a grid of 25 LEDs, so we can use these to display images.

We’ve already experimented with the `show string` block that displays a string (some text) that we program it to. However we can use more blocks from the **Images** drawer to render or display images in different ways.

## Pixel Art

We can draw little images from the LEDs by ticking boxes. Drag a `show image` block from the **Images** drawer and connect in a `create image` block. You can customize this image by clicking boxes to tick whether the LED will turn on or off. For example, if we were creating a music player we may want to the show the `play` block:

![](/static/mb/blocks/lessons/graphics-0.png)

## Plotting points

We can also code our bug to plot a point by giving an x (horizontal) and y (vertical) coordinates, from 0 to 4. Click the **LED** drawer and drag a `plot` block. Try changing the coordinates and see the effect this has on the @boardname@.

We can also unplot a point (turn the LED off again) using the `unplot` block. So we could create a flashing LED program, using the `pause` block to create a delay.

```blocks
basic.forever(() => {
    led.plot(2,2)
    basic.pause(100)
    led.unplot(2,2)
    basic.pause(100)
})
```

We can also use the `basic.clearScreen` block to turn off all LEDs.

## Tip

The pause block is in milliseconds, so setting it to 1000 will have a pause of a single second.

## Devising algorithms for shapes

An algorithm is a set of steps to follow to solve a problem. We can begin to draw shapes on the @boardname@ using an algorithm. 
For example, we could draw a straight line with this code:

```blocks
for(let i = 0; i <=4; i++) {
    led.plot(i, 0);
    basic.pause(200)
}
```

Our algorithm is: increase **i** by 1 **from 0** to **4**, and **plot** the point **x=i**, **y=0**. The pause block allows this line to be animated (drawn frame by frame).

Try devising an algorithm for a diagonal line using the code above and the variable **i**.
```sim
basic.forever(() => {
    for(let i = 0; i <=4; i++) {
        led.plot(i, i);
        basic.pause(200)
    }
    basic.clearScreen();
})
```

## Animations

Animations are changes happening at a certain rate. For example, we could add the `pause` block from the **Basic** drawer with our square algorithm – this will slowly draw a square (as an animation).

We could create more complex animations, for example we could make our @boardname@ display an explosion or fireworks.

## Image variables

We can create image variables so we can easily display an image at a later point. For example:

![](/static/mb/blocks/lessons/graphics-4.png)

This uses the blocks from the **Variable** drawer, and the **create image** block from the **Image** drawer. This means our image can be displayed without having to replicate the `create image` block each time.

