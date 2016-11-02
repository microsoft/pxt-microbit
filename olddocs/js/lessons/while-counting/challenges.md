# digi yoyo challenges

These challenges will teach you how to create a counter 10 to 1. #docs

**Challenge 0**

[This guided tutorial](/lessons/digi-yoyo/tutorial) will teach you how to make a counter from 0-9 using a while loop.

```
count = 1
while (count < 10) {
    basic.pause(1000)
    basic.showNumber(count, 150)
    count = count + 1
}
```

**Challenge 1**

How about we create a counter that counts backwards from 10 to 1? Let's add a while loop that executes only when `count` is greater than 0.

```
count = 1
while (count < 10) {
    basic.pause(1000)
    basic.showNumber(count, 150)
    count = count + 1
}
while (count > 0) {
}
```

**Challenge 2**

Inside of the while loop, let's add `pause->(1000)` so that we have a pause between each number as it's counting down. Also, let's show `count`!

```
count = 1
while (count < 10) {
    basic.pause(1000)
    basic.showNumber(count, 150)
    count = count + 1
}
while (count > 0) {
    basic.pause(1000) // ***
    basic.showNumber(count, 150) // ***
}
```

* Run the code to see if it works as expected.

**Challenge 3**

Now, we need `count` to decrease by one after the @boardname@ has displayed the value of `count`.

We can do this by adding this line:

```
count = count - 1
```

