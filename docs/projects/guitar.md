

* make the basic guitar
* basics of micro:bit
** display and buttons
** sound
* add sound to the guitar
** sequencing, events

https://codethemicrobit.com/jmdjiqbgpk

* light sensor
** plot bar graph
** mapping to frequency
** forever loop play tone
    - math, arithmetic

```
led.setBrightness(220)
basic.forever(() => {
    led.plotBarGraph(input.acceleration(Dimension.Y), 512)
})
```

```
basic.forever(() => {
    music.playTone(input.lightLevel() * 25, music.beat(BeatFraction.Quater))
})
```

* accelerometer
** plot bar graph
** mapping to beat
** update forever

* on pin is pressed
** try on the micro:bit with smiley - match maker
** build the circuit
** try on the guitar
** global variable on/off - onpinpressed to turn and off
    - global variable, conditional, logic, pins

```
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(0)
})
input.onPinPressed(TouchPin.P1, () => {
    basic.showNumber(1)
})
input.onPinPressed(TouchPin.P2, () => {
    basic.showNumber(2)
})
```

```blocks
var on = false
basic.forever(() => {
    led.plotBarGraph(input.acceleration(Dimension.Y), 1023)
    if (on) {
        music.setTempo(pins.map(Math.abs(input.acceleration(Dimension.Y)),
            0, 1023,
            60, 320))
        music.playTone(
            input.lightLevel() * 25,
            music.beat(BeatFraction.Quater)
        );
    } else {
        music.rest(music.beat())
    }
})
input.onPinPressed(TouchPin.P1, () => {
    on = !on;
})
```