# answering machine blocks challenges

Coding challenges for the answering machine tutorial. 

## Before we get started

Complete the [answering machine](/lessons/answering-machine/activity) activity and your code will look like this:

```blocks
basic.showString("ASK ME A QUESTION")
```

## Challenge 1

Now we need to reply after someone asks @boardname@ a  yes or no question. We want to respond `YES` when button `A` is pressed. Add a condition for button `A` and inside it show the string `YES`.

```blocks
basic.showString("ASK ME A QUESTION")
input.onButtonPressed(Button.A, () => {
    basic.showString("Yes")
})
```

* `Run` the code to see if it works as expected.

## Challenge 2

What if @boardname@'s answer to the question is no? Let's have `NO` be displayed when button `B` is pressed. Add a condition for button `B` and inside it show the string `NO`.

```blocks
basic.showString("ASK ME A QUESTION")
input.onButtonPressed(Button.A, () => {
    basic.showString("Yes")
})
input.onButtonPressed(Button.B, () => {
    basic.showString("NO")
})

```

* `Run` the code to see if it works as expected.

## Challenge 3

When you are asked a yes or no question, do you always say yes or no? Add a condition for `on shake` that displays `MAYBE`.