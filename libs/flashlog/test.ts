input.onButtonPressed(Button.AB, function() {
    flashlog.clear()
})
flashlog.setTimeStamp(FlashLogTimeStampFormat.Milliseconds)
basic.forever(function () {
    led.toggle(0, 0)
    const ax = input.acceleration(Dimension.X)
	flashlog.beginRow()
    flashlog.logData(`a.x`, ax)
    flashlog.logData(`a.y`, input.acceleration(Dimension.Y))
    flashlog.endRow()
})
