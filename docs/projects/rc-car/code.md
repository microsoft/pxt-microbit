# Code

## Step 1: Add the Kitronik extension

Kitronik has an extension with blocks that program their motor driver. We need to add it to our project.

* Click on **Advanced**
* Click **Extensions**
* Type ``kitronik``, press **Enter**
* Select the **kitronik-motor-driver** extension

After the extension is loaded, you should see a new **Kitronik** category in the toolbox.

## Step 2: Round and round we go!

https://youtu.be/pD6tM1nXCPA

The first program has the car drive around in a circle for 5 seconds when the user presses the ``A`` button. This is simply done by turning both motor controllers on for 5 seconds.

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

**Protect your electronics**

Make sure to unplug the @boardname@ from the edge connector when you're connecting it to your computer. This helps protect everything from potential electrical problems.

### ~

Depending on how your wires are connected to the motor driver, your car may go backward instead of forward. If so, you can either swap the wires or change the ``MotorDirection`` in your code to get it to go the right way.

## Step 3: Figure eight

https://youtu.be/agor9wtiAkE

Instead of stopping after 5 seconds, we reverse the steering motor to turn in the other direction. This will create a figure eight path.

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

Great! The code to drive the car is done! Now let's get another @boardname@ and control the car remotely.

### ~button /projects/rc-car/connect

Connect

### ~

```package
pxt-kitronik-motor-driver=github:kitronikltd/pxt-kitronik-motor-driver#v0.0.3
```