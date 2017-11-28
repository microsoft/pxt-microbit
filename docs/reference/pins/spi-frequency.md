# SPI Frequency

Set the SPI clock frequency.

```sig
pins.spiFrequency(1000000);
```

## Parameters

* **frequency**: a [number](/types/number) to set as the frequency for SPI bus clock. This value is the number of clock changes per second (Hz).

## Example

Read the value of the _WHOAMI_ register from the device connected to the SPI bus. The chip select line is connected to pin **0** and the SPI signals use pins **13**, **14**, and **15**.

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

[SPI](https://developer.mbed.org/handbook/SPI)
