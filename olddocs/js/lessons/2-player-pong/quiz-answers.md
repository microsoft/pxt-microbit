# 2 player pong quiz answers

a two-player game of Pong using TWO @boardname@s!.

## Name

## Directions

Use this activity document to guide your work in the [2 player pong tutorial](/lessons/2-player-pong/tutorial)

Answer the questions while completing the tutorial. Pay attention to the dialogues!

## 1. Write the two global variables that record if the player has the ball and if the game is running, and assign these variables to their initial values.

<br/>

```
hasBall = false
gameRunning = false
```

## 2. Write the global variable that keeps track of the game state in which whoever presses button A first will get to start the ball. Assign this variable to its initial value.

<br/>

```
claimBall = true
```

## 3. Write the code that creates a condition to know when Button A is pressed. Then write the 'If statement' to ensure that 'claim ball' is true. If the claim ball is true, then write the code that sets P0 to 1 to signal to the other device that the player has claimed the ball.

<br/>

```
input.onButtonPressed(Button.A, () => {
    if (claimBall) {
        pins.digitalWritePin("P0", 1)
    }
})
```

## 4. Write the code to move the paddle right when button B is pressed. Be sure to check if the game is running and if the paddle is not already on the rightmost edge. 

<br/>

```
if (gameRunning) {
    if (paddleX != 0) {
        led.unplot(paddleX, 4)
        paddleX = paddleX - 1
        led.plot(paddleX, 4)
    }
}
```

## 5. What are the three pieces of information that we send to the other device when transferring the ball? (Hint: look in your "transfer ball" function, and look for any places that contain "transfer byte").

<br/>

The device first transfers a bit of 1 to indicate that the device is going to transfer the data of the ball. After that, the device transfers the x-coordinate of the ball, and then the x-velocity of the ball.

## 6. Using the function "read velocity", write the code that reads the x-coordinate and the x-velocity of the ball. (Hint: look at the function "read ball".)

<br/>

```
ballX = micro_bitTransfer.readByte()
ballXVelocity = readVelocity()
```

## 7. Write the code that updates 'ball x velocity'. (Hint: look at the "update velocity" function.)

<br/>

```
if (ballX == 0 || ballX == 4) {
    ballXVelocity = ballXVelocity * (-1)
}
```

## 8. Write the code to move the ball. To move the ball, unplot the ball's original position, update its position variables, and then plot the ball's new position.

<br/>

```
led.unplot(ballX, 0)
ballX = ballX + ballXVelocity
ballY = ballY + ballYVelocity
led.plot(ballX, ballY)
```

