# Railway Crossing

## ~

https://youtu.be/xBInZN2ZWRI

## Duration

7 steps, about 15-30 minutes each.

## Step 1: Light sensor

We are going to use the light sensor to detect if a train is passing. We will do this by detecting the shadow of the train.

Let's first explore how the light sensor works by downloading the following program onto our @boardname@.

```block
input.onButtonPressed(Button.A, () => {
    basic.showNumber(input.lightLevel())
})
```

Now press button A and the @boardname@ responds with a number. This number indicates the amount of light that falls
on the LEDs (yes, LEDs can also be used to detect light). If the number that you receive is either 255 or 0 it means
the brightness sensor is initializing, so you need to press the button once more.

## Step 2: The scene

NOTE: If you do not possess a train, you can also use a car or even your hand to create a shadow.

Detecting a shadow can be a bit tricky. For this to work we need to have a bright lamp on the other side of the train,
that is not too high. A desk lamp should work. Furthermore, we do not want too much light from other light sources,
so you may have to close curtains or blinds and dim ceiling lamps.

You should now see a shadow of the train that is big enough to place your @boardname@ in. Make sure the board is laying
down flat on the table and write down the amount of light that is measured in the shadow and the amount of light
that is measured when there is no shadow. The number in the light should be at least 2 times the number in the shadow.

## Step 3: Detecting the train

![Train detection](/static/mb/projects/railway-crossing/railway-crossing-action.png)

We are going to turn on the top-left LED on our @boardname@ when a train is passing by.
For this you need to pick a threshold. This should be a number that is roughly in between the 
two numbers you wrote down in step 2. 
For example, if the brightness in the shadow was 20 and in the light it was 60, you should use 40 as the threshold. 

Add the following blocks to your program to make the top-left led indicate if a train is detected. 
Replace 40 with your threshold.

```block
basic.forever(() => {
    if (input.lightLevel() < 40) {
        led.plot(0, 0)
    } else {
        led.unplot(0, 0)
    }
})
```

Now try it out! If the led turns on even when no train passes, you should try lowering the threshold.
If the led does not turn on when a train passes, you should try increasing the threshold.

NOTE: If you cannot get this to work reliably, you can still continue with the rest of the steps and
close the railway crossing using a button.

## Step 4: Making the lights

For the lights we need the following materials:

 - A piece of cardboard (There is nothing wrong with recycling!)
 - Two red LEDs, preferably 5mm with diffused light and long connectors
 - A resistor that roughly matches the LEDs at 3 Volt
 - Crocodile clips
 - glue
 - tape

https://youtu.be/No1qK51tHNQ

The movie shows how to build the pole. A short summary:
 - Build the pole using cardboard
 - Put a resistor at the bottom of the pole and add 2 LEDs in parallel above it. 
   These LEDs should be placed in opposite directions.
 - Use the crocodile clips to complete the circuit.
 - Now connect the circuit to the 3V and GND pins of the @boardname@. One of the LEDs should now light up.
 - Swap the crocodile clips and now the other LED should light up.
 
## Step 5: Making the lights blink

Now we are going to program the @boardname@ to make the LEDs blink like a railway crossing. For this we are
going to connect the lights from the previous step to pins 1 and 2 of the @boardname@. 

We can turn on one LED by writing a digital 1 to one pin and a digital 0 to the other
(digital 1 means 3 Volt, digital 0 means GND). The other LED can be turned on by swapping 0 and 1. 
Now use the following program to make the lights blink indefinitely.

```block
basic.forever(() => {
    pins.digitalWritePin(DigitalPin.P1, 1)
    pins.digitalWritePin(DigitalPin.P2, 0)
    basic.pause(300)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P2, 1)
    basic.pause(300)
})
```

## Step 6: Programming the railway crossing

In order to make a safe railway crossing, we want the railway crossing to keep the lights 
flashing for 5 more times after a train is no longer detected.
This means that our program needs to remember how many flashes are remaining. 
For this we use a variable called `flashes_remaining`.
When a train is detected, we set this variable to 5 and after each flash, 
we subtract 1 from the variable until it reaches 0. Then the flashing stops.

We also want to manually close the railway when button B is pressed.
First of all, remove the forever block from step 5. Then add the following code:

```block
let flashes_remaining = 0

input.onButtonPressed(Button.B, () => {
    flashes_remaining = 5
})

basic.forever(() => {
    while (flashes_remaining > 0) {
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.pause(300)
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
        basic.pause(300)
        flashes_remaining += -1
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
})
```

The lights will now flash for 5 times when button B is pressed.
You can now go ahead and add blocks to the train detection program from step 3 to start flashing the lights 
when a train is detected.

## Step 7: Adding the barrier

![Railway crossing with servo](/static/mb/projects/railway-crossing/railway-crossing-with-servo.jpg)

For the barrier you need:

 - An SG90 9g servo, [equipped with crocodile clips](../device/servo)
 - A straw (preferably white)
 - Some red tape for decoration
 
## Instructions

 - Glue the servo to the pole
 - Glue a strip of cardboard over it for stability
 - Tape the straw to the servo
 - Add the instructions below at the right location in your program
 - Connect the servo to the 3V, GND and PIN0 as shown in the simulator
 
### Open the barrier
```block 
pins.servoWritePin(AnalogPin.P0, 90)
```
 
### Close the barrier
```block
pins.servoWritePin(AnalogPin.P0, 180)
```
 
Good luck and have fun!
   
## ~

## about the author
This project was contributed by Johan Gorter [@JohanGorter](https://twitter.com/JohanGorter).