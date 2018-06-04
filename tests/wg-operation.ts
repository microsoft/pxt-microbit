let opMaxTime: number
let procMaxTime: number
let procsToDo: number
let recoveryTriesMax: number
let tenseTime: number
let flatlineTimeMax: number
let recoveryProbability: number
let aWasPressed: boolean
let bWasPressed: boolean
let digitsImg: Image
let tweezerCount_: number
let wasTweezers: boolean
let wasNose: boolean
let isTweezers: boolean

// P0 blue wire, tweezers (active high)
// P1, green wire nose button/LED (active high)
// P2/red speaker (not a self toned beeper, but a piezo or a speaker)
opMaxTime = 120 * 1000
procsToDo = 3
procMaxTime = 60 * 1000
tenseTime = 4000
flatlineTimeMax = 15 * 1000
recoveryTriesMax = 3
recoveryProbability = 60
let highScore = 0
digitsImg = images.createImage(`
    . . # . .   . . # . .   . # # . .   . # # . .   . # . . .   . # # # .   . . # # .   . # # # .   . . # . .   . . # . .
    . # . # .   . # # . .   . . . # .   . . . # .   . # . . .   . # . . .   . # . . .   . . . . .   . # . # .   . # . # .
    . # . # .   . . # . .   . . # . .   . . # . .   . # # # .   . . # . .   . # # . .   . . # . .   . . # . .   . . # # .
    . # . # .   . . # . .   . # . . .   . . . # .   . . # . .   . . . # .   . # . # .   . # . . .   . # . # .   . . . # .
    . . # . .   . # # # .   . # # # .   . # # . .   . . # . .   . # # . .   . . # . .   . # . . .   . . # . .   . # # . .
    `)
startIOMonitor()
while (true) {
    splashScreen()
    if (buttonB()) {
        basic.showAnimation(`
            . . . . .   # # . . .   . # . . .   . # . . .   . . . # .   . . . . .
            . . . . #   . . . . #   # # . . #   . # . . #   . . # . #   . . . . #
            . . . . #   . . . . #   . . . . #   # # . . #   # # . . #   # # # # #
            # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #
            # . . . #   # . . . #   # . . . #   # . . . #   # . . . #   # . . . #
            `, 400)
        let finalScore = surgery()
        if (game.score() > highScore) {
            basic.showString("HI", 150)
            highScore = finalScore
        }
        flashDigit(finalScore)
        waitButtonB()
    } else if (buttonA()) {
        testMode()
    } else {
        basic.pause(100)
    }
}

