# Seismograph Lesson

Build a seismograph with household materials

## Topic

Acceleration & Analog Read Pin

## Quick Links

* [activity](/lessons/seismograph/activity)
* [challenge](/lessons/seismograph/challenge)

## Prior learning/place of lesson in scheme of work

Learn how to **show LEDs** to turn on a LED light pattern on the LED screen. We will be learning basic comments such as show LEDs and pause.

## Documentation

```cards
basic.forever(() => {});
radio.sendNumber(0);
input.acceleration(Dimension.Strength)
radio.onReceivedNumber(function (receivedNumber) {});
led.plotBarGraph(0, 0);
```

## Objectives

* learn how to repeat code forever in the background
* learn how to display a vertical bar graph based on the value.
* learn how to return the sum of the two numbers
* learn how to get acceleration value in milli-gravitys
* learn how to read the connector value as analog as a value comprised between 0 and 1023

```package
radio
```