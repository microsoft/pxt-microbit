# Salute!

**Salute!** is a simple math game where players select a number card from a deck (without looking at it) and hold it to their forehead as in a "salute". Another player decides whether to make a sum or product of the two cards and then announces the result. Based on the card held by the opposing player and the result announced, each player tries to figure out what card they are holding.

## Goals for this activity

* This a group activity for either a classroom or just friends gathered together.
* Decompose the steps needed to code and play the **Salute!** math game using @boardname@s.
* Create a program to display a random number, in an appropriate range, on the LED Matrix of a @boardname@ and correctly install the program on a @boardname@.
* Optionally, create a program to keep score in the game using a @boardname@ and correctly install the program on a @boardname@.
Optionally, make a headband to hold the @boardname@ and battery on the forehead during game play.
* Play the @boardname@ Salute! math game, using @boardname@s, in groups of 3.

Quickly familiarize yourself with how the game works by seeing the information in the [reference](#references) links.

## Materials

* 2 or 3 @boardname@s with battery packs and USB cables
* Paper and pencil
* Optional, materials to create headbands to hold the @boardname@

## Coding the game

### Two players

1. Two of the @boardname@s are programmed to display a random number within a specified range based on a “salute”. A salute is an agreed upon event/input that the student can make happen without needing to seeing their LED Matrix.
2. Include a loop to verify that the number is larger than 0 and/or 1 if those numbers are not to be included in the game.
3. If upper number in the range is greater than 9, include a loop to display the number multiple times or provide another way to redisplay the number.

### Three players

If using 3 @boardname@s, the third @boardname@ is programmed to keep score in the game using the ``A`` and ``B`` buttons and to display the score based on a different event, such as, the ``A+B`` button. There should also be a way to reset the scores for the next round of play.

### Make the number cards

Choose a random number between 0 and 9.

```blocks
let randomNbr = 0
input.onGesture(Gesture.ScreenUp, () => {
    randomNbr = Math.randomRange(0, 10)
    basic.showNumber(randomNbr)
})
```

Choose a random number between 1 and 9.

```blocks
let randomNbr = 0
input.onGesture(Gesture.ScreenUp, () => {
    randomNbr = 0
    while (randomNbr < 1) {
        randomNbr = Math.randomRange(0, 10)
    }
    basic.showNumber(randomNbr)
})
```

### Score keeper

The score keeper program adds one point for a player when button ``A`` or ``B`` is pressed. Pressing ``A+B`` shows the current winner and score. The scores are reset by turning the @boardname@ over.

```blocks
let player1Score = 0
let player2Score = 0
input.onButtonPressed(Button.A, () => {
    player1Score += 1
})
input.onButtonPressed(Button.B, () => {
    player2Score += 1
})
input.onButtonPressed(Button.AB, () => {
    if (player1Score == player2Score) {
        basic.showString("TIE")
    } else if (player1Score > player2Score) {
        basic.showString("Player 1")
    } else {
        basic.showString("Player 2")
    }
    basic.showNumber(Math.max(player1Score, player2Score))
})
input.onGesture(Gesture.LogoDown, function () {
    player2Score = 0
    player1Score = 0
    basic.showString("Reset")
    basic.pause(1000)
    basic.clearScreen()
})
```

## Game Play

Before the game starts, decide how many rounds will be played or for how long rounds will be played. Also, decide how a tie is determined: will both players get a point or will neither player get a point.

1. Player 1 and 2 will sit or stand facing one another with their @boardname@s on their forehead so they can see the LED matrix on the other player’s @boardname@. Players should not be able to see the LED matrix on their own @boardname@. **NOTE:** It’s fun to create a band of some kind that will hold the @boardname@ on the forehead and have the action which selects the number be something to do with movement of the head.

2. Player number 3 will sit or stand so they can see the @boardname@s of both Player 1 and Player 2.

3. Player 3 will say “Salute!” and Player 1 and 2 should “salute” one another with their @boardname@s which will display a random number on the LED Matrix of their @boardname@s.

4. Player 3 quickly adds up (if doing an addition/subtraction game) or multiplies (if doing a multiplication/division game) the numbers displayed on the @boardname@s of Player 1 and Player 2. Player 3 should then say the result. If wanting to emphasize math vocabulary, require that Player 3 uses proper math vocabulary: “The sum is ...” OR “The product is ...”.
5. Player 1 and 2 then try to be the fastest to figure out and say the number on their @boardname@. The first player to correctly identify the number on their @boardname@ “wins” the round. If zeros are being used in a multiplication game, a player who can see a zero on the other @boardname@, can say “any number” as a correct answer. If you're wanting to emphasize proper math vocabulary, the player must say the entire math fact and not just the number. For example, if playing a multiplication facts game:
>* Player 1’s @boardname@ is displaying a 2
>* Player 2’s @boardname@ is displaying a 6
>* The player (1 or 2) that correctly says “2 times 6 (or 6 times 2) equals 12” would win the “round”.
6. Player 3 then adds to the score:
>* If a third @boardname@ was programmed to keep score, Player 3 should press button ``A`` if Player 1 won the round or button ``B`` if Player 2 won the round. 
>* If only two @boardname@s are being used, Player 3 should keep score on paper.
7. At the end of a set of rounds (or end of specified time), the total score for both players should be recorded on paper. If the third @boardname@ was programmed to keep score, Player 3 should display the scores from the @boardname@ and write them down on a score sheet. This sheet would typically have the players names on it, not player numbers since they can switch positions.

If time permits, players should switch positions (e.g., Player 1 becomes Player 2, Player 2 becomes Player 3, and Player 3 becomes Player 1) and repeat for the same amount of time/number of rounds until everyone has a chance to be Player 3. If time does not permit, play the game again on another day, switching positions.

## Variations

1. If there are enough people to play in groups of 4, Player 3 would say “Salute!” and the sum or product of the two cards, as usual. Player 4 would be the score keeper and referee on any ties OR have an additional @boardname@ with a number displayed and players need to calculate using all three @boardname@s with numbers displayed.
2. Older players could create this game for younger ones making sure to use an appropriate number range for the grade level. The older players, or the older and younger players together, could make some kind of headband to hold the @boardname@ on the forehead. The older players would then teach the younger players how the game works.
3. If only using two @boardname@s and you want to keep score:
Add the code to keep score to one of the @boardname@s being used and use the ``A`` and ``B`` buttons to keep score on that @boardname@. 

## References

[Salute: A Game to Reinforce Math Facts](https://www.brighthubeducation.com/lesson-plans-grades-3-5/28715-play-the-game-salute-to-reinforce-math-facts/): This is an example of how this is traditionally played with cards.

Also, watch this video to see how the game is played:

https://www.youtube.com/watch?v=DJBMbSUGZsc
How to Play Salute!

This math game project was kindly contributed by [Vicky Sedgwick](https://about.me/vicky.sedgwick). It's based on the original game concept created by [Todd Lash](https://twitter.com/Todd_Lash).
