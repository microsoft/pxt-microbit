# Preparing the servo
### @description Connecting the servo to crocodile clips

### ~avatar avatar

Equip the microservo with crocodile clips.

### ~

## Duration: ~30 minutes

## Materials
  * Cutting pliers or wire cutter
  * Tape (masking, duct tape, and/or packing tape)
  * 3 crocodile clips, yellow, red and black.
  * 1 micro servo 9g (SG90)

## Using a microservo with the @boardname@

The @boardname@ provides just enough current to operate the SG90 microservo. 
The servo requires 3 connections: GND, 3V and a logic pin. 
In this tutorial, we will equip the servo with crocodile clips to make it easier to use. 
However, you could also use a shield or female to crocodile clips to acheive the same effect.

If you are running a class or activity, you should consider preparing all servos before hand.

### ~ hint

Kitronik wrote an excellent in-depth guide about using servos with the @boardname@. 
Check it out at 

### ~

## Step 1: cutout the connector

Using the cutting pliers, cut out the dark plastic connector.

![](/static/mb/projects/inchworm/servo1.jpg)

## Step 2: strip out cables

Using the plier or a wire stripper, strip the plastic from the cables.

![](/static/mb/projects/inchworm/servo2.jpg)

## Step 3: threading the servo cablers

Thread the servo cables.

![](/static/mb/projects/inchworm/servo3.jpg)

## Step 4: crocobile clip claps

Cut a crocodile cable in two and strip out the casing. 
If possible try to use the same cable colors as the servo!

![](/static/mb/projects/inchworm/servo4.jpg)

## Step 5: thread cables together

Place the cables next to each other

![](/static/mb/projects/inchworm/servo5.jpg)

... and thread them together.

![](/static/mb/projects/inchworm/servo6.jpg)

### ~ hint

It is very **important** to ensure that there is a good connection between the 2 cables.
If the connection is weak, the microservo will not receive enough current and it will not work.
If you have access to a soldering iron, we strongly recommend to solver this connection.

### ~

## Step 4: protect the connection

Protect the connection with electrical or duct tape.

![](/static/mb/projects/inchworm/servo7.jpg)

## Step 5: repeat for all cables

Repeat the same process until all cables are connected.

![](/static/mb/projects/inchworm/servo8.jpg)

## Step 6: testing!

It's time to test that your connection are all proper and that the servo will function **when the @boardname@ is powered by battery**.

* Connect the microservo to the @boardname@. Black cable on ``GND``, red cable on ``3V`` and remaining cable on ``P0``.

![](/static/mb/projects/inchworm/circuit1.jpg)

### ~ hint

When attaching the crocodile clips to the pins, don't hesitate to grab the side of the board with the jaws.

![](/static/mb/projects/inchworm/circuit2.jpg)

### ~

* Download the following code to your @boardname@

```blocks
let a = 0
basic.forever(() => {
    a = input.acceleration(Dimension.X)
    pins.servoWritePin(AnalogPin.P0, pins.map(
        a,
        -512,
        512,
        0,
        180
    ))
})
```

* When powered by USB, make sure that the servo moves when you tilt the board.
* When powered by batteries **only**, make sure that the servo moves when you tilt the board.

If your servo seems to sutter and stay stuck at a particular position, it means that it is not receiving enough power.
This is probably due to a weak connection or low battery level. Check each connection and check your batteries.


### ~button /projects/inchworm/chassis
NEXT: Chassis
### ~