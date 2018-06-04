let maxGameTime: number
let wasShake: boolean

maxGameTime = 60000
input.onShake(() => {
    wasShake = true
})
while (true) {
    splashScreen()
    if (input.buttonIsPressed(Button.B)) {
        basic.showAnimation(`
            # # # . .   # # # . .   # # # . .   # # # . .   # # # . .   # # # . .   # # # . .   # # # . .   # # # . .   # # # . .   # # # . .   # # # . .   # # # . .   # # # . .   # # # . .   # # # # #
            # # # . .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # . .   # . . . .   # . . . .   # . . . .   # . . . .   # # # # #   # # # # #
            # # # . .   # # # . .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # . .   # # # . .   # # # . .   # # # # #   # # # # #   # # # # #
            . . . . .   . . . . .   . . . . .   . . . # .   . . . # .   . . . # .   . . . # .   . . . # .   . . . # .   . . . # #   . . # # #   . # # # #   # # # # #   # # # # #   # # # # #   # # # # #
            . . . . .   . . . . .   . . . . .   . . . . .   . . . # .   . . . # #   . . # # #   . # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #
            `, 400)
        let score = playOneGame()
        flashDigit(score, 5)
        waitButtonB()
        basic.showAnimation(`
            # # # # #   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
            # # # # #   # # # # #   . . . . .   . . . . .   . . . . .   . . . . .   . # . # .   . . . . .   . # . # .   . . . . .
            # # # # #   # # # # #   # # # # #   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
            # # # # #   # # # # #   # # # # #   # # # # #   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
            # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
            `, 400)
    } else if (input.buttonIsPressed(Button.A)) {
        calibrate()
    }
}

function playOneGame(): number {
    let countDots = 0
    let x = 2
    let y = 2
    let xdir = true
    let canvas = images.createImage(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    wasShake = false
    let bearing = input.compassHeading()
    let startTime = input.runningTime()
    while (countDots < 25 && input.runningTime() - startTime < maxGameTime) {
        if (wasShake) {
            basic.showAnimation(`
                . . . . .   . . . . .   . . . . .   . . . . .   . # # # .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
                . . . . .   . . . . .   . . . . .   . # # # .   . . # . .   . # # # .   . . . . .   . . . . .   . . . . .   . . . . .
                . . . . .   . . . . .   . # # # .   . . # . .   . . # . .   . . # . .   . # # # .   . . . . .   . . . . .   . . . . .
                . . . . .   . # # # .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . # # # .   . . . . .   . . . . .
                . # # # .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . # # # .   . . . . .
                `, 50)
            let pos = Math.randomInt(5)
            if (xdir) {
                if (!canvas.pixel(pos, y)) {
                    canvas.setPixel(pos, y, true)
                    countDots = countDots + 1
                }
            } else if (!canvas.pixel(x, pos)) {
                canvas.setPixel(x, pos, true)
                countDots = countDots + 1
            }
            wasShake = false
            canvas.showImage(0)
        } else if (Math.abs(input.compassHeading() - bearing) > 60) {
            xdir = !xdir
            bearing = input.compassHeading()
            if (xdir) {
                x = Math.randomInt(5)
            } else {
                y = Math.randomInt(5)
            }
        } else {
            basic.pause(100)
        }
    }
    return dotsToScore(countDots)
}

function splashScreen() {
    let img = images.createImage(`
        # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   . # # # .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . # .   . . # # .   . # # # .   # # # # .   # # # # .   . # # # .   . . # # .   . . . # .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .
        # . . . #   # . . . #   # . . . #   # . . . #   # . . . #   . # # # .   . . # . .   . # # # .   . . . . .   . . . . .   . . . . .   . . . . .   # . . . .   . # . . .   . . # . .   . . . # .   . . . . #   . . . # #   . . # . #   . # . . #   # . . . #   # . . . #   # . . . #   # . . . #   . # . . #   . . # . #   . . . # #   . . . . #   . . . # .   . . # . .   . # . . .   # . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . # # # .   . . # . .   . # # # .   # . . . #   # . . . #   # . . . #   # . . . #
        # # # # .   # # # # .   # # # # .   # # # # .   . # # # .   . . # . .   . . # . .   . . # . .   . # # # .   . . . . .   . . . . .   . . . . .   # . . . .   # # . . .   # # # . .   # # # # .   # # # # #   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # .   # # # # #   # # # # .   # # # . .   # # . . .   # . . . .   . . . . .   . . . . .   . . . . .   . # # # .   . . # . .   . . # . .   . . # . .   . # # # .   # # # # .   # # # # .   # # # # .
        # . . . .   # . . . .   # . . . .   . # # # .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . # # # .   . . . . .   . . . . .   # . . . .   . # . . .   . . # . .   . . . # .   . . . . #   . . . # .   . . # # .   . # . # .   # . . # .   # . . # .   # . . # .   # . . # .   . # . # .   . . # # .   . . . # .   . . . . #   . . . # .   . . # . .   . # . . .   # . . . .   . . . . .   . . . . .   . # # # .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . # # # .   # . . . .   # . . . .
        # . . . .   # . . . .   . # # # .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . # # # .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . #   . . . . #   . . . . #   . . . . #   # . . . #   # . . . #   . . . . #   . . . . #   . . . . #   . . . . #   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . # # # .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . # # # .   # . . . .
        `)
    let x = 0
    while (!input.buttonIsPressed(Button.A) && !input.buttonIsPressed(Button.B)) {
        img.showImage(x)
        basic.pause(200)
        x = x + 5
        if (x >= img.width()) {
            x = 0
        }
    }
}

/**
 * rotate canvas
 */
function rotateImage() { }

function flashDigit(digit: number, times: number) {
    for (let i = 0; i < times; i++) {
        basic.showNumber(digit, 0)
        basic.pause(500)
        basic.clearScreen()
        basic.pause(500)
    }
    basic.showNumber(digit, 0)
}

function waitButtonB() {
    while (!input.buttonIsPressed(Button.B)) {
        basic.pause(100)
    }
}

function dotsToScore(dots: number): number {
    if (dots == 25) {
        return 9
    } else if (dots >= 22) {
        return 8
    } else if (dots >= 19) {
        return 7
    } else if (dots >= 16) {
        return 6
    } else if (dots >= 13) {
        return 5
    } else if (dots >= 10) {
        return 4
    } else if (dots >= 7) {
        return 3
    } else if (dots >= 4) {
        return 2
    } else if (dots >= 1) {
        return 1
    } else {
        return 0
    }
}

function calibrate() {
    basic.showString("CAL", 150)
    if (input.compassHeading() == -4) {
        input.calibrate()
    }
    while (!input.buttonIsPressed(Button.B)) {
        let h = input.compassHeading()
        basic.showNumber(h, 150)
    }
}
