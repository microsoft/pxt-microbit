# Code

You will code your moisture meter using a pot of dry dirt and wet dirt. This is so you can set the @boardname@ to know what both dry and wet conditions are.

## Step 1: Measuring moisture

![](/static/mb/projects/soil-moisture/nailsv3.jpg)

The soil itself has some electrical resistance which depends on the amount of water and nutrients in it. It acts like a variable resistor in an electronic circuit. The water is not conductive but the nutrient content is. The combination of water and soil nutrients makes the soil have some conductivity. So, the more water there is, combined with the nutrients, the less the soil will have electrical resistance.

To measure this, we read the voltage on pin **P0** using ``||pins:analog read pin||``
which returns a value between ``0`` (no current) and ``1023`` (maximum current). The value is graph on the screen using ``||led:plot bar graph||``.

```blocks
basic.forever(() => {
    led.plotBarGraph(
        pins.analogReadPin(AnalogPin.P0),
        1023
    )
})
```

### Experiment!

* Insert the nails in the dry dirt and you should see most LEDs turn **off**.
* Insert the nail in the wet dirt and you should see most LEDs turn **on**.

## Step 2: Sensor data values

In the previous program, we only have a rough idea of what the sensor value is. It's using just a tiny screen to display it! Let's add code that displays the current reading when button **A** is pressed.

This code needs to go into the ``||basic:forever||`` loop. We've also added the variable ``reading`` to store the reading value.

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

* Insert the nails in the dry dirt, press **A** and note the value. You should see a value close to around ``250``for dry dirt.
* Insert the nails in the wet dirt, press **A** and note the value. You should see a value somewhere near ``1000`` for wet dirt.

<br/>
https://youtu.be/S8NppVT_paw

## Step 3: Don't waste energy!

![](/static/mb/projects/soil-moisture/nailsp1.jpg)

We want our soil probes to work for a long time and to save our battery power, so we need to tweak our code so our moisture sensor doesn't use too much energy.

* Our circuit connects directly to the **3V** pin so it is always using electricity. Instead, 
we will connect it to **P1** and turn that pin **high** only while the measurement is taken.
This saves electricity and also avoids corrosion of the probes.
* We will also lower the brightness of the screen to lower the energy consumption from the LEDs.
* Soil moisture changes very slowly so we don't need to measure it all the time!!! Let's add a **sleep** of 5 seconds in the loop as well.

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

* Using the dry soil and wet soil pots, test that your circuit still works. Remember you'll have to wait up to 10 seconds to see a change!

## ~button /projects/soil-moisture/connect

Connect

## ~
