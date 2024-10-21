# Introduction

An accelerometer is a device that measures acceleration. Acceleration is itself a measure of how an object’s velocity changes. 
Velocity describes an object’s current speed in a particular direction. For example, you could describe the velocity of a car as “headed north at 50 mph”.

![Acceleration Example](/test/static/courses/csintro/accelerometer/velocity.png)

Acceleration is a measure of the rate at which the car’s speed and/or direction changes.
In all these cases an acceleration occurs:

* **Direction change**: The car speed continues at 50 mph, yet the car turns to travel in a northeast direction
* **Speed change**: The car speed changes to 45 mph and the car continues heading north
* **Speed and direction change**: The car speed changes to 65 mph and the car turns to travel in a northeast direction

**Acceleration** is **a measure of the rate of these changes over time**.

Note that whether the car speeds up or slows down, an acceleration occurs. Acceleration doesn't only happen when something speeds up!

![High Velocity Low Acceleration Example](/test/static/courses/csintro/accelerometer/highvelocitylowaccel.png)
![Low Velocity High Acceleration Example](/test/static/courses/csintro/accelerometer/lowvelocityhighaccel.png)

You measure acceleration with the *milli-g*, which is **1/1000 of a g**. A *g* is as much acceleration as you get from Earth’s gravity.

The micro:bit measures the acceleration value (*milli g-force*) in **one of three dimensions** or the combined force in **all directions (x, y, and z)**.

When the micro:bit is flat on a table with the screen pointing up, the gravity force is aligned with the Z axis of the micro:bit.

![Three Axes Illustration](/test/static/courses/csintro/accelerometer/lowvelocityhighaccel.png)

If you tilt it up and down, the force will align with the Y axis; this is how we can detect tilting! As the force along Y grows, the micro:bit is tilting more and more vertically.

### Parameters

* **dimension**: The direction you are checking for acceleration or the total strength of force
* **x**: Acceleration in the left and right direction
* **y**: Acceleration in the forward and backward direction
* **z**: Acceleration in the up and down direction
* **strength**: the resulting strength of acceleration from all three dimensions (directions)

The micro:bit’s accelerometer also measures how fast the micro:bit is speeding up or slowing down as it moves through space.

### Output

The accelerometer feature returns a number that represents the amount of acceleration.

For example: When the micro:bit is lying flat on a surface with the screen pointing up:

**x** is 0
**y** is 0
**z** is -1023
**strength** is 1023

On the back of the micro:bit, look closely in the lower left corner for the accelerometer.

![Accelerometer](/test/static/courses/csintro/accelerometer/accelerometer.png)

