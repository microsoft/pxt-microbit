# assert

Stop the program if the assertion condition is false.

```sig
control.assert(false)
```

You can insist that your program will stop at an assert block if a certain condition you check is false. The error number in the assert is written to the serial port with a failure message.

## Parameters

* **cond**: a [boolean](/types/boolean) where true means everything is ok or false which means, stop the program!
* **msg**: an optional [string](/types/string) with a message describing the failed assertion.

## Example

Stop the program if a sensor connected to pin `P0` sends a low (`0`) signal.

```blocks
basic.forever(() => {
    control.assert(pins.digitalReadPin(DigitalPin.P0) == 1)
    basic.pause(1000)
})
```

## See also

[panic](/reference/control/panic)
