let state: string
let timer: number
let gesturesRunning: boolean
let wasShake: boolean
let wasLogoUp: boolean
let wasLogoDown: boolean
let wasScreenUp: boolean
let wasScreenDown: boolean

while (true) {
    splashScreen()
    if (input.buttonIsPressed(Button.B)) {
        // animate: add pancake
        basic.showAnimation(`
            # # # # #   # . . . #   . . . . .   . . . . .   . . . . .
            . . . . .   . # # # .   . # # # .   . . . . .   . . . . .
            . . . . .   . . . . .   # . . . #   # . . . #   . . . . .
            . . . . .   . . . . .   . . . . .   . # # # .   . # # # .
            . . . . .   . . . . .   . . . . .   . . . . .   # . . . #
            `, 250)
        runGameOnce()
        // animate: pancake done
        basic.showAnimation(`
            . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . # # # .   # # # # #   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
            . . . . .   . . . . .   . . . . .   . . . . .   # . . . #   # # # # #   # . . . #   . . . . .   . . . . .   . # . # .   . . . . .   . # . # .   . . . . .
            . . . . .   . . . . .   . # # # .   # # # # #   . # # # .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
            # . . . #   # # # # #   # . . . #   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
            . # # # .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
            `, 250)
    } else if (input.buttonIsPressed(Button.A)) {
        testShake()
    }
}

/**
 * Runs one complete game from start to end
 */
function runGameOnce() {
    let score = 0
    let cooks = 0
    let target_time = 0
    // make sure no gestures are outstanding from last game
    wasShake = false
    wasLogoUp = false
    wasLogoDown = false
    wasScreenUp = false
    wasScreenDown = false
    state = "NEWSIDE"
    while (true) {
        // Handle any gestures that can happen at any time
        let gesture = getGesture()
        if (gesture == "FLOOR") {
            state = "DROPPED"
        }
        // Run code appropriate to the present state of the game
        if (state == "NEWSIDE") {
            target_time = 5 + Math.randomInt(5)
            state = "COOKING"
            startTimer()
        } else if (state == "COOKING") {
            // animate: cooking
            basic.showAnimation(`
                . . . . .   . . . . .   . . . . .   . . . . .
                . . . . .   . . . . .   . . . . .   . . . . .
                . . . . .   . . . . .   . . . . .   . . . . .
                . . . . .   # . . . .   . . . . .   . . . . #
                # # # # #   . # # # #   # # # # #   # # # # .
                `, 100)

            if (gesture == "FLIP") {
                state = "FLIPPING"
            } else if (getTimerSec() >= target_time) {
                state = "READY"
                score = score + 1
                startTimer()
            }
        } else if (state == "READY") {
            // animate: ready
            basic.showAnimation(`
                . . . . .
                . . . . .
                . . . . .
                # . . . #
                . # # # .
                `, 100)
            if (getTimerSec() > 2) {
                state = "BURNING"
                score = score - 1
                startTimer()
            } else if (gesture == "FLIP") {
                state = "FLIPPING"
            }
        } else if (state == "BURNING") {
            // animate: burning
            basic.showAnimation(`
                . . . . .   . . . . .   . . . # .   . . . # .
                . . . . .   . . . # .   . # . # .   . # . . .
                . . . . .   . # . # .   . # . . .   . . . . .
                . . . . .   . # . . .   . . . . .   . . . . .
                # # # # #   # # # # #   # # # # #   # # # # #
                `, 100)
            if (gesture == "SKY") {
                state = "NEWSIDE"
            } else if (getTimerSec() > 2) {
                state = "BURNT"
            }
        } else if (state == "FLIPPING") {
            // animate: flipping
            basic.showAnimation(`
                . . . . .   . . . . .   . . . . .   . . . . .   # . . . .   . . . . .   . . . . #   . . . . .   . . . . .   . . . . .
                . . . . .   . . . . .   . . . . .   # # # # #   . # # . .   . # # # .   . . # # .   # # # # #   . . . . .   . . . . .
                . . . . .   . . . . .   # # # # #   . . . . .   . . . # #   . # # # .   # # . . .   . . . . .   # # # # #   . . . . .
                . . . . .   # # # # #   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   # # # # #
                # # # # #   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
                `, 100)
            // Prevent a spurious double-flip from happening
            wasShake = false
            cooks = cooks + 1
            if (cooks == 5) {
                state = "GAMEOVER"
            } else {
                state = "NEWSIDE"
            }
        } else if (state == "DROPPED") {
            // animate: dropped
            basic.showAnimation(`
                # . . . #   . . . . .   # . . . #   . . . . .
                . # . # .   . . . . .   . # . # .   . . . . .
                . . # . .   . . . . .   . . # . .   . . . . .
                . # . # .   . . . . .   . # . # .   . . . . .
                # . . . #   . . . . .   # . . . #   . . . . .
                `, 250)
            score = 0
            state = "GAMEOVER"
        } else if (state == "BURNT") {
            // animate: burnt
            basic.showAnimation(`
                . . . . .   . . . . .   . . . . .   . . . . .   . . # . .   . . . . .   . # . # .   . . . . .   . # # # .
                . . . . .   . . . . .   . . . . .   . . # . .   . . . . .   . # . # .   . . . . .   . # # # .   . . . . .
                . . . . .   . . . . .   . . . . .   . . . . .   . # . # .   . . . . .   . # # # .   . . . . .   . . . . .
                . . . . .   . # . # .   . # # # .   . # . # .   . . . . .   . # # # .   . . . . .   . . . . .   . . . . .
                # # # # #   . # # # .   . # # # .   . # # # .   . # # # .   . . . . .   . . . . .   . . . . .   . . . . .
                `, 250)
            score = 0
            state = "GAMEOVER"
        } else if (state == "GAMEOVER") {
            animateScore(score)
            state = "WAITEJECT"
        } else if (state == "WAITEJECT") {
            if (gesture == "UPSIDEDOWN") {
                return
            }
        }
    }
}

