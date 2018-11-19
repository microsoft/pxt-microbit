# Error codes

Your @boardname@ may encounter a situation that prevents it from running your code. When this happens, a frowny face will appear on your @boardname@ screen (see picture) followed by an error number. These are called _panic_ codes.

Below is a list of error numbers and what they mean:

* **10** (`MICROBIT_I2C_LOCKUP`): the @boardname@'s I2C bus is not working
* **20** (`MICROBIT_OOM`): there is no free memory on the @boardname@
* **30** (`MICROBIT_HEAP_ERROR`): a problem in the heap space.
* **40** (`MICROBIT_NULL_DEREFERENCE `): there was a NULL dereference, the @boardname@ tried to manage a invalid object pointer.
* **42** (`MICROBIT_SYSTEM_ERROR`): there's an error condition in the @boardname@ system software.
* **43** (`MICROBIT_NO_RADIO`): the @boardname@ can't enable the radio.
* **50** (`MICROBIT_HARDWARE_UNAVAILABLE_ACC`): an error occurred with the micro:bit's accelerometer component.
* **51** (`MICROBIT_HARDWARE_UNAVAILABLE_MAG`): an error occurred with the micro:bit's magnetometer component.
* **98** (`MICROBIT_ASSERTION_FAILED`): assertion failed, the condition in an [assert](/reference/control/assert) was false.

```sim
basic.showLeds(`
    # . . . #
    # # . # #
    . . . . .
    . # # # .
    # . . . #
    `)
```

## See also

[Support](https://microbit.org/guide/hardware/error-codes/),
[panic](/reference/control/panic), [assert](/reference/control/assert),
