# spi Write

Write a data value to the SPI slave device and return its response.

```sig
pins.spiWrite(0);
```

Data values are written to a SPI slave device connected to the @boardname@ by the [SPI pins](/reference/pins/spi-pins). The data value might be either a command for the connected device or some value for its use. If the write operation causes the connected device to send a value back to the @boardname@, this will be the return value for the **spiWrite** function.

### ~ hint

#### Simulator

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parameters

* ``value``: a [number](/types/number) which is the data value to send to the SPI slave device.

## Returns

* a [number](/types/number) value which is the response from the SPI slave device.

## Example

Send the command to read the value of the _WHOAMI_ register from the device connected to the SPI bus. The chip select line is connected to pin **0** and the SPI signals use pins **P13**, **P14**, and **P15**.

```blocks
pins.digitalWritePin(DigitalPin.P0, 1);
pins.spiPins(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13);
pins.spiFormat(8, 3);
pins.spiFrequency(1000000);
pins.digitalWritePin(DigitalPin.P0, 0);
let command = pins.spiWrite(143);
let whoami = pins.spiWrite(0);
pins.digitalWritePin(DigitalPin.P0, 1);
basic.showNumber(whoami);
serial.writeLine("WHOAMI register value: " + whoami)
```

## See also

[spi pins](/reference/pins/spi-pins),
[spi frequency](/reference/pins/spi-frequency),
[spi format](/reference/pins/spi-format)

[SPI Programming](https://developer.mbed.org/handbook/SPI)
