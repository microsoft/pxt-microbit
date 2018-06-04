# Pi Monte Carlo

Approximate the value of **pi** using your @boardname@!

## Thinking about it...

Ok, let's pretend that a circle fits inside a square where the edge of the circle touches the sides of the square. If we say that the radius, called ``r``, of circle is `1` then the length of each side of the square is `2`, or ``2 * r``. The area of the circle is ``pi * (r ** 2)`` and the area of the square then is ``(r * 2) ** 2``. We don't know what ``pi`` is so we can arrange a relationship between the area of the circle and the area of the square to solve for the value of ``pi``.

### Circle and square

An interesting relationship between the circle and the square is that the area of the circle divided by the area of the square is:

``area ratio = (pi * (r ** 2)) / ((r * 2) ** 2) = pi / 4``

Well, we can see that if we knew the area of both the circle and the square we could find out what the value of ``pi`` is! It's simply this:

```
pi = (area of circle) / (area of square) * 4
```

so then...

```
area ratio = (area of circle) / (area of square)
pi = (area ratio) * 4
```

One problem though. We know the area of the square, sure enough it's `4`, but what's the area of the circle?

That's the dilemma! We need to know the area of the circle to find out what ``pi`` is and we need the value of ``pi`` the find the area of the circle!

### Dots, lots of dots

What if we had a lot of really small dots that we could fill into the circle and into the parts of the square that the circle didn't cover. We'll try to cover the area of both shapes with as many dots as possible.

If we count the number of dots placed in both the circle and the square, we could find the ``area ratio`` between the two shapes. And, in the equation shown above, we can discover ``pi`` if we have this ratio. The ``area ratio`` is:

``area ratio = (dots in circle) / ((dots in circle) + (dots only in square))``

Of course, we can't completely fill the area of both shapes with dots but we could get enough of them in there to give a useful ratio between the circle and the square.

### Making and counting dots

To make the "dots" we can randomly make a value and see if it would fit as a coordinate within the shape we're trying to fill. If it fits, increase the count of dots and try to make more for some amount of time. The more dots created, the better the accuracy of our value for ``area ratio``.

### Monte Carlo method

This method of filling coordinate points, counting them, and using the difference or ratio of the counts is called the _Monte Carlo_ method or approximation.

## Monte Carlo approximation of _pi_

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
n = 1000000
//
// radius of the circle
r = 4000
//
// radius square
r2 = r * r
//
basic.forever(() => {
    inside = 0
    for (let i = 0; i < n; i++) {
        // generate a point within the square
        x = Math.randomRange(0, r + 1)
        y = Math.randomRange(0, r + 1)
        // test if the point is within the circle
        // sqrt(x**2 + y**2) < r ==> x**2 + y**2 < r**2
        if (x * x + y * y < r2) {
            inside += 1
        }
    }
    // surface of a square: 4 * r * r surface of a circle:
    // r * r * pi => inside / n ~= (r*r*pi) / (4*r*r) ~=
    // pi / 4 pi = inside / n * 4
    //
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