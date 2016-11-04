# yes no challenges

My script. #docs

**Challenge 0**

This [guided tutorial](/lessons/yes-no/challenges) will show you how to display text on the @boardname@!

```
basic.showString("ASK ME A QUESTION", 150)
```

**Challenge 1**

Now we need to reply after someone asks Micro a  yes or no question. We want to respond `YES` when button `A` is pressed. Add a condition for button `A` and inside it show the string `YES`.

```
basic.showString("ASK ME A QUESTION", 150)
input.onButtonPressed(Button.A, () => {
    basic.showString("YES", 150) // ***
}) // ***
```

* `Run` the code to see if it works as expected.

**Challenge 2**

What if Micro's answer to the question is no? Let's have `NO` be displayed when button `B` is pressed. Add a condition for button `B` and inside it show the string `NO`.

```
basic.showString("ASK ME A QUESTION", 150)
input.onButtonPressed(Button.A, () => {
    basic.showString("YES", 150)
})
input.onButtonPressed(Button.B, () => {
    basic.showString("NO", 150) // ***
}) // ***
```

* `Run` the code to see if it works as expected.

**Challenge 3**

When you are asked a yes or no question, do you always say yes or no? Add a condition for `on shake` that displays `MAYBE`.

