# Number

An integer number.

### @parent javascript/language

A *Number* is an integer such as `42` or `-42`. More precisely, a *Number* is a signed 32-bit integer (two's complement).

### Declare a number variable

Use the [var statement](/reference/variables/var) and the [assignment operator](/reference/variables/assign) `:=` to declare a *local* number variable. Like this:

```
let number1 = 2
let number2 = 2
```

To declare a *global* number variable, see [global variables](/js/data).

### Arithmetic operators

The following arithmetic operators work on numbers and return a [Number](/reference/types/number):

*  addition: `1 + 3`
* subtraction: `1 - 3 `
* multiplication: `3 * 2`
* integer division: `7 / 3`
* modulo is available through the [math library](/js/math)

### Relational operators

The following relational operators work on numbers and return a [Boolean](/reference/types/boolean):

* equality: `(3 + 1) = 4`
* inequality: `3 != 4`
* less or equal than: `3 <= 4`
* less than: `3 < 4`
* greater or equal than : `4 >= 3`
* greater than: `4 > 3`

### Show number

The [show number](/reference/basic/show-number) function displays a number on the [LED screen](/device/screen). For example, this code displays the number 42:

```
basic.showNumber(42, 100)
```

### Functions that return a number

Some functions return a number, which you can store in a variable. For example the following code gets the display brightness (using the [brightness function](/reference/led/brightness)) and stores the value in a variable named `brightness`:

```
let brightness = led.brightness()
```

### Math functions

The [math library](/js/math) includes math related functions. In the [Touch Develop editor](/js/editor), click `math` on the Code Keyboard to see the math functions. For example, the `mod` function returns the modulus (division of one number by another number):

```
number1 = math.mod(4, 3)
```

### Convert a number to a string

The `to string` function converts a Number into a [String](/reference/types/string). The following code converts `number1` to a string and stores the string in the `str` variable:

```
let str = number1.toString()
```

### Bit-level manipulation

The [bits library](/js/bits) includes functions for bit-level manipulation of integers. In the [Touch Develop editor](/js/editor), click `bits` on the Code Keyboard to see these functions.

### Lessons

[counter](/lessons/counter), [love meter](/lessons/love-meter), [flipping bird](/lessons/flipping-bird), [catch the egg game](/lessons/catch-the-egg-game)

### See also

[math library](/js/math), [var](/reference/variables/var), [bits library](/js/bits), [Boolean](/reference/types/boolean), [show number](/reference/basic/show-number)

