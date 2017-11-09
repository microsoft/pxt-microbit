# Width

The width function.

Get the width of an [Image](/reference/images/image) in columns.

```sig
images.createImage().width();
```

## Returns

* [Number](/types/number) - the number of columns in a image. This function returns 5 if the image has 1 frame, 10 for 2 frames, 15 for 3 frames and so on. Divide the number of columns by 5 to find out how many frames an image has (see example below).

The following example gets the width of `img` and stores it in the `w` variable:

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
let w = img.width()
```

## Example: show each frame

The following example uses the `width` function with a [for](/blocks/loops/for) loop to show each image frame on the screen:

```typescript
let img2 = images.createImage(`
. . # . . . # # # # . # # # .
. # # . . . . . . # . . . # .
. . # . . . . . # . . . # . .
. . # . . . . # . . . . . # .
. . # . . . # # # # . # # # .
`)
for (let i = 0; i < img2.width() / 5; i++) {
    img2.showImage(i * 5)
    basic.pause(1000)
}
```

## See also

[show image](/reference/images/show-image), [image](/reference/images/image), [create image](/reference/images/create-image), [scroll image](/reference/images/scroll-image), [show animation](/reference/basic/show-animation)

