# Equipping a microservo with Crocodile clips

## ~ hint

If you are running a class or activity, you should consider preparing all servos before hand.

## ~

## Using a microservo with the @boardname@

The @boardname@ provides just enough current to operate the SG90 microservo. 
The servo requires 3 connections: GND, 3V and a logic pin. 
In this tutorial, we will equip the servo with crocodile clips to make it easier to use. 
However, you could also use a shield or female to crocodile clips to achieve the same effect.

## The easy way: Alligator/Crocodile Clip to Male Jumpers #hintconnection

The easiest way to connect a servo to the @boardname@ is to use cables that have an **Alligator/Crocodile clip** on one end
and a **Male jumper (pig tail)** on the other end. You can purchase bundles of such cables from various electronic resellers or easily build yours as show below.

https://youtu.be/XtzsydSTXEg

## Materials

  * 1 Crocodile clip cable
  * 1 male (pig tail) cable
  * Cutting pliers or wire cutter
  * 1 shrink wrap cables and a lighter

Simple cut the cables, strip them, thread the cables together and cover with the shrink wrap.

## ~ hint

It is very **important** to ensure that there is a good connection between the 2 cables.
If the connection is weak, the microservo will not receive enough current and it will not work.
**If you have access to a soldering iron, we strongly recommend to solder this connection.**

## ~


## Direct connection

You can also connect your crocodile clips directly to the servo.

## Materials
  * Cutting pliers or wire cutter
  * Tape (masking, duct tape, and/or packing tape)
  * 3 crocodile clips, yellow, red and black.
  * 1 micro servo 9g (SG90)

## Step 1: cutout the connector

Using the cutting pliers, cut out the dark plastic connector.

![](/static/mb/projects/inchworm/servo1.jpg)

## Step 2: strip out cables

Using the plier or a wire stripper, strip the plastic from the cables.

![](/static/mb/projects/inchworm/servotrim.jpg)

## Step 3: threading the servo cablers

Thread the servo cables.

![](/static/mb/projects/inchworm/servo3.jpg)

## Step 4: crocodile clip

Cut a crocodile cable in two and strip out the casing. 
If possible try to use the same cable colors as the servo!

![](/static/mb/projects/inchworm/servo4.jpg)

## Step 5: thread cables together

Place the cables next to each other

![](/static/mb/projects/inchworm/servo5.jpg)

... and thread them together.

![](/static/mb/projects/inchworm/servo6.jpg)

## ~ hint

It is very **important** to ensure that there is a good connection between the 2 cables.
If the connection is weak, the microservo will not receive enough current and it will not work.
**If you have access to a soldering iron, we strongly recommend to solder this connection.**

## ~

## Step 4: protect the connection

Protect the connection with shrinkwrap tubes, electrical or duct tape.

![](/static/mb/projects/inchworm/servo7.jpg)

## Step 5: repeat for all cables

Repeat the same process until all cables are connected.

![](/static/mb/projects/inchworm/servo8.jpg)

## Step 6: testing!

It's time to test that your connection are all proper and that the servo will function **when the @boardname@ is powered by battery**.

* Connect the microservo to the @boardname@. Black cable on ``GND``, red cable on ``3V`` and remaining cable on ``P0``.

![](/static/mb/projects/inchworm/circuit1.jpg)

## ~ hint

When attaching the crocodile clips to the pins, don't hesitate to grab the side of the board with the jaws.

![](/static/mb/projects/inchworm/circuit2.jpg)

## ~

* Download the following code to your @boardname@

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

* When powered by USB, make sure that the servo moves when you tilt the board.
* When powered by batteries **only**, make sure that the servo moves when you tilt the board.

## Calibrating

Using the [servo calibrator program](/examples/servo-calibrator) to determine the best angles to use in your make.

## Troubleshooting

If your servo seems to sutter and stay stuck at a particular position, it means that it is not receiving enough power.
This is probably due to a weak connection or low battery level. Check each connection and check your batteries.
