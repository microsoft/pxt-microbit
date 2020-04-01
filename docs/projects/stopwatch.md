# Stopwatch

## Introduction @unplugged

![A @boardname@ stopwatch toon image](/static/mb/projects/stopwatch.png)

This project turns the @boardname@ into a simple stopwatch. Pressing **A** starts the timer. Pressing **B** displays the elapsed seconds.

## Step 1

Add an event to run code when ``||input:button A is pressed||``.

```blocks
input.onButtonPressed(Button.A, function () {
})
```

## Step 2

Add code to store the current ``||input:running time||``
in a variable ``||variables:start||``. This is the start time.

```blocks
let start = 0
input.onButtonPressed(Button.A, function () {
    start = input.runningTime()
})
```

## Step 3

Add an event to run code when ``||input:button B is pressed||``.

```blocks
input.onButtonPressed(Button.B, function () {
})
```

## Step 4

Add code to compute the difference between the ``||input:running time||`` 
and ``||variables:value||`` time. This is the elapsed millisecond since pressing button A.

```blocks
let start = 0;
input.onButtonPressed(Button.B, function () {
    let elapsed = input.runningTime() - start;
})
```

## Step 5

Add code to ``||basic:show||`` the number of milliseconds ``||variables:elapsed||``. 
Use ``||Math:integer division||`` to divide ``||variables:elapsed||`` by ``1000`` and get seconds.

```blocks
let start = 0;
input.onButtonPressed(Button.B, function () {
    let elapsed = input.runningTime() - start;
    basic.showNumber(Math.idiv(elapsed, 1000))
})
```

## Step 6

Try your program in the simulator. Press **A** to start the stopwatch and press **B** to get the current elapsed time. You can press **B** multiple times.

## Step 7

If you have a @boardname@ connected, click ``|Download|`` to transfer your code!
