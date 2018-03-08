# Serial

Read and write data over a serial connection.

```cards
serial.writeLine("");
serial.writeNumber(0);
serial.writeValue("x", 0);
serial.writeString("");
serial.writeNumbers([0]);
serial.readUntil(",");
serial.readLine();
serial.readString();
serial.onDataReceived(",", () => {})
```

## Advanced

```cards
serial.redirect(SerialPin.P0, SerialPin.P0, BaudRate.BaudRate115200);
serial.redirectToUSB();
serial.writeBuffer(pins.createBuffer(0));
serial.readBuffer(64);
```

## See Also

[writeLine](/reference/serial/write-line), [writeNumber](/reference/serial/write-number), [writeValue](/reference/serial/write-value),
[writeString](/reference/serial/write-string), 
[writeNumbers](/reference/serial/write-numbers), [readUntil](/reference/serial/read-until), [readLine](/reference/serial/read-line),
[readString](/reference/serial/read-string), [onDataReceived](/reference/serial/on-data-received),
[redirect](/reference/serial/redirect), [writeBuffer](/reference/serial/write-buffer), [readBuffer](/reference/serial/read-buffer),
[redirectToUSB](/reference/serial/redirect-to-usb)
