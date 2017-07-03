## Activity: Headband charades

Create an array of words that can be used as part of a charades-type game.
This activity is based on a very popular phone app invented by Ellen DeGeneres (https://bits.blogs.nytimes.com/2013/05/03/ellen-degeneres-iphone-game/).

![Heads up game](/static/courses/csintro/arrays/heads-up-game.jpg)
	
* Create a new variable and give it a name like arrayWords.
* Insert a 'set' variable block into the 'on start' block. 
* Change the default variable name to this new variable name.
* From the Array Toolbox drawer, drag a 'create array' block to the coding workspace.
* Attach this array block to the end of the 'set' variable block. 

```blocks
let arrayWords = ["", ""]
```

Notice that the array comes with 2 string blocks. We’ll want more for our charades game.

* Click on the blue gear-wheel icon in the top left corner of the 'create array' block.
* From the pop up window, add as many values (elements) as you'd like to the array block by dragging the value block from the left side of the window to the array block on the right side of the window.
* For now, we’ll add 4 more values for a total of 6 values.
![Add values to array](/static/courses/csintro/arrays/array-add-value.png)
* Drag 4 string blocks from the Text Toolbox drawer, and place them in the empty array slots.

```blocks
let arrayWords = ["", "", "", "", "", "", ""]
```
* Fill each string with one word. Choose words that will be fun for a game of charades. 
Example:
```blocks	
let arrayWords = ["cat", "guitar", "flashlight", "cupcake", "tree", "frisbee"]
```

Now, we need a way to access one word at a time from this array of words.
* We can use the 'show string' block from the Basic Toolbox drawer, and the 'on screen up' event handler from the Input Toolbox drawer (this is a drop-down menu choice of the 'on shake' block) to tell the micro:bit to display a word when we tilt the micro:bit up. 
* For this version, we’ll display the words one at a time in the order they were first placed into the array.
* We’ll use the index of the array to keep track of what word to display at any given time, so you'll need to create an 'index' variable.

```block
let arrayWords: string[] = []
let index = 0
input.onGesture(Gesture.ScreenUp, () => {
    basic.showString(arrayWords[index])
})
```

* To start the game with the index at zero, add a 'set' variable block to the 'on' start block.
* Next, add the following:

>* an image as a placeholder for when the program has started. Since charades is a guessing game, we made one that looks like a question mark (?),
* a countdown to the first word using show number blocks and pause blocks
* And show the first word in the array

```blocks
let index = 0
let arrayWords: string[] = []
		 
arrayWords = ["cat", "guitar", "flashlight", "cupcake", "tree", "frisbee"]
index = 0
basic.showLeds(`
    . # # # .
    . . . # .
    . . # # .
    . . . . .
    . . # . .
    `)
basic.pause(100)
basic.showNumber(3)
basic.pause(100)
basic.showNumber(2)
basic.pause(100)
basic.showNumber(1)
basic.showString(arrayWords[index])
```

So far we have a start to our game and a way to display the first word.

Once that word has been guessed (or passed), we need a way to advance to the next word in the array.

* We can do this by changing the index of the array with the 'on screen down' event handler from the Input Toolbox drawer (this is a drop-down menu choice of the 'on shake' block) to advance to the next word when we tilt the micro:bit down.

```block
let index = 0
input.onGesture(Gesture.ScreenDown, () => {
    index += 1
})
```
We have a limited number of elements in our array, so to avoid an error, we need to check and make sure we are not already at the end of the array before we change the index.
 
* Under the Arrays Toolbox drawer, drag out a 'length of' block. The 'length of' block returns the number of items (elements) in an array. For our array, the length of block will return the value 6.
* But because computer programmers start counting at zero, the index of the final (6th) element is 5. 
 
Some pseudocode for our algorithm logic:
* When the player places the micro:bit screen down:
>Check the current value of the index.
>> **If:** the current value of the index is less than the length of the array minus one (see **array bounds** note),<br/>
**Then:** change the value of the index by one,<br/>
**Else:** indicate that it is the end of the game.

## ~hint
**Array bounds**

Our array has a length 6, so this will mean that as long as the current value of the index is less than 5, we will change the array by one.

Using ‘less than the length of the array minus one’ instead of the actual numbers for our array makes this code more flexible and easier to maintain. We can easily add more elements to our array and not have to worry about changing numbers elsewhere in the code.
## ~ 

We can put this all together with an 'if...then...else' block and a 'less than' comparison block from the Logic Toolbox drawer, a subtraction block from the Math Toolbox drawer, and a 'game over' block from the Game Toolbox drawer (located under the Advanced menu).

```blocks
let index = 0
let arrayWords: string[] = []
input.onGesture(Gesture.ScreenDown, () => {
   if (index < arrayWords.length - 1) {
       index += 1
   } else {
       game.gameOver()
   }
})
```

To make our game more polished, we’ll add 2 more blocks for smoother game play.

* In case a word is already scrolling on the screen when a player places the micro:bit screen down, we can stop this animation and clear the screen for the next word by using a 'stop animation' block from the Led More Toolbox drawer, and a 'clear screen' block from the Basic More Toolbox drawer.

```blocks
let index = 0
let arrayWords: string[] = []
input.onGesture(Gesture.ScreenDown, () => {
    led.stopAnimation()
    basic.clearScreen()
    if (index < arrayWords.length - 1) {
        index += 1
    } else {
        game.gameOver()
    }
})
```

## Game Play
There are different ways you can play charades with our program.  Here is one way you can play with a group of friends.

* With the micro:bit on and held so Player A cannot see the screen, another player starts the program to see the first word. 
* The other players act out this word charades-style for Player A to guess.
* When Player A guesses correctly or decides to pass on this word, a player places the micro:bit screen down. 
* When ready for the next word, a player turns the micro:bit screen up. Play continues until all the words in the array have been used.
 
## Mod this!
* Add a headband to hold the micro:bit on the Players' foreheads (using cardboard, paper, rubber bands, etc.)
* Add a way to keep score
* Keep track of the number of correct guesses and passes
* Add a time limit
 
Headband Charades Complete Program (simple version - no time limit or scoring):
 
```blocks
let index = 0
let arrayWords: string[] = []
input.onGesture(Gesture.ScreenUp, () => {
   basic.showString(arrayWords[index])
})
input.onGesture(Gesture.ScreenDown, () => {
   led.stopAnimation()
   basic.clearScreen()
   if (index < arrayWords.length - 1) {
       index += 1
   } else {
       game.gameOver()
   }
})
arrayWords = ["cat", "guitar", "flashlight", "cupcake", "tree", "frisbee"]
index = 0
basic.showLeds(`
   . # # # .
   . . . # .
   . . # # .
   . . . . .
   . . # . .
   `)
basic.pause(100)
basic.showNumber(3)
basic.pause(100)
basic.showNumber(2)
basic.pause(100)
basic.showNumber(1)
basic.showString(arrayWords[index])
```
