# Error codes

Your micro:bit may encounter a situation that prevents it from running your code. When this happens, a frowny face will appear on your micro:bit screen (see picture) followed by an error number.

Below is a list of error numbers and what they mean:

* **10** (`MICROBIT_I2C_LOCKUP`): the micro:bit's I2C bus is not working
* **20** (`MICROBIT_OOM`): there is no free memory on the micro:bit

```sim
basic.showLeds(`
    # . . . #
    # # . # #
    . . . . .
    . # # # .
    # . . . #
    `)
```

### See also

[Run scripts on your micro:bit](/device/usb)

