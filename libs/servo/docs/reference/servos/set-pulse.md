# set Pulse

Write a pulse to a servo with your own pulse time.

```sig
servos.P0.setPulse(2000)
```

A servo turns a shaft by an amount of angle or speed that it reads from a pulse signal. A digital
pulse signal can have only two values, high and low. How do you do you tell the servo how much
to turn the shaft if there are only two values to use?

### Servo angle

The trick is to use the duration (the amount of time the pulse is on) as a way to tell the servo
how much to turn the shaft. Servos use different, but really short, amounts of time to mean how much the shaft will turn or how fast it rotates in a direction. Most hobby servos use a pulse that lasts between 1 millisecond and 2 milliseconds to tell it how much to turn. You see that half of that amount of time is 0.5 milliseconds. A 0.5 millisecond pulse is the amount of time that tells the servo to stay in its neutral position. A 1 millisecond pulse means that the servo shaft is turned all the way to the left, usually called the 0 degree position. a 2 millisecond pulse tells the servo to turn all the way to the right, the 180 degree position.

So that you can move the servo shaft very precisely, you get to use microseconds for the pulse time. Remember to multiply the millisecond numbers by 1000 when you pulse the servo. The neutral position, for example, is 1500 microseconds. The servo moves the shaft all the way to the left with a pulse of 1000 microseconds. All the way to the right is a pulse that is 2000 microseconds.

### Continuous rotation

There is another type of servo called a _continuous rotation_ servo that might look the same as a regular servo. It's different because the shaft doesn't stop at a particular position. In this case, the pulse you send to the servo doesn't mean position, but instead it's a speed number. The shaft keeps rotating if you send a pulse number other than `1500` milliseconds to the servo. Instead of being an angle of rotation, the duration is a speed rating in one of the directions. The `1000` microseconds is full speed rotating to the left and `2000` microseconds is full speed rotating to the right. The number `1500` microseconds is no rotation in any direction.

#### ~hint

Most, but not all, hobby servos that are made use the 1 to 2 millisecond pulse time to control the shaft rotation. Some might have smaller amount of rotation or use different pulse times for positions and speed. If you have one of those types of servos, find out what pulse times move the shaft where you want and use them in ``||servos:set servo pulse||``.

#### ~

## Parameters

* **micros**: a [number](types/number) that is the length of the pulse sent to the servo, in microseconds. For the different types of servos, pulse time means:
> * _regular servo_: the amount of rotation to turn the shaft.
>>Most often, `1000` is full rotation to the left, `2000` is full rotation to the right, and `1500` is go to neutral.
> * _continuous rotation_: the speed to turn the shaft in one direction or the other.
>>Most often, `1000` is turn full speed to the left, `2000` is full speed to the right, and `1500` stopped.

## Example #example

Turn a standard servo connected to pin `P0` by 135 degrees. Wait for 3 seconds and set it back to neutral.

```blocks
servos.P0.setPulse(1750)
basic.pause(3000)
servos.P0.setAngle(90)
```

## See also

[set angle](/reference/servos/set-angle),
[run](/reference/servos/run)

```package
servo
```
