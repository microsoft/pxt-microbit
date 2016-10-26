
# Inchworm

![inchworm icon](/static/mb/projects/guitar.png)

### @description A inchworm like robot built with the micro:bit

### ~avatar avatar

Make a funny inchworm robot!

### ~
*inchworm in action*
https://youtu.be/BiZLjugXMbM

## Duration

5 Activities, approx 30-45 min each based on familiarity with the coding concepts

## Materials

* Cardboard pieces (recycle!)
* Tape (masking, duct tape, and/or packing tape)
* Scissors that can cut cardboard
* 1 micro:bit, battery holder and 2 AAA batteries
* 3 Crocodile clips
* 1 micro servo 9g SG90.

![Materials](/static/mb/projects/inchworm/materials.jpg)

## Activities

* [Circuit](/projects/inchworm/circuit)  
* [Chassis](/projects/inchworm/chassis)  
* [Basic motion](/projects/inchworm/motion)  

### ~button /projects/inchworm/circuit

Let's get started!

### ~

![](/static/mb/projects/inchworm/7 chassis1.jpg)
![](/static/mb/projects/inchworm/chassis2.jpg)
![](/static/mb/projects/inchworm/chassis3.jpg)
![](/static/mb/projects/inchworm/chassis4.jpg)
![](/static/mb/projects/inchworm/chassis5.jpg)
![](/static/mb/projects/inchworm/chassis5.jpg)
![](/static/mb/projects/inchworm/chassis6.jpg)
![](/static/mb/projects/inchworm/chassis7.jpg)
![](/static/mb/projects/inchworm/chassis8.jpg)
![](/static/mb/projects/inchworm/circuit1.jpg)
![](/static/mb/projects/inchworm/circuit2.jpg)
![](/static/mb/projects/inchworm/clip1.jpg)
![](/static/mb/projects/inchworm/clip2.jpg)
![](/static/mb/projects/inchworm/clip3.jpg)
![](/static/mb/projects/inchworm/materials.jpg)
![](/static/mb/projects/inchworm/ready.jpg)
![](/static/mb/projects/inchworm/servo1.jpg)
![](/static/mb/projects/inchworm/servo2.jpg)
![](/static/mb/projects/inchworm/servo3.jpg)
![](/static/mb/projects/inchworm/servo4.jpg)
![](/static/mb/projects/inchworm/servo5.jpg)
![](/static/mb/projects/inchworm/servo6.jpg)
![](/static/mb/projects/inchworm/servo7.jpg)
![](/static/mb/projects/inchworm/servo8.jpg)

```blocks
input.onButtonPressed(Button.A, () => {
    for (let i = 0; i < 4; i++) {
        pins.servoWritePin(AnalogPin.P0, 0)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . # . . .
            # . . . .
            `)
        basic.pause(500)
        pins.servoWritePin(AnalogPin.P0, 180)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . # .
            . . . . #
            `)
        basic.pause(500)
    }
})
```
![](/static/mb/projects/inchworm/chassis4.jpg
-a----       10/26/2016   4:08 PM          47847 chassis5.jpg
-a----       10/26/2016   4:08 PM          47847 chassis5.jpg
-a----       10/26/2016   4:07 PM          71875 chassis6.jpg
-a----       10/26/2016   4:07 PM          53400 chassis7.jpg
-a----       10/26/2016   4:07 PM          57696 chassis8.jpg
-a----       10/26/2016   4:07 PM          53607 circuit1.jpg
-a----       10/26/2016   4:07 PM          42965 circuit2.jpg
-a----       10/26/2016   4:07 PM          40317 clip1.jpg
-a----       10/26/2016   4:07 PM          42418 clip2.jpg
-a----       10/26/2016   4:07 PM          61896 clip3.jpg
-a----       10/26/2016   4:07 PM          93590 materials.jpg
-a----       10/26/2016   4:05 PM          85756 ready.jpg
-a----       10/26/2016   4:05 PM          41137 servo1.jpg
-a----       10/26/2016   4:04 PM          39757 servo2.JPG
-a----       10/26/2016   4:04 PM          54894 servo3.jpg
-a----       10/26/2016   4:04 PM          38168 servo4.jpg
-a----       10/26/2016   4:04 PM          36708 servo5.jpg
-a----       10/26/2016   4:04 PM          34976 servo6.jpg
-a----       10/26/2016   4:04 PM          39877 servo7.jpg
-a----       10/26/2016   4:04 PM          94924 servo8.jpg

```blocks
input.onButtonPressed(Button.A, () => {
    for (let i = 0; i < 4; i++) {
        pins.servoWritePin(AnalogPin.P0, 0)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . # . . .
            # . . . .
            `)
        basic.pause(500)
        pins.servoWritePin(AnalogPin.P0, 180)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . # .
            . . . . #
            `)
        basic.pause(500)
    }
})
```