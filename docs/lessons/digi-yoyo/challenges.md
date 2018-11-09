# digi yoyo challenges

Coding challenges for the digi yoyo. 

## Before we get started

Complete the following [guided tutorial](/lessons/digi-yoyo/activity), your code should look like this:


```blocks
 let count = 0;
while (count < 10) {
    basic.pause(100);
    basic.showNumber(count);
    count = count + 1;
    basic.pause(20);
}
```

## Challenge 1

How about we create a counter that counts backwards from `10` to `1`? Let's add a while loop that executes only when ``||variables:count||`` is greater than `0`.


```blocks
 let count = 0;
while (count < 10) {
    basic.pause(100);
    basic.showNumber(count);
    count = count + 1;
    basic.pause(20);
}
while (count > 0) {

}
```


## Challenge 2

Inside of the while loop, let's add a ``||basic:pause||`` that waits for one seccond so that we have a pause between each number as it's counting down. Also, let's show ``||variables:count||``!

```blocks
let count = 0;
while (count < 10) {
    basic.pause(100);
    basic.showNumber(count);
    count = count + 1;
}
while (count > 0) {
    basic.pause(100);
    basic.showNumber(count);
}
```


* Run the code to see if it works as expected.

## Challenge 3

Now, we need ``||variables:count||`` to decrease by one after the @boardname@ has displayed the value of ``||variables:count||``.

We can do this by adding this line:

```blocks
let count = 0; 
count = count + (count - 1);
```
