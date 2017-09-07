# Blocks - Variables

An introduction to variables for the Block Editor.

## What is a variable?

Variables are things that are remembered by the @boardname@. Variables can take a few formats and can have functions applied to them. For example, we could create a string, which is text. Or we could create a calculator that stores whichever number the user inputs as an integer, or whole number.

We can modify variables but they must first be defined. Open the ‘Variables’ drawer to the left of your code.

In the variables section you will see two blocks: `set item` and `item`. The set item block allows you to set a variable to another value or create a new variable.

Drag the `set item` block into your code. Click the little arrow next to the word `item` and select **New Variable**, enter **value** as the name. You have now created a new variable called value, however you must set an initial value. Go to the **Maths** drawer and drag a `0` block, connecting it to the empty socket in the `set` value block. Your code should look like this:

![](/static/mb/blocks/lessons/variables-0.png)

## Using Variables

We can also set value to something else using this line. For example, we could use the functions in the **Maths** drawer to set value to a new value. If we combine this with the `forever` loop and if statements from the previous page then we can create a counter:

![](/static/mb/blocks/lessons/variables-1.png)

Drag a `forever` block from the **Basic** drawer and add an `if` block from the **If** drawer. Attach the ‘button pressed’ block from the ‘Input’ drawer.

Drag another `set item` block from the **Variables** draw and click the **down arrow** next to item, however this time select **value**, we don’t have to declare it again as we have already created it. Open the **Maths** drawer and drag a `+` block before clicking it into place in the `set` value block. Drag an `item` block from the **Variables** drawer and again click the **down arrow** before selecting **value**. Add a `0` from the **Maths** drawer and change the value from **0** to **1**.

Finally, beneath that line, drag a `show number` block from the **Basic** drawer, and drag out the `0`. Drag another variable block from the **Variables** drawer, change it to `value`, and drop this into the space.

## What does this code do?

* We create a new variable called value and set it to 0
* The code runs forever and waits for the user to press the A button
* When the user does, value will be set to value + 1 (value will be incremented by 1)
* Value will then be displayed on the @boardname@'s LEDS
* This effectively creates a counter

Variables can also be used for conditions with loops. See the 'Loops' section to learn about this.

