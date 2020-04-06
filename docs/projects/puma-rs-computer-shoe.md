# Puma RS Computer Shoe

In 1986, Puma and Dr. Cavanagh from the University of Washington released the **RS Computer Shoe**, a computerized shoe that could measure the distance travelled and how many calories the runner had spent.

In this project, we will recreate the shoe using two @boardname@s.

## What is the Puma RS Computer Shoe?

https://youtu.be/JmEQGYT2EFs

* [Longer version of the video (4 min)](https://youtu.be/iTPBLBGZmV0)


## How did the shoe work?

In today's world, one can easily use GPS to measure precisely the distance travelled. Back in the 80's, engineers had to be more creative. At that time, they were able to build a shoe that could measure running time and steps from foot impact. They could count steps and time - just like in the @boardname@ step counter activity.

### How do you measure distance?

To compute the distance, the engineers relied on the relationship between stride time and running speed (the algorithm is described in [US Patent 4,771,394](/static/mb/projects/puma-rs-computer-shoe/patent.pdf) starting on line 65, column 6). The faster you run, the faster your stride and the less time between foot strikes. The runner had to go through a calibration of the shoe and then it was able to estimate distance **without a GPS**!

[![Screenshot of the US patent](/static/mb/projects/puma-rs-computer-shoe/uspatent.png)](/static/mb/projects/puma-rs-computer-shoe/patent.pdf)

Assuming``T`` is the elapsed time, ``S`` is the number of foot strikes
and ``A``, ``B`` are constants that have been identified in the calibration phase, the 
speed ``V`` is computed as follows:

    V = A * T / S + B


Once the speed ``V`` is estimated and the running time ``T`` is known, then distance ``D`` can be calculated.

    D = V * T

![Physics section in patent](/static/mb/projects/puma-rs-computer-shoe/physics.png)

### How do you measure calories?

The relationship between distance run and caloric cost is something referred to in the literature as “the oxygen cost of transport” or more simply “running economy” and, after accounting for body weight, is considered to be independent of speed.
 
There are actually many subtleties to this relationship (level of fitness, footwear, weather, change in elevation, individual running biomechanics and anatomy, some speed dependence at the higher running speeds - see [Lacour-Bourdin](https://www.ncbi.nlm.nih.gov/pubmed/25681108)) but the first approximation is that **[the cost of running is 100 calories per mile](https://www.healthline.com/health/fitness-exercise/running-burn-calories-per-mile#per-mile)** – and that this needs to be modified based on body weight.

## Let's do it

The project consists of 3 phases that collect data, calibrate, and measure distance. 

* [Measure the stride](/projects/puma-rs-computer-shoe/measuring-stride): collect data to determine the stride/speed relationship
* [Calibration](/projects/puma-rs-computer-shoe/calibration): analyze the data and identify the stride equation constants
* [Measuring distance](/projects/puma-rs-computer-shoe/measuring-distance): build the shoe software that computes distance

## The reissued modern shoe

For the 30th anniversary of the shoe, Puma reissued a limited number of RS Computer shoes updated with modern hardware.

![The modern shoe](/static/mb/projects/puma-rs-computer-shoe/packaging.gif)

## Acknowledgements

This activity was developed in collaboration with [Charles Johnson](https://www.linkedin.com/in/thecharliehaus), Global Director of Innovation at Puma.

![Puma logo](/static/mb/projects/puma-rs-computer-shoe/puma.png)