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
    * Boolean: **`True`/`False`**
### ~

### Blocks

```cards
var on = false
on;
if (on) { } else {}
input.onPinPressed(TouchPin.P1, () => {})
```




### Circuits & Switches
* **Circuits** need a power supply (battery), a resister (like a LED) & a conductor (metal, water, hand)  
* **Switches** turn electric power on by closing (completing) a circuit with a conductor so power can flow.   

### Pin Press  
Metal foil and wires make excellent conductors. In this activity we will turn the guitar ON using **you** to conduct electricity to close the circuit!  

1) Create the pin-press code and load the code on the micro:bit  
  
*Pin Press Code*
```blocks
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
2) Hold the micro:bit touching The GND pin with one hand  

3) With the other hand alternately touch the O, 1 and 2 pins  
https://youtu.be/PAIU-vHqyGU TODO: fix link - broken in emulator  

The electric signal traveled between your hands and the micro:bit detected the electric signals to the pins!  
  
### Installing conductive foil on the guitar  
Make the pins easy to touch by connecting the pins to pieces of foil attached to the guitar body and neck  
1) Add foil to the guitar body where it is easy to touch while playing 

2) Connect the foil to GND using a crocodile clip  
https://youtu.be/NX0ECcpXFes  
  
3) Add foil to the guitar neck  
  
4) Connect the foil to P0 using a crocodile clip  
https://youtu.be/YkymZGNmkrE  

### Adding a switch to turn the guitar ON and OFF  
* Using the **`on`** global variable we can switch the message on the micro:bit  
between ON and OFF  

1) Create the ON/OFF switch code and load the code on the micro:bit 
```blocks
let on = false
basic.forever(() => {
    if (on == true) {
        basic.showString("ON")
    } else {
        basic.showString("OFF")
    }
})
input.onPinPressed(TouchPin.P1, () => {
    if (on == true) {
        on = false
    } else {
        on = true
    }
})
```  


*Final code*
TODO: do we want to use `on = !on;` or be more direct in flipping the switch? `on = true; on = false;`
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
### now JAM! 
Turn the guitar ON and OFF with a pin press  
* Touch both pieces of foil at the same time to connect the switches  
  
https://youtu.be/GYmdTFvxz80  