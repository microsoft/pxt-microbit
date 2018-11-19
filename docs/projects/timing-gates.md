# Timing Gates

## ~avatar

This project explains the principles of timing gates using household materials.

## ~

## Timing gates

Two gates are connected to the @boardname@ so it can detect a car passing through them.

![](/static/mb/projects/timing-gates/sketchgates.jpg "Sketch of the gates")

As the car passes through the gate ``0``, it sends an event to the @boardname@ through the [``||pins:on pin pressed||``](/reference/input/on-pin-pressed) block.
The @boardname@ records the time in a variable ``t0``.

![](/static/mb/projects/timing-gates/sketchgate1.jpg "Sketch first gate")

As the car passes through the gate ``1``, it sends an event to the @boardname@ through the [``||pins:on pin pressed||``](/reference/input/on-pin-pressed) block.
The @boardname@ records the time in a variable ``t1``.

![](/static/mb/projects/timing-gates/sketchgate2.jpg "Sketch first gate")

The rest is a bit of math and physics. The time taken to cross the gates is computed as the difference of ``t1 - t0``.
By dividing the distance between the gates by the duration, we get the speed of the car!

![](/static/mb/projects/timing-gates/sketchmath.jpg "Sketch math")


## Materials

* Cardboard
* Aluminum foil
* Double-side tape (carpet tape)
* 4 crocodile clips
* A @boardname@ board and USB cable

![](/static/mb/projects/timing-gates/materials.jpg "Materials")

## blocks

```cards
basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
input.onPinPressed(TouchPin.P0, () => {})
let t = 0
input.runningTime()
t - 1
control.eventTimestamp();
basic.showNumber(0)
```

## Building the gate

The sensor is made by tapping two strips of foil on the cardboard as close as possible.

Add two strips of double-sided tape on the cardboard. Remove the protective film.

![](/static/mb/projects/timing-gates/tape.jpg "Double sided tape")

Lay the Aluminum foil on the double-sided tape. Press firmly on the tape to get a good bonding of the foil.

![](/static/mb/projects/timing-gates/stickfoil.jpg "Foil sensor")

Pull off the foil that's not touching the tape strips. That's all the foil in between and around  the tape strips. This clears out the extra foil and makes a gap between the foil on the tape strips. Make sure the gap is just enough so that both foil strips don't touch each other.

![](/static/mb/projects/timing-gates/spreadfoil.jpg "Foil taped")

Connect a crocodile strip to each foil strip.

![](/static/mb/projects/timing-gates/connectsensor.jpg "Connecting sensor")

Connect the crocodile plugs to the ``GND`` and ``P0`` pins on the @boardname@.

![](/static/mb/projects/timing-gates/connectcrocs.jpg "Connecting the @boardname@")

The gate is ready to use! Your circuit should look like the picture below:

![](/static/mb/projects/timing-gates/sensordone.jpg "A single gate")


## Detecting the car with code

The @boardname@ provides an event [``||pins:on pin pressed||``](/reference/input/on-pin-pressed) 
that is raised when a circuit between ``GND`` and a pin is detected. The circuit conductor could be a wire or even your body!
We will attach a foil to the bottom of the car. When it passes over the gate, it connects both foil strips, closes the circuit and triggers the event. 

Open the [code editor](/) and start a new project and add the following blocks. Notice that we are using pin ``P0`` here. 

```blocks
basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
input.onPinPressed(TouchPin.P0, () => {
    basic.showLeds(`
        # . . . .
        # . . . .
        # . . . .
        # . . . .
        # . . . .
        `)
})
```

Testing the code with our finger, we see a LED column turn on when pressing on both strips.

https://youtu.be/zi_-NAmdDpY

## Upgrading the car

In this lesson, we picked a random toy car and tapped foil to the bottom. 
As the car goes through the gate, it will connect both sides of the gate and trigger it. Make sure to add enough foil to get a good connection on the ground.

![](/static/mb/projects/timing-gates/carfoil.jpg "Attaching foil to the car")

By moving the car (slowly) through the gate, you will see that it triggers the ``on pin pressed`` event.

https://youtu.be/M3DIUvDPlIA

## ~hint

It doesn't always work! Why? Sometimes the foil doesn't touch both strips for long enough time to be detected. This is due to the poor quality of our sensor. To fix this, you would need to use  better a sensor, maybe an IR detector or a Hall effect sensor.

## ~

## Adding the second gate

Repeat the same process with tape and foil to build the first gate.

![](/static/mb/projects/timing-gates/sensor2.jpg "Double foil sensors")

Connect the crocodile plugs to the ``GND`` and ``P1`` pins on the @boardname@.

![](/static/mb/projects/timing-gates/sensormicrobit2.jpg "Sensor and microbit")

## Detecting the second gate

Since the second gate is connected to pin ``P1``, we add a second [``||pins:on pin pressed||``](/reference/input/on-pin-pressed) event
that display 2 columns of LEDs.

```blocks
basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
input.onPinPressed(TouchPin.P0, () => {
    basic.showLeds(`
        # . . . .
        # . . . .
        # . . . .
        # . . . .
        # . . . .
        `)
})
input.onPinPressed(TouchPin.P1, () => {
    basic.showLeds(`
        # . . . #
        # . . . #
        # . . . #
        # . . . #
        # . . . #
        `)
})
```
Strolling the car over both gates, you can see how the first gate triggers then the second.

https://youtu.be/N4bWQcu6yWs

## Computing time

The @boardname@ has a clock that measures time precisely. It measures how many seconds the @boardname@ has been on. 
We will record the time where each gate is tripped in variables ``t0`` and ``t1``. 
We take the different between ``t1`` and ``t0`` to compute the duration between the gates.

```blocks
let t0 = 0;
let t1 = 0;
basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
input.onPinPressed(TouchPin.P0, () => {
    t0 = control.eventTimestamp();
    basic.showLeds(`
        # . . . .
        # . . . .
        # . . . .
        # . . . .
        # . . . .
        `)
})
input.onPinPressed(TouchPin.P1, () => {
    t1 = control.eventTimestamp();
    basic.showLeds(`
        # . . . #
        # . . . #
        # . . . #
        # . . . #
        # . . . #
        `)
    let d = t1 - t0
    basic.showNumber(d)
})
```

https://youtu.be/piyym_ux1EM

## Computing velocity

Measure the distance between the gates and apply Newton's laws to compute the velocity (how fast it's going) of the car.

    v = d / t

We'll let you try to code this one on your own!
