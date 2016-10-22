let sugarThreshold: number
let ketoneThreshold: number

// Important parameters
sugarThreshold = 14
ketoneThreshold = 6
while (true) {
    // splash screen sugar cube (just the right sugar)
    basic.showAnimation(`
        # # # . .   . . . . .   . . . . .   . . . . .
        # # # . .   . # # # .   . . . . .   . . . . .
        # # # . .   . # # # .   . . # # #   . . # # #
        . . . . .   . # # # .   . . # # #   . . # # #
        . . . . .   . . . . .   . . # # #   . . # # #
        `, 400)
    // ask questions and give advice
    quiz()
    // wait for button press before restart
    waitAnyButton()
}

function getSugar(): string {
    waitNoButtons()
    let selection = "MID"
    while (!input.buttonIsPressed(Button.B)) {
        // high, low, normal?
        basic.showAnimation(`
            . . . . .   # . # . .   . . # . .
            . # # # .   # . # . .   . # . # .
            . # # # .   # . # # #   . . . # .
            . # # # .   # . . # .   . . # . .
            . . . . .   # . . # .   . . # . .
            `, 400)
        // show low, mid, or high as a bar
        selection = getLowMidHigh(selection)
    }
    return selection
}

function getKetone(): string {
    waitNoButtons()
    let selection = "MID"
    while (!input.buttonIsPressed(Button.B)) {
        // high, low, normal?
        basic.showAnimation(`
            . . . . .   . . . # .   . . # . .
            # # . . .   . . # . .   . # . # .
            # # # # #   . . # # .   . . . # .
            # # . . #   . . # . #   . . # . .
            . . . . .   # . . # .   . . # . .
            `, 400)
        // show low, mid, or high as a bar
        selection = getLowMidHigh(selection)
    }
    return selection
}

function getIll(): boolean {
    waitNoButtons()
    let selection = false
    while (!input.buttonIsPressed(Button.B)) {
        // ask question 'happy or sad'
        basic.showAnimation(`
            . . . . .   . . . . .   . . # . .   . . # . .
            . # . # .   . # . # .   . # . # .   . # . # .
            . . . . .   . . . . .   . . . # .   . . . # .
            # . . . #   . # # # .   . . # . .   . . # . .
            . # # # .   # . . . #   . . # . .   . . # . .
            `, 400)
        // get answer from user
        selection = getHappySad(selection)
    }
    // if we are happy, we are not ill
    return !selection
}

function getLowMidHigh(selection: string): string {
    let timeout = 2000
    let timer = input.runningTime()
    while (true) {
        // show the present level as a line
        if (selection == "LOW") {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                # # # # #
                `)
        } else if (selection == "HIGH") {
            basic.showLeds(`
                # # # # #
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        } else {
            basic.showLeds(`
                . . . . .
                . . . . .
                # # # # #
                . . . . .
                . . . . .
                `)
        }
        // process any user input
        if (input.buttonIsPressed(Button.A)) {
            // cycle round the 3 possible levels
            if (selection == "LOW") {
                selection = "MID"
            } else if (selection == "MID") {
                selection = "HIGH"
            } else {
                selection = "LOW"
            }
            // This is the 'hold repeat' time if you hold the A button
            basic.pause(300)
            // restart timer, 2 seconds of inactivity before return to main
            timer = input.runningTime()
        } else if (input.buttonIsPressed(Button.B)) {
            // user is selecting so better return quickly
            return selection
        } else if (input.runningTime() > timer + timeout) {
            // timeout, so return to main to re-prompt user
            return selection
        } else {
            // This slows the loop down to stop the emulator being busy
            // and also preserves battery life on the micro:bit
            // it also affects the worst case response time
            // it also affects the response time
            basic.pause(100)
        }
    }
}

/**
 * Wait for all buttons to be released
 * This prevents spurious selection in next question
 */
function waitNoButtons() {
    while (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
        basic.pause(100)
    }
}

