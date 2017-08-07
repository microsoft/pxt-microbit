# blink blocks challenges

Coding challenges for the blink tutorial 

## Before we get started

Complete the [blink](/lessons/blink/activity) activity and your code will look like this:

```blocks
basic.forever(() => {
    led.plot(2, 2)
    basic.pause(500)
    led.unplot(2, 2)
    basic.pause(500)
})
```

## Challenge 1

Let's display a "smiley face" on the screen! We'll start by plotting the eyes.

Add `plot(1,1)` and `plot(3,1)` under `plot(2,2)` ; then add `unplot(1,1)`, `unplot(3,1)` and `unplot(2,2)` after `pause`. When you're ready, don't forget to run your code to try it out!

```blocks
basic.forever(() => {
    led.plot(2, 2)
    led.plot(1, 1)
    led.plot(3, 1)
    basic.pause(500)
    led.unplot(2, 2)
    led.unplot(1, 1)
    led.unplot(3, 1)
    basic.pause(500)
})
```

## Challenge 2

Let's add the code to plot the mouth by using `plot` and `unplot` to the following coordinates: (1,4), (2,4) and (3,4). When you're ready, don't forget to run your code to try it out!

```blocks
basic.forever(() => {
    led.plot(2, 2)
    led.plot(1, 1)
    led.plot(3, 1)
    led.plot(1, 4)
    led.plot(2, 4)
    led.plot(3, 4)
    basic.pause(500)
    led.unplot(2, 2)
    led.unplot(1, 1)
    led.unplot(3, 1)
    led.unplot(1, 4)
    led.unplot(2, 4)
    led.unplot(3, 4)
    basic.pause(500)
})
```

## Challenge 3

Let's keep using `plot` to convert the mouth into a smiley face.

```` bitmatrix
0 0 0 0 0
0 1 0 1 0
0 0 1 0 0
1 0 0 0 1
0 1 1 1 0
````

## Challenge 4

Let's make it blink a bit faster. To do so, we need to reduce the amount of time used in ``pause`` to 100 milliseconds.

## Challenge 5

Create your own image by changing the coordinates in `plot` and `unplot`!

