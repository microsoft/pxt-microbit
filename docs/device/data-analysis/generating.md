# Generating data

## Sensor values

Most of the data you want to record probably comes from values measured by the sensors. The sensor values are read using ``||input:Input||`` blocks. They return to your program the current value measured by the sensor.

```block
serial.writeValue("accelX", input.acceleration(Dimension.X))
```

```block
serial.writeValue("heading", input.compassHeading())
```

```block
serial.writeValue("light", input.lightLevel())
```

```block
serial.writeValue("forceX", input.magneticForce(Dimension.X))
```

## Pin data

External sensors and devices connected to the board are read using the ``||pins:Pins||`` blocks. Here are some examples of reading the pins and reporting measurements from devices:

### Soil moisture

```block
let moisture = pins.analogReadPin(AnalogPin.P0)
serial.writeValue("moisture", moisture)
```

### Closed door detector

```block
pins.onPulsed(DigitalPin.P0, PulseValue.Low, () => {
    serial.writeValue("DoorClosed", 1)
})
```

### I2C humidity sensor

```block
let humidity = pins.i2cReadNumber(61, NumberFormat.Int8LE)
serial.writeValue("humidity", humidity)
```

## Human events

Sometimes we want to track human interactions with a device. These events might be button presses, gestures, or pin touches.

### Example: Button tracker

Run this example in the editor and switch to the Data Viewer. Watch it plot your button presses like pulse events in the chart.

```blocks
let buttonValue = 0
basic.forever(() => {
    if (input.buttonIsPressed(Button.A)) {
        buttonValue = 1
    } else {
        buttonValue = 0;
    }
    serial.writeValue("ButtonA", buttonValue)
    basic.pause(200)
})
```

Writing an additional value creates another stream that will appear in a separate chart. Adding and event for another button press, we can plot pulses on a second chart.

```blocks
let buttonValue = 0
basic.forever(() => {
    if (input.buttonIsPressed(Button.A)) {
        buttonValue = 1
    } else {
        buttonValue = 0;
    }
    serial.writeValue("ButtonA", buttonValue)
    if (input.buttonIsPressed(Button.B)) {
        buttonValue = 1
    } else {
        buttonValue = 0;
    }
    serial.writeValue("ButtonB", buttonValue)
    basic.pause(200)
})
```

## Time and timestamps

A timestamp marks when you read a value or detect that an event happens. These are commonly written along with other data values as an additional data item. The data viewer will create timestamps for values it sees when you write them. If you are downloading and saving data from the Data Viewer, it creates the timestamps for you and you don't need to add them.

If you need your own time values, you can make them from the **running time** of the board.

```block
input.onGesture(Gesture.Shake, () => {
    serial.writeValue("shaken", input.runningTime())
})
```

Also, you can write your own custom CSV with your own timestamp:

```blocks
serial.writeLine("timestamp,temp,light")
basic.forever(() => {
    serial.writeNumbers([input.runningTime(), input.temperature(), input.lightLevel()])
    basic.pause(30000)
})
```
