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

![PIN PRESSED DEMO VIDEO]()

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