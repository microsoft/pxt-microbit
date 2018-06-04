let speed: number
let cupCapacity: number
let maxMisses: number
let autoEmpty: boolean
let movement: boolean
let sensitivity: number
let cupX: number
let cupInverted: boolean

let highscore = 0
while (true) {
    // configure game settings
    // ##CHALLENGE1: reconfigure game
    cupCapacity = 5
    speed = 6
    maxMisses = 3
    autoEmpty = false
    movement = true
    sensitivity = 400
    cupX = 2
    // show the spash screen
    // ##CHALLENGE 2: CHANGE SPLASH SCREEN
    basic.showAnimation(`
        . . . . .   . . . . .
        . . . . .   . # . # .
        . . . . .   . . . . .
        . # . # .   . # . # .
        . # # # .   . # # # .
        `, 400)
    // Decide what to do based on which button is pressed
    if (input.buttonIsPressed(Button.A)) {
        let finalScore = playGame()
        // ##CHALLENGE 3 ADD HIGH SCORE
        if (finalScore > highscore) {
            basic.showString("HIGH", 150)
            highscore = finalScore
        }
        basic.showNumber(finalScore, 150)
    } else if (input.buttonIsPressed(Button.B)) {
        testMovement()
    } else {
        basic.pause(100)
    }
}

function playGame(): number {
    let cup = images.createImage(`
        . . . . .   . . . . .   . . . . .
        . . . . .   . . . . .   . . . . .
        . . . . .   . . . . .   . . . . .
        . . . . .   . # . # .   . . . . .
        . . . . .   . # # # .   . . . . .
        `)
    let score = 0
    let dropsInCup = 0
    let misses = 0
    let dropX = 0
    let dropY = 0
    let prevDropY = -1
    let cupX1 = 2
    let prevCupX = -1
    let state = "NEWDROP"
    startGame()
    while (true) {
        if (state == "NEWDROP") {
            // create a new drop at a random position
            dropX = Math.randomInt(5)
            dropY = 0
            state = "RAINING"
        } else if (state == "RAINING") {
            // calculate new positions
            cupX1 = getCupPosition()
            let thisDropY = dropY / speed
            // Only redraw the screen if something has changed (prevent flashing)
            if (cupX1 != prevCupX || thisDropY != prevDropY) {
                basic.clearScreen()
                // draw cup
                cup.showImage(7 - cupX1)
                if (dropsInCup == cupCapacity) {
                    // a full cup
                    led.plot(cupX1, 3)
                }
                // draw drop
                led.plot(dropX, thisDropY)
                prevCupX = cupX1
                prevDropY = thisDropY
            }
            basic.pause(100)
            if (thisDropY >= 4) {
                state = "ATCUP"
            } else {
                dropY = dropY + 1
            }
            if (cupInverted && dropsInCup >= cupCapacity) {
                state = "EMPTYING"
            }
        } else if (state == "ATCUP") {
            if (dropX == cupX1) {
                state = "CATCH"
            } else {
                state = "MISS"
            }
        } else if (state == "MISS") {
            // ##CHALLENGE: long beep on miss
            beep(500)
            misses = misses + 1
            basic.showAnimation(`
                . . . . .   . . . . .   . . . . .   . . . . .
                . . . . .   . # . # .   . . . . .   . . . . .
                . . . . .   . # # # .   . # . # .   . . . . .
                . # . # .   . . . . .   . # # # .   . # . # .
                . # # # .   . . # . .   . . . . .   . # # # .
                `, 400)
            if (misses > maxMisses) {
                state = "GAMEOVER"
            } else {
                state = "NEWDROP"
            }
        } else if (state == "CATCH") {
            // ##CHALLENGE: short beep on catch
            beep(200)
            dropsInCup = dropsInCup + 1
            basic.showAnimation(`
                . . . . .   . . . . .   . . . . .
                . . . . .   . . . . .   . . . . .
                . . . . .   . . . . .   . . . . .
                . # # # .   # . # . #   . # . # .
                . # # # .   # # # # #   . # # # .
                `, 400)
            if (dropsInCup == cupCapacity) {
                state = "FULL"
                score = score + 1
            } else if (dropsInCup > cupCapacity) {
                state = "OVERFLOW"
            } else {
                score = score + 1
                state = "NEWDROP"
            }
        } else if (state == "FULL") {
            basic.showAnimation(`
                . . . . .   . . . . .   . . . . .
                . . . . .   . . . . .   . . . . .
                . . . . .   . # # # .   . . . . .
                . # # # .   . # # # .   . # # # .
                . # # # .   . # # # .   . # # # .
                `, 400)
            if (autoEmpty) {
                state = "EMPTYING"
            } else {
                state = "NEWDROP"
            }
        } else if (state == "EMPTYING") {
            if (cupInverted) {
                basic.showAnimation(`
                    . . . . .   . . . . .   . . . . .   . . # . .   . . . . .
                    . . . . .   . . . . .   . . # . .   . . . . .   . . . . .
                    . . . . .   . . # . .   . . . . .   . . . . .   . . . . .
                    . # # # .   . # . # .   . # . # .   . # . # .   . # . # .
                    . # # # .   . # # # .   . # # # .   . # # # .   . # # # .
                    `, 400)
            } else {
                basic.showAnimation(`
                    . . . . .   . . . . .   . # # # .   . # # # .   . # # # .   . # # # .   . # # # .   . . . . .   . . . . .
                    . . . . .   . # # . .   . # # # .   . # . # .   . # . # .   . # . # .   . # . # .   . # # . .   . . . . .
                    . . . . .   . # # . .   . . . . .   . . # . .   . . . . .   . . . . .   . . . . .   . # . . .   . . . . .
                    . # # # .   . # # . .   . . . . .   . . . . .   . . # . .   . . . . .   . . . . .   . # # . .   . # . # .
                    . # # # .   . . . . .   . . . . .   . . . . .   . . . . .   . . # . .   . . . . .   . . . . .   . # # # .
                    `, 400)
            }
            dropsInCup = 0
            // ##CHALLENGE: Speed up on every level change
            if (speed > 1) {
                speed = speed - 1
            }
            state = "NEWDROP"
        } else if (state == "OVERFLOW") {
            basic.showAnimation(`
                . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
                . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
                . . . . .   . # # # .   . # . # .   . . . . .   . . . . .   . . . . .
                . # # # .   . # # # .   # # # # #   # # # # #   . # # # .   . # # # .
                . # # # .   . # # # .   . # # # .   . # # # .   # # # # #   . # # # .
                `, 400)
            state = "GAMEOVER"
        } else if (state == "GAMEOVER") {
            // ##CHALLENGE: Make a sound on game over
            beep(700)
            basic.showAnimation(`
                . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . # # # .   # # # # #   . . . . .   . . . . .   . . . . .
                . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . # # # .   # # # # #   . # . # .   . . . . .   . . . . .   . # . # .   . . . . .
                . . . . .   . . . . .   . . . . .   . . . . .   . # # # .   # # # # #   . # . # .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
                . # . # .   . . . . .   . # # # .   # # # # #   . # . # .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
                . # # # .   # # # # #   . # . # .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
                `, 400)
            break
        }
    }
    return score
}

