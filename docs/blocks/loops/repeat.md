# @extends

## #examples

## Example: Blinking heart

Flash the ``heart`` icon on the screen `4` times.

```blocks
for (let i = 0; i < 4; i++) {
    basic.showIcon(IconNames.Heart)
    basic.pause(300)
    basic.clearScreen()
    basic.pause(300)
}
```
