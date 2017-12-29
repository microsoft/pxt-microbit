# Send Numbers

Sends up to 4 numbers to other @boardname@s in the area connected by radio.
```sig
radio.sendNumbers(0, 0, 0, 0)
```

## Parameters

* ``number0``, ... ``number3`` the numbers to send

## Example: Remote level

If you load this program onto two @boardname@s, each board will send the level information to the other board.

```blocks
radio.onDataPacketReceived(({ receivedNumbers }) => {
    basic.clearScreen()
    led.plot(pins.map(
        receivedNumbers[0],
        -1023,
        1023,
        0,
        4
    ), pins.map(
        receivedNumbers[1],
        -1023,
        1023,
        0,
        4
    ))
})
basic.forever(() => {
    radio.sendNumbers(
        input.acceleration(Dimension.X),
        input.acceleration(Dimension.Y),
        0,
        0
    )
})
```

## ~hint

A radio that can both transmit and receive is called a _transceiver_.

## ~

## See also

[on data packet received](/reference/radio/on-data-packet-received)

```package
radio
```