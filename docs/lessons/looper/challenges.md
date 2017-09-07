# looper block challenges

Coding challenges for the looper. 

## Before we get started

Complete the following guided activity:

* [activity](/lessons/looper/activity)

At the end of the activity, your code should look like this:


```blocks
for (let i = 0; i < 6; i++) {
    basic.showNumber(i)
    basic.pause(2000)
}
```

## Challenge 1

What if we want to count up to lucky number 7 instead? Let's do that by changing the ending value to `7` instead of `5`.


```blocks
for (let i = 0; i < 8; i++) {
    basic.showNumber(i)
    basic.pause(2000)
}

```

* Run the program now to see your changes.

## Challenge 2

What about 9? Let's do that by changing the ending value to `9`.

```blocks
for (let i = 0; i < 10; i++) {
    basic.showNumber(i)
    basic.pause(2000)
}


```


* Run your code to see the new counter.

## Challenge 3

Now let's start counting from `3` instead! Our for loop will always start at `0` so we simply add `3` to the `i` variable when passing it to `show number`.

```blocks
for (let i = 0; i < 10; i++) {
    basic.showNumber(i+3)
    basic.pause(2000)
}


```

Run it on the simulator!

## Challenge 4

Now, let's **count down from 9**. Change the line `show number(i + 2, 150)` to `show number(9 - i, 150)`.

```blocks
for (let i = 0; i < 10; i++) {
    basic.showNumber(9-i)
    basic.pause(2000)
}

```


* Run the code to make sure it is doing what is expected.

## Challenge 5

After counting down from `9` let's show the string `BOOOM`!

