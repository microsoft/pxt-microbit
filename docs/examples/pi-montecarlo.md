# Pi Monte Carlo

Approximate the value of **pi** using your @boardname@!

```blocks
let pir = 0
let pid = 0
let y = 0
let pin = 0
let x = 0
let r2 = 0
let r = 0
let inside = 0
let n = 0
// A simple Monte-Carlo simulation to approximate Pi.
//
// number of points
//
n = 1000000
// radius of the circle
r = 4000
// radius square
r2 = r * r
basic.forever(() => {
    inside = 0
    for (let i = 0; i < n; i++) {
        // generate a point within the square
        x = Math.random(r + 1)
        y = Math.random(r + 1)
        // test if the point is within the circle
        // sqrt(x**2 + y**2) < r ==> x**2 + y**2 < r**2
        if (x * x + y * y < r2) {
            inside += 1
        }
    }
    // surface of a square: 4 * r * r surface of a circle:
    // r * r * pi => inside / n ~= (r*r*pi) / (4*r*r) ~=
    // pi / 4 pi = inside / n * 4
    pin = inside * 4
    // only integer arithmetic here...
    pid = pin / n
    pir = pin % n
    // show results
    basic.showLeds(`
        # # # # #
        . # . # .
        . # . # .
        . # . # .
        . # . . #
        `)
    basic.showString(" " + pid + "." + pir)
})
```