# on Received Buffer

Run part of a program when the @boardname@ receives a buffer over ``radio``.

```sig
radio.onReceivedBuffer(function (receivedBuffer) {})
```

The data contained in **receivedBuffer** is put there as a data [type](/types). The data might be a [number](/types/number) or a [string](/types/string). When using buffers though, the way the data is placed in the buffer must have a specific format. In particular, numbers must have a certain order when their individual _bytes_ are placed into the buffer. The numbers must also be retrieved from the buffer using the order that they were placed in when set there. You can read more about [number formats](/types/buffer/number-format).

## Parameters

* **receivedBuffer**: The buffer that was sent in this packet or the empty string if this packet did not contain a string. See [send buffer](/reference/radio/send-buffer)

## Example: Remote level

Two @boardname@s work like remote levels. They lie flat and detect any change in the horizontal position of the plane that they sit in. Each board sends its level measurements to the other. Each level measurement is shown on the screen.

```typescript
let ax = 0;
let ay = 0;
basic.forever(() => {
    ax = input.acceleration(Dimension.X);
    ay = input.acceleration(Dimension.Y);

    // encode data in buffer
    let buf = pins.createBuffer(4)
    buf.setNumber(NumberFormat.Int16LE, 0, ax)
    buf.setNumber(NumberFormat.Int16LE, 2, ay)
    radio.sendBuffer(buf)
})

radio.onReceivedBuffer(function (receivedBuffer) {
    // decode data from buffer
    ax = receivedBuffer.getNumber(NumberFormat.Int16LE, 0);
    ay = receivedBuffer.getNumber(NumberFormat.Int16LE, 2);

    // display
    basic.clearScreen()
    led.plot(
        pins.map(ax, -1023, 1023, 0, 4),
        pins.map(ay, -1023, 1023, 0, 4)
    )
});
```


## ~hint

A radio that can both transmit and receive is called a _transceiver_.

## ~

## See also

[send buffer](/reference/radio/send-buffer),
[number formats](/types/buffer/number-format)

```package
radio
```
