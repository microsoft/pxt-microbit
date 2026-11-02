// @serial: 255
// @serial: 40
// @serial: 40
// @serial: 0
led.plotBrightness(1, 1, 255)
console.log("" + led.pointBrightness(1, 1))
led.setBrightness(40)
console.log("" + led.brightness())
led.plotBrightness(0, 0, 40)
console.log("" + led.pointBrightness(0, 0))
led.stopAnimation()
console.log("" + led.pointBrightness(1, 1))
