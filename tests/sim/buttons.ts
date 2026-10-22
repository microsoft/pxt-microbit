// @serial: A pressed
// @serial: shown
input.onButtonPressed(Button.A, function () {
    console.log("A pressed")
})
control.raiseEvent(DAL.DEVICE_ID_BUTTON_A, DAL.DEVICE_BUTTON_EVT_CLICK)
pause(50)
basic.showString("Hi")
console.log("shown")