function testMovement() {
    while (!input.buttonIsPressed(Button.A)) {
        // ##CHALLENGE 5: Add accelerometer test mode
        let x = getCupPosition()
        basic.clearScreen()
        led.plot(x, 2)
        basic.pause(200)
    }
}

function getCupPosition(): number {
    if (movement) {
        let acc = input.acceleration(Dimension.X) / sensitivity
        cupX = Math.clamp(0, 4, acc + 2)
        return cupX
    }
    if (input.buttonIsPressed(Button.A)) {
        if (cupX > 0) {
            cupX = cupX - 1
        }
    } else if (input.buttonIsPressed(Button.B)) {
        if (cupX < 4) {
            cupX = cupX + 1
        }
    }
    return cupX
}

function startGame() {
    basic.clearScreen()
    // If button still held from start-game, wait until it is released
    while (input.buttonIsPressed(Button.A)) {
        // wait for button to be released
    }
    // handlers that work out if cup is turned upside down or not
    input.onLogoDown(() => {
        cupInverted = true
    })
    input.onLogoUp(() => {
        cupInverted = false
    })
}

function beep(p: number) {
    pins.digitalWritePin(DigitalPin.P0, 1)
    basic.pause(p)
    pins.digitalWritePin(DigitalPin.P0, 0)
}
