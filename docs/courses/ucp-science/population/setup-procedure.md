# Setup and procedure

## Setup

1. The coding of this project will involve several steps. 
2. The ``||basic:on start||`` block will display the title of the project. It will also declare the variables that will be used in the project. The **A** and **B** buttons are programmed to add 1 to the count for the trait associated with that button. 
3. The **A** and **B** buttons are programmed to display the name of the first trait and the count. Then the name of the second trait and its count. Finally the total number counted on both buttons will be displayed. 
4. The ``||input:on shake||`` event can be programmed to erase the data and start over.

## Code

### MakeCode Programming Environment

1. Open the MakeCode micro:bit editor in a browser at: @homeurl@.
2. Or download and use the [Windows 10 MakeCode](https://www.microsoft.com/store/apps/9PJC7SV48LCX) app.

### on Start event

1. Name the project, “Population Trait Counter”.
2. The ``||basic:on Start||`` event will display the title and purpose of the microbit in all caps, “POPULATION TRAIT COUNTER”. The text is put in the ``||basic:show string||`` block (the title is put in the ``||basic:on start||`` event so when the microbit is started up it will show what it is programmed to do. It is done in all CAPS because it is easier to read as it is displayed in the LED display).
3. From the ``||variables:Variables||`` toolbox create variables named ``trait1``, ``trait2``, and ``total``. These will be used as counters to keep track of the for each trait counted. Variables are named to describe what they will be storing. Variables are usually named by using lowercase letters and/or digits. If it is a 2 word name, it is usually named using camelCaps (no spaces but a capital where the second word starts. Examples: ``totalCount``, ``randNumber``, etc.)
 
```blocks
let trait1 = 0
let trait2 = 0
let total = 0
basic.showString("POPULATION TRAIT COUNTER")
```

The variables are declared in the ``||basic:on start||`` event and they are assigned a starting value of `0`.

### on Button “A” Pressed event

1. The ``||input:on button A||`` pressed event will be used to count the first trait by adding `1` to ``trait1`` each time the button is pressed.
2. The ``||variables:change trait1 by 1||`` is used to increment the number. In JavaScript this is done with the ``trait1 += 1`` statement. It's math statement to perform the same calculation could be ``trait1 = trait1 + 1``. This can be read as ``trait1`` gets it value from the current value of ``trait1 + 1``.
3. The next line is used to display the current value of ``trait1``.
 
```blocks
let trait1 = 0

// Add 1 to trait1
input.onButtonPressed(Button.A, () => {
    trait1 += 1
    basic.showNumber(trait1)
})
```

### on Button “B” Pressed event

1. The code for on button **B** pressed is the same as the on button **A** pressed except it is used for keep a count on ``trait2``.
 
```blocks
let trait2 = 0

// Add 1 to trait2
input.onButtonPressed(Button.B, () => {
    trait2 += 1
    basic.showNumber(trait2)
})
```

### on Button “A+B” Pressed event

1. The ``A+B`` ``||input:on button pressed||`` event is used to display the name and count for each trait and the total observations made by displaying the information on the LED screen.
2. To start out when the buttons are pressed, ``trait1`` and ``trait2`` are added to get a total count. The math for this would look like total = ``trait1`` + ``trait2`` (when calculations are make in computer programs the answer is always written on the left side of the “=” sign and the calculation is done on the right side of the sign. The “=” sign is general read as “gets its value from” rather than “equal”. The “==” is usually used as the equal comparison operator). 
3. Following the calculation the name of the first trait is displayed followed by its value.
4. The same thing is done for the second trait in the next 2 lines of code.
5. The last 2 lines display the label `"TOTAL"` and its calculated value. 
 
```blocks
let trait1 = 0
let trait2 = 0
let total = 0
// Display counted traits and total total up the
// traits for a total
input.onButtonPressed(Button.AB, () => {
    total += trait1 + trait2
    basic.showString("TRAIT 1")
    basic.showNumber(trait1)
    basic.showString(" TRAIT 2")
    basic.showNumber(trait2)
    basic.showString(" TOTAL")
    basic.showNumber(total)
})
```

### on Shake event

1. The ``||basic:on shake||`` event is used to clear the value of all the variables much like when an “Etch-a-Sketch” is turned upside down and shaken to erase the drawing (the accelerometer sensor can detect when the @boardname@ is shaken).
2. This is done by setting the values of each of the variables back to `0`. 
 
```blocks
let trait1 = 0
let trait2 = 0
let total = 0
// Erase count and total
input.onGesture(Gesture.Shake, () => {
    trait1 = 0
    trait2 = 0
    total = 0
})
```

### ~hint

**Warning**

This procedure could be problematic if the @boardname@ is shaken to much while it is used in counting.

### ~

## Extensions

This project could easily be modified to keep track of scores for 2 different teams. What other ideas can you think of that counters could be used for?

<br/>

| | | |
|-|-|-|
| Adapted from "[Population Trait Data Counter](https://drive.google.com/open?id=1CC5uhIoZK4Q67vU5Ldwna6GEeZYXNDYzgO8BUUjPuwI)" by [C Lyman](http://utahcoding.org) | | [![CC BY-NC-SA](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/) |