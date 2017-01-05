# For

### @parent blocks/language
 
Run part of the program the number of times you say.

```block
for(let i = 0; i <= 4; ++i) {
}
```

### Example: Count to 4

This program will show the numbers 0, 1, 2, 3, and 4 one after another on the LED screen.

```blocks
input.onButtonPressed(Button.A, () => {
    for(let i = 0; i < 5; ++i) {
        basic.showNumber(i)
    }
})
```

### See also

[repeat](/blocks/loops/repeat), [while](/blocks/loops/while), [if](/blocks/logic/if), [show number](/reference/basic/show-number)