function getHappySad(selection: boolean): boolean {
    let timeout = 2000
    let timer = input.runningTime()
    while (!input.buttonIsPressed(Button.B)) {
        // Show present selection
        if (selection) {
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                # . . . #
                . # # # .
                `)
        } else {
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                . # # # .
                # . . . #
                `)
        }
        // Wait for any change in the selection
        if (input.buttonIsPressed(Button.A)) {
            selection = !selection
            // This is the repeat time if button A held down
            basic.pause(500)
            timer = input.runningTime()
        } else if (input.runningTime() > timer + timeout) {
            return selection
        } else {
            // Preserve battery life on micro:bit and prevent emulator being busy
            // This is also the response time to a button press
            basic.pause(100)
        }
    }
    return selection
}

/**
 * Button A changes value, Button B selects value
 */
function quiz() {
    let sugar = getSugar()
    if (sugar != "HIGH") {
        // All is ok (tick)
        basic.showAnimation(`
            . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
            . . . . .   . . . . .   . . . . .   . . . . .   . . . . #
            . . . . .   . . . . .   . . . . .   . . . # .   . . . # .
            # . . . .   # . . . .   # . # . .   # . # . .   # . # . .
            . . . . .   . # . . .   . # . . .   . # . . .   . # . . .
            `, 400)
    } else {
        // Button A changes value, Button B selects value
        let ketone = getKetone()
        if (ketone != "HIGH") {
            // Button A changes value, Button B selects value
            let ill = getIll()
            if (!ill) {
                // Time to rest (jump into bed)
                basic.showAnimation(`
                    . . . . .   # # . . .   . # . . .   . # . . .   . . . # .   . . . . .
                    . . . . #   . . . . #   # # . . #   . # . . #   . . # . #   . . . . #
                    . . . . #   . . . . #   . . . . #   # # . . #   # # . . #   # # # # #
                    # # # # #   # # # # #   # # # # #   # # # # #   # # # # #   # # # # #
                    # . . . #   # . . . #   # . . . #   # . . . #   # . . . #   # . . . #
                    `, 400)
            } else {
                // Test more often (clock shows 2 hour interval)
                basic.showAnimation(`
                    . . # . .   . . . . .   . . . . .   . . . . .   . # # . .   . . . . .   . # # . .   . . . . .   . # # . .
                    . . # . .   . . . . .   . . . . .   . . . . .   . . . # .   . . . . .   . . . # .   . . . . .   . . . # .
                    . . # . .   . . # # #   . . # . .   # # # . .   . . # . .   . . . . .   . . # . .   . . . . .   . . # . .
                    . . . . .   . . . . .   . . # . .   . . . . .   . # . . .   . . . . .   . # . . .   . . . . .   . # . . .
                    . . . . .   . . . . .   . . # . .   . . . . .   . # # # .   . . . . .   . # # # .   . . . . .   . # # # .
                    `, 400)
            }
        } else {
            // Get some help (call the diabetes care team on the phone)
            basic.showAnimation(`
                . . . . .   . . . . .   # # # # #   # # . . .   # # . . .   # # . . .   # # . . .   # # # . .   # # . # .   # # . . #
                . . . . .   # # # # #   # . . . #   # . . . .   # . . . .   # . . . .   # . . . .   # . . . .   # . . . .   # . . . .
                # # # # #   # . . . #   . . . . .   # . . . .   # . . . .   # . . . .   # . . . .   # . . . .   # . . . .   # . . . .
                # . # . #   . . # . .   . . # . .   # . . . .   # . . . .   # . . . .   # . . . .   # . . . .   # . . . .   # . . . .
                . # # # .   . # # # .   . # # # .   # # . . .   # # . . #   # # . # .   # # # . .   # # . . .   # # . . .   # # . . .
                `, 400)
        }
    }
}

function waitAnyButton() {
    while (!input.buttonIsPressed(Button.A) && !input.buttonIsPressed(Button.B)) {
        basic.pause(100)
    }
}
