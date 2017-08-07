# @extends

## #examples

## Example: adjusting screen brightness

If the [light level](/reference/input/light-level) is `< 100`, this code sets the brightness to `255` when the button A is pressed:

```blocks
input.onButtonPressed(Button.A, () => {
    if(input.lightLevel()<100){
        led.setBrightness(255);
    }
})
```
