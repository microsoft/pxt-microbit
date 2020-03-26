# Equipping a microservo with Crocodile clips

## ~ hint

If you are conducting a class or group activity, you should consider preparing all servos ahead of time.

## ~

## Using a microservo with the @boardname@

The @boardname@ provides just enough current to operate the SG90 microservo. This servo requires 3 connections: **GND**, **3V** and a logic **pin**. In this tutorial, we will equip the servo with crocodile clips to make it easier to use. However, you could also use a shield or crocodile clips with a male connector on one end to achieve the same result.

### ~ hint

To better understand how servos work and how they are controlled, take a few minutes to read this [Brief Guide to Servos](https://www.kitronik.co.uk/pdf/a-brief-guide-to-servos.pdf).

### ~

## The easy way: Alligator/Crocodile Clip to Male Jumpers #hintconnection

The easiest way to connect a servo to the @boardname@ is to use cables with an **Alligator/Crocodile clip** on one end
and a **Male jumper (pig tail)** on the other end. You can purchase bundles these cables from various electronic resellers or easily build some as shown here.

https://youtu.be/XtzsydSTXEg

### Materials

* 1 Crocodile clip cable
* 1 male (pig tail) cable
* Cutting pliers or wire cutter
* 1 piece of heat shrink tubing and a lighter

Simply cut the cables, strip them, twist the bare wires together, and cover the connection with some heat shrink tubing.

### ~ hint

It is very **important** to ensure a good connection between the 2 cables. If the connection is weak, the microservo will not receive enough current and it will not work. **If you have access to a soldering iron, we strongly recommend that you solder this connection.**

### ~

## Direct connection

You can also connect your crocodile clips directly to the servo.

### Materials

* Cutting pliers or wire cutter
* Tape (masking, duct tape, and/or packing tape)
* 3 crocodile clips, yellow, red and black.
* 1 micro servo 9g (SG90)

### Step 1: Cut off the connector

With the cutting pliers, cut off the dark plastic connector.

![Cutting of the plastic connector from the servo cable](/static/mb/projects/inchworm/servo1.jpg)

### Step 2: Strip the ends of the cables

Using the pliers or a wire stripper, strip the plastic insulation from the cables.

![Stripping the servo cable insulation](/static/mb/projects/inchworm/servotrim.jpg)

### Step 3: Twist the wire strands together

Twist the strands of bare wire at the ends of the servo cables together.

![Strands of the servo wires twisted together](/static/mb/projects/inchworm/servo3.jpg)

### Step 4: Crocodile clip

Cut a crocodile cable in two and strip off the insulation. If it's possible, try to use cables with colors that match the cables on the servo!

![Stripping insulation of a croc cable with cutting pliers](/static/mb/projects/inchworm/servo4.jpg)

### Step 5: Thread the cable ends together

Place the cables next to each other...

![Bare wires place together before threading](/static/mb/projects/inchworm/servo5.jpg)

... and thread them together.

![Bare wires threaded together](/static/mb/projects/inchworm/servo6.jpg)

### ~ hint

It is very **important** to ensure that there is a good connection between the 2 cables. If the connection is weak, the microservo will not receive enough current and it will not work. **If you have access to a soldering iron, we strongly recommend soldering this connection.**

### ~

### Step 6: Protect the connection

Protect the connection with heat shrink tubing, electrical tape, or duct tape.

![Wire connection protected with electrical tape](/static/mb/projects/inchworm/servo7.jpg)

### Step 7: Repeat for all cables

Repeat the same process until all cables are connected.

![All three cables connected and taped](/static/mb/projects/inchworm/servo8.jpg)

### Step 8: Testing!

It's time to test and find out if your connections are all secure and that the servo will function **when the @boardname@ is powered by battery**.

* Connect the microservo cables to these pins on the @boardname@: black to **GND**, red to **3V**, and the remaining cable to pin **0**.

![Connect to the pins on the board](/static/mb/projects/inchworm/circuit1.jpg)

## ~ hint

When attaching the crocodile clips to the pins, don't be afraid to clamp on to the edge of the board with the clips.

![Clippiing the cables to the edge of the board](/static/mb/projects/inchworm/circuit2.jpg)

## ~

* Download the following code to your @boardname@.

```blocks
basic.forever(() => {
    pins.servoWritePin(AnalogPin.P0, pins.map(
        input.acceleration(Dimension.X),
        -512,
        512,
        0,
        180
    ))
})
```

* Test with both power sources and make sure that the servo moves when you tilt the board:
>* Connected with USB.
>* Powered by batteries **only** and not connected with USB.

## Calibrating

Use the [servo calibrator](/projects/servo-calibrator) program to determine the best angles to use for your make.

## Troubleshooting

If your servo seems to stutter and remain stuck at a particular position, it means that it's not receiving enough power. This is probably due to a weak connection or low battery level. Make sure that each connection is good and check your batteries.
