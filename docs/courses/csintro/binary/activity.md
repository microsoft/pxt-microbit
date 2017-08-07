# Activity: Binary transmogrifier

Guide the students through building a binary transmogrifier (converter) that converts between binary (base-2) and decimal (base-10) numbers. Let them figure out a pattern that will allow them to do the conversion on the fly.

![Transmogrifier cartoon](/static/courses/csintro/binary/transmogrifier.png)
Calvin & Hobbes

Tell the students that they will be building a binary transmogrifier with the micro:bit. 
The user will be able to use the buttons to enter binary 0s and 1s and will be able to press A+B at any time to display the decimal equivalent of the number that has been entered. 

## Create the Variables
Students will need to create a number variable to hold the running decimal total.
They should also create a string variable to hold the current binary number.

* From the Variables menu, make and name these two variables: decimal, binary.

>![Make a variable](/static/courses/csintro/binary/make-a-variable.png)

>![Name a variable](/static/courses/csintro/binary/name-a-variable.png)

## Initialize the Variables
When the program starts up, you should initialize your variables to starting values. 
* `decimal` = `0`
* `binary` = `""` (empty string)
This also tells the micro:bit what type of variable it is. Use the empty string value found in the **Text** toolbox drawer, under the **Advanced** menu.

![Select text on block menu](/static/courses/csintro/binary/select-text-blocks.png)

```blocks
let binary = ""
let decimal = 0
```

By setting the binary variable to an initial value of “ “ you tell the micro:bit that it is a string variable: a literal string of characters. This is important because you will be adding to this string character by character.

## Transmogrify Me!
We are ready to start entering numbers. Remember that binary numbers are calculated based on the number of place values (“bits”) and as you enter 1s and 0s, the value changes. One way to calculate the decimal value is to wait until the user presses A+B, and then calculate the entire number based on the value of the string.

However, a much simpler method is to calculate the decimal number “on the fly”, which is to say, every time the user presses a 1 or a 0, calculate the current decimal value of that string so you only have to deal with one 0 or 1 at a time.

## What’s the Pattern?
This is a table of the first fourteen binary numbers and their decimal equivalents. Your goal is to use this table to figure out how to calculate a new correct decimal value based on whether a user enters a 0, or a 1 as the next number in the string.

```
Binary  Decimal Binary  Decimal
===============================
    1      1     1000      8
   10      2     1001      9
   11      3     1010     10
  100      4     1011     11
  101      5     1100     12
  110      6     1101     13
  111      7     1110     14
```
For example, imagine you are the micro:bit. If the first number the human enters is a 1, you automatically know the new decimal value is a 1. If the second number that is entered is a 0, then your decimal value goes from 1 to 2. However, if the second number is also a 1, then your new decimal value goes from 1 to 3.

At that point, you either have a 10, or a 11 in your binary string. Let’s take 10 as an example. The decimal value of binary 10 is 2. If the third number entered is a 0, then your new decimal value goes from 2 to 4. If the third number entered is a 1, then your new decimal value goes from 2 to 5. 

If, on the other hand, you have 11 in your binary string, then your decimal value is 3. If the third number entered is a 0, then your new decimal value goes from 3 to 6. If the third number entered is a 1, then your new decimal value goes from 3 to 7. 

See if you can spot a pattern that will help you figure out, for any given decimal value, what the new decimal value should be if the user enters a 0, or if the user enters a 1.

![Binary number patterns](/static/courses/csintro/binary/binary-patterns.png)

## Pseudocode
Recall from our Algorithms lesson that it is a good idea to write out your algorithm in plain English, before you start coding in MakeCode. This is called pseudocode. The Input for this program will be the buttons. Try to write out what should happen when each of the buttons is pressed.

Here is one possible solution. Your own pseudocode might be different and that’s okay.

When Button A is pressed:
1. Add a “1” to the end of the binary string.
2. Show the current value of the binary string.
3. Update the decimal value with the total.

When Button B is pressed:
1. Add a “0” to the end of the binary string.
2. Show the current value of the binary string.
3. Update the decimal value with the total.

When Buttons A+B are pressed:
1. Show the current value of the decimal string.

## Coding Steps
* From the Input Toolbox drawer, drag 3 of the ‘on button A pressed’ event handlers to your coding workspace
* Leave one block with button 'A’. Use the drop-down menus in the other 2 blocks to choose button ‘B’, and button ‘A+B’

```block
input.onButtonPressed(Button.A, () => {
    
})
input.onButtonPressed(Button.B, () => {
    
})
input.onButtonPressed(Button.AB, () => {
    
})
```

Let’s work on what to do when button A is pressed. 
* Button A represents a binary “1”. Our first task is to join a “1” to the existing string variable called binary.
* From the Text Toolbox drawer (under the Advanced menu), drag the 'join' block to your programming workspace
* Next, use the 'set' variable block to assign the value of the 'binary' variable to the 'join' block
* Join the 'binary' variable and “1” by entering them into the appropriate slots in the 'join' block
* And show the binary value on the screen so that when users press a button they can see the entire binary string
	
```block
let binary = ""
input.onButtonPressed(Button.A, () => {
    binary = binary + "1"
    basic.showString(binary)
})
```

* Finally, you will need to update the current decimal value with the value of the entire binary string. This is pretty straightforward if you have been keeping track of the decimal value every time someone presses a button. The pattern is as follows: _(spoiler alert!)_

>* Whenever someone enters a 0, the new decimal value is twice the previous value. 
>* If someone enters a 1, the new decimal value is twice the previous value, plus 1.

* For Button A, you will need to use the multiplication Math block and your binary variable block to create the proper formula. You will need to put that formula inside another Math addition block in order to add one to the result.

```block
let binary = ""
let decimal = 0
input.onButtonPressed(Button.A, () => {
    binary = binary + "1"
    basic.showString(binary)
    decimal = decimal * 2 + 1
})
```

* Your Button B algorithm is similar, although you will be joining a “0” to the binary variable and you are just multiplying the decimal variable by 2.
* Your Button A+B algorithm just uses a Show block to show the value of the decimal variable.

Here is the completed program.

```blocks
let binary = ""
let decimal = 0
input.onButtonPressed(Button.A, () => {
    binary = binary + "1"
    basic.showString(binary)
    decimal = decimal * 2 + 1
})
input.onButtonPressed(Button.B, () => {
    binary = binary + "0"
    basic.showString(binary)
    decimal = decimal * 2
})
input.onButtonPressed(Button.AB, () => {
    basic.showNumber(decimal)
})
decimal = 0
binary = ""
```

### Try it out!
Have someone else try your program out. Then think about how the program might be improved. 
Here are some additional modifications you might try:
* Add a way to clear the binary and decimal values so you can start over.
* Add a way to erase the previous value.
* Create a decimal-binary converter that allows you enter a decimal value and see the binary equivalent when you press A+B.

