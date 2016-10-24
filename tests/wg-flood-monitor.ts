let sensorType: string

// ANALOG or TILT
sensorType = "TILT"
while (true) {
    // splash screen (flood monitor)
    basic.showLeds(`
        # # # . .
        # . . . .
        # # . # .
        # . . # .
        # . . # #
        `)
    while (true) {
        if (input.buttonIsPressed(Button.A)) {
            // test that the sensor works
            testMode()
            break
        } else if (input.buttonIsPressed(Button.B)) {
            // run the real flood monitor
            floodMonitor()
            break
        } else {
            basic.pause(100)
        }
    }
}

/**
 * test mode - test that the monitor and buzzer work
 * no filtering in this mode, direct screen update
 */
function testMode() {
    basic.showLeds(`
        # # # # #
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        `)
    waitNoButtons()
    let img = images.createImage(`
        . . . . .   . . . . .   . . . . .   . . . . .   # # # # #
        . . . . .   . . . . .   . . . . .   # # # # #   . . . . .
        . . . . .   . . . . .   # # # # #   . . . . .   . . . . .
        . . . . .   # # # # #   . . . . .   . . . . .   . . . . .
        # # # # #   . . . . .   . . . . .   . . . . .   . . . . .
        `)
    while (!input.buttonIsPressed(Button.A)) {
        // Show live reading on display
        let value = readSensor()
        img.showImage(value * 5)
        // Turn beeper on only if maximum value seen
        if (value >= 4) {
            pins.digitalWritePin(DigitalPin.P1, 1)
        } else {
            pins.digitalWritePin(DigitalPin.P1, 0)
        }
        basic.pause(50)
    }
    waitNoButtons()
}

function floodMonitor() {
    basic.showLeds(`
        # . . . #
        # # . # #
        # . # . #
        # . . . #
        # . . . #
        `)
    waitNoButtons()
    let line = images.createImage(`
        . . . . .   . . . . .   . . . . .   . . . . .   # # # # #
        . . . . .   . . . . .   . . . . .   # # # # #   . . . . .
        . . . . .   . . . . .   # # # # #   . . . . .   . . . . .
        . . . . .   # # # # #   . . . . .   . . . . .   . . . . .
        # # # # #   . . . . .   . . . . .   . . . . .   . . . . .
        `)
    let state = "SAFE"
    let averagedValue = 0
    while (!input.buttonIsPressed(Button.A)) {
        let value = readSensor()
        // Apply some 'lag' filtering to the value, so that 'bobbing' doesn't set off alarm
        // i.e. to go from 0 to 4 takes 4 times round the loop
        if (value > averagedValue) {
            // On the way up, changes in reading are slowed down
            averagedValue = averagedValue + 1
        } else if (value < averagedValue) {
            // On the way down, changes in reading happen immediately
            averagedValue = value
        }
        // Work out what to do based on the averaged value (non bobbing value)
        if (state == "SAFE") {
            if (averagedValue >= 4) {
                pins.digitalWritePin(DigitalPin.P1, 1)
                state = "ALARMING"
            } else {
                // Display raw value as a line
                line.showImage(value * 5)
                // fill in based on averaged value (long term reading)
                for (let i = 0; i < averagedValue; i++) {
                    led.plot(2, 4 - i)
                }
            }
        } else if (state == "ALARMING") {
            if (input.buttonIsPressed(Button.B)) {
                pins.digitalWritePin(DigitalPin.P1, 0)
                state = "SAFE"
            } else {
                basic.showAnimation(`
                    # # # # #   . . . . .
                    # # # # #   . . . . .
                    # # # # #   . . . . .
                    # # # # #   . . . . .
                    # # # # #   . . . . .
                    `, 400)
            }
        }
        basic.pause(300)
    }
    waitNoButtons()
}

/**
 * Read a value 0,1,2,3,4 from either ANALOG or TILT
 */
function readSensor(): number {
    let value = 0
    // Produce a sensor value in range 0..1023
    if (sensorType == "ANALOG") {
        // Input range is 0..1023
        value = pins.analogReadPin(AnalogPin.P0)
    } else if (sensorType == "TILT") {
        // Input range is -1024 (pads highest)..1023 (pads lowest)
        value = input.acceleration(Dimension.Y)
        // Emulator sometimes returns out of range values, so clamp to expected range
        value = Math.clamp(-1024, 1023, value)
        // Convert to an entirely positive range from 0 pads full up to 2047 pads full down
        // (hinged at the 'eyes' end)
        value = value + 1024
        // Invert the direction, so that "pads up" is largest, "pads down" is smallest
        value = 2047 - value
        // We want the same range as the analog, so halve the range
        value = value / 2
    }
    // 5 possible values (0,1,2,3,4) based on sensible thresholds
    // We do this by thresholds, so that we have more control over the 5 levels
    if (value < 200) {
        return 0
    } else if (value < 400) {
        return 1
    } else if (value < 600) {
        return 2
    } else if (value < 800) {
        return 3
    }
    return 4
}

function waitNoButtons() {
    while (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
        basic.pause(100)
    }
}
