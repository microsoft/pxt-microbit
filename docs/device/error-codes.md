# Error codes

Your @boardname@ may encounter a situation that prevents it from running your code. When this happens, a frowny face will appear on your @boardname@ screen (see picture) followed by an error number. These are called _panic_ codes. 

```sim
basic.forever(function() {
    basic.showLeds(`
        # . . . #
        # # . # #
        . . . . .
        . # # # .
        # . . . #
        `)
    basic.pause(1000)
    basic.clearScreen()
    basic.showString("020")
})
```

## Board system errors

The @boardname@ system errors range between **01** - **99**. For a full list of these codes, what they mean and what you can do to resolve them, visit the [micro:bit guide to error codes](https://support.microbit.org/en/support/solutions/articles/19000016969).

* **10** (`MICROBIT_I2C_LOCKUP`): the @boardname@'s I2C bus is not working
* **20** (`MICROBIT_OOM`): there is no free memory on the @boardname@
* **30** (`MICROBIT_HEAP_ERROR`): a problem in the heap space
* **40** (`MICROBIT_NULL_DEREFERENCE `): there was a NULL dereference, the @boardname@ tried to manage a invalid object pointer
* **42** (`MICROBIT_SYSTEM_ERROR`): there's an error condition in the @boardname@ system software
* **43** (`MICROBIT_NO_RADIO`): the @boardname@ can't enable the radio
* **50** (`MICROBIT_HARDWARE_UNAVAILABLE_ACC`): an error occurred with the micro:bit's accelerometer component
* **51** (`MICROBIT_HARDWARE_UNAVAILABLE_MAG`): an error occurred with the micro:bit's magnetometer component
* **90** (`MICROBIT_HARDWARE_CONFIGURATION_ERROR`): actual board hardware doesn't match the configuration description
* **98** (`MICROBIT_ASSERTION_FAILED`): assertion failed, the condition in an [assert](/reference/control/assert) was false

## Memory errors

Memory error codes range from **800** - **909**.

### ~alert

#### Report errors!

If you ever see an error within the range of **800** - **909**, please report an issue at [GitHub](https://github.com/microsoft/pxt-microbit/issues) or on the [support](https://support.microbit.org/) page.

### ~

### Garbage collector errors

Error codes generated from the garbage collector.

* **840**: Allocation pointer is null or invalid
* **841**: Garbage collection work queue error
* **843**: VTable entry is not free
* **844**: GC allocation failed for requested number of bytes
* **846**: Invalid allocation thread
* **848**: Allocation pointer beyond allocation header
* **849**: Allocation pointer is null

### Program access errors

* **901** (`PANIC_INVALID_BINARY_HEADER`): the type header for the object is not valid
* **902** (`PANIC_OUT_OF_BOUNDS`): the object data portion is greater than the length defined for it
* **903** (`PANIC_REF_DELETED`): an object reference was deleted and the object is no longer valid
* **904** (`PANIC_SIZE`): the object size doesn't match the size defined for the type
* **905** (`PANIC_INVALID_VTABLE`): an object vtable is invalid or not initialized
* **906** (`PANIC_INTERNAL_ERROR`): an internal resource error
* **907** (`PANIC_NO_SUCH_CONFIG`): the specified device resource is not present
* **909** (`PANIC_INVALID_ARGUMENT`): the argument value is out of range or the type or format is invalid

## JavaScript runtime codes

### Invalid cast codes

When the static type of ``x`` is a class ``C``, the dynamic type of ``x`` isn’t ``C``, and you try to access a field on ``x`` or call a method on ``x``, you will get one of the following codes, depending on dynamic type of ``x``.

* **980** (`PANIC_CAST_FROM_UNDEFINED`): when value of ``x`` is ``undefined``
* **981** (`PANIC_CAST_FROM_BOOLEAN`): when value of ``x`` is ``true`` or ``false``
* **982** (`PANIC_CAST_FROM_NUMBER`): when ``x`` is a ``number``
* **983** (`PANIC_CAST_FROM_STRING`): when ``x`` is a ``string``
* **984** (`PANIC_CAST_FROM_OBJECT`): when ``x`` is object of some type
* **985** (`PANIC_CAST_FROM_FUNCTION`): when ``x`` is a function
* **989** (`PANIC_CAST_FROM_NULL`): when ``x`` is ``null``

## See also

[panic](/reference/control/panic), [assert](/reference/control/assert)
