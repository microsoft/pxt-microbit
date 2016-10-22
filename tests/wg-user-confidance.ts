let AWasPressed: boolean
let BWasPressed: boolean
let wasShake: boolean
let dots025: Image

dots025 = images.createImage(`
    . . . . .   # . . . .   # # . . .   # # # . .   # # # # .   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #
    . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   # . . . .   # # . . .   # # # . .   # # # # .   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #
    . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   # . . . .   # # . . .   # # # . .   # # # # .   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #
    . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   # . . . .   # # . . .   # # # . .   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #
    . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   # . . . .   # # . . .   # # # . .   # # # # .   # # # # #
    `)
let tests = "DABPXYZSCT"
let test = 0
let prevTest = -1
startIOMonitor()
while (true) {
    let testLetter = tests[test]
    let autoRun = false
    if (testLetter == "D" || testLetter == "A" || testLetter == "B") {
        autoRun = true
    }
    if (!(test == prevTest)) {
        basic.showString(tests[test], 200)
        prevTest = test
    }
    if (AWasPressed || autoRun) {
        AWasPressed = false
        if (testLetter == "D") {
            testDisplay()
            test = test + 1
        } else if (testLetter == "A") {
            testButtonA()
            test = test + 1
        } else if (testLetter == "B") {
            testButtonB()
            test = test + 1
        } else if (testLetter == "P") {
            testPads()
        } else if (testLetter == "X") {
            testTiltX()
        } else if (testLetter == "Y") {
            testTiltY()
        } else if (testLetter == "Z") {
            testTiltZ()
        } else if (testLetter == "S") {
            testShake()
        } else if (testLetter == "C") {
            testCompass()
        } else if (testLetter == "T") {
            testTemperature()
        } else {
            // end of tests
            basic.showLeds(`
                . . . . .
                . . . . #
                . . . # .
                # . # . .
                . # . . .
                `, 400)
        }
        prevTest = -1
        AWasPressed = false
        BWasPressed = false
    } else if (BWasPressed) {
        BWasPressed = false
        if (test < tests.length - 1) {
            test = test + 1
        } else {
            test = 3
        }
    } else {
        basic.pause(100)
    }
}

/**
 * flash all LEDs 5 times
 */
function testDisplay() {
    for (let i = 0; i < 5; i++) {
        basic.plotLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        basic.pause(200)
        basic.clearScreen()
        basic.pause(200)
    }
    // cycle all LEDs from 1 to 25
    basic.showAnimation(`
        # . . . .   # # . . .   # # # . .   # # # # .   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #
        . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   # . . . .   # # . . .   # # # . .   # # # # .   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #
        . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   # . . . .   # # . . .   # # # . .   # # # # .   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #
        . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   # . . . .   # # . . .   # # # . .   # # # # .   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #
        . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   # . . . .   # # . . .   # # # . .   # # # # .   # # # # #
        `, 400)
}

function testButtonA() {
    basic.plotLeds(`
        . . # . .
        . # . # .
        . # # # .
        . # . # .
        . # . # .
        `)
    // wait for A pressed
    while (!input.buttonIsPressed(Button.A)) {
        basic.pause(100)
    }
    basic.plotLeds(`
        . # . . .
        # . # . .
        # # # . .
        # . # . .
        # . # . .
        `)
    // wait for A released
    while (input.buttonIsPressed(Button.A)) {
        basic.pause(100)
    }
    basic.plotLeds(`
        . . # . .
        . # . # .
        . # # # .
        . # . # .
        . # . # .
        `)
    basic.pause(1000)
}

function testTiltX() {
    basic.clearScreen()
    let prevx = 0
    while (!AWasPressed && !BWasPressed) {
        basic.pause(100)
        let x = input.acceleration(Dimension.X)
        let x2 = x / 512 + 2
        let x3 = Math.clamp(0, 4, x2)
        // sticky trace
        led.plot(x3, 0)
        // middle line is actual/live
        if (x3 != prevx) {
            led.unplot(prevx, 2)
            prevx = x3
        }
        led.plot(x3, 2)
        // bottom line is -4G, -2G, 1G, +2G, +4G
        if (x <= -2048) {
            led.plot(0, 4)
        } else if (x <= -1024) {
            led.plot(1, 4)
        } else if (x <= 1024) {
            led.plot(2, 4)
        } else if (x <= 2048) {
            led.plot(3, 4)
        } else {
            led.plot(4, 4)
        }
    }
}

