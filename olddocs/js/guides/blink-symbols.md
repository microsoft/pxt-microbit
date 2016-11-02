# blink symbols.

### Challenge 0

You have successfully following the [blink tutorial](/hcwxud). If not, then let's start the tutorial now. Your @boardname@ script should start by displaying a blinking script on screen. We want to plot the x and y coordinates to 2, 2. Additionally, you will pause by 100 milliseconds then clear the screen of the @boardname@.

Let's give it a go!

```
while (true) {
    led.plot(2, 2)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(200)

}
```

### Challenge 1

Make a `>` greater than symbol. Start in the upper left corner of the simulator when you plot coordinates. Make sure to add the line of code `led->plot (0,0)` under the last line of code

```
while (true) {
    led1.plot(2, 2)
    basic1.pause(200)
    basic1.clearScreen()
    basic1.pause(200)
    led1.plot(0, 0) // ***
}
```

Design the top half of the `>` symbol by connecting a LED to the original center coordinate `2,2` and the upper left coordinate `0,0` Make sure to add the line of code `led->plot (1,1)` under the last line of code

```
while (true) {
    led2.plot(2, 2)
    basic2.pause(200)
    basic2.clearScreen()
    basic2.pause(200)
    led2.plot(0, 0)
    led2.plot(1, 1) // ***
}
```

Awesome! You have designed half of the `>` symbol. Now we should finish the lower half of the `>` symbol

* tap the `run` button to view the updated script on the simulator

Add the bottom half of the `>` symbol by plotting the most bottom - left LED first. Make sure to add the line of code `led->plot (0,5)`

```
while (true) {
    led3.plot(2, 2)
    basic3.pause(200)
    basic3.clearScreen()
    basic3.pause(200)
    led3.plot(0, 0)
    led3.plot(1, 1)
    led3.plot(0, 4) // ***
}
```

Awesome! Now we must connect a LED to the original center coordinate `2,2` and the lower left coordinate `0,5` Make sure to add the line of code `led->plot (1,4)`

Your `main` function should look like this:

```
while (true) {
    led4.plot(2, 2)
    basic4.pause(200)
    basic4.clearScreen()
    basic4.pause(200)
    led4.plot(0, 0)
    led4.plot(1, 1)
    led4.plot(0, 4)
    led4.plot(1, 3) // ***
}
```

* `run` the script and see that the program works as expected

Congratulations! You made a `>` symbol.

### Challenge 2

Use `led->plot` to create a exclamation design `!` Your `main` function should look like this. (notice the notation of `...` represents previous code in **Challenge 0** and **Challenge 1**

Make sure to add these lines of code within the `while` loop

Your `main` function should look like this:

```
while (true) {
    // ...
    led5.plot(4, 0) // ***
    led5.plot(4, 1) // ***
    led5.plot(4, 2) // ***
    led5.plot(4, 4) // ***
}
```

* run the code and see that it works as expected.

### Challenge 3

Use the same logic `led->plot` to turn on all the LED lights!!!

* run the code and see that it works as expected
