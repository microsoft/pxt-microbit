# compare machine challenges

These challenges allow you to set the value of a counter to 1 when button B is pressed. #docs

### Challenge 0

Welcome! This [guided tutorial](/lessons/comparison/tutorial) will assist you with using the comparison operator.

```
counter = 0
input.onButtonPressed(Button.A, () => {
    counter = counter + 1
    if (counter == 10) {
        counter = 1
    }
    basic.showNumber(counter, 150)
})
```

### Challenge 1

Now let's do something special when the @boardname@ reaches the number `5`. Instead of just showing the number `5`, let's show the string `HALF WAY!`. Begin by setting an if statement to know when `counter = 5`.

```
counter = 0
input.onButtonPressed(Button.A, () => {
    counter = counter + 1
    if (counter == 10) {
        counter = 1
    }
    if (counter == 5) {
    }
    basic.showNumber(counter, 150)
})
```

### Challenge 2

Let's continue our plan of displaying `HALF WAY!` when `counter = 5`. To do so, add the following line of code inside the if statement.

```
counter = 0
input.onButtonPressed(Button.A, () => {
    counter = counter + 1
    if (counter == 10) {
        counter = 1
    }
    if (counter == 5) {
        basic.showString("HALF WAY!", 150) // ***
    }
    basic.showNumber(counter, 150)
})
```

* Run your code to see if it works as expected.

### Challenge 3

You may notice a problem right now. When `counter = 5`, the @boardname@ will show both the message `HALF WAY!` and the number `5`. In order to fix this problem, let's take advantage of the `else` at the end of the if statement.

```
counter = 0
input.onButtonPressed(Button.A, () => {
    counter = counter + 1
    if (counter == 10) {
        counter = 1
    }
    if (counter == 5) {
        basic.showString("HALF WAY!", 150)
    } else {
        basic.showNumber(counter, 150) // ***
    }
})
```

### Challenge 4

When `counter = 8`, display the message `ALMOST THERE!` on the @boardname@. You will need to add an `else if` after the if statement of `counter = 5`.

