# Pin Press Switch

### @description micro:bit guitar: use pin press to toggle guitar play on/off

### ~avatar avatar
Use pin press to switch guitar play on/off
* **Duration:** approximately 45 minutes
* **Materials:**
   * 2-3 Crocodile clips
* Concepts:
    * Circuit  
    * Conductor 
    * Variable/Global-Variable  
    * Conditional: **`if`**, **`else`**  
### ~

https://youtu.be/PAIU-vHqyGU TODO: fix link - broken in emulator

https://youtu.be/NX0ECcpXFes

https://youtu.be/YkymZGNmkrE

### Circuits & Switches
* **Circuits** need a power supply (battery), a resister (like an LED) and a conductor (metal, water, or...?)
* **Switches** turn electric power on by closing the connection with a conductor so power can flow.   

Metal foil and wires make excellent conductors. In this activity we will turn the guitar ON using **you** to conduct electricity to close the circuit!

### Blocks

```cards
var on = false
on;
if (on) { } else {}
input.onPinPressed(TouchPin.P1, () => {})
```

Final code
```blocks
var on = false
basic.forever(() => {
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