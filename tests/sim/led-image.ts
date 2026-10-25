// @serial: 5 5
// @serial: true
// @serial: false
let img = images.createImage(`
# . . . .
. . . . .
. . . . .
. . . . .
. . . . #
`)
console.log(img.width() + " " + img.height())
console.log("" + img.pixel(0, 0))
console.log("" + img.pixel(1, 0))
