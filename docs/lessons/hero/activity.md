# hero

A classic game, Hero, in which you must capture the food and flee away from the ghost!

## ~avatar avatar

This tutorial will teach you how to create a hero game to capture food while dodging the ghost; the game was inspired by the classic arcade game Pac Man.

## ~

First we need to create a function create sprite at the x, y coordinates and that set the variable called hero on the @boardname@ the first time we play.


```blocks

let hero = game.createSprite(2, 2)

```

Let's set up where we want our ghost will be. Create starting positions of the hero, ghost, and food in each individual quadrant. We will ensure that the ghost, food, and hero is set apart. Divide the @boardname@ into 4 quadrants. We don't want hero to be too close to the ghost so let's make the ghost starting positions in the 3 other quadrants. Hero is in the one quadrant. To do this, we need to keep track of the middle point in each quadrant. Create sprite at the x, y coordinates for the hero, food, and ghost.

```blocks
let hero = game.createSprite(2, 2)
let food = game.createSprite(4, 4)
let ghost = game.createSprite(0, 0)
```


Create a function called change blink that will plot a blinking point so the player can tell between a ghost and hero.

```blocks
let hero = game.createSprite(2, 2);
let food = game.createSprite(4, 4);
let ghost = game.createSprite(0, 0);
ghost.change(LedSpriteProperty.Blink, 100);

```


We want to identify the food so the player moves towards the food. We need to set the `brightness` of the `variable` food to 8. The brightness of the LED screen is expressed as a number between 0 and 255.

```blocks
let hero = game.createSprite(2, 2);
let food = game.createSprite(4, 4);
let ghost = game.createSprite(0, 0);
ghost.change(LedSpriteProperty.Blink, 100);
food.set(LedSpriteProperty.Brightness, 8);

```

We want to include a block from the Loops drawer called `While`. Then set the `While` loop to `true`. This code will be important for repeating code of the game logic of the game. The game will continue to run using `While` loop while the Boolean condition is true. Finally, include a `pause` of 400 milliseconds before the logic of the game begins.


```blocks
let hero = game.createSprite(2, 2);
let food = game.createSprite(4, 4);
let ghost = game.createSprite(0, 0);
ghost.change(LedSpriteProperty.Blink, 100);
food.set(LedSpriteProperty.Brightness, 8);
while (true) {
    basic.pause(400);
}


```

Let's create a function that will take care of keep the ghost pursuing the hero. We will need to a conditional statement that checks the position of the ghost and hero. The first condition will check if the horizontal coordinates of the ghost is less than the horizontal coordinates of the hero. We create a function from the Game drawer that will check the coordinates of the hero and the ghost. Finally, change the x-direction of the ghost by 1.

Then create another function that will take care of keep the ghost pursuing the hero. We will need to a conditional statement that checks the position of the ghost and hero. The second condition will check if the horizontal coordinates of the ghost is greater than the x-direction of hero. We create a function from the Game drawer that will check the x-direction of hero and ghost. Finally, change the x-direction of the ghost by -1.

```blocks
let hero = game.createSprite(2, 2);
let food = game.createSprite(4, 4);
let ghost = game.createSprite(0, 0);
ghost.change(LedSpriteProperty.Blink, 100);
food.set(LedSpriteProperty.Brightness, 8);
while (true) {
    basic.pause(400);
    if (ghost.get(LedSpriteProperty.X) < hero.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, 1);
    }
    else if (ghost.get(LedSpriteProperty.X) > hero.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X,  -1 );
    }
    else if (false) {
    }
    else if (false) {
    }
   
}


```

Let's create the third function and forth function that continues the same logic in the y-direction of pacman and ghost. We create a function from the Game drawer that will check the y-direction of pacman and ghost. Finally, change the y-direction of the ghost to continue following pacman.

```blocks
let hero = game.createSprite(2, 2);
let food = game.createSprite(4, 4);
let ghost = game.createSprite(0, 0);
ghost.change(LedSpriteProperty.Blink, 100);
food.set(LedSpriteProperty.Brightness, 8);
while (true) {
    basic.pause(400);
    if (ghost.get(LedSpriteProperty.X) < hero.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, 1);
    }
    else if (ghost.get(LedSpriteProperty.X) < hero.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X,  -1 );
    }
    else if (ghost.get(LedSpriteProperty.Y) < hero.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, 1);
    }
    else if (ghost.get(LedSpriteProperty.Y) > hero.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y,  -1 );
    }
   
}


```

Let's enable pacman to move in the x-direction and move in the y-direction with acceleration using the micor:bit sensor

