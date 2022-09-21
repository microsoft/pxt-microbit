# Make

If you are prone to oily skin, face touching can aggravate the presence of skin oil, To help prevent infections, keep your hands away from your eyes, nose, and mouth so here micro:bit can help a lot.

We will build a "Face Touch Early Warning System" that warns you by showing led signals whenever you bring your hands towards your face.

## How it Works?

We are going to use an inbuilt accelerometer present in Microbit to know which side the micro bit is facing. I have used the MakeCode online editor. A micro bit can detect a bunch of gestures but we have used the OnShake gesture. Whenever the micro: bit detects the up gesture then it will show the sad face led light and warns the user, not to touch your face. Next, we build it more accurately as there can be some issues with shake gestures so we used comparisons. We are comparing the actual acceleration in X and Y directions that the micro: bit is experiencing and we are comparing it with a number or distance so if the acceleration is greater than that particular number it will warn the user not to touch your face. This will fine-tune how easily the micro: bit triggers by changing the values.

## Materials you need

* micro:bit and optional battery pack
* An elastic band

## How to build 

Watch this video to see how to use micro:bit as a warning system

https://youtu.be/q9-CCeBNZ4Y

Below are some pictures of the components and connections 

![Output connections for sound](/static/mb/projects/electric-guitar/connections.jpg)

Here are two pictures of the finished electric guitar with its connections:

![Electric guitar project 1](/static/mb/projects/electric-guitar/guitar-board1.jpg)

![Electric guitar project 2](/static/mb/projects/electric-guitar/guitar-board2.jpg)

Let's go on to code the micro:bit!

### ~button /projects/face-touch-alarm/code

Code

### ~
