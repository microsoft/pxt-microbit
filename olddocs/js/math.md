# Math Library

Functions in the math library.

### @parent javascript/language

The math library includes math related functions that you can use with [Numbers](/reference/types/number).

* In the [TouchDevelop editor](/js/editor), click `math` to access the functions described below
* In the [Block editor](/blocks/editor), click **maths** on the left to see the available blocks

The functions available in Touch Develop are:

### abs

math `->` abs (x : [Number](/reference/types/number)) *returns* [Number](/reference/types/number)

returns the absolute value of input parameter `x`

```
basic.showNumber(math.abs(-7), 150)
```

### clamp

math `->` clamp (min : [Number](/reference/types/number), max : [Number](/reference/types/number), value : [Number](/reference/types/number)) *returns* [Number](/reference/types/number)

limits a number to a range (between a min and max number); returns `min` if `value` is < `min`; returns `max` if `value` is > `max`; otherwise, returns `value`.

```
basic.showNumber(td.clamp(5, 9, 12), 150)
```

### max

math `->` max (x : [Number](/reference/types/number), y : [Number](/reference/types/number)) *returns* [Number](/reference/types/number)

returns the larger of two input numbers (`x` and `y`)

```
basic.showNumber(Math.max(9, 7), 150)
```

### min

math `->` min (x : [Number](/reference/types/number), y : [Number](/reference/types/number)) *returns* [Number](/reference/types/number)

returns the smaller of two input numbers (`x` and `y`)

```
basic.showNumber(Math.min(9, 7), 150)
```

### mod

math `->` mod (x : [Number](/reference/types/number), y : [Number](/reference/types/number)) *returns* [Number](/reference/types/number)

returns the integer modulus/remainder resulting from the division of the number `x` by the number `y`

```
basic.showNumber(math.mod(9, 7), 150)
```

### pow

math `->` pow (base : [Number](/reference/types/number), exp : [Number](/reference/types/number)) *returns* [Number](/reference/types/number)

returns the value of the number `base` raised to the power `exp`

```
basic.showNumber(math.pow(3, 3), 150)
```

### random

math `->` random (limit : [Number](/reference/types/number)) *returns* [Number](/reference/types/number)

returns a random [Number](/reference/types/number) between 0 and the parameter *limit* - 1

```
basic.showNumber(Math.random(10), 150)
```

### sign

math `->` sign (x : [Number](/reference/types/number)) *returns* [Number](/reference/types/number)

returns the sign of input parameter `x`

```
basic.showNumber(math.sign(-7), 150)
```

### Lessons

[flipping bird](/lessons/flipping-bird), [catch the egg game](/lessons/catch-the-egg-game)

### See also

[Bits library](/js/bits), [TouchDevelop documentation](/js/contents), [Number](/reference/types/number)

