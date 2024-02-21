# spi Frequency

Set the Serial Peripheral Interface (SPI) clock frequency.

```sig
pins.spiFrequency(1000000);
```

The @boardname@ sets the rate of data transfer and control timing for a SPI connection. This data rate and timing signal is controlled by the **SCK** pin. The signal on this pin is _clocked_ using the frequency set for it.

### ~ hint

#### Simulator

This function needs real hardware to work with. It's not supported in the simulator.

### ~

The default clock frequency is 1 Mhz (10000000 Hz). You can set the frequency for the SPI connection to some other value if you need a different data rate.

## Parameters

* **frequency**: a [number](/types/number) to set as the frequency for SPI bus clock. This value is the number of clock changes per second (Hz).

## Example

Read the value of the _WHOAMI_ register from the device connected to the SPI bus. The chip select line is connected to pin **0** and the SPI signals use pins **P13**, **P14**, and **P15**.

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

[spi write](/reference/pins/spi-write),
[spi pins](/reference/pins/spi-pins),
[spi format](/reference/pins/spi-format)

[SPI Programming](https://developer.mbed.org/handbook/SPI)
