# Show Icon

Shows the selected icon on the LED screen

```sig
basic.showIcon(IconNames.Heart)
```

## Parameters

* ``icon``, the identifier of the icon to display
* ``interval`` (optional), the time to display in milliseconds. default is 600.

## Example

This program shows a happy face and then a sad face with the ``show icon`` function, with a one second pause in between.

```blocks
basic.showIcon(IconNames.Happy)
basic.pause(1000)
basic.showIcon(IconNames.Sad)
```

## Beating Heart

You can create a beating heart by using the forever block as follows:

```basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
})
```

## Fast Beating Heart

You could slow down the previous animation by inserting a pause block:

```sig
basic.pause(1000)
```
but how would you speed it up? 
You can change the internal pause default value - called internal - to be smaller than 600 by going to javascript.

This javascript code creates a crazy fast heart beat! Did you know that hamsters had a heart rate this fast? 

```typescript-ignore
basic.forever(function () {
    basic.showIcon(IconNames.Heart, 60)
    basic.showIcon(IconNames.SmallHeart, 60)
})```

## See also

[showLeds](/reference/basic/show-leds)
