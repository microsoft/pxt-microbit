# Show Number

Show a number on the [LED screen](/device/screen). It will slide left if it has more than one digit.

```sig
basic.showNumber(2)
```

## Parameters

* `value` is a [Number](/types/number).
* `interval` is an optional [Number](/types/number). It means the number of milliseconds before sliding the `value` left by one LED each time. Bigger intervals make the sliding slower.

## Examples:

To show the number 10:

```blocks
basic.showNumber(10)
```

To show the number stored in a variable:

```blocks
let x = 1
basic.showNumber(x)
```

## Example: count to 5

This example uses a [for](/blocks/loops/for) loop to show numbers ``0`` through ``5`` on the screen:

```blocks
for (let i = 0; i < 6; i++) {
    basic.showNumber(i)
    basic.pause(200)
}
```

## Other show functions

* Use [show string](/reference/basic/show-string) to show a [String](/types/string) with letters on the screen.
* Use [show animation](/reference/basic/show-animation) to show a group of pictures on the screen, one after another.

## See also

[show string](/reference/basic/show-string), [show animation](/reference/basic/show-animation), [Number](/types/number), [math](/blocks/math)

