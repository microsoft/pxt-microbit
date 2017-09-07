# Pixel

The pixel function.

Get the state of a pixel in an [Image](/reference/images/image).

## JavaScript

```sig
export function pixel(_this: micro_bit.Image, x: number, y: number) : boolean
```

## Parameters

* x - [Number](/types/number); the *x coordinate* or horizontal position of a pixel in an [image](/reference/images/image)
* y - [Number](/types/number); the *y coordinate* or vertical position of a pixel in an [image](/reference/images/image)

## x, y coordinates?

To figure out the ``x``, ``y`` coordinates, see [LED screen](/device/screen).

## Returns

* [Boolean](/blocks/logic/boolean) - `true` for on and `false` for off

## Example

This example gets the state of pixel `0, 0` in the `img` variable:

## ~hide

```blocks
let img = images.createImage(`
. . # . . . . . . .
. # . # . . . # . .
. . # . . . . . . .
. # . # . . . # . .
. . # . . . . . . .
`)
```

## ~

```typescript-ignore
let state = img.pixel(0, 0)
```

## See also

[set pixel](/reference/images/set-pixel), [show image](/reference/images/show-image), [image](/reference/images/image), [create image](/reference/images/create-image), [scroll image](/reference/images/scroll-image)

