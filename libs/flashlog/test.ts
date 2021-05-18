input.onButtonPressed(Button.AB, function() {
    flashlog.clear()
})
flashlog.setTimeStamp(FlashLogTimeStampFormat.Milliseconds)
basic.forever(function () {
    led.toggle(0, 0)
    const ax = input.acceleration(Dimension.X)
	flashlog.beginRow()
    flashlog.logData(`a.x`, `<a href="https://bing.com">${ax}</a>`)
    flashlog.endRow()
})
