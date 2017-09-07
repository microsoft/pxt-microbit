# @extends

## #examples

## Example: Count to 4

This program will show the numbers 0, 1, 2, 3, and 4 one after another on the LED screen.

```blocks
input.onButtonPressed(Button.A, () => {
    for(let i = 0; i < 5; ++i) {
        basic.showNumber(i)
    }
})
```
