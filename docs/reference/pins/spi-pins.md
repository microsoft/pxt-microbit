# spi Pins

Set the Serial Peripheral Interface (SPI) signalling pins

```sig
pins.spiPins(DigitalPin.P0, DigitalPin.P1, DigitalPin.P2);
```

To configure the @boardname@ to write to an external device using a SPI connection, each SPI signal line is assigned to unique a pin. A SPI connection uses 3 signalling lines called **MOSI**, **MISO**, and **SCK**.

### ~ hint

#### Simulator

This function needs real hardware to work with. It's not supported in the simulator.

### ~

If you don't set the pins for the SPI connection, the default pin assignments are used:

* **P15** = **MOSI**, @boardname@ SPI data output pin
* **P14** = **MISO**, @boardname@ SPI data input pin
* **P13** = **SCK**, @boardname@ SPI serial clock output pin

## Parameters

* **mosi**: the pin for SPI data output, the **MOSI** signal pin.
* **miso**: the pin for SPI data input, the **MISO** signal pin.
* **sck**: the pin for SPI serial clock output, the **SCK** signal pin.

## Example

Set the pin assignments for a SPI connection to the default pins.

```blocks
pins.spiPins(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13);
```

## See also

[spi write](/reference/pins/spi-write),
[spi frequency](/reference/pins/spi-frequency),
[spi format](/reference/pins/spi-format)

[SPI Programming](https://developer.mbed.org/handbook/SPI)
