# run

Tell a continuous rotation servo to turn at a certain speed.

```sig
servos.P0.run(50)
```

A continuous rotation servo can turn both clockwise and counter-clockwise. They rotate at a speed from stopped to maximum rotation speed. Normally, a continuous rotation servo interprets  an angle value as a speed value. But, by using ``||servos:run||`` though, you can use a speed percentage value to turn the servo from no speed to full speed (`0` to `100` percent). Also, for clockwise rotation, the speed value used is a positive number, speed > 0. If you want to turn the servo in the other direction (counter-clockwise), use a negative percentage value.

## Parameters

* **speed**: a [number](types/number) which is the percentage (`0` to `100`) of speed to turn the servo at. Use a positive value (speed > 0) to go clockwise and use a negative value to turn counter-clocwise.

## Example

Connect a servo to pin `P0`. Rotate the servo clockwise at `75` percent of full speed. Wait `3` seconds and then stop the servo.

```blocks
servos.P0.run(75)
basic.pause(3000)
servos.P0.run(0)
```

## See also

[set pulse](/reference/servos/set-pulse),
[set angle](/reference/servos/set-angle)

```package
servo
```
