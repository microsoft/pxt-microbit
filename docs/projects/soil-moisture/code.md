# Code

You will need to get a pot of dry dirt and wet dirt for the coding.

## Step 1: Measuring moisture

![](/static/mb/projects/soil-moisture/nailsv3.jpg)

The soil acts as a variable resistor based on the amount of water and nutrient. 
The water is not conductive but the nutrient are, so more water, more nutrient, so the soil will be less resistive.

To measure this, we read the voltage on pin ``P0`` using [analog read pin](/reference/pins/analog-read-pin)
which returns a value between ``0`` (no current) and ``1023`` (max current). The value is graph on the screen
using [led plot bar graph](/reference/led/plot-bar-graph).

```blocks
basic.forever(() => {
    led.plotBarGraph(
        pins.analogReadPin(AnalogPin.P0),
        1023
    )
})
```

### Experiment!

* insert the nails in the dry dirt and you should see most LEDs off
* insert the nail in the wet dirt and you should see most LEDs on

## Step 2: Sensor data values

In the previous program, we only have a rough idea of the value of the sensor... since it is using a tiny screen
to display it! Let's add code that displays the current reading when button ``A`` is pressed.

This code has to be inserted in the forever loop. We've also added a variable ``reading`` to store the reading value.

```blocks
let reading = 0
basic.forever(() => {
    reading = pins.analogReadPin(AnalogPin.P0)
    led.plotBarGraph(
        reading,
        1023
    )
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(reading)
    }
})
```

### Experiment!

* insert the nails in the dry dirt, press ``A`` and note the value. You should see a value close to ``250``
for dry dirt.
* insert the nails in the wet dirt, press ``B`` and note the value. You should see a value close to ``1000``
for dry dirt.

https://youtu.be/S8NppVT_paw

## Step 3: Don't waste energy!

![](/static/mb/projects/soil-moisture/nailsp1.jpg)

We want our probe to work for a long time on batteries so we need to tweak our code to save energy.

* Our circuit connects directly to the ``3v`` pin so it is always using electricity. Instead, 
we will connect it to ``P1`` and turn that pin high only while the measurement is taken.
This saves electricty and also avoids corrosion of the probes.
* We will also lower the brightness of the screen to lower the energy consumption from the LEDs.
* Soil moisture changes very slowly so we don't need to measure all the times!!! Let's add a **sleep** of 5 seconds in the loop as well.

```blocks
led.setBrightness(64)
let reading = 0
basic.forever(() => {
    pins.analogWritePin(AnalogPin.P1, 1023)
    reading = pins.analogReadPin(AnalogPin.P0)
    pins.analogWritePin(AnalogPin.P1, 0)
    led.plotBarGraph(
        reading,
        1023
    )
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(reading)
    }
    basic.pause(5000);
})
```

### Experiment!

* using the dry and wet dirt pots, test that your ciruit still works. Remember you'll have to wait up to 10 seconds to see a change!

### ~button /projects/soil-moisture/connect

Connect

### ~