function testShake() {
    wasShake = false
    basic.plotLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    while (!AWasPressed && !BWasPressed) {
        if (wasShake) {
            wasShake = false
            basic.plotLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
            basic.pause(500)
            basic.plotLeds(`
                . . . . .
                . . . . .
                . . # . .
                . . . . .
                . . . . .
                `)
        } else {
            basic.pause(100)
        }
    }
}

function testCompass() {
    if (input.compassHeading() < 0) {
        input.calibrate()
    }
    basic.clearScreen()
    while (!AWasPressed && !BWasPressed) {
        let d = input.compassHeading()
        d = d / 22
        d = Math.clamp(0, 15, d)
        d = (d + 2) % 16
        if (d < 4) {
            led.plot(d, 0)
        } else if (d < 8) {
            led.plot(4, d - 4)
        } else if (d < 12) {
            led.plot(4 - d - 8, 4)
        } else {
            led.plot(0, 4 - d - 12)
        }
        basic.pause(100)
    }
}

function testPads() {
    let TESTSPEED = 500
    AWasPressed = false
    BWasPressed = false
    // Make sure all pins are inputs, before test starts
    let p0 = pins.digitalReadPin(DigitalPin.P0)
    let p1 = pins.digitalReadPin(DigitalPin.P1)
    let p2 = pins.digitalReadPin(DigitalPin.P2)
    let ok0 = 0
    let ok1 = 0
    let ok2 = 0
    while (!AWasPressed && !BWasPressed) {
        basic.clearScreen()
        // ## P0 out low, read from P1 and P2
        ok0 = 0
        pins.digitalWritePin(DigitalPin.P0, 0)
        basic.pause(TESTSPEED)
        p1 = pins.digitalReadPin(DigitalPin.P1)
        p2 = pins.digitalReadPin(DigitalPin.P2)
        if (p1 == 0) {
            led.plot(0, 0)
            ok0 = ok0 + 1
        }
        if (p2 == 0) {
            led.plot(1, 0)
            ok0 = ok0 + 1
        }
        // ## P0 out high, read from P1 and P2
        pins.digitalWritePin(DigitalPin.P0, 1)
        basic.pause(TESTSPEED)
        p1 = pins.digitalReadPin(DigitalPin.P1)
        p2 = pins.digitalReadPin(DigitalPin.P2)
        if (p1 == 1) {
            led.plot(2, 0)
            ok0 = ok0 + 1
        }
        if (p2 == 1) {
            led.plot(3, 0)
            ok0 = ok0 + 1
        }
        // set back to an input
        p0 = pins.digitalReadPin(DigitalPin.P0)
        // ## P1 out low, read from P0 and P2
        ok1 = 0
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(TESTSPEED)
        p0 = pins.digitalReadPin(DigitalPin.P0)
        p2 = pins.digitalReadPin(DigitalPin.P2)
        if (p0 == 0) {
            led.plot(0, 1)
            ok1 = ok1 + 1
        }
        if (p2 == 0) {
            led.plot(1, 1)
            ok1 = ok1 + 1
        }
        // ## P1 out high, read from P0 and P2
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(TESTSPEED)
        p0 = pins.digitalReadPin(DigitalPin.P0)
        p2 = pins.digitalReadPin(DigitalPin.P2)
        if (p0 == 1) {
            led.plot(2, 1)
            ok1 = ok1 + 1
        }
        if (p2 == 1) {
            led.plot(3, 1)
            ok1 = ok1 + 1
        }
        // set back to an input
        p0 = pins.digitalReadPin(DigitalPin.P1)
        // ## P2 out low, read from P0 and P1
        ok2 = 0
        pins.digitalWritePin(DigitalPin.P2, 0)
        basic.pause(TESTSPEED)
        p0 = pins.digitalReadPin(DigitalPin.P0)
        p1 = pins.digitalReadPin(DigitalPin.P1)
        if (p0 == 0) {
            led.plot(0, 2)
            ok2 = ok2 + 1
        }
        if (p1 == 0) {
            led.plot(1, 2)
            ok2 = ok2 + 1
        }
        // ## P2 out high, read from P0 and P1
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.pause(TESTSPEED)
        p0 = pins.digitalReadPin(DigitalPin.P0)
        p1 = pins.digitalReadPin(DigitalPin.P1)
        if (p0 == 1) {
            led.plot(2, 2)
            ok2 = ok2 + 1
        }
        if (p1 == 1) {
            led.plot(3, 2)
            ok2 = ok2 + 1
        }
        p2 = pins.digitalReadPin(DigitalPin.P2)
        // ## Assess final test status
        if (ok0 == 4) {
            led.plot(4, 0)
        }
        basic.pause(TESTSPEED)
        if (ok1 == 4) {
            led.plot(4, 1)
        }
        basic.pause(TESTSPEED)
        if (ok2 == 4) {
            led.plot(4, 2)
        }
        basic.pause(TESTSPEED)
        if (ok0 + ok1 + ok2 == 12) {
            // all tests passed
            led.plot(4, 4)
        }
        // ## Test cycle finished
        basic.pause(1000)
    }
    // intentionally don't clear A and B flags, so main loop can process them.
}

