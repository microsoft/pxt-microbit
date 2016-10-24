let AWasPressed: boolean
let BWasPressed: boolean
let ABWasPressed: boolean
let wasShake: boolean
let scoreA: number
let scoreB: number

scoreA = 0
scoreB = 0
startIOMonitor()
let gameTime = getGameTime()
basic.showLeds(`
    . . # . .
    . . # . .
    . . # # #
    . . . . .
    . . . . .
    `)
while (!BWasPressed) {
    basic.pause(100)
}
BWasPressed = false
playOneGame(gameTime)
showFinalScores(scoreA, scoreB)

function startIOMonitor() {
    input.onButtonPressed(Button.A, () => {
        AWasPressed = true
    })
    input.onButtonPressed(Button.B, () => {
        BWasPressed = true
    })
    input.onButtonPressed(Button.AB, () => {
        ABWasPressed = true
        AWasPressed = false
        BWasPressed = false
    })
    input.onShake(() => {
        wasShake = true
    })
    AWasPressed = false
    BWasPressed = false
    ABWasPressed = false
    wasShake = false
}

/**
 * display score for A and B on same screen as a graphic
 * this shows a tug of war line, in the middle if scores the same,
 * Can cope with differences +/-10
 * @param scoreA1 TODO
 * @param scoreB1 TODO
 */
function showScore(scoreA1: number, scoreB1: number) {
    let img = images.createImage(`
        # . . . .   # . . . .   # . . . .   # . . . .   # . . . .   . # . . .   . # . . .   . # . . .   . # . . .   . # . . .   . . # . .   . . . # .   . . . # .   . . . # .   . . . # .   . . . # .   . . . . #   . . . . #   . . . . #   . . . . #   . . . . #
        # . . . .   # . . . .   # . . . .   # . . . .   . # . . .   . # . . .   . # . . .   . # . . .   . # . . .   . . # . .   . . # . .   . . # . .   . . . # .   . . . # .   . . . # .   . . . # .   . . . # .   . . . . #   . . . . #   . . . . #   . . . . #
        # . . . .   # . . . .   # . . . .   . # . . .   . # . . .   . # . . .   . # . . .   . # . . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . . # .   . . . # .   . . . # .   . . . # .   . . . # .   . . . . #   . . . . #   . . . . #
        # . . . .   # . . . .   . # . . .   . # . . .   . # . . .   . # . . .   . # . . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . . # .   . . . # .   . . . # .   . . . # .   . . . # .   . . . . #   . . . . #
        # . . . .   . # . . .   . # . . .   . # . . .   . # . . .   . # . . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . . # .   . . . # .   . . . # .   . . . # .   . . . # .   . . . . #
        `)
    let diff = Math.clamp(-10, 10, scoreB1 - scoreA1)
    diff = diff + 10
    img.plotFrame(diff)
}

/**
 * show digits 0..10
 * @param digits TODO
 */
function showDigits(digits: number) {
    digits = Math.clamp(0, 10, digits)
    let img = images.createImage(`
        . . # . .   . . # . .   . # # . .   . # # . .   . # . . .   . # # # .   . . # # .   . # # # .   . . # . .   . . # . .   # . . # .
        . # . # .   . # # . .   . . . # .   . . . # .   . # . . .   . # . . .   . # . . .   . . . # .   . # . # .   . # . # .   # . # . #
        . # . # .   . . # . .   . . # . .   . . # . .   . # # # .   . . # # .   . # # . .   . . # . .   . . # . .   . . # # .   # . # . #
        . # . # .   . . # . .   . # . . .   . . . # .   . . # . .   . . . # .   . # . # .   . # . . .   . # . # .   . . . # .   # . # . #
        . . # . .   . # # # .   . # # # .   . # # . .   . . # . .   . # # . .   . . # . .   . # . . .   . . # . .   . # # . .   # . . # .
        `)
    img.plotFrame(digits)
}

/**
 * show time graphic for time remaining
 * @param gameTime TODO
 */
function showTime(gameTime: number) {
    let minutes = Math.clamp(0, 10, gameTime / 60)
    let seconds = gameTime % 60
    // divide seconds into 10 second stripes
    let stripes = seconds / 10
    let img = images.createImage(`
        . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
        . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
        . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
        . . . . .   # . . . .   # # . . .   # # # . .   # # # # .   # # # # #
        . . . . .   # . . . .   # # . . .   # # # . .   # # # # .   # # # # #
        `)
    img.plotFrame(stripes)
    // leave middle row blank
    // display up to 10 dots in raster on top two rows
    if (minutes > 0) {
        for (let i = 0; i < minutes; i++) {
            let y = i / 5
            let x = i % 5
            led.plot(x, y)
        }
    }
}

function getGameTime(): number {
    let chosenGameTime = 7
    showDigits(chosenGameTime)
    while (!BWasPressed) {
        if (AWasPressed) {
            if (chosenGameTime < 10) {
                chosenGameTime = chosenGameTime + 1
            } else {
                chosenGameTime = 1
            }
            showDigits(chosenGameTime)
            AWasPressed = false
        } else {
            basic.pause(100)
        }
    }
    BWasPressed = false
    return chosenGameTime
}

function playOneGame(gameTime: number) {
    let gameStartTime = input.runningTime()
    let gameElapsedTime = 0
    let gameTimeRemaining = gameTime * 60
    let timeout = 0
    let lastDisplayedTime = 0
    showScore(scoreA, scoreB)
    let state = "TIME"
    while (gameTimeRemaining >= 0) {
        // Tick the game time
        gameElapsedTime = (input.runningTime() - gameStartTime) / 1000
        gameTimeRemaining = gameTime * 60 - gameElapsedTime
        // Handle any global events such as point buttons
        if (AWasPressed) {
            AWasPressed = false
            scoreA = scoreA + 1
            if (state != "LAST10") {
                showScore(scoreA, scoreB)
                state = "SCORE"
            }
        } else if (BWasPressed) {
            BWasPressed = false
            scoreB = scoreB + 1
            if (state != "LAST10") {
                showScore(scoreA, scoreB)
                state = "SCORE"
            }
        }
        // Handle global transitions
        if (gameTimeRemaining <= 10 && state != "LAST10") {
            state = "LAST10"
        }
        // Handle game states
        if (state == "SCORE") {
            if (wasShake) {
                wasShake = false
                showTime(gameTimeRemaining)
                lastDisplayedTime = gameTimeRemaining
                timeout = input.runningTime() + 5 * 1000
                state = "TIME"
            }
        } else if (state == "TIME") {
            if (input.runningTime() > timeout) {
                showScore(scoreA, scoreB)
                state = "SCORE"
            }
        } else if (state == "LAST10") {
            if (gameTimeRemaining != lastDisplayedTime) {
                showDigits(gameTimeRemaining)
                lastDisplayedTime = gameTimeRemaining
            }
        }
        basic.pause(100)
    }
}

function showFinalScores(scoreA1: number, scoreB1: number) {
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
    while (true) {
        if (AWasPressed) {
            basic.showString("A", 150)
            basic.showNumber(scoreA1, 150)
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `)
            AWasPressed = false
        } else if (BWasPressed) {
            basic.showString("B", 150)
            basic.showNumber(scoreB1, 150)
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `)
            BWasPressed = false
        } else {
            basic.pause(100)
        }
    }
}
