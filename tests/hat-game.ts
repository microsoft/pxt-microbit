let correctBall: number
let ballRevealing: boolean
let cupSelect: string
let index: number
let score: number
let level: number
let swapSpeed: number

initializeGame()
input.onButtonPressed(Button.A, () => {
    if (ballRevealing) {
        index = index + 1
        if (index > 2) {
            index = 0
        }
        basic.showString(cupSelect[index], 150)
    }
})
input.onButtonPressed(Button.B, () => {
    if (ballRevealing) {
        ballRevealing = false
        if (correctBall == index) {
            score = score + level
            images.createImage(`
                . . . . .
                . . . . #
                . . . # .
                # . # . .
                . # . . .
                `).showImage(0)
            basic.pause(1000)
            basic.showString("+".concat(level.toString()), 150)
            basic.pause(1000)
        } else {
            images.createImage(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `).showImage(0)
            basic.pause(1000)
            basic.clearScreen()
            revealBall(correctBall)
            basic.pause(1000)
        }
    }
    level = level + 1
    if (level == 4) {
        basic.showString("FINAL SCORE:", 75)
        basic.showNumber(score, 150)
    } else {
        playLevel(level)
    }
})
playLevel(1)

function revealBall(p: number) {
    let xCoordinate = 2 * p
    for (let j = 0; j < 3; j++) {
        led.plot(j * 2, 2)
    }
    for (let i = 0; i < 3; i++) {
        led.unplot(xCoordinate, 2)
        led.plot(xCoordinate, 1)
        basic.pause(100)
        led.unplot(xCoordinate, 1)
        led.plot(xCoordinate, 0)
        basic.pause(200)
        led.unplot(xCoordinate, 0)
        led.plot(xCoordinate, 1)
        basic.pause(100)
        led.unplot(xCoordinate, 1)
        led.plot(xCoordinate, 2)
        basic.pause(75)
    }
    basic.pause(1000)
}

function initializeGame() {
    ballRevealing = false
    level = 1
    score = 0
    cupSelect = "LMR"
}

function swapCups(cup_1: number, cup_2: number, pauseDifficulty: number) {
    let cup_1X = 2 * cup_1
    let cup_2X = 2 * cup_2
    let cupXAverage = (cup_1X + cup_2X) / 2
    led.unplot(cup_1X, 2)
    led.unplot(cup_2X, 2)
    led.plot(cup_1X, 3)
    led.plot(cup_2X, 1)
    basic.pause(pauseDifficulty)
    led.unplot(cup_1X, 3)
    led.unplot(cup_2X, 1)
    led.plot(cup_1X, 4)
    led.plot(cup_2X, 0)
    basic.pause(pauseDifficulty)
    led.unplot(cup_1X, 4)
    led.unplot(cup_2X, 0)
    if (cupXAverage == 2) {
        led.plot((cupXAverage + cup_1X) / 2, 4)
        led.plot((cupXAverage + cup_2X) / 2, 0)
        basic.pause(pauseDifficulty)
        led.unplot((cupXAverage + cup_1X) / 2, 4)
        led.unplot((cupXAverage + cup_2X) / 2, 0)
    }
    led.plot(cupXAverage, 4)
    led.plot(cupXAverage, 0)
    basic.pause(pauseDifficulty)
    led.unplot(cupXAverage, 4)
    led.unplot(cupXAverage, 0)
    if (cupXAverage == 2) {
        led.plot((cupXAverage + cup_2X) / 2, 4)
        led.plot((cupXAverage + cup_1X) / 2, 0)
        basic.pause(pauseDifficulty)
        led.unplot((cupXAverage + cup_2X) / 2, 4)
        led.unplot((cupXAverage + cup_1X) / 2, 0)
    }
    led.plot(cup_2X, 4)
    led.plot(cup_1X, 0)
    basic.pause(pauseDifficulty)
    led.unplot(cup_2X, 4)
    led.unplot(cup_1X, 0)
    led.plot(cup_2X, 3)
    led.plot(cup_1X, 1)
    basic.pause(pauseDifficulty)
    led.unplot(cup_2X, 3)
    led.unplot(cup_1X, 1)
    led.plot(cup_2X, 2)
    led.plot(cup_1X, 2)
    basic.pause(pauseDifficulty)
    if (correctBall == cup_1) {
        correctBall = cup_2
    } else if (correctBall == cup_2) {
        correctBall = cup_1
    }
}

function swapFake(cup_1: number, cup_2: number, pauseDifficulty: number) {
    let cup_1X = 2 * cup_1
    let cup_2X = 2 * cup_2
    let cupXAverage = (cup_1X + cup_2X) / 2
    led.unplot(cup_1X, 2)
    led.unplot(cup_2X, 2)
    led.plot(cup_1X, 3)
    led.plot(cup_2X, 1)
    basic.pause(pauseDifficulty)
    led.unplot(cup_1X, 3)
    led.unplot(cup_2X, 1)
    led.plot(cup_1X, 4)
    led.plot(cup_2X, 0)
    basic.pause(pauseDifficulty)
    led.unplot(cup_1X, 4)
    led.unplot(cup_2X, 0)
    if (cupXAverage == 2) {
        led.plot((cupXAverage + cup_1X) / 2, 4)
        led.plot((cupXAverage + cup_2X) / 2, 0)
        basic.pause(pauseDifficulty)
        led.unplot((cupXAverage + cup_1X) / 2, 4)
        led.unplot((cupXAverage + cup_2X) / 2, 0)
    }
    led.plot(cupXAverage, 4)
    led.plot(cupXAverage, 0)
    basic.pause(pauseDifficulty)
    led.unplot(cupXAverage, 4)
    led.unplot(cupXAverage, 0)
    if (cupXAverage == 2) {
        led.plot((cupXAverage + cup_1X) / 2, 4)
        led.plot((cupXAverage + cup_2X) / 2, 0)
        basic.pause(pauseDifficulty)
        led.unplot((cupXAverage + cup_1X) / 2, 4)
        led.unplot((cupXAverage + cup_2X) / 2, 0)
    }
    led.plot(cup_1X, 4)
    led.plot(cup_2X, 0)
    basic.pause(pauseDifficulty)
    led.unplot(cup_1X, 4)
    led.unplot(cup_2X, 0)
    led.plot(cup_1X, 3)
    led.plot(cup_2X, 1)
    basic.pause(pauseDifficulty)
    led.unplot(cup_1X, 3)
    led.unplot(cup_2X, 1)
    led.plot(cup_1X, 2)
    led.plot(cup_2X, 2)
    basic.pause(pauseDifficulty)
}

function playLevel(level1: number) {
    basic.showNumber(level, 150)
    basic.pause(3000)
    basic.clearScreen()
    for (let i = 0; i < 3; i++) {
        led.plot(2 * i, 2)
    }
    basic.pause(1000)
    correctBall = Math.randomInt(3)
    revealBall(correctBall)
    basic.pause(1000)
    let swaps = 5 + 10 * level1
    if (level1 == 1) {
        swapSpeed = 80
    } else if (level1 == 2) {
        swapSpeed = 40
    } else {
        swapSpeed = 20
    }
    for (let i1 = 0; i1 < swaps; i1++) {
        let swapType = Math.randomInt(3)
        let not = Math.randomInt(3)
        if (swapType < 2) {
            let swapOrientation = Math.randomInt(2)
            if (swapOrientation == 0) {
                swapCups((not + 1) % 3, (not + 2) % 3, swapSpeed)
            } else {
                swapCups((not + 2) % 3, (not + 1) % 3, swapSpeed)
            }
        } else {
            let swapOrientation1 = Math.randomInt(2)
            if (swapOrientation1 == 0) {
                swapFake((not + 1) % 3, (not + 2) % 3, swapSpeed)
            } else {
                swapFake((not + 2) % 3, (not + 1) % 3, swapSpeed)
            }
        }
    }
    index = -1
    ballRevealing = true
}
