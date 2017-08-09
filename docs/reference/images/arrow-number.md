# arrow Number

Get the number that matches an arrow image name.

```sig
images.arrowNumber(ArrowNames.North)
```

Each arrow image name has a number for it. You can find the number for any arrow name with ``||Images:arrow number||``.

## Parameters

* **arrow**: the arrow name to get an arrow number for. These are the arrow names:

>* `North`
* `NorthEast`
* `East`
* `SouthEast`
* `South`
* `SouthWest`
* `West`
* `NorthWest`

## Example

Get the arrow number for `ArrowNames.South`.

```blocks
let arrowSouthNumber = images.arrowNumber(ArrowNames.South)
```
## See also

[arrow image](/reference/images/arrow-image)