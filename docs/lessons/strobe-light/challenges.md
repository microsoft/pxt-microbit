# strobe light challenges

Coding challenges for strobe light.

## Before we get started

Complete the following [guided tutorial](/lessons/strobe-light/activity), your code should look like this:


```blocks
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        led.plot(i, j)
        basic.pause(200)
    }
}
```


## Challenge 1



Make the LEDs light up faster by changing the **pause** from 200 to 100 milliseconds:

```blocks
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        led.plot(i, j)
        basic.pause(100)
    }
}
```

* Run the code to see if it works as expected.

## Challenge 2



Make the board light up by rows instead of by columns by swapping the `i` and `j` variables in `plot(i, j)`.

```blocks
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        led.plot(j, i)
        basic.pause(100)
    }
}
```

* Run the code to see if it works as expected.

## Challenge 3



Now that all the LEDs are lit up, let's make them turn off by reversing the strobe light pattern! You can use `unplot` to turn off a single LED.

```blocks
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        led.plot(j, i)
        basic.pause(100)
    }
}
for (let k = 0; k < 5; k++) {
    for (let l = 0; l < 5; l++) {
        led.unplot(4 - l, 4 - k)
        basic.pause(100)
    }
}
```