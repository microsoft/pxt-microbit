# set Tx Buffer Size

Sets the length of the serial transmission buffer in bytes.

```sig
serial.setTxBufferSize(10)
```

## Parameters

* **size**: desired length of the transmission buffer

## Example

Allocates 64 bytes for the transmission buffer.

```typescript
serial.setTxBufferSize(64)
```

## See also

[set rx buffer size](/reference/serial/set-rx-buffer-size)