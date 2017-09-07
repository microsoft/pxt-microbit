# digi yoyo activity

Create a counter with a while loop.

## ~avatar avatar

Welcome! This tutorial will teach how to create a counter with a while loop. Let's get started!

## ~

Create a variable that acts as a counter and set it to 0.

```blocks
let count = 0
```

Add a while loop that will loop over and over until the variable `count` equals 10.


```blocks
let count = 0
while (count < 10) {

}

```

Let's add a pause. Then show the value of the the count.


```blocks
let count = 0;
while (count < 10) {
    basic.pause(100);
    basic.showNumber(count)
}

```

Increase the value of count by one.


```blocks
let count = 0
while (count < 10) {
    basic.pause(100)
     basic.showNumber(count)
    count = count + (count - 1)
}
```


## ~avatar avatar

Excellent, you're ready to continue with the [challenges](/lessons/digi-yoyo/challenges)!

## ~

