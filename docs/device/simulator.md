input.onPinPressed(TouchPin.P0, function () {
    Pin0 = ["Activated"]
    Pin1 = ["Deactivated"]
    Pin2 = ["Deactivated"]
})
input.onButtonPressed(Button.A, function () {
    Mood = ["Happy"]
    basic.showLeds(`
        . # . # .
        . # . # .
        . . # . .
        # . . . #
        # # # # #
        `)
    basic.pause(50000)
    Mood = ["Sad"]
    basic.showLeds(`
        . # . # .
        . # . # .
        . . # . .
        # # # # #
        # . . . #
        `)
})
input.onPinPressed(TouchPin.P2, function () {
    Pin1 = ["Deactivated"]
    Pin0 = ["Deactivated"]
    Pin2 = ["Activated"]
})
input.onButtonPressed(Button.B, function () {
    Mood = ["Really Happy"]
    basic.showLeds(`
        . . . . .
        # # . # #
        . . # . .
        # . . . #
        # # # # #
        `)
    basic.pause(5000)
    Mood = ["Happy"]
    basic.showLeds(`
        . # . # .
        . # . # .
        . . # . .
        # . . . #
        # # # # #
        `)
    basic.pause(50000)
    Mood = ["Sad"]
    basic.showLeds(`
        . # . # .
        . # . # .
        . . # . .
        # # # # #
        # . . . #
        `)
})
input.onPinPressed(TouchPin.P1, function () {
    Pin1 = ["Activated"]
    Pin0 = ["Deactivated"]
    Pin2 = ["Deactivated"]
})
let Mood: string[] = []
let Pin2: string[] = []
let Pin1: string[] = []
let Pin0: string[] = []
let Status = ["Preparing..."]
basic.showString("LOADING ASSETS...")
servos.P2.stop()
Pin0 = ["Activated"]
Pin1 = ["Deactivated"]
Pin2 = ["Deactivated"]
Mood = ["None"]
pins.digitalWritePin(DigitalPin.P0, 1)
Status = ["Setting up..."]
basic.showString("STARTING PROGRAM...")
basic.pause(randint(1000, 5000))
pins.digitalWritePin(DigitalPin.P0, 0)
pins.digitalWritePin(DigitalPin.P1, 1)
Pin0 = ["Deactivated"]
Pin1 = ["Activated"]
Pin2 = ["Deactivated"]
Status = ["Loading..."]
basic.showString("INITIATING...")
Mood = ["Happy"]
Status = ["Running..."]
basic.showLeds(`
    . # . # .
    . # . # .
    . . # . .
    # . . . #
    # # # # #
    `)
basic.forever(function () {
    servos.P2.run(100)
})
loops.everyInterval(20000, function () {
    basic.pause(50000)
    Mood = ["Sad"]
    basic.showLeds(`
        . # . # .
        . # . # .
        . . # . .
        # # # # #
        # . . . #
        `)
})
