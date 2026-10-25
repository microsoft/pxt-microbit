// @serial: A pressed
// @serial: shown
input.onButtonPressed(Button.A, function () {
    console.log("A pressed")
})
control.raiseEvent(DAL.MICROBIT_ID_BUTTON_A, DAL.MICROBIT_BUTTON_EVT_CLICK)
pause(50)
basic.showString("Hi")
console.log("shown")