function surgery(): number {
    let score = 0
    let speed = 150
    let opStartTime = input.runningTime()
    let procStartTime = -1
    let procNumber = -1
    let procsDone = 0
    let recoveryTry = 0
    let timer = 0
    let state = "CHOOSE PROC"
    resetButtons()
    while (true) {
        basic.pause(10)
        let event = getEvent(state)
        if (event == "CUT") {
            state = "ARREST"
        }
        // CHECK TIMERS
        if (!(procStartTime == -1)) {
            if (input.runningTime() - procStartTime > procMaxTime) {
                state = "LOST"
            } else {
                // TODO add code here to speed up near end of proc
            }
        }
        if (input.runningTime() - opStartTime > opMaxTime) {
            state = "LOST"
        } else {
            // TODO add code here to speed up near end of op
        }
        // PROCESS SPECIFIC STATES
        if (state == "CHOOSE PROC") {
            if (procNumber == -1) {
                procNumber = 1
                showDigit(procNumber)
            } else if (event == "SCROLL") {
                procNumber = procNumber + 1
                if (procNumber > 9) {
                    procNumber = 1
                }
                showDigit(procNumber)
            } else if (event == "SELECT") {
                procStartTime = input.runningTime()
                state = "HEALTHY"
                speed = 100
            }
        } else if (state == "HEALTHY") {
            speed = 100
            ecg(speed)
            if (event == "TWINGE") {
                state = "TENSE"
                timer = input.runningTime()
            } else if (event == "DONE") {
                state = "PROC DONE"
            }
        } else if (state == "TENSE") {
            speed = 25
            ecg(speed)
            if (event == "TWINGE") {
                state = "ARREST"
            } else if (input.runningTime() - timer > tenseTime) {
                state = "HEALTHY"
            }
        } else if (state == "ARREST") {
            timer = input.runningTime()
            recoveryTry = recoveryTriesMax
            state = "FLATLINE"
        } else if (state == "FLATLINE") {
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                . . . . .
                # # # # #
                `)
            beepOn()
            if (event == "SHOCK") {
                state = "SHOCKING"
            } else if (input.runningTime() - timer > flatlineTimeMax) {
                state = "LOST"
            }
        } else if (state == "SHOCKING") {
            charging()
            basic.showAnimation(`
                . . . . #   . . . . #   . . . . .   . . . . .
                . . . # .   . . . # .   . . . # .   . . . . .
                . . . . .   . . # . .   . . # . .   . . # . .
                . . . . .   . . . . .   . # . . .   . # . . .
                . . . . .   . . . . .   . . . . .   . # . . .
                `, 150)
            beepNTimesFor(15, 500)
            basic.showAnimation(`
                . . . . .   . . . . .   . . . . .   # . . . #
                . . . . .   . . . . .   # . . # .   . . . . .
                . . . . .   # . # . .   . . . . .   . . . . .
                . # . . .   . # . . .   . . . . .   . . . . .
                . # . . .   . # . . .   . # . . .   . # . . .
                `, 150)
            state = "SHOCKED"
        } else if (state == "SHOCKED") {
            let recover = Math.randomInt(100)
            if (recover >= recoveryProbability) {
                state = "RECOVERED"
            } else {
                state = "FAILED"
            }
        } else if (state == "RECOVERED") {
            beepOff()
            basic.pause(500)
            beep()
            basic.showAnimation(`
                . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
                . # . # .   . . . . .   . # . # .   . . . . .   . # . # .
                . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
                # . . . #   . . . . .   # . . . #   . . . . .   # . . . #
                . # # # .   . . . . .   . # # # .   . . . . .   . # # # .
                `, 400)
            state = "HEALTHY"
        } else if (state == "FAILED") {
            recoveryTry = recoveryTry - 1
            if (recoveryTry > 0) {
                state = "FLATLINE"
            } else {
                state = "LOST"
            }
        } else if (state == "PROC DONE") {
            basic.showAnimation(`
                . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
                . . . . .   . . . . .   . . . . .   . . . . .   . . . . #
                . . . . .   . . . . .   . . . . .   . . . # .   . . . # .
                # . . . .   # . . . .   # . # . .   # . # . .   # . # . .
                . . . . .   . # . . .   . # . . .   . # . . .   . # . . .
                `, 400)
            score = score + pointsForProc(procNumber)
            procsDone = procsDone + 1
            procStartTime = -1
            if (procsDone == procsToDo) {
                state = "OP DONE"
            } else {
                procNumber = -1
                state = "CHOOSE PROC"
            }
        } else if (state == "OP DONE") {
            basic.showAnimation(`
                . . . . .   . . . # .   . # . . .   . . # . .   . . . # .   . . . . #   . . # . .   . . # . .   . . . . .   . . . . .   . . . . .
                . . . . #   . . # . #   . # . . #   . . # . .   . . . # .   . . . . #   . . # . .   . . # . .   . # . . .   # . . . .   . . . . .
                # # # # #   # # . . #   # # . . #   . # # . .   . . # # .   . . . # #   . # # . .   . . # . .   . # . . .   # . . . .   . . . . .
                # # # # #   # # # # #   # # # # #   . # # # #   . . # # #   . . . # #   . . . # #   . . # # #   . # . # #   # . . # #   . . . # #
                # . . . #   # . . . #   # . . . #   . # . . .   . . # . .   . . . # .   . . . # .   . . . # .   . # . # .   # . . # .   . . . # .
                `, 400)
            return score
        } else if (state == "LOST") {
            beepOn()
            basic.showLeds(`
                . # . # .
                . . # . .
                . # . # .
                . . . . .
                # # # # #
                `)
            basic.pause(3000)
            beepOff()
            basic.showAnimation(`
                . . . . .   . . . . .   # # # # .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
                . . . . #   # # # # #   . . . . #   . . . . #   . . . . #   # . # . #   . . . . #   # . # . #   . . . . #
                # # # # #   . . . . #   . . . . #   . . . . #   . . . . #   . . . . #   . . . . #   . . . . #   . . . . #
                # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #
                # . . . #   # . . . #   # . . . #   # . . . #   # . . . #   # . . . #   # . . . #   # . . . #   # . . . #
                `, 400)
            return score
        }
    }
}

/**
 * if any button pressed, terminate the animation immediately
 */
function splashScreen() {
    let img = images.createImage(`
        . # . # .   . # . # .   . # . # .   . # . # .   . . # . .   . # # . .
        # # # # #   # . # . #   # # # # #   # . # . #   . # . # .   . # . # .
        # # # # #   # . . . #   # # # # #   # . . . #   . # . # .   . # # . .
        . # # # .   . # . # .   . # # # .   . # . # .   . # . # .   . # . . .
        . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . # . . .
        `)
    let x = 0
    while (!aWasPressed && !bWasPressed) {
        img.showImage(x)
        basic.pause(500)
        x = x + 5
        if (x >= img.width()) {
            x = 0
        }
    }
}

/**
 * Test sensing and buzzing
 * I/O at moment is (assuming self toning beeper)
 * P0 is beeper and nose LED
 * P1 is the tweezer sense wire
 * P2 is possibly the nose button
 * If we want amplification, might have to use piezo library
 * which means using extra pins
 */
function testMode() {
    while (!(buttonA())) {
        if (pins.digitalReadPin(DigitalPin.P1) == 1) {
            pins.digitalWritePin(DigitalPin.P0, 1)
            basic.showLeds(`
                . . . . .
                . . . . #
                . . . # .
                # . # . .
                . # . . .
                `)
        } else {
            pins.digitalWritePin(DigitalPin.P0, 0)
            basic.showLeds(`
                # # # # #
                . . # . .
                . . # . .
                . . # . .
                . . # . .
                `)
        }
        basic.pause(100)
    }
}

/**
 * SENSE TWINGE/CUT FROM TWEEZERS (10ms per sample)
 * @param state TODO
 */
function getEvent(state: string): string {
    if (wasTweezers) {
        if (tweezerCount_ > 20) {
            wasTweezers = false
            tweezerCount_ = 0
            return "CUT"
        } else if (!isTweezers) {
            wasTweezers = false
            tweezerCount_ = 0
            return "TWINGE"
        }
    }
    // SENSE A OR B BUTTON PRESSES
    if (state == "CHOOSE PROC") {
        if (buttonA()) {
            return "SCROLL"
        } else if (buttonB()) {
            return "SELECT"
        }
    } else if (state == "FLATLINE") {
        if (buttonB()) {
            return "SHOCK"
        } else if (nose()) {
            return "SHOCK"
        }
    } else if (state == "HEALTHY") {
        if (buttonB()) {
            return "DONE"
        }
    }
    // Clear any flags for unnecessary events in a given state to prevent latching
    aWasPressed = false
    bWasPressed = false
    return "NONE"
}

function flashDigit(digit: number) {
    for (let i = 0; i < 4; i++) {
        showDigit(digit)
        basic.pause(200)
        basic.clearScreen()
        basic.pause(200)
    }
    showDigit(digit)
    basic.pause(1000)
}

/**
 * Make a short beep sound
 */
function beep() {
    beepOn()
    basic.pause(200)
    beepOff()
}

/**
 * work out score for a procedure
 * @param procNumber TODO
 */
function pointsForProc(procNumber: number): number {
    if (procNumber < 4) {
        return 1
    } else if (procNumber < 7) {
        return 2
    } else {
        return 3
    }
}

/**
 * beep n times, for a total duration of m
 * @param times TODO
 * @param duration TODO
 */
function beepNTimesFor(times: number, duration: number) {
    let halfCycle = duration / (times * 2)
    for (let i = 0; i < times; i++) {
        beepOn()
        basic.pause(halfCycle)
        beepOff()
        basic.pause(halfCycle)
    }
}

function startIOMonitor() {
    aWasPressed = false
    input.onButtonPressed(Button.A, () => {
        aWasPressed = true
    })
    bWasPressed = false
    input.onButtonPressed(Button.B, () => {
        bWasPressed = true
    })
    wasTweezers = false
    isTweezers = false
    tweezerCount_ = 0
    control.inBackground(() => {
        let buzzCount = 0
        while (true) {
            if (pins.digitalReadPin(DigitalPin.P0) == 1) {
                wasTweezers = true
                isTweezers = true
                tweezerCount_ = tweezerCount_ + 1
                if (buzzCount == 0) {
                    pins.analogWritePin(AnalogPin.P2, 512)
                    pins.analogSetPeriod(AnalogPin.P2, 5000)
                }
                buzzCount = 10
            } else {
                isTweezers = false
            }
            if (buzzCount > 0) {
                buzzCount = buzzCount - 1
                if (buzzCount == 0) {
                    pins.analogWritePin(AnalogPin.P2, 0)
                }
            }
            basic.pause(10)
        }
    })
}

/**
 * Shows a single digit, with a nicer font than the standard micro:bit font
 * @param digit TODO
 */
function showDigit(digit: number) {
    digit = Math.clamp(0, 9, digit)
    digitsImg.showImage(digit * 5)
}

/**
 * check to see if button A was pressed recently
 */
function buttonA(): boolean {
    if (aWasPressed) {
        aWasPressed = false
        return true
    }
    return false
}

function waitButtonA() {
    while (!(buttonA())) {
        basic.pause(100)
    }
}

function buttonB(): boolean {
    if (bWasPressed) {
        bWasPressed = false
        return true
    }
    return false
}

function waitButtonB() {
    while (!(buttonB())) {
        basic.pause(100)
    }
}

function beepOn() {
    pins.analogWritePin(AnalogPin.P2, 512)
    pins.analogSetPeriod(AnalogPin.P2, 2272)
}

function beepOff() {
    pins.analogWritePin(AnalogPin.P2, 0)
}

function resetButtons() {
    aWasPressed = false
    bWasPressed = false
}

function ecg(speed: number) {
    beepOn()
    pins.digitalWritePin(DigitalPin.P1, 1)
    basic.pause(50)
    beepOff()
    basic.showAnimation(`
        . . . . #   . . . # .   . . # . .   . # . . .   # . . . .   . . . . .   . . . . .
        . . . . #   . . . # .   . . # . .   . # . . .   # . . . .   . . . . .   . . . . .
        . . . . #   . . . # .   . . # . .   . # . . .   # . . . .   . . . . .   . . . . .
        . . . . #   . . . # #   . . # # .   . # # . .   # # . . .   # . . . .   . . . . .
        # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #
        `, speed)
    pins.digitalWritePin(DigitalPin.P1, 0)
    basic.pause(speed * 10)
}

function nose(): boolean {
    if (wasNose) {
        wasNose = false
        return true
    }
    return false
}

/**
 * start period in microseconds
 */
function charging() {
    let period = 2000
    let dec = 500
    pins.analogWritePin(AnalogPin.P2, 512)
    pins.analogSetPeriod(AnalogPin.P2, period)
    basic.showLeds(`
        . # # . .
        . . . # .
        . . # . .
        . . . # .
        . # # . .
        `)
    basic.pause(500)
    pins.analogSetPeriod(AnalogPin.P2, period - dec)
    basic.showLeds(`
        . # # . .
        . . . # .
        . . # . .
        . # . . .
        . # # # .
        `)
    basic.pause(500)
    pins.analogSetPeriod(AnalogPin.P2, period - dec * 2)
    basic.showLeds(`
        . . # . .
        . # # . .
        . . # . .
        . . # . .
        . # # # .
        `)
    basic.pause(500)
    beepOff()
}
