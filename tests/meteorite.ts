let oneX: number
let oneY: number
let twoX: number
let twoY: number
let pause: number
let meteoriteOneX: number
let meteoriteOneY: number
let meteoriteTwoX: number
let meteoriteTwoY: number
let counter: number

basic.pause(2000)
oneX = 0
oneY = 4
twoX = 1
twoY = 4
counter = 0
pause = 700
led.plot(oneX, oneY)
led.plot(twoX, twoY)
input.onButtonPressed(Button.A, () => {
    if (oneX > 0) {
        led.unplot(oneX, oneY)
        led.unplot(twoX, twoY)
        oneX = oneX - 1
        twoX = twoX - 1
        led.plot(oneX, oneY)
        led.plot(twoX, twoY)
    }
})
input.onButtonPressed(Button.B, () => {
    if (twoX < 4) {
        led.unplot(oneX, oneY)
        led.unplot(twoX, twoY)
        oneX = oneX + 1
        twoX = twoX + 1
        led.plot(oneX, oneY)
        led.plot(twoX, twoY)
    }
})
meteoriteOneX = Math.randomInt(5)
meteoriteOneY = 0
meteoriteTwoX = Math.randomInt(5)
meteoriteTwoY = -3
basic.pause(1000)
for (let i = 0; i < 3; i++) {
    led.plot(meteoriteTwoX, meteoriteTwoY)
    led.plot(meteoriteOneX, meteoriteOneY)
    basic.pause(pause)
    led.unplot(meteoriteTwoX, meteoriteTwoY)
    led.unplot(meteoriteOneX, meteoriteOneY)
    meteoriteOneY = meteoriteOneY + 1
    meteoriteTwoY = meteoriteTwoY + 1
}
basic.forever(() => {
    for (let i1 = 0; i1 < 3; i1++) {
        led.plot(meteoriteTwoX, meteoriteTwoY)
        led.plot(meteoriteOneX, meteoriteOneY)
        basic.pause(pause)
        led.unplot(meteoriteOneX, meteoriteOneY)
        led.unplot(meteoriteTwoX, meteoriteTwoY)
        meteoriteOneY = meteoriteOneY + 1
        meteoriteTwoY = meteoriteTwoY + 1
        if (meteoriteOneY == 4) {
            if (meteoriteOneX == oneX) {
                for (let j = 0; j < 10; j++) {
                    led.plotAll()
                    basic.pause(200)
                    basic.clearScreen()
                    basic.pause(200)
                }
                basic.showNumber(counter, 150)
                basic.pause(10000)
            } else if (meteoriteOneX == twoX) {
                for (let j1 = 0; j1 < 10; j1++) {
                    led.plotAll()
                    basic.pause(200)
                    basic.clearScreen()
                    basic.pause(200)
                }
                basic.showNumber(counter, 150)
                basic.pause(10000)
            }
        }
    }
    while (Math.abs(meteoriteTwoX - meteoriteOneX) < 1) {
        meteoriteOneX = Math.randomInt(5)
    }
    meteoriteOneY = 0
    counter = counter + 1
    if (counter == 3) {
        pause = pause - 250
    } else if (counter == 8) {
        pause = pause - 100
    } else if (counter == 12) {
        pause = pause - 100
    } else if (counter == 20) {
        pause = pause - 100
    } else if (counter == 30) {
        pause = pause - 70
    }
    if (counter == 40) {
        pause = pause - 70
    }
    for (let i2 = 0; i2 < 3; i2++) {
        led.plot(meteoriteOneX, meteoriteOneY)
        led.plot(meteoriteTwoX, meteoriteTwoY)
        basic.pause(pause)
        led.unplot(meteoriteOneX, meteoriteOneY)
        led.unplot(meteoriteTwoX, meteoriteTwoY)
        meteoriteOneY = meteoriteOneY + 1
        meteoriteTwoY = meteoriteTwoY + 1
        if (meteoriteTwoY == 4) {
            if (meteoriteTwoX == oneX) {
                for (let j2 = 0; j2 < 10; j2++) {
                    led.plotAll()
                    basic.pause(200)
                    basic.clearScreen()
                    basic.pause(200)
                }
                basic.showNumber(counter, 150)
                basic.pause(10000)
            } else if (meteoriteTwoX == twoX) {
                for (let j3 = 0; j3 < 10; j3++) {
                    led.plotAll()
                    basic.pause(200)
                    basic.clearScreen()
                    basic.pause(200)
                }
                basic.showNumber(counter, 150)
                basic.pause(10000)
            }
        }
    }

    meteoriteTwoX = Math.randomInt(5)
    while (Math.abs(meteoriteTwoX - meteoriteOneX) < 1) {
        meteoriteTwoX = Math.randomInt(5)
    }
    meteoriteTwoY = 0
    counter = counter + 1
    if (counter == 3) {
        pause = pause - 250
    } else if (counter == 8) {
        pause = pause - 100
    } else if (counter == 12) {
        pause = pause - 100
    } else if (counter == 20) {
        pause = pause - 100
    } else if (counter == 30) {
        pause = pause - 70
    } else if (counter == 40) {
        pause = pause - 70
    }
})
