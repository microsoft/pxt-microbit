# Artronix Jam 

## Jeepers Bleepers Script 1

This script blinks 3 LEDs on Pins 0, 1 and 2

```block
// Loop 3 blinking LEDs forever.
while(true) {
    // turn LEDS off
    pins.digitalWritePin(DigitalPin.P0, 0)
    basic.pause(500)
    pins.digitalWritePin(DigitalPin.P1, 0)
    basic.pause(500)
    pins.digitalWritePin(DigitalPin.P2, 0)
    basic.pause(500)

    // turn LEDs on.
    pins.digitalWritePin(DigitalPin.P0, 1)
    basic.pause(500)
    pins.digitalWritePin(DigitalPin.P1, 1)
    basic.pause(500)
    pins.digitalWritePin(DigitalPin.P2, 1)
    basic.pause(500)
}
```

# Jeepers Bleepers Script 2

This script makes a single LED pulse on and off using 'pulse width modulation'.
```block
while (true) {
    for (let i = 0; i <= 128; i++) {
        pins.analogWritePin(AnalogPin.P0, i)
        basic.pause(10)
    }
    for (let i = 128; i >= 0; i--) {
        pins.analogWritePin(AnalogPin.P0, i)
        basic.pause(10)
    }
}
```


        