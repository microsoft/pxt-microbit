# Clear Screen

Turn off all the LED lights on the [LED screen](/device/screen).

```sig
basic.clearScreen()
```

## Example: Vanishing heart

The following code shows a heart on the screen and then turns off all the LED lights.

```blocks
basic.showLeds(`
. # . # . 
# # # # # 
# # # # # 
. # # # . 
. . # . . 
`)
basic.clearScreen()
```

## See also

[set brightness](/reference/led/set-brightness), [unplot](/reference/led/unplot), [plot](/reference/led/plot), [Image](/reference/images/image)

