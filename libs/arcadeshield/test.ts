// tests go here; this will not be compiled when this package is used as an extension.

const present = __screenhelpers.displayPresent();
basic.showNumber(present ? 1 : 0)

// set palette before creating screen, which initializes the display
__screenhelpers.setPalette(hex`000000ffffffff2121ff93c4ff8135fff609249ca378dc52003fad87f2ff8e2ec4a4839f5c406ce5cdc491463d000000`)

const screen = bitmaps.create(
    __screenhelpers.displayWidth(),
    __screenhelpers.displayHeight()
)

input.onButtonPressed(Button.A, () => {
    screen.fill(2)
    screen.drawLine(0,0,100,100,0)
    __screenhelpers.updateScreen(screen)
})

input.onButtonPressed(Button.B, () => {
    screen.fill(4)
    screen.drawLine(100,0,0,100,0)
    __screenhelpers.updateScreen(screen)
})

input.onButtonPressed(Button.AB, () => {
    screen.fill(0)
    __screenhelpers.updateScreen(screen)
})
