# icon Image

Create an icon [image](/reference/images/image) for the [LED screen](/device/screen).

```sig
images.iconImage(IconNames.Heart);
```

There are lots of pre-made icon images you can use to display on the [LED screen](/device/screen) of the @boardname@. You choose an icon by its name.

## Parameters

* **i**: the icon name of the image you want to show on the [LED screen](/device/screen). You pick an icon image such as: `IconNames.Heart`.

## Example

Show a happy face when button A is pressed or a sad face when button B is pressed.

```blocks
let iamHappy = images.iconImage(IconNames.Happy)
let iamSad = images.iconImage(IconNames.Sad)

input.onButtonPressed(Button.A, () => {
    iamHappy.showImage(0);
});
input.onButtonPressed(Button.B, () => {
    iamSad.showImage(0);
});
```

## See also

[arrow image](/reference/images/arrow-image)