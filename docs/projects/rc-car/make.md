# Make

### @description Hacking the car electronics

### ~avatar avatar

Hack the @boardname@ into the car!

### ~

https://youtu.be/gH__3l_oDeM
<br/>
![A toy RC car](/static/mb/projects/rc-car/rccar.jpg)

## Step 1: Remove the batteries!

Make sure all the batteries are removed from the toy car!

## Step 2: Remove the body and electronics cover

Remove the car body and the plastic pieces that protect electronic controller so you can access it. Make sure to keep track of all the screws you remove, you will need them again!

## Step 3: Disconnect the original electronics

Follow the motor and power wires to the controller. Cut them as close as possible to the surface of the electronic board (neurosurgery). You should end up with a total of **8** wires:
**2** for power, **2** for the steering motor and **2 pairs** for the torque motors.

You can pull out the old controller board to make some more room.

![Electronic board removed](/static/mb/projects/rc-car/elecremoved.jpg)

## Step 4: Prepare the wires

Using the wire trimmer, remove the insulation on the wires to expose about 1/4 inch (1/2 cm) of the metal conductor on each wire so you can attach it to the motor driver.

![Various cables](/static/mb/projects/rc-car/cables.jpg)

## Step 5: Connect the battery wires

* Connect the wires from the battery section to the power input on the motor driver. 
Make sure the **+** wire goes into the **+** port!
* Connect both torque motors to the **motor 1** connector on the motor driver. 
Make sure you match wires to the same color when you connect them so that your wheel will turn in the right direction!
* Connect the remaining motor wires to the **motor 2** connector.

![Wiring](/static/mb/projects/rc-car/wiring.jpg)

## Step 6: Insert the @boardname@ in the slot

This is probably the easiest step. Insert the @boardname@ in the edge connector until clips in.

## Step 7: Cut out a slot in the cover to fit the @boardname@ (optional)

Cut a slot in the cover for the original controller over edge connector. The **Kitronik** controller is protected and your @boardname@ has a nice finished slot to occupy.

![Cutout](/static/mb/projects/rc-car/cutout.jpg)

## Step 8: Mount the car body (optional)

Depending on the size and shape of your car, you may be able to fit the car body back on the top of the car. If not, get some cardboard, scissors, and a glue gun to 'fab up' (make) a new one of your own (à la _Mad Max_).

## Step 9: Paint job (optional)

Once you've got the body on (the original or a cardboard one), finish it with some style!

![Painted](/static/mb/projects/rc-car/painted.jpg)

That's it, time to code!

### ~button /projects/rc-car/code

Code

### ~