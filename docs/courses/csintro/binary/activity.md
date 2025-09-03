# Activity: Binary transmogrifier

In this activity, you'll build a binary transmogrifier (converter) that converts between binary (base-2) and decimal (base-10) numbers.

![Transmogrifier cartoon](/static/courses/csintro/binary/transmogrifier.png)
Calvin & Hobbes

The user will be able to use the buttons to enter binary 0s and 1s and will be able to press A+B at any time to display the decimal equivalent of the number that has been entered. 

## Create the Variables

First, you'll need to create a number variable to hold the running decimal total.
Then, you should create a string variable to hold the current binary number.

* In Microsoft MakeCode, start a new project and name it something like **binary calculator** or **binary converter.** Either delete the **'forever'** block in the coding Workspace or move it to the side as it's not used in the activity. Then from the **Variables** menu, select the **Make a Variable** button to make two variables. Name one: **decimal** and the other: **binary**

>![Make a variable](/static/courses/csintro/binary/make-a-variable.png)

>![Name a variable](/static/courses/csintro/binary/name-a-variable.png)

## Initialize the Variables

When the program starts up, you should initialize your variables to starting values.

* From the Variable Toolbox drawer, drag two 'set' blocks to the coding Workspace and drop them inside the 'on start' block. Depending on which variable you made first, the 'set' block will default to one of the new variables. Use the dropdown menu to set one block to binary and the other to decimal.

Now, we can give these variables some starting values: For the decimal variable, keep the default parameter of 0. For the binary variable, we want an empty string to hold the binary text value.

* Select the Advanced tab in the Toolbox to open up more Toolbox categories. Then select the Text Toolbox drawer to find the empty string oval block. Drag one onto the Workspace and drop it into the **'set binary to'** block replacing the 0.

![Select text on block menu](/static/courses/csintro/binary/select-text-blocks.png)

```blocks
let binary = ""
let decimal = 0
```

By setting the binary variable to an initial value of " " you tell the micro:bit that it is a string variable: a literal string of characters. This is important because you will be adding to this string character by character.

## Ready, set, calculate!

We are ready to start entering numbers. Remember that binary numbers are calculated based on the number of place values ("bits"), and as you enter 1s and 0s, the value changes. One way to calculate the decimal value is to wait until the user presses A+B, and then calculate the entire number based on the value of the string.

However, a much simpler method is to calculate the decimal number "on the fly", which is to say, every time the user presses a 1 or a 0, calculate the current decimal value of that string so you only have to deal with one 0 or 1 at a time.

## What's the pattern?

This is a table of the first fifteen binary numbers and their decimal equivalents. Your goal is to use this table to figure out how to calculate a new correct decimal value based on whether a user enters a 0, or a 1, as the next number in the string

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

At that point, you either have a 10 or an 11 in your binary string. Let's take 10 as an example. The decimal value of binary 10 is 2. If the third number entered is a 0, then your new decimal value goes from 2 to 4. If the third number entered is a 1, then your new decimal value goes from 2 to 5.

If, on the other hand, you have 11 in your binary string, then your decimal value is 3. If the third number entered is a 0, then your new decimal value goes from 3 to 6. If the third number entered is a 1, then your new decimal value goes from 3 to 7.

See if you can spot a pattern that will help you figure out, for any given decimal value, what the new decimal value should be if the user enters a 0, or if the user enters a 1.

![Binary number patterns](/static/courses/csintro/binary/binary-patterns.png)

## Pseudocode

The input for this program will be the buttons. Try to write out what should happen when each of the buttons is pressed. Here is one possible solution. Your own pseudocode might be different and that's okay. Remember: there can always be different approaches in coding.

When Button A is pressed:

* Add a "1" to the end of the binary string.
* Show the current value of the binary string.
* Update the decimal value with the total.

When Button B is pressed:

* Add a "0" to the end of the binary string.
* Show the current value of the binary string.
* Update the decimal value with the total.

When Buttons A+B are pressed:

* Show the current value of the decimal string.

## Code button A

* From the Input Toolbox drawer, drag three of the **'on button A pressed'** event handlers to your coding Workspace. Leave one block with button 'A'. Use the dropdown menus in the other two blocks to choose button 'B', and button 'A+B'.

Let's work on what to do when button A is pressed. Button A represents a binary "1". Our first task is to join a "1" to the existing string variable called **binary**.

* From the Variables Toolbox drawer, drag a **'set (variable)'** block onto the Workspace, and drop it into the 'on button A pressed' block. Then use the dropdown menu to select the 'binary' variable.
* From the Text Toolbox drawer (under the Advanced menu), drag the **'join'** block to your coding Workspace and drop it into the **'set binary to'** block replacing the default 0 value.
* From the Variables Toolbox drawer, drag a **'binary'** variable value block onto the Workspace and drop it into the first slot of the **'join'** block, replacing the default "Hello"
* In the second slot of the **'join'** block, replace the default value of "World" to **1**. This will append a "1" to whatever value is currently being held in the binary variable.

