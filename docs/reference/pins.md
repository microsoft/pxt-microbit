# Pins

Control currents in Pins for analog/digital signals, servos, i2c, ...

```cards
pins.digitalReadPin(DigitalPin.P0);
pins.digitalWritePin(DigitalPin.P0, 0);
pins.analogReadPin(AnalogPin.P0);
pins.analogWritePin(AnalogPin.P0, 1023);
pins.analogSetPeriod(AnalogPin.P0, 20000);
pins.map(0, 0, 1023, 0, 4);
pins.onPulsed(DigitalPin.P0, PulseValue.High, () => {
    
});
pins.pulseDuration();
pins.pulseIn(DigitalPin.P0, PulseValue.High);
pins.setPull(DigitalPin.P0, PinPullMode.PullDown);
pins.analogPitch(0, 0);
pins.analogSetPitchPin(AnalogPin.P0);
```

## Servos

```cards
pins.servoWritePin(AnalogPin.P0, 180);
pins.servoSetPulse(AnalogPin.P0, 1500);
```

## I2C

```cards
pins.i2cReadNumber(0, NumberFormat.Int8LE);
pins.i2cWriteNumber(0, 0, NumberFormat.Int8LE);
```

## SPI

```cards
pins.spiWrite(0);
pins.spiFrequency(1000000);
pins.spiFormat(8,3);
pins.spiPins(DigitalPin.P0, DigitalPin.P1, DigitalPin.P2);
```

## See Also

[digitalReadPin](/reference/pins/digital-read-pin), [digitalWritePin](/reference/pins/digital-write-pin), [analogReadPin](/reference/pins/analog-read-pin), [analogWritePin](/reference/pins/analog-write-pin), [analogSetPeriod](/reference/pins/analog-set-period), [map](/reference/pins/map), [onPulsed](/reference/pins/on-pulsed), [pulseDuration](/reference/pins/pulse-duration), [pulseIn](/reference/pins/pulse-in), [servoWritePin](/reference/pins/servo-write-pin), [servoSetPulse](/reference/pins/servo-set-pulse), [i2cReadNumber](/reference/pins/i2c-read-number), [i2cWriteNumber](/reference/pins/i2c-write-number), [setPull](/reference/pins/set-pull), [analogPitch](/reference/pins/analog-pitch), [analogSetPitchPin](/reference/pins/analog-set-pitch-pin), [spiWrite](/reference/pins/spi-write),
[spiPins](/reference/pins/spi-pins),[spiFormat](/reference/pins/spi-format),[spiFrequency](/reference/pins/spi-frequency)
