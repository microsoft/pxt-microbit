# Code

Let's add code so that whenever we touch our face unnecessary so we will be alarmed.

From the [Make](/projects/face-touch-alarm/make.md) project, we know that Whenever the micro: bit detects the up gesture then it will show the sad face led light and warns the user, not to touch your face. Next, we build it more accurately as there can be some issues with shake gestures so we used comparisons. We are comparing the actual acceleration in X and Y directions that the micro: bit is experiencing and we are comparing it with a number or distance so if the acceleration is greater than that particular number it will warn the user not to touch your face. This will fine-tune how easily the micro: bit triggers by changing the values.

## Code your face-touch-alarm-warning-system

Download this code to your micro:bit. It will show a sad face on micro:bit whenever touched unnecessarily.

```blocks
basic.forever(function on_forever() {
    if (input.acceleration(Dimension.X) > 550) {
        basic.showIcon(IconNames.Sad)
    } else if (input.acceleration(Dimension.Y) > 550) {
        basic.showIcon(IconNames.Sad)
    } else {
        basic.clearScreen()
    }
})
```
