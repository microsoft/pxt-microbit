# Flash log

The flash log extension logs user data to the flash storage on the @boardname@.

### ~ reminder

#### Works with micro:bit V2

![works with micro:bit V2 only image](/static/v2/v2-only.png)

Using these blocks requires the [micro:bit V2](/device/v2) hardware. If you use any blocks that attempt access flash memory on a micro:bit v1 board, you will see the **927** error code on the screen.

### ~

A data item is either name/value pair or a string value. A name/value pair has a value name and a data value. A [string](/types/string) value is just regular text.

## Blocks in this extension

```cards
flashlog.beginRow()
flashlog.endRow()
flashlog.logData("", "")
flashlog.logString("")
flashlog.setTimeStamp(FlashLogTimeStampFormat.None)
flashlog.clear()
flashlog.setSerialMirroring(false)
```

## See also

[begin row](/reference/flashlog/begin-row),
[end row](/reference/flashlog/set-column-titles),
[log data](/reference/flashlog/log-data),
[log string](/reference/flashlog/log-string),
[set time stamp](/reference/flashlog/include-timestamp),
[clear](/reference/flashlog/clear),
[set serial mirroring](/reference/flashlog/set-serial-mirroring)

```package
flashlog
```
