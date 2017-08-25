# Code

## Step 1: Add the Kitronik package

Kitronik published a set of blocks to use their motor driver. We need to add it to our project.

* Click on **Advanced**
* Click **Add Package**
* Type ``kitronik``, press **Enter**
* Select the **kitronik-motor-driver** package

After the package gets loaded, you should see a new **Kitronik" category in the toolbox.

## Step 2: Round and round we go!

https://youtu.be/pD6tM1nXCPA

The first program will have the car drive in a circle for 5 seconds when the user presses button ``A``. 
This is simply done by turning both motor controllers on for 5 seconds.

```blocks-ignore
input.onButtonPressed(Button.A, () => {
    basic.showIcon(IconNames.Happy)
    kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 100)
    kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, 100)
    basic.pause(5000)
    kitronik.motorOff(kitronik.Motors.Motor1)
    kitronik.motorOff(kitronik.Motors.Motor2)
    basic.showIcon(IconNames.SmallDiamond)
})
```

### ~ hint

Make sure to unplug the @boardname@ from the Edge connector while your are connecting it to your computer to avoid any kind of electrical problem.

### ~

Depending on how you've connected your cables to the motor driver, your car may be going backward instead of forward. 
You can either swap the cables or change your code to account for that.

## Step 3: Figure Eight

https://youtu.be/agor9wtiAkE

Instead of stopping after 5 seconds, we reverse the steering motor to turn the other direction. This will create a figure eight trajectory.

```blocks-ignore
input.onButtonPressed(Button.A, () => {
    basic.showIcon(IconNames.Happy)
    kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 100)
    kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, 100)
    basic.pause(3500)
    kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, 100)
    basic.pause(3500)
    kitronik.motorOff(kitronik.Motors.Motor1)
    kitronik.motorOff(kitronik.Motors.Motor2)
    basic.showIcon(IconNames.SmallDiamond)
})
```

Great! It's now time to use another @boardname@ to remove control the car.

### ~button /projects/rc-car/connect

Connect

### ~

```package
pxt-kitronik-motor-driver=github:kitronikltd/pxt-kitronik-motor-driver#v0.0.3
```