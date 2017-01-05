# @boardname@

The @boardname@ device api. #microbit

Initialize the library.

{shim:}
MACRO: shim

```
if (board == null) {
    compassHeadingValue = (<number>null)
    startTime = new Date()
    board = media.createPortraitBoard(612, 498 + 100)
    wall.setBackground(colors.transparent())
    let picture = microbitSchema.clone()
    let padding = 27
    let left = 205
    let top = 156
    picture.fillRect(left - padding, top, 205 + padding + 4, 200 + padding + 4, 0, colors.black())
    picture.fillRect(274, 74, 63, 16, 0, colors.black())
    bkg = board.createPicture(picture)
    bkg.width() = board.width()
    bkg.left() = 0
    bkg.top() = 0
    createButtons()
    finger = board.createEllipse(20, 20)
    finger.setOpacity(0)
    ledOnColor = "#ff4f4f".toColor()
    ledOffColor = colors.transparent()
    boardColor = colors.fromRgb(0.85, 0.95, 0.85)
    backLeds = board.createSpriteSet()
    leds = board.createSpriteSet()
    let backLedColor = "#202020".toColor()
    let ledOpacity = 127 / 255
    let ledW = 10
    let ledOffset = 48
    let ledH = 20
    for (let i = 0; i < 5; i++) {
        let ledTop = i * ledOffset + top
        for (let j = 0; j < 5; j++) {
            let ledLeft = j * ledOffset + left
            let backLed = board.createRectangle(ledW, ledH)
            backLed.setColor(backLedColor)
            let led = board.createRectangle(ledW + 8, ledH + 8)
            backLed.left() = ledLeft
            backLed.top() = ledTop
            led.x() = backLed.x()
            led.y() = backLed.y()
            led.setOpacity(ledOpacity)
            led.setColor(ledOffColor)
            led.setShadow(10, colors.red(), 0, 0)
            ledIndexAnim(backLed, j, i)
            backLeds.add(backLed)
            leds.add(led)
        }
    }
    initEyes()
    initAxis()
    initPins()
    updateAxis()
    backgroundAnimation()
    board.onEveryFrame(() => {
        updateBoard()
    })
    board.postToWall()
}
```