/**
 * show score (0..9) flashing
 * @param score TODO
 */
function animateScore(score: number) {
    score = Math.clamp(0, 9, score)
    for (let i = 0; i < 5; i++) {
        basic.showNumber(score, 0)
        basic.pause(500)
        basic.clearScreen()
        basic.pause(500)
    }
    basic.showNumber(score, 0)
}

/**
 * NOTE: Eventually this will move into a gesture library
 * It hides all the nasty detail of detecting gestures
 */
function getGesture(): string {
    if (!gesturesRunning) {
        input.onShake(() => {
            wasShake = true
        })
        input.onLogoUp(() => {
            wasLogoUp = true
        })
        input.onLogoDown(() => {
            wasLogoDown = true
        })
        input.onScreenUp(() => {
            wasScreenUp = true
        })
        input.onScreenDown(() => {
            wasScreenDown = true
        })
        gesturesRunning = true
    }
    // work out which of a possible set of gestures has occurred:
    // Button gestures and movement gestures both handled
    // This is so that it is easy to also use this on the simulator too
    // Generally, B is used for normal OK, A is used for abnormal RECOVERY
    // (flip is a normal action, touch sky to turn off smoke alarm is recovery)
    let a = input.buttonIsPressed(Button.A)
    let b = input.buttonIsPressed(Button.B)
    if (state == "COOKING" || state == "READY") {
        if (b || wasShake) {
            wasShake = false
            return "FLIP"
        }
    } else if (state == "FLIPPING") {
        if (a || wasLogoDown) {
            wasLogoDown = false
            return "FLOOR"
        }
    } else if (state == "BURNING") {
        if (a || wasLogoUp) {
            wasLogoUp = false
            return "SKY"
        }
    } else if (state == "GAMEOVER" || state == "WAITEJECT") {
        if (b || wasScreenDown) {
            wasScreenDown = false
            return "UPSIDEDOWN"
        }
    }
    return "NONE"
}

/**
 * start timer by sampling runningtime and storing into starttime
 */
function startTimer() {
    timer = input.runningTime()
}

/**
 * get the elapsed time from the global starttime with ref to running time
 * in seconds.
 */
function getTimerSec(): number {
    let t = (input.runningTime() - timer) / 1000
    return t
}

/**
 * Show a splash screen "Perfect Pancakes >>>"
 * Splash screen "PP" with little arrow pointing to the start button
 */
function splashScreen() {
    let splash = images.createImage(`
        # # # # .   . . . . .   # # # # .   . . . . .   . . . . .   . . . . .   . . . . .
        # . . . #   . . . . .   # . . . #   # . . . .   . # . . .   . . # . .   . . . # .
        # # # # .   . . . . .   # # # # .   . # . . .   . . # . .   . . . # .   . . . . #
        # . . . .   . . . . .   # . . . .   # . . . .   . # . . .   . . # . .   . . . # .
        # . . . .   . . . . .   # . . . .   . . . . .   . . . . .   . . . . .   . . . . .
        `)
    // use show image (not show animation) so that button press is more responsive
    let index = 0
    // Any button press finishes the splash screen
    while (!input.buttonIsPressed(Button.B) && !input.buttonIsPressed(Button.A)) {
        splash.showImage(index * 5)
        index = index + 1
        if (index > splash.width() / 5) {
            index = 0
        }
        basic.pause(250)
    }
}

function testShake() { }
