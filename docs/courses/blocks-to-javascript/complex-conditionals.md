# Complex conditionals

## Multiple conditions

Sometimes there is code you want to run if two or more conditions are true. The ``||logic:if then||`` block lets you combine conditions with the ``||logic:and||`` and the ``||logic:or||`` blocks. For example, if we want to see if a random number is between `0` and `9`, we can put two conditions in an ``||logic:if then||`` and connect them with an ``||logic:and||``.

```blocks
let rando = Math.randomRange(-20, 20)
if (rando >= 0 && rando < 10) {
    basic.showNumber(rando)
}
```

This is how to check if a result is within a range of values, in this case it's from `0` to `9`. What if we want to include the values between `15` and `18` too? We just add another range check and connect them with an ``||logic:or||``.

```blocks
let rando = Math.randomRange(-20, 20)
if ((rando >= 0 && rando < 10) || (rando >= 15 && rando < 18)) {
    basic.showNumber(rando)
}
```

Having all of these conditions in one ``||logic:if then||`` makes a large and complicated block. It can be hard to see how the complete conditional does both of the range checks. At times, it's easier to read the code in the JavaScript editor to better see the order and connections of the conditions.

```typescript
let rando = Math.randomRange(-20, 20)
if ((rando >= 0 && rando < 10) || (rando >= 15 && rando < 18)) {
    basic.showNumber(rando)
}
```

As you can see, reading the code for this conditional is might seem easier in JavaScript.

## Nested `if` statements

If one ``||logic:if then||`` block is placed inside another, then each condition for checking the random number is placed in its own ``||logic:if then||``. This give the same result as before with the two conditions in the ``||logic:if then||``.

```block
let rando = Math.randomRange(-20, 20)
if (rando >= 0) {
    if (rando < 10) {
        basic.showNumber(rando)
    }
}
```

When we switch the editor to JavaScript view, we see that the second ``if ()`` statement is indented and contained inside the `{ }` of the first. This matches the second ``||logic:if then||`` block that fits inside the first one. These are called _nested_ if statements.

```typescript
let rando = Math.randomRange(-20, 20)
if (rando >= 0) {
    if (rando < 10) {
        basic.showNumber(rando)
    }
}
```

## Parallel `if` conditions

When you want to check if one condition or another is true, you can connect them with an ``||logic:or||`` block. As an example, let's show a square shaped icon when either button **A** or **B** is pressed.

```blocks
basic.forever(function () {
    if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
        basic.showIcon(IconNames.Square)
    } else {
        basic.showIcon(IconNames.No)
    }
})
```

The two ``||input:button is pressed||`` blocks are connected with an ``||logic:or||`` in the ``||logic:if then||`` conditional to make the check to see if one of the two buttons is currently pressed.

Looking at the condition inside the ``if`` statement in JavaScript editor, we see that the two conditions are connected with the OR (``||``) operator which makes the condition `true` if either button is pressed. So, the conditions work in _parallel_.

```typescript
if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
    basic.showIcon(IconNames.Square)
}
```

We can create the same conditional check as in the code above but with a different form. Changing the code slighlty, we can insert an ``||logic:else if||`` and put one of the button press conditons inside of it. This version checks for either button press like before but it needs another ``||basic:show icon||`` which adds more code.


```blocks
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        basic.showIcon(IconNames.Square)
    } else if (input.buttonIsPressed(Button.B)) {
        basic.showIcon(IconNames.Square)
    } else {
        basic.showIcon(IconNames.No)
    }
})
```

## Conditional expressions

Often you will need to set a boolean variable to remember the result of a conditional test. If we want to set a boolean variable called ``cold`` to `true` when the tempurature is less than `10` degress, we could do it using an ``||logic:if then else||`` block.

```block
let cold = false
if (input.temperature() < 10) {
    cold = true
} else {
    cold = false
}
```

A more direct way to do this is to set a boolean variable to the result of a _conditional expression_. This done by taking the condition that normally goes inside the ``||logic:if then||`` block and just assigning a boolean variable to it.

```block
let cold = input.temperature() < 10
```

In the JavaScript editor, this block appears as this simple variable assignment:

```typescript
let cold = input.temperature() < 10
```

Conditional expressions also work for setting variables of other types too. We'll take the ``||logic:if then else||`` block from the previous example but this time let's set a message string to say when it's warm or cold.

```blocks
let heatMessage = ""
if (input.temperature() < 10) {
    heatMessage = "COLD"
} else {
    heatMessage = "WARM"
}
```

Now let's use the condtion in the ``||logic:if then else||`` block to set the string variable ``heatMessage`` directly. To do this we need to switch over to the JavaScript editor. Instead of using the result of the conditional expression to set the value of the variable, the expression will determine a value option for ``heatMessage``.

To set the variable based on the result of the expression, the value options are placed right after the expression using a `?`. The the value option for a `true` result is stated first and then followed by a `:` with the value option for a `false` result after that. It looks like this:

```typescript
let heatMessage = input.temperature() < 10 ? "COLD" : "WARM"
```

The ``heatMeassage`` variable is set to the string saying ``"COLD"`` if the temperature is less than `10` degrees celsius or to ``"WARM"`` when it's `10` degrees or warmer. 
