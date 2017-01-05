# basic LED show.

### Challenge 0

You have successfully following the [guided tutorial] (https://live.microbit.co.uk/td/tutorials/blink). If not, we should make sure the @boardname@ script displays a blinking script on screen. We want to plot the x and y coordinates to 2, 2. Additionally, you will pause by 100 milliseconds then you will clear the screen of the @boardname@. Let's give it a go!

```
while (true) {
    led.plot(2, 2)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(200)

}
```

### Challenge 1

Use `basic->show string`  to display text after the blink. You will be writing a series of letters to display a series of letters. Try to unravel this secret code word: HELP. This line of code is within the  while  scope

Make sure to add this line of code within the `while` scope!

```
while (true) {
    led1.plot(2, 2)
    basic1.pause(200)
    basic1.clearScreen()
    basic1.pause(200)
    basic1.showString("HELP", 150) // ***
}
```

* run the code and see that it works as expected

### Challenge 2

You can also display a number on screen using `basic‐>show number`. Add code under `basic‐>show string` to display the emergency number to call in the United Kingdom. (NOTE: 999 is the historic emergency number for the United Kingdom. All calls are answered by 999 operators. Calls are always free.)

```
while (true) {
    led2.plot(2, 2)
    basic2.pause(200)
    basic2.clearScreen()
    basic2.pause(200)
    basic2.showString("HELP", 150)
    basic2.showNumber(999, 150) // ***
}
```

Awesome! You have designed your message and a number to call in case of an emergency.

### Challenge 3

* tap the `run` button to view the updated script on the simulator

Add an associated animation after the emergency number . You can also create a cool animation on screen using `basic->show animation`. Add code under `basic->show number` to display an animation.

```
while (true) {
    led3.plot(2, 2)
    basic3.pause(200)
    basic3.clearScreen()
    basic3.pause(200)
    basic3.showString("HELP", 150)
    basic3.showNumber(999, 150)
    basic3.showAnimation(`
# # . # #
. # . # .
. . # . .
# . . . #
# # # # #
`, 400) // ***
}
```

Awesome! We have implemented a string, number, and animation

* run the code and see that it works as expected.

### Challenge 4

Use the same logic `basic->string`, `basic->number`, or `basic->animation`  to turn on the LEDs and display information!!!

* run the code and see that it works as expected
