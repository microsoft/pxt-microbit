# Name Badge

![Name badge project](/static/mb/projects/name-badge/header.png)

Make yourself known with a fancy name badge powered by your @boardname@!

## Code

First, let's get your name to display on the screen.

### Button press 

From the ``||input:Input||`` Toolbox drawer, drag an ``||input:on button A pressed||`` block onto the Workspace.

```blocks
input.onButtonPressed(Button.A, function () {

})
```

### Show a string

From the ``||basic:Basic||`` Toolbox drawer drag a ``||basic:show string||`` block into the ``||input:on button A pressed||`` block.

```blocks
input.onButtonPressed(Button.A, function () {
    basic.showString("Hello!")
})
```

### Show my name

In the ``||basic:show string||`` block, type your name.

```blocks
input.onButtonPressed(Button.A, function () {
    basic.showString("My Name")
})
```

### Test the badge

Go to the simulator and test your name badge by pressing button **A**.

```sim
input.onButtonPressed(Button.A, function () {
    basic.showString("My Name")
})
```

### Download

Download the program to your @boardname@:

1. Make sure your @boardname@ is plugged into the computer.
2. Click the `|Download|` button.

## Make

Now that you have your name showing on the @boardname@, let's make a proper badge to  wear and display it on.

Cut out a badge shape from a piece of colored construction paper.

![Construction paper and scisssors](/static/mb/projects/name-badge/picture1.png)

Loop a piece of duct tape and stick it on the back of your @boardname@.

![Roll of tape with the other materials](/static/mb/projects/name-badge/picture2.png)

Stick your @boardname@ onto the front of your badge.

![Board attached to the paper](/static/mb/projects/name-badge/picture3.png)

Using a hole-punch, punch out 2 holes in the top of your badge.

![Holes punched in the paper](/static/mb/projects/name-badge/picture4.png)

Attach the battery pack to the @boardname@.

![Battery pack connected to the board](/static/mb/projects/name-badge/picture5.png)

Tape battery pack onto the back of the badge.

![Battery pack taped on](/static/mb/projects/name-badge/picture6.png)

Thread a shoelace through the top 2 holes of your badge.

![Shoelace threaded through a hole](/static/mb/projects/name-badge/picture7.png)

Tie a knot at the end of your shoelace

![Ends of shoelace tied together](/static/mb/projects/name-badge/picture8.png)

Decorate your badge with colored paper, markers, stickers, glitter.

![Completed name badge](/static/mb/projects/name-badge/picture9.png)

It's now finished! your badge is ready let others know who you are.