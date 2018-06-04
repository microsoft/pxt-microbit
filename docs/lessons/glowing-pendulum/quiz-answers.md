# glowing pendulum quiz answers

construct a pendulum that glows using acceleration.

## Name

## Directions

Use this activity document to guide your work in the [glowing pendulum activity](/lessons/glowing-pendulum/activity)

Answer the questions while completing the tutorial. Pay attention to the dialogues!

## 1. Why are you creating a 'forever' loop?

<br/>

We are creating a forever loop to constantly display the appropriate brightness on the LED display.

## 2. Write the line of code to measure the acceleration with respect to the "y" axis and store this value in a local variable called 'acceleration'.

<br/>

```blocks
let acceleration = input.acceleration(Dimension.Y)
```

## 3. After storing the acceleration in a variable, write the code to take the absolute value of the acceleration, and store this value inside 'acceleration'.

<br/>

```blocks
let acceleration = input.acceleration(Dimension.X)
let accelerationAbsolute = Math.abs(acceleration)
```

## 4. Write the code to use the acceleration value from question 3 to set the brightness on the @boardname@.

<br/>

```blocks
let accelerationX = input.acceleration(Dimension.X)
let accelerationAbsolute = Math.abs(accelerationX)
let accelerationDivided = accelerationX / 4
led.setBrightness(accelerationX)
```

