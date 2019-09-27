# Grove Zero - BitKit

This Microsoft MakeCode package is used as an **Grove Zero - BitKit extension** for micro:bit.

## Basic Usage

### 1. Add the extension

Simply add the 'Grove Zero' package in the [MakeCode for microbit](https://makecode.microbit.org/), then program your micro:bit with the drag and drop blocks as usual.
<p align = "left">
    <img src="https://github.com/MiroChao/image-gallery/blob/master/BitKit/extensions%20.png" height="300">
</p>

<p align = "left">
    <img src="https://github.com/MiroChao/image-gallery/blob/master/BitKit/demo%20image.png?raw=true" height="200">
</p>

### 2. The blocks
#### 2.1 Chassis
Use this block to move your chassis **forward/backward/left/right/clockwise/counter-clockwise** with different speed **slow/medium/fast**. 
<p align = "left">
    <img src="https://github.com/MiroChao/image-gallery/blob/master/BitKit/chassis_move.png" height="50">
</p>

Use this block to **stop** the chassis. 
<p align = "left">
    <img src="https://github.com/MiroChao/image-gallery/blob/master/BitKit/chassis_stop.png" height="50">
</p>

Use this block to **set the speed of** the two motors on the chassis. A speed of "255" for both motors makes the chassis move forward at full speed, and a speed of "-255" for both motors make the chassis move backward at full speed.
<p align = "left">
    <img src="https://github.com/MiroChao/image-gallery/blob/master/BitKit/chassis_set_motors.png" height="50">
</p>

#### 2.2 Color Line Follower
**Line Detections**

Use this block to detect the line position and make your micro:car do something.
<p align = "left">
    <img src="https://github.com/MiroChao/image-gallery/blob/master/BitKit/on%20line%20position.png">
</p>

You can also put this boolean block in a 'if' block for detecting line.
<p align = "left">
    <img src="https://github.com/MiroChao/image-gallery/blob/master/BitKit/detect-line-position.png" height="50">
</p>

> **About the line position**

Provided that **the line width is about 5mm** (if you use the marker included in the Bit Kit), the following image illustrates how the Color Line Follower see the line position when the car moves.
<p align = "left">
    <img src="https://github.com/MiroChao/image-gallery/blob/master/BitKit/about%20the%20line%20position.png" height="200">
</p>

> In some cases, users may draw a line wider than 5mm (which most people do that). As a result, when the sensor sees a line at 'middle', it could be a thin 5mm line detected by the middle optical sensor, or a wide 10mm line detected by the 3 middle optical sensors simutaneously. To the cover as many situations as possible and chieve a smooth line following the Color Line Follower works in a way as illustrated below:
<p align = "left">
    <img src="https://github.com/MiroChao/image-gallery/blob/master/BitKit/line%20position.png">
</p>

**Color Detections**

Use this block to detect the color and make your micro:car do something.
<p align = "left">
    <img src="https://github.com/MiroChao/image-gallery/blob/master/BitKit/on%20color.png">
</p>

You can also put this boolean block in a 'if' block for detecting color.
<p align = "left">
    <img src="https://github.com/MiroChao/image-gallery/blob/master/BitKit/detect%20color.png" height="50">
</p>

>> The Color Line Follower is specially calibrated for detecting the color of the marker pens included in the Bit Kit. But please be noted that, in general, the color detection can be influenced by the ambient light, the surface of the object or the gray scale of the color. So in most of time, the color sensor may not work as you expected if you are detecting something else.


The following block returns the color in r,g,b.
<p align = "left">
    <img src="https://github.com/MiroChao/image-gallery/blob/master/BitKit/get%20color.png" height="50">
</p>

## License

MIT

## Supported targets

* for PXT/microbit
