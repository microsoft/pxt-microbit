# Stopwatch

![A @boardname@ stopwatch toon image](/static/mb/projects/stopwatch.png)

This project turns the @boardname@ into a simple stopwatch. Pressing **A** will start the timer. Pressing **A** again will show the amount of elapsed time and reset the timer. Let's get started.

## ~ hint

If you built a watch in the [make](/projects/watch/make) portion of the of the [Watch](/projects/watch) project, you can use the code from this project with it too.

## ~

## Step 1

Make a new variable ``||variables:start||`` to hold the start time.

```blocks
let start = 0
```

## Step 2

Add an event to run code when ``||input:button A is pressed||``.

```blocks
input.onButtonPressed(Button.A, function () {
})
```

## Step 3

Add code to start the countdown by storing the current ``||input:running time||``
in ``||variables:start||``. It resets the stopwatch.

```blocks
let start = 0
input.onButtonPressed(Button.A, function () {
    start = input.runningTime()
})
```

## Step 4

Add an event to run code when ``||input:button B is pressed||``.

```blocks
input.onButtonPressed(Button.B, function () {
})
```

## Step 5

Add code to compute the difference between the ``||input:running time||`` 
and ``||variables:value||`` time. This is the elapsed millisecond since pressing button A.

```blocks
let start = 0;
let elapsed = 0;
input.onButtonPressed(Button.B, function () {
    elapsed = input.runningTime() - start;
})
```

## Step 6

Add code to ``||basic:show||`` the number of milliseconds ``||variables:elapsed||``. 
Use ``||Math:idiv||`` to devide ``||variables:elapsed||`` by ``1000`` and get seconds.

```blocks
let start = 0;
let elapsed = 0;
input.onButtonPressed(Button.B, function () {
    elapsed = input.runningTime() - start;
    basic.showNumber(Math.idiv(elapsed, 1000))
})
```

## Step 7

Try your program in the simulator. Press **A** to start the stopwatch and press **B** to get the current elapsed time. You can press **B** multiple times.

## Step 8

If you have a @boardname@ connected, click ``|Download|`` to transfer your code!
