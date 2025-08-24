# Project: Make an Accelerometer Project

For this project, you will work separately or with a friend to design a project that incorporates the micro:bit's accelerometer capabilities.

## Global Goals

![UN Global Goals](/static/courses/csintro/accelerometer/global.png)

In 2015, world leaders got together and came to agreement on 17 major global issues that need to be addressed. Visit the [Global Goals website](https://www.globalgoals.org)

- Each of the 17 goals (globalgoals.org/goals) is broken down into smaller, more specific goals.
- The webpages for each of these more specific goals describe ways that citizens can take action to help reach that goal.

After exploring the website, consider the following questions:

- Which of the 17 goals interest you the most?
- Which of the 17 goals do you feel most directly affect you and your community?
- Why do you think they refer to these global issues as "goals to reach" rather than "problems to solve"? How does describing something as a "goal" differ from calling it a "problem"?

## Global Goals and the micro:bit: Do Your :bit!

As we have experienced already, the micro:bit is for making. From tools to games, you have made different projects and products using the micro:bit. The micro:bit can also be used to make a difference!

### Do Your :bit

![Do Your Bit Digital Challenge](/static/courses/csintro/accelerometer/bit.png)

You can use your micro:bit to help reach one of the 17 Global Goals!

Visit the [do your :bit](https://microbit.org/projects/do-your-bit) website to find out how other students from around the world have created projects that aim to help reach these goals.

Explore the videos, resources, challenges, and projects to get ideas for a project of your own.

### Project Expectations

Follow the design thinking approach and make sure your project meets these specifications: 

- Uses the accelerometer to gather input about the micro:bit's position and motion in space
- Uses accelerometer blocks in a way that is integral to the program
- The program compiles and runs as intended and includes meaningful comments in the code
- Provide the written Reflection Diary entry (which we'll talk about after you complete your project)

## Project Examples

What follows are two complete project ideas. 
Both can be found in the Coding Cards section on the home page of the [MakeCode for micro:bit](makecode.microbit.org) site.

### Shake the Bottle

![Shake the Bottle Instructions](/static/courses/csintro/accelerometer/shake.jpg)
 
This game is inspired by a game in the Nintendo Switch game 12Switch. Players take turns holding the micro:bit, which is taped to a bottle. They give it a shake and some bubbles show on the screen. They pass it to the next player, who also gives it a shake. At some point, the bottle will pop and the player left holding the bottle loses.

There are no extra components needed for this game as it just uses the built-in accelerometer to detect when the bottle is shaken.

#### The code

We start with a variable called 'pop' and set its value to 0 at the start. When the first player shakes the micro:bit, it checks if the value of 'pop' is greater than 50. If it is over 50, then it displays an asterisk (*) and the game is over. If it is not over 50, it adds a random amount to 'pop' between 0 and 4 and shows some bubbles on display.

_\*Credit: Twitter user [@stulowe80](https://twitter.com/stulowe80)_

### Zen

![Shake the Bottle Instructions](/static/courses/csintro/accelerometer/shake.jpg)
 
ZEN is a game our students made that was inspired by the Nintendo Switch game 12Switch. The aim of the game is to strike a yoga pose and hold it while keeping the micro:bit completely still. If you wobble, your screen starts to fill up. If it is full, then you are out.

There are no extra components needed for this game as it just uses the built-in accelerometer on the x-axis to detect how much it wobbles rotationally left and right. You could tape the micro:bit and battery to a piece of card to make it easier to hold flat.


#### The code

We start by creating a variable called 'wobble' and setting it to 0 at the start. The value of 'wobble' is shown as a bar graph on the display. If 'wobble' becomes greater than 10, it shows an X and that player is out. If the accelerometer detects a tilt to the right or left exceeding 500 or -500, it adds 1 to your 'wobble' value.

_\*Credit: Twitter user [@stulowe80](https://twitter.com/stulowe80)_

## Reflection

Write a short reflection of about 150–300 words, addressing the following points:

* What kind of project did you do? How did you decide what to pick?
* How does your project use the accelerometer?
* Describe something in your project that you are proud of.
* Describe a difficult point in the process of designing this program and explain how you resolved it.
* What feedback did your testers give you? How did that help you improve your design?
* How would you improve your project given more time?
* Relating to the pair programming process (if applicable):
* What challenges did you encounter working with a partner?
* What benefits did you gain?
* Publish your MakeCode program and include the link.
