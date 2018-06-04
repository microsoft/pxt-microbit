let AWasPressed: boolean
let BWasPressed: boolean
let ABWasPressed: boolean
let wasShake: boolean

startIOMonitor()
let gameNo = 0
while (true) {
    // select a new game
    if (AWasPressed) {
        gameNo = (gameNo + 1) % 4
        AWasPressed = false
    }
    // show selected game
    if (gameNo == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            . # . # .
            . . . . .
            . # # # .
            `)
    } else if (gameNo == 1) {
        basic.showLeds(`
            # # # . .
            # . . . .
            # # # # #
            # # . . .
            # # # . .
            `)
    } else if (gameNo == 2) {
        basic.showLeds(`
            . . . . .
            # . . . .
            # # # # #
            # . . . .
            . . . . .
            `)
    } else if (gameNo == 3) {
        basic.showLeds(`
            # . # # #
            # # # # #
            . . . # #
            # # # # #
            # # # # #
            `)
    }
    // start selected game
    if (BWasPressed) {
        // Play the selected game
        basic.clearScreen()
        waitBReleased()
        resetButtons()
        let finalScore = 0
        basic.clearScreen()
        if (gameNo == 0) {
            finalScore = playCybermen()
        } else if (gameNo == 1) {
            finalScore = playDalek()
        } else if (gameNo == 2) {
            finalScore = playSonicScrewdriver()
        } else if (gameNo == 3) {
            finalScore = playJudoonLanguage()
        }
        flashDigit(finalScore, 3)
        resetButtons()
        waitBPressed()
        basic.clearScreen()
        waitBReleased()
        resetButtons()
    } else {
        basic.pause(100)
    }
}

/**
 * Game parameters
 * Percentage chance that cyberman will move left/right to line up with you
 */
function playCybermen(): number {
    let maxGameTime = 60
    let cybermanMoveXProbability = 20
    // How long (in 100ms ticks) cyberman must line up before moving forward
    let cybermanMoveYCount = 10
    // Game variables
    let startTime = input.runningTime()
    let gameTime = 0
    let playerX = 2
    let cybermanX = 1
    let cybermanY = 0
    let cybermanLineupCount = 0
    let redraw = true
    while (gameTime < maxGameTime) {
        if (redraw) {
            basic.clearScreen()
            led.plot(playerX, 4)
            led.plot(cybermanX, cybermanY)
            redraw = false
        }
        // Handle Player Movement
        if (AWasPressed) {
            if (playerX > 0) {
                playerX = playerX - 1
                redraw = true
            }
            AWasPressed = false
        } else if (BWasPressed) {
            if (playerX < 4) {
                playerX = playerX + 1
                redraw = true
            }
            BWasPressed = false
        }
        // Handle Cyberman line-of-sight checking
        if (cybermanX == playerX) {
            cybermanLineupCount = cybermanLineupCount + 1
            if (cybermanLineupCount >= cybermanMoveYCount) {
                if (cybermanY == 4) {
                    // Cyberman caught you, game over
                    break
                } else {
                    cybermanY = cybermanY + 1
                    redraw = true
                    cybermanLineupCount = 0
                }
            }
        } else {
            cybermanLineupCount = 0
            // Move Cyberman closer to player, slowly
            if (Math.randomInt(100) < cybermanMoveXProbability) {
                if (cybermanX > playerX) {
                    cybermanX = cybermanX - 1
                } else if (cybermanX < playerX) {
                    cybermanX = cybermanX + 1
                }
                redraw = true
            }
        }
        basic.pause(100)
        gameTime = (input.runningTime() - startTime) / 1000
    }
    return convertSurvivalTimeToScore(gameTime)
}

/**
 * Game parameters, all probabilities as a percentage
 */
function playDalek(): number {
    let maxGameTime = 60
    let userMoveSensitivity = 40
    let dalekMoveSensitivity = 20
    let dalekShootChance = 10
    let dalekHitChance = 10
    // Game variables
    let gameTime = 0
    let startTime = input.runningTime()
    let dalekY = 2
    let userY = 1
    let redraw = true
    while (gameTime < maxGameTime) {
        // Redraw screen if necessary
        if (redraw) {
            basic.clearScreen()
            led.plot(0, dalekY)
            led.plot(4, userY)
            redraw = false
        }
        // Work out if the user has moved, and move them
        let tilt = getTilt()
        if (tilt > 2) {
            // Moving up, slowly
            if (userY < 4) {
                if (Math.randomInt(100) < userMoveSensitivity) {
                    userY = userY + 1
                    redraw = true
                }
            }
        } else if (tilt < 2) {
            // Moving down (slowly)
            if (userY > 0) {
                if (Math.randomInt(100) < userMoveSensitivity) {
                    userY = userY - 1
                    redraw = true
                }
            }
        }
        // Move the Dalek to line up with user
        if (dalekY < userY) {
            if (Math.randomInt(100) < dalekMoveSensitivity) {
                dalekY = dalekY + 1
                redraw = true
            }
        } else if (dalekY > userY) {
            if (Math.randomInt(100) < dalekMoveSensitivity) {
                dalekY = dalekY - 1
                redraw = true
            }
        } else {
            // Dalek lines up
            if (Math.randomInt(100) < dalekShootChance) {
                // Shoot a raygun at the user
                for (let i = 0; i < 3; i++) {
                    led.plot(i + 1, dalekY)
                    basic.pause(100)
                }
                if (Math.randomInt(100) < dalekHitChance) {
                    // User has been hit, game over
                    break
                }
                redraw = true
            }
        }
        gameTime = (input.runningTime() - startTime) / 1000
        basic.pause(100)
    }
    return convertSurvivalTimeToScore(gameTime)
}

/**
 * Set this in steps of 60
 */
function playSonicScrewdriver(): number {
    let maxGameTime = 120
    let gameTime = 0
    // @=0, A=1 etc
    // bit0=N, bit1=E, bit2=S, bit3=W
    // bit=0 means it is a wall (can not be opened)
    // bit=1 means it is a door (can be opened)
    let mazestr = "BLFL@GOIFIGLCJIA"
    let maze = ([] as number[])
    // Locks use same number encoding (bits 0,1,2,3)
    // bit=0 means door is locked (cannot be walked through)
    // bit=1 means door is open (can be walked through)
    let doorOpen = ([] as number[])
    for (let i = 0; i < 16; i++) {
        doorOpen.push(0)
        maze.push(mazestr.charCodeAt(i) - 64)
    }
    let redraw = true
    let cellno = 0
    let direction = "N"
    let startTime = input.runningTime()
    while (gameTime < maxGameTime) {
        // Draw the screen
        if (redraw) {
            basic.clearScreen()
            // Always draw the maze with N at the top
            drawMazeCell(doorOpen[cellno])
            // draw user standing next to selected wall
            if (direction == "N") {
                led.plot(2, 1)
            } else if (direction == "E") {
                led.plot(3, 2)
            } else if (direction == "S") {
                led.plot(2, 3)
            } else if (direction == "W") {
                led.plot(1, 2)
            }
            redraw = false
        }
        // Sense any button presses
        if (AWasPressed) {
            if (direction == "N") {
                direction = "E"
            } else if (direction == "E") {
                direction = "S"
            } else if (direction == "S") {
                direction = "W"
            } else if (direction == "W") {
                direction = "N"
            }
            redraw = true
            AWasPressed = false
        } else if (BWasPressed) {
            // Try to walk through an open door
            if (isDoorOpen(doorOpen[cellno], direction)) {
                cellno = mazeForward(cellno, 4, 4, direction)
                redraw = true
            }
            BWasPressed = false
        } else if (wasShake) {
            // energise sonic screwdriver
            if (isDoorOpen(maze[cellno], direction)) {
                // It is a door, but is the door open or closed?
                if (!(isDoorOpen(doorOpen[cellno], direction))) {
                    // Open the door in front of us
                    doorOpen[cellno] = openDoor(doorOpen[cellno], direction)
                    // Also open the return door for when we walk through this door
                    let forwardCellno = mazeForward(cellno, 4, 4, direction)
                    doorOpen[forwardCellno] = openDoor(doorOpen[forwardCellno], opposite(direction))
                }
            } else {
                // Not a door
                basic.showLeds(`
                    . . . . .
                    . # . # .
                    . . # . .
                    . # . # .
                    . . . . .
                    `)
                basic.pause(500)
            }
            redraw = true
            wasShake = false
        }
        if (cellno == 15) {
            // Have reached the exit cell
            break
        }
        basic.pause(100)
        gameTime = (input.runningTime() - startTime) / 1000
    }
    return convertPenaltyTimeToScore(gameTime / maxGameTime / 60)
}

function playJudoonLanguage(): number {
    let maxGameTime = 60
    let gameTime = 0
    let startTime = input.runningTime()
    let font = images.createImage(`
        # . # # #   # . # . #   . . . . #   # # . . .   # # # # #   # . # . #   # # # . .   . . . # #   # . . . #   # # # # #
        # # # # #   # # # # #   . . . # #   . # # # #   . # . . .   # # # # #   # # # # #   # # # # .   # # # # #   . . # . .
        . . . . #   # # # . .   . . # # #   . . . . #   . # . . .   . . . . #   . . . # #   . . # # #   . . # . .   # # # # #
        # # # # #   # # # # #   . . # . .   # # # # #   # # # # #   # # # # #   # # # # .   # # # # #   # # # # #   # # # . .
        # # # # #   # # # # #   # # # # #   # . . . .   # . . . #   # . . . .   . . . # #   # # # . .   # # # # #   # # # # #
        `)
    let answers = images.createImage(`
        # # # # #   # # # . .   . # # # .   . . # . .   # . # . #
        # . . . #   # . . . .   # # # # #   . . . . .   . . . . .
        . # . # .   # # # # .   # . # . #   . # . # .   # . # . #
        . . . . .   # # # . .   # . # . #   . . . . .   . . . . .
        . # # # .   # # # . .   # . # . #   # # # # #   # . . . #
        `)
    let pages = "029 041 167 208 283"
    let actualAnswer = Math.randomInt(5)
    let pos = 0
    let redraw = true
    while (gameTime < maxGameTime) {
        // Draw the current frame from pos (0,1,2 codeword, 3,4,5,6,7 answers)
        if (redraw) {
            if (pos <= 2) {
                // Draw codeword symbol for this choice and this position
                let digit = parseInt(pages[actualAnswer * 4 + pos])
                font.plotFrame(digit)
            } else {
                // Draw answer
                let item = pos - 3
                answers.plotFrame(item)
            }
            redraw = false
        }
        // Process button presses
        if (AWasPressed) {
            // Move left, unless at far left already
            AWasPressed = false
            if (pos > 0) {
                pos = pos - 1
                redraw = true
            }
        } else if (BWasPressed) {
            // Move right, unless already at far right
            BWasPressed = false
            if (pos < 7) {
                pos = pos + 1
                redraw = true
            }
        } else if (wasShake) {
            // User trying to select an answer, are we at an answer position?
            wasShake = false
            if (pos >= 3) {
                // Is it the right answer?
                let userChoice = pos - 3
                if (userChoice == actualAnswer) {
                    // CORRECT
                    basic.showAnimation(`
                        . . . . .   . . . . .   . . . . .   . . . . .   . . . . .
                        . . . . .   . . . . .   . . . . .   . . . . .   . . . . #
                        . . . . .   . . . . .   . . . . .   . . . # .   . . . # .
                        # . . . .   # . . . .   # . # . .   # . # . .   # . # . .
                        . . . . .   . # . . .   . # . . .   . # . . .   . # . . .
                        `, 400)
                    basic.pause(1000)
                    break
                } else {
                    // WRONG
                    basic.showAnimation(`
                        . . . . .   . . . . .   . . . . .   . . . . .   . . . . #   # . . . #   # . . . #   # . . . #   # . . . #
                        . . . . .   . . . . .   . . . . .   . . . # .   . . . # .   . . . # .   . # . # .   . # . # .   . # . # .
                        . . . . .   . . . . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .   . . # . .
                        . . . . .   . # . . .   . # . . .   . # . . .   . # . . .   . # . . .   . # . . .   . # . # .   . # . # .
                        # . . . .   # . . . .   # . . . .   # . . . .   # . . . .   # . . . .   # . . . .   # . . . .   # . . . #
                        `, 400)
                    basic.pause(1000)
                    redraw = true
                }
            }
        }
        gameTime = (input.runningTime() - startTime) / 1000
        basic.pause(100)
    }
    return convertPenaltyTimeToScore(gameTime)
}

function getDirection(): string {
    let bearing = input.compassHeading()
    if (bearing < 45 || bearing > 315) {
        return "N"
    } else if (bearing < 135) {
        return "E"
    } else if (bearing < 225) {
        return "S"
    } else {
        return "W"
    }
}

function calibrateCompass() {
    if (input.compassHeading() == -4) {
        input.calibrate()
    }
}

function waitBReleased() {
    while (input.buttonIsPressed(Button.B)) {
        basic.pause(100)
    }
}

function waitBPressed() {
    while (!input.buttonIsPressed(Button.B)) {
        basic.pause(100)
    }
}

/**
 * Show the score 0..9
 * @param digit TODO
 * @param times TODO
 */
function flashDigit(digit: number, times: number) {
    digit = Math.clamp(0, 9, digit)
    for (let i = 0; i < times; i++) {
        basic.showNumber(digit, 0)
        basic.pause(500)
        basic.clearScreen()
        basic.pause(500)
    }
    basic.showNumber(digit, 0)
}

/**
 * score is calculated as the amount of time you lasted
 * @param gameTime TODO
 */
function convertSurvivalTimeToScore(gameTime: number): number {
    if (gameTime <= 4) {
        return 0
    } else if (gameTime <= 9) {
        return 1
    } else if (gameTime <= 14) {
        return 2
    } else if (gameTime <= 19) {
        return 3
    } else if (gameTime <= 24) {
        return 4
    } else if (gameTime <= 29) {
        return 5
    } else if (gameTime <= 39) {
        return 6
    } else if (gameTime <= 49) {
        return 7
    } else if (gameTime <= 59) {
        return 8
    } else {
        return 9
    }
}

function convertPenaltyTimeToScore(penaltyTime: number): number {
    if (penaltyTime <= 4) {
        return 9
    } else if (penaltyTime <= 9) {
        return 8
    } else if (penaltyTime <= 14) {
        return 7
    } else if (penaltyTime <= 19) {
        return 6
    } else if (penaltyTime <= 24) {
        return 5
    } else if (penaltyTime <= 29) {
        return 4
    } else if (penaltyTime <= 39) {
        return 3
    } else if (penaltyTime <= 49) {
        return 2
    } else if (penaltyTime <= 59) {
        return 1
    } else {
        return 0
    }
}

function startIOMonitor() {
    input.onButtonPressed(Button.A, () => {
        AWasPressed = true
    })
    input.onButtonPressed(Button.B, () => {
        BWasPressed = true
    })
    input.onButtonPressed(Button.AB, () => {
        ABWasPressed = true
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
 * maze is always drawn with north at top
 * @param cell TODO
 */
function drawMazeCell(cell: number) {
    let n = !(isNorth(cell))
    let e = !(isEast(cell))
    let s = !(isSouth(cell))
    let w = !(isWest(cell))
    // Draw any visible walls
    if (n) {
        for (let i = 0; i < 5; i++) {
            led.plot(i, 0)
        }
    }
    if (e) {
        for (let l = 0; l < 5; l++) {
            led.plot(4, l)
        }
    }
    if (s) {
        for (let k = 0; k < 5; k++) {
            led.plot(k, 4)
        }
    }
    if (w) {
        for (let j = 0; j < 5; j++) {
            led.plot(0, j)
        }
    }
}

/**
 * work out the cell number in front of this cell
 * given the direction N E S W (N points to button B)
 * returns the forward cell number, -1 if outside of maze
 * Turn cellno into an x and y based on width and height
 * @param cellno TODO
 * @param width TODO
 * @param height TODO
 * @param direction TODO
 */
function mazeForward(cellno: number, width: number, height: number, direction: string): number {
    let y = cellno / width
    let x = cellno % width
    // Work out change in x/y and therefore change in cellno
    // But bounds-check against width and height
    // as user cannot walk outside of the maze
    if (direction == "N") {
        // sub 1 from y
        if (y > 0) {
            return cellno - width
        }
    } else if (direction == "E") {
        // Add 1 to x
        if (x < width - 1) {
            return cellno + 1
        }
    } else if (direction == "S") {
        // add 1 to y
        if (y < height - 1) {
            return cellno + width
        }
    } else if (direction == "W") {
        // sub 1 from x
        if (x > 0) {
            return cellno - 1
        }
    }
    // Not allowed to move in this direction, it will go outside of maze
    return - 1
}

/**
 * A door is open if the lock bit is 1
 * A door is present if the maze bit is 1
 * @param cell TODO
 * @param direction TODO
 */
function isDoorOpen(cell: number, direction: string): boolean {
    if (direction == "N") {
        return isNorth(cell)
    } else if (direction == "E") {
        return isEast(cell)
    }
    if (direction == "S") {
        return isSouth(cell)
    } else if (direction == "W") {
        return isWest(cell)
    }
    return false
}

function getTilt(): number {
    let tilt: number
    tilt = input.acceleration(Dimension.Y)
    tilt = Math.clamp(-1024, 1023, tilt)
    tilt = (tilt + 1024) / 512
    return tilt
}

function waitAReleased() {
    while (input.buttonIsPressed(Button.A)) {
        basic.pause(100)
    }
}

function waitNoButtons() {
    while (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B) || input.buttonIsPressed(Button.AB)) {
        basic.pause(100)
    }
}

function resetButtons() {
    AWasPressed = false
    BWasPressed = false
    ABWasPressed = false
}

/**
 * The appropriate bit (0,1,2,3) is set, which unlocks the door
 * @param cell TODO
 * @param direction TODO
 */
function openDoor(cell: number, direction: string): number {
    if (direction == "N") {
        return cell | 1
    } else if (direction == "E") {
        return cell | 2
    } else if (direction == "S") {
        return cell | 4
    } else if (direction == "W") {
        return cell | 8
    }
    return cell
}

/**
 * is the north bit set in the cell?
 * @param cell TODO
 */
function isNorth(cell: number): boolean {
    if ((cell & 1) != 0) {
        return true
    }
    return false
}

/**
 * is the east bit set in the cell?
 * @param cell TODO
 */
function isEast(cell: number): boolean {
    if ((cell & 2) != 0) {
        return true
    }
    return false
}

/**
 * is the south bit set in the cell?
 * @param cell TODO
 */
function isSouth(cell: number): boolean {
    if ((cell & 4) != 0) {
        return true
    }
    return false
}

/**
 * is the west bit set in the cell?
 * @param cell TODO
 */
function isWest(cell: number): boolean {
    if ((cell & 8) != 0) {
        return true
    }
    return false
}

function opposite(direction: string): string {
    if (direction == "N") {
        return "S"
    } else if (direction == "E") {
        return "W"
    } else if (direction == "S") {
        return "N"
    } else if (direction == "W") {
        return "E"
    }
    return direction
}

function isSount() { }