```blocks
let hero = game.createSprite(2, 2);
let food = game.createSprite(4, 4);
let ghost = game.createSprite(0, 0);
ghost.change(LedSpriteProperty.Blink, 100);
food.set(LedSpriteProperty.Brightness, 8);
while (true) {
    basic.pause(400);
    if (ghost.get(LedSpriteProperty.X) < hero.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, 1);
    }
    else if (ghost.get(LedSpriteProperty.X) < hero.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X,  -1 );
    }
    else if (ghost.get(LedSpriteProperty.Y) < hero.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, 1);
    }
    else if (ghost.get(LedSpriteProperty.Y) > hero.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y,  -1 );
    }
    if (input.acceleration(Dimension.X) > 200) {
        hero.change(LedSpriteProperty.X, 1);
    }
    else if (input.acceleration(Dimension.X) <  -200 ) {
        hero.change(LedSpriteProperty.X,  -1 );
    }
    if (input.acceleration(Dimension.Y) > 200) {
        hero.change(LedSpriteProperty.Y, 1);
    }
    else if (input.acceleration(Dimension.Y) >  -200 ) {
        hero.change(LedSpriteProperty.Y,  -1 );
    }
}
```

Let's setup the logic for the food. If hero  is `touching` "food", increase the score of the game by 1 and `set` ``x`` -direction of food randomly randomly from 0 to 4 and `set` ``y``-direction of food randomly from 0 to 4.

```blocks
let hero = game.createSprite(2, 2);
let food = game.createSprite(4, 4);
let ghost = game.createSprite(0, 0);
ghost.change(LedSpriteProperty.Blink, 100);
food.set(LedSpriteProperty.Brightness, 8);
while (true) {
    basic.pause(400);
    if (ghost.get(LedSpriteProperty.X) < hero.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, 1);
    }
    else if (ghost.get(LedSpriteProperty.X) < hero.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X,  -1 );
    }
    else if (ghost.get(LedSpriteProperty.Y) < hero.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, 1);
    }
    else if (ghost.get(LedSpriteProperty.Y) > hero.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y,  -1 );
    }
    if (input.acceleration(Dimension.X) > 200) {
        hero.change(LedSpriteProperty.X, 1);
    }
    else if (input.acceleration(Dimension.X) <  -200 ) {
        hero.change(LedSpriteProperty.X,  -1 );
    }
    if (input.acceleration(Dimension.Y) > 200) {
        hero.change(LedSpriteProperty.Y, 1);
    }
    else if (input.acceleration(Dimension.Y) >  -200 ) {
        hero.change(LedSpriteProperty.Y,  -1 );
    }
    if (hero.isTouching(food)) {
        game.addScore(1);
        food.set(LedSpriteProperty.X, Math.randomRange(0, 5));
        food.set(LedSpriteProperty.Y, Math.randomRange(0, 5));
    }

}


```



Let's setup the logic for the food and the ghost to be in different quadrants. Finally, the game over component is now upon the game. If the hero is `touching` the ghost, let's display `game over`

```blocks

let hero = game.createSprite(2, 2);
let food = game.createSprite(4, 4);
let ghost = game.createSprite(0, 0);
ghost.change(LedSpriteProperty.Blink, 100);
food.set(LedSpriteProperty.Brightness, 8);
while (true) {
    basic.pause(400);
    if (ghost.get(LedSpriteProperty.X) < hero.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, 1);
    }
    else if (ghost.get(LedSpriteProperty.X) < hero.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X,  -1 );
    }
    else if (ghost.get(LedSpriteProperty.Y) < hero.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, 1);
    }
    else if (ghost.get(LedSpriteProperty.Y) > hero.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y,  -1 );
    }
    if (input.acceleration(Dimension.X) > 200) {
        hero.change(LedSpriteProperty.X, 1);
    }
    else if (input.acceleration(Dimension.X) <  -200 ) {
        hero.change(LedSpriteProperty.X,  -1 );
    }
    if (input.acceleration(Dimension.Y) > 200) {
        hero.change(LedSpriteProperty.Y, 1);
    }
    else if (input.acceleration(Dimension.Y) >  -200 ) {
        hero.change(LedSpriteProperty.Y,  -1 );
    }
    if (hero.isTouching(food)) {
        game.addScore(1);
        food.set(LedSpriteProperty.X, Math.randomRange(0, 5));
        food.set(LedSpriteProperty.Y, Math.randomRange(0, 5));
        if (food.get(LedSpriteProperty.X) < 2 && food.get(LedSpriteProperty.Y) < 2) {
            ghost.set(LedSpriteProperty.X, 4);
            ghost.set(LedSpriteProperty.Y, 4);
        }
        else if (food.get(LedSpriteProperty.X) > 2 && food.get(LedSpriteProperty.Y) < 2) {
            ghost.set(LedSpriteProperty.X, 0);
            ghost.set(LedSpriteProperty.Y, 4);
        }
        else if (food.get(LedSpriteProperty.X) < 2 && food.get(LedSpriteProperty.Y) > 2) {
            ghost.set(LedSpriteProperty.X, 4);
            ghost.set(LedSpriteProperty.Y, 0);
        }
        else {
            ghost.set(LedSpriteProperty.X, 0);
            ghost.set(LedSpriteProperty.Y, 0);
        }
    }
    if (hero.isTouching(ghost)) {
        game.gameOver();
    }

}
ghost.set(LedSpriteProperty.X, 4);


```

## ~avatar avatar

Congratulations! You have a homemade hero game based on the classic version of PacMan

## ~

