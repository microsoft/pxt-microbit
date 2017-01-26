# Code 

Let's build the code that will send a impulse while the user presses ``A``.

### Step 1

We now need to digitally write to pin ``P0`` as **high** (1). 

```blocks
pins.digitalWritePin(DigitalPin.P0, 1)
```

### Step 2

We want to add a block to turn on an LED in the middle area of the LED display using plot x, y. 
So insert the appropriate LED plot x, y. 

```blocks
pins.digitalWritePin(DigitalPin.P0, 1)
led.plot(2, 2)
```

### Step 3

We want to insert a condition that tells us when to turn on the LED. So insert the if block under logic drawer. 
Then add a condition that occurs if we do not turn on a LED with plot x, y. We also should plot an LED on the display if button A is pressed. Your code should appear as follows:

```blocks
if (input.buttonIsPressed(Button.A)) {
    pins.digitalWritePin(DigitalPin.P0, 1)
    led.plot(2, 2)
} else { }
```


### Step 4

We want to write code if button A is NOT pressed. It is important to say that digital write is not on. We also want to turn off all the LED light.

```blocks
if (input.buttonIsPressed(Button.A)) {
    pins.digitalWritePin(DigitalPin.P0, 1)
    led.plot(2, 2)
} else {
    pins.digitalWritePin(DigitalPin.P0, 0)
    led.unplot(2, 2)
}
```

### Step 5

Let's add a forever loop so this code runs in the background forever. Modify your code so that your code looks like this. Run the code and press Button A. 

```blocks
basic.forever(() => {
    if (input.buttonIsPressed(Button.A)) {
        pins.digitalWritePin(DigitalPin.P0, 1)
        led.plot(2, 2)
    } else {
        pins.digitalWritePin(DigitalPin.P0, 0)
        led.unplot(2, 2)
    }
})
```

### Step 6

We now need to digitally read to the specified pin (P1) as digital. Let's start by going to the pin drawer and adding digital read pin (0,1) and changing the pin to P1. Now we need to create a condition for digital read pin (0,1). So we go to the logic drawer and select the comparison operator. Then we want to set the comparison operator to 1 to turn on digital read on pin 1. We want to insert a condition that tells us if button A is pressed and we should turn on digital read on pin 1. So insert the if block under logic drawer. Then add a condition that occurs if digital read on P1 is on. Then we want to plot x, y at the x, y coordinates of 2,2. we also want to say that if digital read pin P1 is not on, we want to turn off all LED lights on the screen. Your code should appear as follows:

```blocks
if (pins.digitalReadPin(DigitalPin.P1) == 1) {
    led.plot(4, 4);
}
else {
    led.unplot(4, 4);
}
basic.forever(() => {
    if (input.buttonIsPressed(Button.A)) {
        pins.digitalWritePin(DigitalPin.P0, 1);
        led.plot(2, 2);
    }
    else {
        pins.digitalWritePin(DigitalPin.P0, 0);
        basic.clearScreen();
    }
});
```

Your telegraph is ready!

### Step 7

* Connect the first @boardname@ to your computer using your USB cable and put the telegraph script on it.
* Connect the second @boardname@ to your computer using your USB cable and run the telegraph script on it.
* The first person and second person take turns pressing button A to play the telegraph game!
