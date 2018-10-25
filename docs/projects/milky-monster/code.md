# Code

## @description code to make the Milky Monster alive

## ~avatar avatar

Add code to make the Milky Monster move.

## ~

## Duration: ~30 minutes

## Step 1: Calibrate servo

In order for the Milky Monster to move, the @boardname@ needs to command the servo to go between ``0`` and ``180`` degrees at a certain pace. In the code below:
- Press button ``A`` to switch the servo to 180 degrees (to close the mouth of Milky Monster). 
- Press button ``B`` to switch the servo to 0 degrees (to open the mouth of Milky Monster). 

```blocks
input.onButtonPressed(Button.A, () => {
    pins.servoWritePin(AnalogPin.P0, 180)
    basic.showNumber(180)
})
input.onButtonPressed(Button.B, () => {
    pins.servoWritePin(AnalogPin.P0, 0)
    basic.showNumber(0)
})
basic.showString("calibrate")

```

## Step 2: Attach rotor

The servo should be positioned at 180 degrees **before** attaching the rotor to it. This will make sure the mouth of the Milky Monster is closed once the servo reaches 180 degrees. 

## ~ hint

You can use a philips screw driver to attach the rotor to the servo. 

## ~

https://youtu.be/YZfkMWTeH4o

## Step 3: Check calibration

When the user presses ``A`` the servo rotor should be in 'up' position. 

https://youtu.be/bAqXEawUsSM

## Step 4: Connect cord to rotor

Connect the cord to the servo rotor while mouth of Milky Monster is **closed**.

https://youtu.be/AWsnwk_iA_A

## Step 5: Connect cables to @boardname@

Connect cables from @boardname@ to the servo and place the battery.

https://youtu.be/fAR58GJUZdM

## Step 6: Code light sensor

Code the light sensor on the @boardname@ to control the servo.

```blocks
basic.forever(() => {
    pins.servoWritePin(AnalogPin.P0, input.lightLevel())
    led.plotBarGraph(
        input.lightLevel(),
        0
    )
})
```

## Step 7: Ready!

Your Milky Monster is ready!

https://youtu.be/egl3fNAYylk
<br/>
## ~button /projects/milky-monster/connect
NEXT: Connect
## ~
