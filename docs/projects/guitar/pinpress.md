# Pin Press Switch

## @description @boardname@ guitar: use pin press to toggle guitar play on/off

## ~avatar avatar
Use pin press to switch guitar play on/off

* Concepts:
    * Circuit
    * Conductor
    * Variable/Global-Variable
    * Conditional: **`if`**, **`else`**
    * Boolean: **`True`/`False`**
## ~

## Duration: approximately 45 minutes

## Materials:
2-3 Crocodile clips

## Blocks

```cards
let on = false
on;
if (on) { } else {}
input.onPinPressed(TouchPin.P1, () => {})
```



## ~hint
## Circuits & Switches
* **Circuits** need a power supply (battery), a resister (like a LED) & a conductor (metal, water, hand)
* **Switches** turn electric power on by closing (completing) a circuit with a conductor so power can flow

**Metal foil and wires make excellent conductors**

**In this activity we use YOU to conduct electricity**
**to close the circuit that switches the guitar ON and OFF!**
## ~

## Step 1: Pin Press Test

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
**Create the pin-press code**

**Download the code** on the @boardname@

https://youtu.be/PAIU-vHqyGU

**Hold the @boardname@ touching The GND pin with one hand**
**with the other hand alternately touch the 0, 1 and 2 pins**

## ~hint
**The electric signal traveled from pins, between your hands to `GND` and the @boardname@ detected the electric signal!**
## ~

## Step 2: Installing conductive foil on the guitar
https://youtu.be/NX0ECcpXFes
**Add foil to the guitar body where it is easy to touch while playing**

**Connect the foil to `GND` using a crocodile clip**

https://youtu.be/YkymZGNmkrE
**Add foil to the guitar neck**

**Connect the foil to `pin 1` using a crocodile clip**

## Step 3: Add a switch to turn the guitar ON and OFF
**Using the `on` global variable we can switch the message on the @boardname@**
**between ON and OFF**
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
**Create the ON/OFF switch code**

**Download the code on the @boardname@**

**Test by touching `P1` to toggle the LED message between ON and OFF**

*Final code*
TODO: do we want to use `on = !on;` or be more direct in flipping the switch? `on = true; on = false;`
```blocks
let on = false
basic.forever(() => {
    if (on) {
        music.setTempo(pins.map(Math.abs(input.acceleration(Dimension.Y)),
            0, 1023,
            60, 320))
        music.playTone(
            input.lightLevel() * 25,
            music.beat(BeatFraction.Quarter)
        );
    } else {
        music.rest(music.beat())
    }
})
input.onPinPressed(TouchPin.P1, () => {
    on = !on;
})
```
## Now Play!
**Turn the guitar ON and OFF with a pin press on the connected foil by**
**touching both pieces of foil at the same time to connect the switches**

https://youtu.be/GYmdTFvxz80