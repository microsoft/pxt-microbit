## Activity: Headband charades and starry starry night

![Starry Night](/static/courses/csintro/arrays/starry-night.png)

Create an array of words that can be used as part of a charades-type game.
This activity is based on a very popular phone app invented by Ellen DeGeneres (https://bits.blogs.nytimes.com/2013/05/03/ellen-degeneres-iphone-game/).

![Heads up game](/static/courses/csintro/arrays/headband-charades.png)
	
* Create a new variable and give it a name like arrayWords.
* Insert a 'set' variable block into the 'on start' block. 
* Change the default variable name to this new variable name.
* From the Array Toolbox drawer, drag an 'array of' block to the coding workspace.
* Attach this array block to the end of the 'set' variable block. 

```blocks
let arrayWords = ["", ""]
```

Notice that the array comes with 2 string blocks. We’ll want more for our charades game.

* Click on the **(+)** symbol at the end of the 'array of' block.
* Add as many values (elements) as you'd like to the array block by continuing to click on the **(+)**.
* For now, we’ll add 4 more values for a total of 6 values.

```blocks
let arrayWords = ["", "", "", "", "", "", ""]
```
* Fill each string with one word. Choose words that will be fun for a game of charades. Example:

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
    . . # . .`)
basic.pause(100)
basic.showNumber(3)
basic.pause(100)
basic.showNumber(2)
basic.pause(100)
basic.showNumber(1)
basic.showString(arrayWords[index])
```

![Random stars](/static/courses/csintro/arrays/starry-night.gif)

## Activity: Starry starry night

In this micro:bit activity, we will create a set of random constellations on the micro:bit screen. We will use an array filled with numbers to tell us how many stars (dots) should be in each constellation.

Review the use of the random block in the Math category.

* Create a block that will plot a single dot at a random location on the screen by choosing a random number from 0 to 4 for the x axis and a random number from 0 to 4 for the y axis.

```blocks
led.plot(Math.randomRange(0, 5), Math.randomRange(0, 5))
```

Next, let’s create a loop that will repeat the above code five times, for a constellation with five stars.

```blocks
for (let index = 0; index <= 4; index++) {
    led.plot(Math.randomRange(0, 5), Math.randomRange(0, 5))
    }
```

Note that to keep things simple we don’t check for duplicates, so it’s possible you may end up with fewer than five visible stars. That’s okay.

Next, let’s create an array with five numbers in it. We will loop through the array and create five separate constellations, using the numbers in the array to represent the number of stars in each of the five constellations.

To create an array, you need to set the value of a variable to the array. The Arrays Toolbox has one already made for us.

* From the Arrays Toolbox drawer, drag out the 'set list to' block that's attached to the ‘array of’ block containing numbers.
* Then click on the **(+)** symbol to add more values to the block, for a total of five.

You can drag additional numbers out of the Math category and snap them to the open slots in the Create array with block. Go ahead and change them to some random values, then attach the whole thing to the ‘on start’ event handler block.

Now, when the micro:bit starts, it will create an array with those five values. Let’s create the constellations when the A button is pressed. Looking at our loop, instead of repeating 0 to 4 times, we actually want to use the value from the array to figure out how many stars to create.

* Drag the ‘list get value at’ block from the Arrays Toolbox drawer and replace the 4 with that block.

You should see that there are more stars printed now, although there is an extra star; if the first value in the array is 5, you will actually see 6 stars because the loop runs when index is 0.

To fix this, we need to do a little math by subtracting 1 from whatever the value in the array is. You can use a Math operation block to do this.

**Note:** Be sure to hit Refresh a few times on the simulator, because sometimes some stars get hidden behind other stars.

```block
let list = [5, 2, 1, 3, 4]

for (let index = 0; index < list[0] - 1; index++) {
    led.plot(Math.randomRange(0, 5), Math.randomRange(0, 5))
}
```

The above code takes the first value in the array and creates that many stars at random locations. Now, all we need to do is iterate through the entire array and do the same thing for each of the values. We will put the above code inside another loop that will run the same number of times as the length of the array (in this case, 5). You should also use a 'pause' block and a 'clear screen' block in between each constellation.

Finally, you might attach the code that shows the constellations to an 'on button A pressed' event handler. 

Here is the complete program.

```blocks
let list: number[] = []
input.onButtonPressed(Button.A, () => {
    for (let i = 0; i <= list.length - 1; i++) {
        for (let j = 0; j <= list[i] - 1; j++) {
            led.plot(Math.randomRange(0, 5), Math.randomRange(0, 5))
        }
        basic.pause(1000)
        basic.clearScreen()
    }
})
list = [5, 2, 1, 3, 4]
```

## Traversing an array

Traversing an array means proceeding through the elements of the array in sequence. Note that there is a special loop in the Loops Toolbox drawer called ‘for element value of list’. This loop automatically takes each element of your array in turn and copies it into a variable called value.

```block
let list: number[] = []
for (let value of list) {}
```

The following code is useful for printing out the values of the elements in your array:

```blocks
let list = [5, 2, 1, 3, 4]

input.onButtonPressed(Button.B, () => {
   for (let value of list) {
       basic.showNumber(value)
   }
   basic.clearScreen()
})
```

However, note that value holds a copy of the element in the array, so changing value doesn’t affect the original element.

If you run the code below, then print out the array again, you will see that it is unchanged.

```blocks
let list = [5, 2, 1, 3, 4]

input.onButtonPressed(Button.A, () => {
   for (let value of list) {
       value += 1
   }
})
```
