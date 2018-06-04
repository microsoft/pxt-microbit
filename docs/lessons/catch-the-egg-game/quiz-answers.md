# catch the egg game quiz answers

Programming a game of catch the egg using the accelerometer 

## Name

## Directions

Use this activity document to guide your work in the [catch the egg activity](/lessons/catch-the-egg-game/activity)

Answer the questions while completing the tutorial. Pay attention to the dialogues!

## 1. Write the data type for the global variables 'basket' and 'egg'.

<br/>

'Basket' and 'egg' are stored as **Number**.

## 2. Write the code to plot the initial position of the egg and the basket using the variables 'egg x', 'egg y', and 'basket x'. The code should arrange the egg and basket as shown below.

![](/static/mb/lessons/catch-the-egg-game-0.png)

<br/>

```blocks
let basketX = 2
let eggX = 2
let eggY = 0
led.plot(eggX, eggY)
led.plot(basketX, 4)
```

## 3. Write the three lines of code that moves the egg down. (You need to unplot the egg's current position, update its position variables, and plot its new position.

<br/>

```blocks
let basketX = 2
let eggX = 2
let eggY = 0
led.unplot(eggX, eggY)
eggY = eggY + 1
led.plot(eggX, eggY)
```

## 4. . Write the code that resets the egg after it has fallen past the bottom of the @boardname@.

<br/>

```blocks
let eggX = 2
let eggY = 0
if (eggY > 4) {
    eggY = -1
    eggX = Math.randomRange(0, 5)
}
```

