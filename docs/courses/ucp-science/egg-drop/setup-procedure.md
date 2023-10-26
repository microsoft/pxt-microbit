# Setup and procedure

## Setup

* Review Newton’s Laws of Motion and make some predictions about what will happen if you drop objects with different mass and acceleration.
* Create hypotheses around what types of designs might minimize force of collision.
* Group students to begin work on egg carriers.
* Code the micro:bit and perform a series of tests dropping the micro:bit in the carriers from a height.
* Once the test results are successful, insert the egg into the carriers and drop from a height.
* Debrief on the results - which carriers were the most successful? Why?

## Code

This project will use the micro:bit to test the force of collision.

* From the ``||input:Input||`` Toolbox drawer, drag an ``||input:on shake||`` block to the workspace
* Use the drop-down menu to select 8g. This block will detect when a force 8g or greater is exerted on the micro:bit.

```blocks
input.onGesture(Gesture.EightG, function () {

})
```

### ~ hint

#### Gravitational Force

The g-force or gravitational force is a measure of gravitational force where an object at rest on the Earth's surface is subject to 1 g of force. So, 8g = 8 times the normal gravitational force exerted on an object.
### ~

* From the ``||basic:Basic||`` Toolbox drawer, drag a ``||basic:show leds||`` block and drop it into the ``||input:on 8g||`` block.
* Draw an X or other symbol to indicate that the micro:bit has experienced 8g of force.

```blocks
input.onGesture(Gesture.EightG, function () {
basic.showLeds(`
# . . . #
. # . # .
. . # . .
. # . # .
# . . . #
`)
})
```

Now let’s add some code to reset our experiment.

* From the ``||input:Input||`` Toolbox drawer, drag an ``||input:on button pressed||`` block to the workspace.

```blocks
input.onButtonPressed(Button.A, function () {

})
```

* From the ``||basic:Basic||`` Toolbox drawer, drag a ``||basic:clear screen||`` block and drop it into the ``||input:on button pressed||`` block.

```blocks
input.onGesture(Gesture.EightG, function () {
basic.showLeds(`
# . . . #
. # . # .
. . # . .
. # . # .
# . . . #
`)
})
input.onButtonPressed(Button.A, function () {
basic.clearScreen()
})
```

Sample code file: https://makecode.microbit.org/_L96ELqWtrV65

Download the code onto the micro:bit, and then connect the micro:bit to a battery pack.

## Conducting the Experiment

After coding the micro:bit and constructing the egg drop carriers, take turns testing dropping the micro:bit in the carriers from a height. Do the micro:bit lights turn on? If so, that means the force exerted on the micro:bit was at least 8g – a good indication that the egg most likely will break on impact. Continue refining the egg drop carriers until no micro:bit lights turn on when dropped. Then test with an egg!

## Debrief

Discuss the results of the experiment:

* Which egg carriers were successful? Which were not?
* Are there patterns you can identify between the carrier designs?
* Were the micro:bit test results a good indication of whether the egg would break or not?
* How might you find out exactly how much g-force would need to be exerted to break the egg?
* Thinking about Newton’s Laws of Motion, what principles can you deduce about how to minimize the force of impact?

## ~button /courses/ucp-science/egg-drop/resources
NEXT: Resources
## ~