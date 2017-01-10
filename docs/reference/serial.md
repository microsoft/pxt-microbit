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
serial.redirect(SerialPin.P0, SerialPin.P0, BaudRate.BaudRate115200);
serial.onDataReceived(",", () => {})
```

### See Also

[writeLine](/reference/serial/write-line), [writeNumber](/reference/serial/write-number), [writeValue](/reference/serial/write-value), [writeString](/reference/serial/write-string), [readLine](/reference/serial/read-line), [redirect](/reference/serial/redirect-to)