## Code button A display

Now, let's display this value on the micro:bit.

* From the Basic Toolbox drawer, drag a 'show string' block onto the Workspace, and drop it after the 'set binary' block in the 'on button A pressed' block.
* From the Variables Toolbox drawer, drag a 'binary' variable value block onto the Workspace and drop it into the 'show string' block replacing the default value of "Hello!"

```block
let binary = ""
input.onButtonPressed(Button.A, () => {
    binary = binary + "1"
    basic.showString(binary)
})
```

Finally, you will need to update the current decimal value with the value of the entire binary string. The pattern pseudocode is as follows:

* Whenever someone enters a 0, the new decimal value is twice the previous value.
* If someone enters a 1, the new decimal value is twice the previous value, plus 1.

For button A (when a user enters a 1), you will need to use the **'multiplication'** Math block and your binary variable block to create the proper formula. You will need to put that formula inside another Math 'addition' block in order to add one to the result.

* From the Variables Toolbox drawer, drag a **'set (variable)'** block onto the coding Workspace, and drop it into your **'on button A pressed'** block after the **'show string'** block. Then, use the dropdown menu to select the **'decimal'** variable.
* From the Math Toolbox drawer, drag out two blocks to the Workspace: the **multiplication** block and the **addition** block. Don't place these yet; just keep them on the Workspace (they should be greyed out). We'll be nesting the two math expressions.

**Note:** When working the nested expressions—Math or Logic blocks placed inside each other—it's easier to do the block manipulation on the coding Workspace separately first before attaching to other blocks in your program.

* From the Variables Toolbox drawer, drag a **'decimal'** variable value block onto the Workspace and drop it into the first slot of the multiplication math block replacing the default value of 0. Type a **2** into the second slot of the multiplication math block. Now, drag the multiplication math block into the first slot of the addition math block, replacing the default value of 0.
* Type a **1** into the second slot of the addition math block. Now, drag the whole Math expression into the **'set (decimal) to 0'** block to replace the 0 default value.
* Test this code in the Simulator to confirm it's working as intended.

```block
let binary = ""
let decimal = 0
input.onButtonPressed(Button.A, () => {
    binary = binary + "1"
    basic.showString(binary)
    decimal = decimal * 2 + 1
})
```

## Code button B

Your button B algorithm is similar, although you will be joining a "0" to the binary variable, and you are just multiplying the decimal variable by 2.

* An alternative to coding the blocks from the Toolbox drawers is to duplicate the entire **'on button A pressed'** set of blocks, then:
>* In the **'join binary 1'** block, change the 1 to **0**.
>* In the **'set decimal to'** block, select the 'decimal x 2' oval and pull it out of the blocks to "un-nest" it (it will be grayed out). Delete the '0 + 1' oval in the 'set decimal to' block and replace the resulting 0 value with the grayed out **'decimal x 2'** oval block.
* Again, test this new code in the Simulator to make sure it's working as intended.

## Code button A+B

Your button A+B algorithm just uses a **'show'** block to show the current value of the decimal variable.

* From the Input Toolbox drawer, drag an **'on button A pressed'** block to the coding Workspace and use the dropdown menu to select **'A+B'**. Then, from the Basic Toolbox drawer, drag a **'show number'** block and drop it into the **'on button A+B pressed'** block. Then, duplicate a **'decimal'** variable value from one of the other blocks and replace the 0 of the **'show number'** block.

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

Solution link: [Binary Transmogrifier](https://makecode.microbit.org/_2CmVy1CcJLay)

### Try it out!

Once you've tested all the code in the Simulator, download it to the micro:bit. Have someone else try your program out. Then, think about how the program might be improved.

### Mod this!

Here are some additional modifications you might try:

* Add a way to clear the binary and decimal values so you can start over.
* Add a way to erase the previous value.
* Create a decimal-binary converter that allows you enter a decimal value and see the binary equivalent when you press A+B.
* Create a physical housing or case for your binary calculator!

### All about buttons

Buttons are on all kinds of electronic devices that we use. Have you ever wondered how they actually work to signal an input event?

https://www.youtube.com/watch?v=iCHAIeoSpI4

## Knowledge Check

**Questions:**

1. What is the definition of a bit?
2. What is the definition of byte?
3. What is 37 in binary?
4. What is 110110 in decimal?
5. Put the following in order from smallest to largest measurement: Megabyte, Kilobyte, Terabyte, Gigabyte

**Answers:**

1. A bit is a binary digit with two possible values: 0 or 1.
2. A byte is a sequence of binary digits made up of eight bits. It has 256 possible values from 00000000 through 11111111.
3. 100101
4. 54
5. Kilobyte, Megabyte, Gigabyte, Terabyte