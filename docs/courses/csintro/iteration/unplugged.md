# Unplugged: Walk a square

![Chair with Pseudocode on the board.](/static/courses/csintro/iteration/chair-pseudo.png)

## Objective
To reinforce the concept of iteration by having students act out the repeated steps of an algorithm in real life.

## Overview
Students will give the teacher instructions to do a simple activity, then look for places where using iteration could shorten their code and make it more efficient.

## Process

* Place a chair in the front of the room.
* Stand at the back right side of the chair facing the students.
* Ask the students what instructions they could give you that when followed would lead you to walk around the chair, ending up just as you started. You may want to demonstrate what this would look like by walking around the chair.
* Tell the students you can only process one instruction at a time, so their algorithm needs to be step-by-step.
* As students suggest instructions write them on the board or wherever everyone can see them. Their pseudocode will probably end up looking something like this:
1. Step forward
2. Turn left
3. Step forward
4. Turn left
5. Step forward
6. Turn left
7. Step forward
8. Turn left
![Square walking pattern](/static/courses/csintro/iteration/square-walk.png)
* Go ahead and follow their algorithm to prove that it works. But that’s eight lines of code! Tell students that the same instructions can be written using just three lines of code. If they have not noticed already, have students look for places where the code repeats.
* Tell them that whenever you have code that repeats, you have an opportunity to use a loop to simplify your code.
* Prompts:
>* What lines are repeated? _(1) Step forward. (2) Turn left_.
>* How many times are they repeated? Four
>* So how could we rewrite this code? Students will suggest a version of the following:
>_Repeat 4 times: Step forward, Turn left_
* Go ahead and follow their revised algorithm to prove that it works.

There! They have just rewritten eight lines of code as three lines of code, by using a loop. 
The ‘repeat’ command creates a loop. The code within the loop gets repeated a certain number of times until a condition is met. The condition in this algorithm is that the code in the loop is repeated 4 times. Once this condition is met, the program exits the loop.

This is a great opportunity to have the students think of the benefits of having fewer lines of code. _Some possible reasons: Less typing, saves time, fewer chances of making a mistake, easier to read the code, fewer lines of code to debug..._

## Notes
* Depending on the particular class, you can make this exercise more challenging, by requiring the students to be more specific in their instructions. 

**Example:** Step forward 14 inches (you can have students actually measure the exact distance), turn left 90 degrees...
	


