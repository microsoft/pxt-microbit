// @serial: plotted true
// @serial: cleared false
led.plot(2, 3)
console.log("plotted " + led.point(2, 3))
led.unplot(2, 3)
console.log("cleared " + led.point(2, 3))