/**
 * - show number of dots on screen (0..25) to represent temperature in celcius
 */
function testTemperature() {
    while (!AWasPressed && !BWasPressed) {
        let temp = input.temperature() - 10
        temp = Math.clamp(0, 25, temp)
        dots025.plotFrame(temp)
        basic.pause(500)
    }
}

function testButtonB() {
    basic.plotLeds(`
        . # # . .
        . # . # .
        . # # . .
        . # . # .
        . # # . .
        `)
    // wait for B pressed
    while (!input.buttonIsPressed(Button.B)) {
        basic.pause(100)
    }
    basic.plotLeds(`
        . . # # .
        . . # . #
        . . # # .
        . . # . #
        . . # # .
        `)
    // wait for B released
    while (input.buttonIsPressed(Button.B)) {
        basic.pause(100)
    }
    basic.plotLeds(`
        . # # . .
        . # . # .
        . # # . .
        . # . # .
        . # # . .
        `)
    basic.pause(1000)
}

function testTiltY() {
    basic.clearScreen()
    let prevy = 0
    while (!AWasPressed && !BWasPressed) {
        basic.pause(100)
        let y = input.acceleration(Dimension.Y)
        let y2 = y / 512 + 2
        let y3 = Math.clamp(0, 4, y2)
        // sticky trace
        led.plot(0, y3)
        // middle line is actual/live
        if (y3 != prevy) {
            led.unplot(2, prevy)
            prevy = y3
        }
        led.plot(2, y3)
        // bottom line is -4G, -2G, 1G, +2G, +4G
        if (y <= -2048) {
            led.plot(4, 0)
        } else if (y <= -1024) {
            led.plot(4, 1)
        } else if (y <= 1024) {
            led.plot(4, 2)
        } else if (y <= 2048) {
            led.plot(4, 3)
        } else {
            led.plot(4, 4)
        }
    }
}

function testTiltZ() {
    basic.clearScreen()
    while (!AWasPressed && !BWasPressed) {
        let z = input.acceleration(Dimension.Z)
        if (z < -2000) {
            basic.plotLeds(`
                # . . . #
                # . . . #
                # . . . #
                # . . . #
                # . . . #
                `)
        } else if (z <= -1030) {
            basic.plotLeds(`
                . # . # .
                . # . # .
                . # . # .
                . # . # .
                . # . # .
                `)
        } else if (z <= 1000) {
            basic.plotLeds(`
                . . # . .
                . . # . .
                . . # . .
                . . # . .
                . . # . .
                `)
        } else if (z <= 1030) {
            basic.plotLeds(`
                . . . . .
                . . . . .
                # # # # #
                . . . . .
                . . . . .
                `)
        } else if (z <= 2000) {
            basic.plotLeds(`
                . . . . .
                # # # # #
                . . . . .
                # # # # #
                . . . . .
                `)
        } else {
            basic.plotLeds(`
                # # # # #
                . . . . .
                . . . . .
                . . . . .
                # # # # #
                `)
        }
        basic.pause(100)
    }
}

function startIOMonitor() {
    input.onButtonPressed(Button.A, () => {
        AWasPressed = true
    })
    input.onButtonPressed(Button.B, () => {
        BWasPressed = true
    })
    input.onShake(() => {
        wasShake = true
    })
}
