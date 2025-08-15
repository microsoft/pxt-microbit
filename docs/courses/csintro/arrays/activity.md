## Coding Activity 1: Headband charades

Create an array of words that can be used as part of a charades-type game.
This activity is based on a very popular phone app created by the producers of the [Ellen DeGeneres show](https://bits.blogs.nytimes.com/2013/05/03/ellen-degeneres-iphone-game/).

![Heads up game](/static/courses/csintro/arrays/headband-charades.png)

### Set the arrayWords

* In Microsoft MakeCode, start a new project and name it something like **'charades'**. Either delete the 'forever' block in the coding Workspace or move it to the side, as it's not used in the activity.
* From the Arrays Toolbox drawer, drag a **'set (text list0)'** block onto the Workspace and drop into the **'on start'** block.

```blocks
let arrayWords = ["a", "b", "c"]
```

Notice that the array comes with three string blocks. We'll want more for our charades game.

* Select the **(+)** symbol at the end of the **'array of'** oval block. Add as many values (elements) as you'd like to the array block by continuing to select the **(+)**. For now, we'll add four more values for a total of six values.

```blocks
let arrayWords = ["a", "b", "c", "", "", ""]
```

* Fill each string with one word. Choose words that will be fun for a game of charades. For example:

```blocks
let arrayWords = ["cat", "guitar", "flashlight", "cupcake", "tree", "frisbee"]
```

### Code 'on (screen up)'

Now, we need a way to access one word at a time from this array of words.

* We can use the **'show string'** block from the Basic Toolbox drawer and the **'on screen up'** event handler from the Input Toolbox drawer (this is a dropdown menu choice of the **'on shake'** block) to tell the micro:bit to display a word when we tilt the micro:bit up.

For this version, we'll display the words one at a time in the order they were first placed into the array.

* We'll use the index of the array to keep track of what word to display at any given time, so you'll need to create an **'index'** variable using the Make a Variable button in the Variables Toolbox drawer.

Now, we need a way to access one word at a time from this array of words.

* We can use the **'show string'** block from the Basic Toolbox drawer, and the **'on screen up'** event handler from the Input Toolbox drawer (this is a drop-down menu choice of the **'on shake'** block) to tell the micro:bit to display a word when we tilt the micro:bit up.

For this version, we'll display the words one at a time in the order they were first placed into the array.

* We'll use the index of the array to keep track of what word to display at any given time, so you'll need to create an **'index'** variable using the Make a Variable button in the Variables Toolbox drawer.

```block
let arrayWords: string[] = []
let index = 0
input.onGesture(Gesture.ScreenUp, () => {
    basic.showString(arrayWords[index])
})
```

* To start the game with the index at zero, add a 'set' variable block to the 'on start' block.
* Next, add the following:
>* An image as a placeholder for when the program has started. Since charades is a guessing game, we made one that looks like a question mark (?)
>* A countdown to the first word using show number blocks and pause blocks
>* And show the first word in the array

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

### Code 'on (screen down)'

So far, we have a start to our game and a way to display the first word. Once that word has been guessed (or passed), we need a way to advance to the next word in the array.

* We can do this by changing the index of the array with the **'on screen down'** event handler from the Input Toolbox drawer (this is a dropdown menu choice of the **'on shake'** block) to advance to the next word when we tilt the micro:bit down.

```block
let index = 0
input.onGesture(Gesture.ScreenDown, () => {
    index += 1
})
```

We have a limited number of elements in our array, so to avoid an error, we need to check and make sure we are not already at the end of the array before we change the index.

* Under the Arrays Toolbox drawer, drag out a **'length of'** block. The **'length of'** block returns the number of items (elements) in an array. For our array, the length of block will return the value 6. But because computer programmers start counting at zero, the index of the final (6th) element is 5.

Some pseudocode for our algorithm logic:

When the player places the micro:bit screen down:

* Check the current value of the index.
>* **If** the current value of the index is less than the length of the array minus one (see **array bounds** note),
>* **Then** change the value of the index by one,
>* **Else** indicate that it is the end of the game.

#### Note: Array bounds

Our array has a length 6, so this will mean that as long as the current value of the index is less than 5, we will change the array by one.

Using **'less than the length of the array minus one'** instead of the actual numbers for our array makes this code more flexible and easier to maintain. We can easily add more elements to our array and not have to worry about changing numbers elsewhere in the code.

#### Coding 'on (screen down)', continued

* From the Logic Toolbox drawer, drag out an **'if…then…else'** block onto the Workspace and drop it into the **'on screen down'** block.
* From the Logic Toolbox drawer, drag a **'0<0'** comparison block onto the Workspace and drop it into the **'if…then'** clause replacing the default value of **'true'**.
* From the Variables Toolbox drawer, drag an **'index'** variable block onto the Workspace and drop it into the **first slot of the comparison block.**
* We need to check that the current index value is less than the length of the array minus one (the last index value).
>* From the Math Toolbox drawer, drag a **'0-0'** operator block onto the Workspace and drop it into the second slot of the comparison block.
>* From the Array Toolbox drawer, drag a 'length of array' block onto the Workspace and drop it into the first slot of the **'0-0'** math operator block.
>* In the **'length of array'** block, use the dropdown menu to select the **'text list'** array.
>* In the second slot of the math operator block, type 1.
>* Drag the **'change index'** block from below the **'if…then…else'** block into the 'then' clause.
>* From the Game Toolbox drawer (under the Advanced Toolbox menu), scroll down to find the **'game over'** block. Drag it onto the Workspace and drop it into the **'else'** clause.

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

### Add some polish

To make our game more polished, we'll add two more blocks for smoother game play.

* In case a word is already scrolling on the screen when a player places the micro:bit screen down, we can stop this animation and clear the screen for the next word by using a **'stop animation'** block from the Led More Toolbox drawer, and a **'clear screen'** block from the Basic...More Toolbox drawer.

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

## Play the game

Download the program to the micro:bits and find someone to play it with.
There are different ways you can play charades with our program. Following is one way you can play with a group of friends.

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

Solution link: [Headband Charades](https://makecode.microbit.org/_RMa7s7Rj9Cwv)

![Random stars](/static/courses/csintro/arrays/starry-night.gif)

## Activity: Starry starry night

In this micro:bit activity, we will create a set of random constellations on the micro:bit screen. We will use an array filled with numbers to tell us how many stars (dots) should be in each constellation.

![Starry Night](/static/courses/csintro/arrays/starry-night.png)

### Code random constellations

* In MakeCode, start a new project and name it something like 'Starry night'. Either delete the 'forever' block in the coding Workspace or move it to the side as it's not used in the activity.

Remember that the 'pick random' block in the Math Toolbox drawer will return a random value between a specified minimum and maximum value. We'll use this to plot a single dot at a random location on the screen by choosing a random number from 0 to 4 for the x axis and a random number from 0 to 4 for the y axis.

* From the Led Toolbox drawer, drag a **'plot'** block and connect it inside the 'on start' block. Then, from the Math Toolbox drawer, drop a **'pick random'** block into each of the x and y values and change the range in each from 0 to 4.

```blocks
led.plot(randint(0, 4), randint(0, 4))
```

* Next, let's create a loop that will repeat the above code four times to create a constellation with four stars using the **'repeat'** block. To keep things simple, we won't check for duplicates, so it's possible you may end up with fewer than four visible stars. That's okay.

```blocks
for (let index = 0; index <= 4; index++) {
    led.plot(randint(0, 4), randint(0, 4))
}
```

### Code the array

Next, let's create an array with five numbers in it. We will loop through the array and create five separate constellations using the numbers in the array to represent the number of stars in each of the five constellations.

* From the Arrays Toolbox drawer, drag out the 'set list' block onto the Workspace and drop it into the **'on start'** block. Then, select the (+) symbol three times to add more values to the array for a total of five. Type five random numbers from 0 to 25 in your array list since there are up to 25 LEDs on the micro:bit that could be used in your constellation.

### Code the A button

Let's activate our constellations when we press a button.

* From the Inputs Toolbox drawer, drag out an **'on button A pressed'** block onto the Workspace.
* Drag the **'repeat'** loop from the **'on start'** block into the **'on button A pressed'** block. Instead of repeating 4 times, let's use the values from the array to figure out how many stars to plot on our micro:bit.
* From the Arrays Toolbox drawer, drag a **'list get value at'** oval block onto the Workspace and drop into the **'repeat'** loop, replacing the default value of 4. When you type a 0, 1, 2, 3, or 4 into the **'get value'** block, it will plot the number of stars indicated by the value held in the specified array index.

```block
let list = [5, 2, 1, 3, 4]

for (let index = 0; index < list[0] - 1; index++) {
    led.plot(randint(0, 4), randint(0, 4))
}
```

### Loop through the array

Now, all we need to do is iterate through the entire array and do the same thing for each of the values. Instead of manually typing in values 0, 1, 2, 3, or 4 into the 'list get value at' block, let's use a variable and another loop to automatically increment the index each time.

* From the Loops Toolbox drawer, drag another **'for loop'** block onto the Workspace and drop into the **'on button A pressed'** block around the existing **'repeat'** loop.
* From the Variables Toolbox drawer, drag an **'index'** variable block onto the Workspace and drop it into the **'list get value at'** block replacing the default 0 value.

### Test in the simulator

* Notice that if you try this in the simulator, all the stars will be plotted at once because the loops run too fast for us to see. So, we'll need to add a 'pause' block and a 'clear screen' block between each constellation.

Here is the complete program.

```blocks
let list: number[] = []
input.onButtonPressed(Button.A, () => {
    for (let i = 0; i <= list.length - 1; i++) {
        for (let j = 0; j <= list[i] - 1; j++) {
            led.plot(randint(0, 4), randint(0, 4))
        }
        basic.pause(1000)
        basic.clearScreen()
    }
})
list = [5, 2, 1, 3, 4]
```

Solution link: [Starry Night](https://makecode.microbit.org/_fJMWJPFoK8sH)

## Coding Activity 3:Traversing an array

Traversing an array means proceeding through the elements of the array in sequence. You may have noticed that there is a special loop in the Loops Toolbox drawer called **'for element value of list'.** This loop automatically loops through each element of your array in turn to “traverse” through the array.

```block
let list: number[] = []
for (let value of list) {}
```

* In Microsoft MakeCode, start a new project and name it something like **'traversing arrays'.** Either delete the 'forever' block in the coding Workspace or move it to the side as it's not used in the activity.

### Complete code

The following code is useful for displaying the values of the elements in your array:

```blocks
let list = [5, 2, 1, 3, 4]

input.onButtonPressed(Button.B, () => {
   for (let value of list) {
       basic.showNumber(value)
   }
   basic.clearScreen()
})
```

Solution link: [Fruit Array 2](https://makecode.microbit.org/_3draPYDEjWkj)

## Knowledge Check

**Questions:**

1. How would you define the following terms? Array length, array sort, array index, array type
2. How are arrays different from variables?
3. Where do you find the Array blocks in MakeCode?
4. To create an array in MakeCode, what do you need to assign it to?

**Answers:**

1. **Array length**: The total number of items in the collection; **Array sort**: How you could order items in the collection (for example: date, price, name, color, and so on). Three common types of array sorts are: bubble, selection, and insertion; **Array index**: A unique address or location in the collection, e.g., page number in an album, shelf on a bookcase, etc.; **Array type**: The type of item being stored in the collection, e.g., comics, $1 coins, Pokémon cards, numbers, strings, etc.
2. Variables are used to store a single value; An array can be used to store many values in one place; The information contained in an array is all similar; You can think of arrays like a list of items—like a row of mailboxes or a train of container boxes.
3. The Array blocks are found under the Advanced Toolbox menu in the Arrays category.
4. A variable