# set Rx Buffer Size

Sets the length of the serial reception buffer in bytes.

```sig
serial.setRxBufferSize(10)
```

## Parameters

* **size**: desired length of the reception buffer

## Example

Allocates 64 bytes for the reception buffer.

```typescript
serial.setRxBufferSize(64)
```

## See also

[set tx buffer size](/reference/serial/set-tx-buffer-size)