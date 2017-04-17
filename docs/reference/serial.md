# Serial

Reading and writing data over a serial connection.

```cards
serial.writeLine("");
serial.writeNumber(0);
serial.writeValue("x", 0);
serial.writeString("");
serial.readUntil(",");
serial.readLine();
serial.readString();
serial.onDataReceived(",", () => {})
```

### Advanced

```cards
serial.redirect(SerialPin.P0, SerialPin.P0, BaudRate.BaudRate115200);
serial.writeBuffer(pins.createBuffer(0));
serial.readBuffer(64);
```

### See Also

[writeLine](/reference/serial/write-line), [writeNumber](/reference/serial/write-number), [writeValue](/reference/serial/write-value), [writeString](/reference/serial/write-string), [readLine](/reference/serial/read-line), [redirect](/reference/serial/redirect-to)
