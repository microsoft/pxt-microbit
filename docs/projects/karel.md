# Karel the LED

## ~avatar avatar

Help Karel make LED art!

## ~

**Karel the LED** can't turn right, but he can make some great LED art!

![](/static/mb/projects/karel/hi.png "Hi")

The goal of this activity is to download the JavaScript code given below onto a @boardname@.
Then use the program to introduce new students to the @boardname@.
Students will not do the coding this time. They will be the users who get familiar with the board.

## How to play

* ``A button`` **Turn Left**  
>Does not draw anything just changes the direction Karel (the flashing led) is facing
* ``B button`` **Move Forward**  
>Moves Karel forward one step and leaves the LED on behind him
* ``shake`` **Jump**  
>Moves Karel forward one step without leaving the LED on behind him
* ``A+B button`` **Hide Karel**  
>Shows or hides Karel (the flashing LED), to be used once your artwork is complete
* ``Reset button`` **Clear the board and restart**  
>Restart the program and clear the board

**Note:** There is no way to erase, except by restarting.

## Try drawing some patterns

See if you can make each pattern below using **A**, **B**, and **shake**. Once you have completed a challenge press **A** and **B** at the same time to hide Karel.
For patterns that you design, decide which LEDs you want to turn on and then make that design with Karel.

### Spiral
![](/static/mb/projects/karel/spiral.png "Spiral")

### Right turn
![](/static/mb/projects/karel/right-turn.png "Right turn")

### Eyes
![](/static/mb/projects/karel/eyes.png "Eyes")

### Smile

![](/static/mb/projects/karel/smile.png "Smile")

### Check

![](/static/mb/projects/karel/check.png "Check")

### First letter of your name

Figure out how to make the first letter of your name with the LEDs.  

```sim
basic.forever(() => {
    basic.showAnimation(`
    # # # . . # # # . . # # # . . # # # . .
    . . . . . # . . . . # . . . . # . . # .
    . . . . . # . . . . # . . . . # . . # .
    . . . . . # . . . . # . . . . # . . # .
    . . . . . # . . . . # # # . . # # # . .
    `)
    basic.pause(1000)
    basic.clearScreen()
    basic.pause(1000)
})
```

### Your design!

Make something fun!

```sim
basic.forever(() => {
    basic.showAnimation(`
    # . . . . # . . . . # . . . . # . . . . # . . . . # . . . .
    . . . . . # . . . . # . . . . # . . . . # . . . # # . # # #
    . . . . . # . . . . # . . . . # . . . . # . . . # # . # . #
    . . . . . # . . . . # . . . . # . . . . # . . . # # . . . #
    . . . . . # . . . . # # # # # # # # # # # # # # # # # # # #
    `)
    basic.pause(1000)
    basic.clearScreen()
    basic.pause(1000)
})
```

Thanks for playing with Karel the LED!

## Coding Karel the LED

Copy this code into the JavaScript editor and then download it to the board.

**Note:** For this project you need to manually copy the code and insert it into the JavaScript view of the editor.

```typescript
class Board {
    public isKarelActive: boolean;
    public karelX: number;
    public karelY: number;

    public ledState: Image;
    private karelDirection: Direction;

    constructor() {
        this.isKarelActive = true;
        this.karelX = 2;
        this.karelY = 2;
        this.karelDirection = Direction.UP;
        this.ledState = images.createImage(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `);
    }

    pressedA() {
        if (!this.isKarelActive) {
            return;
        }
        this.karelDirection = (this.karelDirection + 1) % 4;
    }

    pressedB() {
        if (!this.isKarelActive) {
            return;
        }
        this.ledState.setPixel(this.karelX, this.karelY, true);
        this.moveKarel()
    }

    shake() {
        if (!this.isKarelActive) {
            return;
        }
        this.moveKarel()
    }

    private moveKarel() {
        if (!this.isKarelActive) {
            return;
        }
        switch (this.karelDirection) {
            case Direction.UP:
                if (this.karelY > 0) {
                    this.karelY -= 1;
                }
                break;
            case Direction.LEFT:
                if (this.karelX > 0) {
                    this.karelX -= 1;
                }
                break;
            case Direction.DOWN:
                if (this.karelY < 4) {
                    this.karelY += 1;
                }
                break;
            case Direction.RIGHT:
                if (this.karelX < 4) {
                    this.karelX += 1;
                }
                break;
        }
    }

    pressedAB() {
        this.isKarelActive = !this.isKarelActive;
    }

    update() {
        this.ledState.showImage(0);
    }
}
const board = new Board();
enum Direction {
    UP = 0,
    LEFT,
    DOWN,
    RIGHT
}
input.onButtonPressed(Button.B, function () {
    board.pressedB();
    board.update();
})
input.onGesture(Gesture.Shake, function () {
    board.shake();
    board.update();
})

input.onButtonPressed(Button.A, function () {
    board.pressedA();
    board.update();
})
input.onButtonPressed(Button.AB, function () {
    board.pressedAB();
    board.update();
})
basic.forever(function () {
    if (board.isKarelActive) {
        led.toggle(board.karelX, board.karelY)
        basic.pause(500)
    }
})
```

## About the authors

This project\*\* was contributed by Dr. David Fisher a professor at [Rose-Hulman Institute of Technology](https://www.rose-hulman.edu/academics/faculty/fisher-david-fisherds.html). Dr. Fisher loves educational robotics and runs various outreach programming activities, including a summer camp, called [Connecting with Code](https://connectingwithcode.org), which gives a @boardname@ to each participant.

\*\* Upgraded to **v1** by the MakeCode team.
