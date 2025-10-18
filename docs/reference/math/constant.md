# Constant

A common mathematical constant value.

```sig
Math._constant(Math.PI)
```

There are several constant values that are important in calculations for science and engineering. The ``||math.constant||`` block provides several that you can use in your mathematical formulas and expressions.

## π

The value of Pi (π) which is the ratio of a circle's circumference to its diameter.

```block
Math._constant(Math.PI)
```

### Example

Get the area of a circle with a radius of `4`.

```block
let circle_area = Math.PI * 4**2
```

## e

Euler's number (e) which is the base of the natural logrithm and the exponential function.

```block
Math._constant(Math.E)
```

### Example

Find the half-life, in years, of radioactive decay for Carbon-14.

```block
let time = 0
let decay = 0.000121
let carbon14 = 1
while (carbon14 > 0.5) {
    carbon14 = Math.E ** (-1 * decay * time)
    time += 1
}
```

## ln(2)

Natural log of 2.

```block
Math._constant(Math.LN2)
```

### Example

Find out how many years will it take to double an investment using continuous compounding at 5% interest.

```block
let years = Math.LN2 / 0.05
```

## ln(10)

Natural log of 10.

```block
Math._constant(Math.LN10)
```

### Example

How many days will it take for bacteria in a culture to reach 10 times the start amount if they double in number each day.

```block
let days = Math.LN10
```

## log₂(e)

Convert from a natural logrithm to a base-2 logrithm.

```block
Math._constant(Math.LOG2E)
```

The log₂(e) constant is equal to ln(e) / ln(2) which is also 1 / ln(2).

## log₁₀(e)

Convert from a natural logrithm to a base-10 logrithm.

```block
Math._constant(Math.LOG10E)
```

The log₁₀(e) constant is equal to 1 / ln(10) which is also 1 / ln(10).

## √½

The square root of one half (1/2).

```block
Math._constant(Math.SQRT1_2)
```

### Example

Find the length of the sides of a square with a diagonal length of 9.

```block
let side = 9 * Math.SQRT1_2
```

## √2

The square root of 2.

```block
Math._constant(Math.SQRT2)
```

### Example

Find out how much shorter it is by walking across a square parking lot on a street corner than using the sidewalk on the sides. Each side of the parking lot is 50 meters.

```block
let walk_diff = 2 * 50 - 50 * Math.SQRT2
```
