let wasShake: boolean

input.onShake(() => {
    wasShake = true
})
wait_6Hours()
timeForTest()
alertnessTest()
wait_2Hours()
timeForTest()
alertnessTest()
wait_2Hours()
timeForTest()
alertnessTest()

/**
 * animate back to work
 * animate take a rest
 */
function animations() { }

/**
 * wait 6 hours
 * because this is a test program, we only wait for a short time
 */
function wait_6Hours() {
    basic.showAnimation(`
        . . # . .   . . . . #   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   # . . . .
        . . # . .   . . . # .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . # . . .
        . . # . .   . . # . .   . . # # #   . . # . .   . . # . .   . . # . .   # # # . .   . . # . .
        . . . . .   . . . . .   . . . . .   . . . # .   . . # . .   . # . . .   . . . . .   . . . . .
        . . . . .   . . . . .   . . . . .   . . . . #   . . # . .   # . . . .   . . . . .   . . . . .
        `, 500)
}

/**
 * wait for 2 hours
 * because this is test code, we only wait a few seconds
 */
function wait_2Hours() {
    basic.showAnimation(`
        . . # . .   . . . . #   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   # . . . .
        . . # . .   . . . # .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . # . . .
        . . # . .   . . # . .   . . # # #   . . # . .   . . # . .   . . # . .   # # # . .   . . # . .
        . . . . .   . . . . .   . . . . .   . . . # .   . . # . .   . # . . .   . . . . .   . . . . .
        . . . . .   . . . . .   . . . . .   . . . . #   . . # . .   # . . . .   . . . . .   . . . . .
        `, 500)
}

function alertnessTest() {
    let goodResponse = 1000
    let threshold = 5
    let score = 0
    // Start test on button press
    let x = 0
    let start = images.createImage(`
        . . # . .   . . # . .
        . . # . .   . # . # .
        . . # . .   . . . # .
        . . . . .   . . # . .
        . . # . .   . . # . .
        `)
    while (!input.buttonIsPressed(Button.B)) {
        start.showImage(x)
        x = x + 5
        if (x >= start.width()) {
            x = 0
        }
        basic.pause(300)
    }
    // Wait for button(s) to be released
    while (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
        basic.pause(100)
    }
    // Run 10 random cognition response tests
    for (let i = 0; i < 9; i++) {
        // Choose random delay and random outcome
        let delay = Math.randomInt(5) + 5
        let outcome = Math.randomInt(2)
        // Draw moving dots on screen until delay expires
        basic.clearScreen()
        for (let j = 0; j < delay; j++) {
            led.plot(j % 5, 2)
            basic.pause(200)
            basic.clearScreen()
        }
        // Show shake or button icon
        if (outcome == 0) {
            // Press the button!
            basic.showLeds(`
                . . . . .
                . # # # .
                . # # # .
                . # # # .
                . . . . .
                `)
        } else {
            // Shake the bit!
            basic.showLeds(`
                # . # . .
                # . . # .
                # # # # #
                # . . # .
                # . # . .
                `)
        }
        // Wait up to 3 seconds for button, shake, or timeout
        wasShake = false
        let timer = input.runningTime()
        let timeout = 3000
        while (input.runningTime() < timer + timeout) {
            if (wasShake) {
                break
            } else if (input.buttonIsPressed(Button.B)) {
                break
            } else {
                basic.pause(100)
            }
        }
        // Assess the response and the response time
        let response = input.runningTime() - timer
        if (outcome == 0 && input.buttonIsPressed(Button.B) && response <= goodResponse) {
            score = score + 1
        } else if (outcome == 1 && wasShake && response <= goodResponse) {
            score = score + 1
        }
    }
    // Show final score flashing 5 times (0..9)
    for (let k = 0; k < 5; k++) {
        basic.showNumber(score, 0)
        basic.pause(250)
        basic.clearScreen()
        basic.pause(250)
    }
    basic.showNumber(score, 0)
    basic.pause(500)
    if (score < threshold) {
        // Time for a break, show coffee cup animation
        for (let l = 0; l < 3; l++) {
            basic.showAnimation(`
                . . . . .   . . . . .   . # . . .   . # . . .   . . . . .   . . # . .   . . # . .   . . . . .
                . . . . .   . # . . .   . # . . .   . . . . .   . . # . .   . . # . .   . . . . .   . . . . .
                # . . # .   # # . # .   # . . # .   # . . # .   # . # # .   # . . # .   # . . # .   # . . # .
                # . . # #   # . . # #   # . . # #   # . . # #   # . . # #   # . . # #   # . . # #   # . . # #
                # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .
                `, 400)
        }
    } else {
        // All ok, back to work, show digging animation
        for (let m = 0; m < 3; m++) {
            basic.showAnimation(`
                # . # . .   # . . . .   # . . . .
                . # # . .   . # . # .   . # . . .
                # # # . .   . . # # .   . . # . #
                . . . . .   . # # # .   . . . # #
                . . . . .   . . . . .   . . # # #
                `, 400)
        }
    }
    // Wait for any button press to finish test
    while (!input.buttonIsPressed(Button.A) && !input.buttonIsPressed(Button.B)) {
        basic.pause(100)
    }
}

/**
 * alert the user it is time to take the test
 * in a real system, this might give them 5 1 minute warnings
 */
function timeForTest() {
    basic.showAnimation(`
        . # # # .   . # . . .   . # # . .   . # # . .   . . # . .
        . # . . .   . # . . .   . . . # .   . . . # .   . # # . .
        . . # . .   . # # # .   . # # . .   . . # . .   . . # . .
        . . . # .   . . # . .   . . . # .   . # . . .   . . # . .
        . # # . .   . . # . .   . # # . .   . # # # .   . # # # .
        `, 700)
}
