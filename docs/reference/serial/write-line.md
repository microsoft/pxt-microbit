# Serial Write Line

Write a string to the [serial](/device/serial) port and start a new line of text 
by writing `\r\n`.

```sig
serial.writeLine("")
```

## Parameters

* `text` is the [string](/types/string) to write to the serial port

## Examples

### Simple serial

Write the word `BOFFO` to the serial port repeatedly.

```blocks
basic.forever(function() {
    serial.writeLine("BOFFO")
    basic.pause(5000)
})
```

### Streaming data

Check the [compass heading](/reference/input/compass-heading) and show the direction on the screen. Also, send both the direction and degree heading to the serial port.

```blocks
let degrees = 0
let direction = ""
basic.forever(function() {
    degrees = input.compassHeading()
    if (degrees < 45) {
        basic.showArrow(ArrowNames.North)
        direction = "North"
    } else if (degrees < 135) {
        basic.showArrow(ArrowNames.East)
        direction = "East"
    } else if (degrees < 225) {
        basic.showArrow(ArrowNames.South)
        direction = "South"
    } else if (degrees < 315) {
        basic.showArrow(ArrowNames.West)
        direction = "West"
    } else {
        basic.showArrow(ArrowNames.North)
        direction = "North"
    }
    serial.writeLine(direction + " @ " + degrees + " degrees")
    basic.pause(500)
})
```

## See also

[serial](/device/serial),
[serial write number](/reference/serial/write-number),
[serial write string](/reference/serial/write-string),
[serial write value](/reference/serial/write-value)
