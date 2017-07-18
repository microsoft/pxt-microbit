# arrow Image

Create an arrow shaped [image](/reference/images/image) for the [LED screen](/device/screen).

```sig
images.arrowImage(ArrowNames.North)
```

The arrow points in the direction of the arrow name you choose, like `North`.

## Parameters

* **i**: the arrow name to make an arrow [image](/reference/images/image) for. You can make an arrow image that points in one of these directions:

>* `North`
* `NorthEast`
* `East`
* `SouthEast`
* `South`
* `SouthWest`
* `West`
* `NorthWest`

## Example

Display a left arrow when button A is pressed or a right arrow when button B is pressed.

```blocks
let arrowLeft = images.arrowImage(ArrowNames.West)
let arrowRight = images.arrowImage(ArrowNames.East)

input.onButtonPressed(Button.A, () => {
    arrowLeft.showImage(0);
});
input.onButtonPressed(Button.B, () => {
    arrowRight.showImage(0);
});
```
## See also

[arrow number](/reference/images/arrow-number)