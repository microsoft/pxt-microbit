# Project: Screensaver or game

Use what you now know about LEDs, coordinates, and brightness to create your own project: a screensaver, or a game. You should find a way to use coordinates in your program. Even better, use variables to store and update your coordinates.

Your task is to create:

* A “screen saver” animation using the plot/unplot blocks. You can fill the screen line by line, pausing between each one, or fill it with a random constellation of stars.

– OR –

* A game that uses sprites to manage the x- and y-coordinate values of the different objects.

Your project might use variables to store the values of sprites, which are special structures that contain an x- and a y-coordinate together that describe the sprite’s location as one LED on the screen.

## Screensavers
One type of project is a screensaver. A long time ago, computers and televisions used cathode ray tube (CRT) screens for displays. The glass screen of the display was coated on the back with phosphor, a substance that glows when painted with electrons from an electron gun at the other end of the tube. When the same area of the screen was painted (or excited) over and over again by the stream of electrons, that part of the screen would sometimes “freeze” with the same image burned into the phosphor for good. This was called **burn-in.**

Normally, if a show was running or if someone was actively using the computer, the display changed often enough that burn-in wasn’t a problem. Programmers learned to create a demo screen with an animation that would run whenever the screen was idle. Today, nearly all computers and television sets use LCD displays, which are not affected by burn-in. But you can still find a screen saver in nearly every computer’s Settings panel as an opportunity to show off some neat graphics or animation.

## Project Expectations

Make sure your project meets these specifications:

* Uses at least three of the different kinds of ‘plot’, ‘unplot’, ‘toggle’, ‘point x y’ blocks, and uses variables to update the coordinates in some way
* Uses plotted LEDs in a meaningful way
* The program compiles and runs as intended and includes meaningful comments in code
* Provide the written Journal entry reflection (which we’ll talk about after you complete your project)

## Project Ideas

### Firework screensaver

This project uses a for loop with the plot/unplot blocks to create a symmetrical design on the screen. The following sample code uses a subtraction operation to get a variable that decreases as the index variable in the loop increases.

```sim
basic.forever(() => {
    for (let x = 0; x <= 4; x++) {
        led.plot(x, 0)
        led.plot(0, 4 - x)
        led.plot(4 - x, 4)
        led.plot(4, x)
        basic.pause(50)
        led.unplot(x, 0)
        led.unplot(4 - x, 4)
        led.unplot(0, 4 - x)
        led.unplot(4, x)
        basic.pause(50)
    }
})
```
Solution link: [makecode.microbit.org/_97A6Ru6LELcP]()

### Cascade screensaver

This example creates a diagonal cascading effect across the screen. Note the use of a variable (speed) to allow you to easily change the speed of the animation by changing just one number value.

```sim
let reverse = 0
let speed = 10
let inner = 0
let outer = 0
basic.forever(() => {
    for (let outer = 0; outer <= 4; outer++) {
        reverse = 4 - outer
        for (let inner = 0; inner <= 4; inner++) {
            led.plot(outer, reverse)
            basic.pause(speed)
            led.plot(reverse, outer)
            basic.pause(speed)
            led.plot(reverse - inner, reverse)
            basic.pause(speed)
            led.plot(reverse, reverse - inner)
            basic.pause(speed)
        }
    }
    for (let outer = 0; outer <= 4; outer++) {
        reverse = 4 - outer
        for (let inner = 0; inner <= 4; inner++) {
            led.unplot(outer, reverse)
            basic.pause(speed)
            led.unplot(reverse, outer)
            basic.pause(speed)
            led.unplot(reverse - inner, reverse)
            basic.pause(speed)
            led.unplot(reverse, reverse - inner)
            basic.pause(speed)
        }
    }
})
```

```blocks
let reverse = 0
let speed = 0
let inner = 0
let outer = 0
basic.forever(() => {
    for (let outer = 0; outer <= 4; outer++) {
        reverse = 4 - outer
        for (let inner = 0; inner <= 4; inner++) {
            led.plot(outer, reverse)
            basic.pause(speed)
            led.plot(reverse, outer)
            basic.pause(speed)
            led.plot(reverse - inner, reverse)
            basic.pause(speed)
            led.plot(reverse, reverse - inner)
            basic.pause(speed)
        }
    }
    for (let outer = 0; outer <= 4; outer++) {
        reverse = 4 - outer
        for (let inner = 0; inner <= 4; inner++) {
            led.unplot(outer, reverse)
            basic.pause(speed)
            led.unplot(reverse, outer)
            basic.pause(speed)
            led.unplot(reverse - inner, reverse)
            basic.pause(speed)
            led.unplot(reverse, reverse - inner)
            basic.pause(speed)
        }
    }
})
speed = 10
```

Solution link: [makecode.microbit.org/_Y2TU9cgWz07m]()

### Dodge ball game

This is a Dodge Ball game that uses one sprite (dodger) to try to avoid another sprite (ball). You use the A and B buttons to move the dodger to avoid the balls that are falling from the top of the screen.

```sim
let dodger: game.LedSprite = null
let ball: game.LedSprite = null
basic.forever(() => {
   if (dodger.isTouching(ball)) {
       game.gameOver()
   } else if (ball.get(LedSpriteProperty.Y) < 4) {
       ball.change(LedSpriteProperty.Y, 1)
       basic.pause(250)
   } else {
       game.addScore(1)
       ball.set(LedSpriteProperty.Y, 0)
       ball.set(LedSpriteProperty.X, randint(0, 5))
   }
})
input.onButtonPressed(Button.A, () => {
   if (dodger.get(LedSpriteProperty.X) > 0) {
       dodger.change(LedSpriteProperty.X, -1)
   }
})
input.onButtonPressed(Button.B, () => {
   if (dodger.get(LedSpriteProperty.X) < 4) {
       dodger.change(LedSpriteProperty.X, 1)
   }
})
ball = game.createSprite(randint(0, 5), 0)
dodger = game.createSprite(2, 4)
game.setScore(0)
```

Here is the complete Dodge Ball program.

```blocks
let dodger: game.LedSprite = null
let ball: game.LedSprite = null
basic.forever(() => {
   if (dodger.isTouching(ball)) {
       game.gameOver()
   } else if (ball.get(LedSpriteProperty.Y) < 4) {
       ball.change(LedSpriteProperty.Y, 1)
       basic.pause(250)
   } else {
       game.addScore(1)
       ball.set(LedSpriteProperty.Y, 0)
       ball.set(LedSpriteProperty.X, randint(0, 5))
   }
})
input.onButtonPressed(Button.A, () => {
   if (dodger.get(LedSpriteProperty.X) > 0) {
       dodger.change(LedSpriteProperty.X, -1)
   }
})
input.onButtonPressed(Button.B, () => {
   if (dodger.get(LedSpriteProperty.X) < 4) {
       dodger.change(LedSpriteProperty.X, 1)
   }
})
ball = game.createSprite(randint(0, 5), 0)
dodger = game.createSprite(2, 4)
game.setScore(0)
```
Solution link: [makecode.microbit.org/_E9b733huX2DP]()

## Journal Entry

Write a short journal reflection of about 150–300 words, addressing the following points:

* Did you do a screensaver? A game? Something different? How did you decide?
* If you did a game, what is the object of the game?
* How does your project use coordinates?
* Describe something in your project that you are proud of.
* Describe a difficult point in the process of designing this program, and explain how you resolved it.
* What feedback did your beta testers give you? How did that help you improve your design?
* Publish your MakeCode program and include the link.	 
