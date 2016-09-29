# Timing gates

In ths project, we will build a timing gate, a system that can measure the speed of a car.

The timing gate is made of two sensors that can detect the moving car.
When the car goes through the gate, it triggers each sensor and the micro:bit 
records the times. The speed is then computed by dividing the distance between the sensors 
by the time between each sensor trigger.

## Materials

* Carboard
* Aluminum fail
* Double-side tape (carpet tape)
* 4 crocodile clips
* A micro:bit board and USB cable

![](TODO materials)

## Building the sensor

The sensor is made by tapping two strips of fail on the cardboard as close as possible.

Add two strips of tape on the cardboard.

![](TODO tape picture)

Lay the Aluminum foil on the double-sided tape

![](TODO)

Strip the foil around the tape.

![](TODO)

Connect a crocodile strip to the foil ends

![](TODO)

Connect the crocodile plugs to the ``GND`` and ``P0`` pins on the micro:bit.

![](TODO)

## Detecting the car with code



```blocks
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

## Adding the second sensor

## Computing time

## Computing velocity
