# spi Format

Set the Serial Peripheral Interface (SPI) format.

```sig
pins.spiFormat(8, 3);
```

The data sent over a SPI connection has a number of _bits_ to represent each value. Also, position of the clock signal (SCK), ``high`` or ``low``, and the exact time when a data value is read is determined by the SPI _mode_. Both the bits and mode values together are called the _SPI format_.

### ~ hint

#### Simulator

This function needs real hardware to work with. It's not supported in the simulator.

### ~

The default number of bits is `8` and the default mode value is `3`.

## Parameters

* **bits**: the [number](types/number) of bits for each data value sent and received on the SPI connection. This value must be ``8`` since only 8 bits is currently supported for SPI data values. 
* **mode**: a [number](/types/number) that is the mode value for the SPI clock (**SCK**) signalling. The different modes are:
>* `0`: the data line is active when **SCK** goes to ``high`` and the data values are read when **SCK** goes to ``high``
>* `1`: the data line is active when **SCK** goes to ``high`` and the data values are read when **SCK** goes to ``low``
>* `2`: the data line is active when **SCK** goes to ``low`` and the data values are read when **SCK** goes to ``high``
>* `3`: the data line is active when **SCK** goes to ``low`` and the data values are read when **SCK** goes to ``low``

## Example

Set the pins and format for the SPI connection.

```blocks
pins.spiPins(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13);
pins.spiFormat(8, 3);
```

## See also

[spi write](/reference/pins/spi-write),
[spi pins](/reference/pins/spi-pins),
[spi frequency](/reference/pins/spi-frequency)

[SPI Programming](https://developer.mbed.org/handbook/SPI)
