# catch the egg game lesson

A game to catch eggs in a basket.

## Topic

Variables

## Quick Links

* [activity](/lessons/catch-the-egg-game/activity)
* [challenge](/lessons/catch-the-egg-game/challenge)
* [quiz](/lessons/catch-the-egg-game/quiz)
* [quiz answers](/lessons/catch-the-egg-game/quiz-answers)

## Prior learning/place of lesson in scheme of work

Learn how to create a catch the egg game game with ``||led:plot||`` , ``||led:unplot||``, and  ``||input:acceleration||`` to turn on and off LED lights on the screen.

## Documentation

The blocks used in this lesson:

```cards
let x = 2;
led.unplot(0, 0);
basic.forever(() => {});
x += 1;
led.plot(0, 0);
basic.pause(300);
input.acceleration(Dimension.X);
Math.min(0,0);
Math.max(0,1);
Math.randomRange(0, 4);
game.addScore(1);
game.score();
game.removeLife(1);
```

## Objectives

* learn how to create a variable as a place where you can store data so that you can use it later in your code, accessible across functions and in nested code blocks
* learn how to repeat code in the background forever
* learn how to turn off a LED light on the LED screen
* learn how to turn on a LED light on the LED screen
* learn how to learn how to conditionally run code depending on whether a condition is true or not
* learn how to learn how to get the acceleration value (g-force), in one of three specified dimensions
* learn how to return the smaller of two numbers
* learn how to return the larger of two numbers
* learn how to return a random number
* learn how to return the modulus
* learn how to show a number of the @boardname@ screen
* learn how to pause your code for the specified number of milliseconds
