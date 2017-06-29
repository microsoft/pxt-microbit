# Introduction

There are several different data types used in computer programming. We have already used two of these types: 
* [String](/types/string) (for text)  
* [Integer](/types/number) (for numbers)

Boolean is another type of data. A boolean data type has only two values: true or false.
In true binary fashion, these two values can be represented by the numbers 1 = true, and 0 = false.
 
Booleans are useful in programming for decision-making, often deciding when certain functions and parts of programs should start or stop running and are also used in database searches.
 
Ask the students to think of things in daily life that have only two values or states. The status is always one value or the other value.
 
Examples of Booleans in daily life 
* Lights: On or Off
* Time: AM or PM
* You!: Asleep or Awake
* Weather: Raining or Not Raining
* Math: Equal to or Not Equal to
* Game: Truth or Dare
* Soda: Coke or Pepsi
* At the store: Paper or Plastic? Cash or Credit? Chip or Swipe?
 
Note:
Arguments can be made that some of these can have more than two values.
For example: At the store, you may have brought your own reusable bags or pay by check. 

Let the students discuss these to help them hone in on which examples best represent Booleans.

A student might argue that a dimmer switch on a light or the brightness value on the micro:bit LEDs allow the lights to be in a state between on and off.  One could respond that you can classify ‘on’ as the state where any electricity at all is running through the bulb (on) versus no electricity at all (off).
 
In programming, if you have worked with conditionals or loops, you have already worked with this type of logic: 
* If a certain condition is true, do this, otherwise (if condition is false), do something else.
* While a certain condition is true, do this
 
Boolean Operators: AND, OR, and NOT
To make working with Booleans useful for solving more complex decisions and searches, we can connect two or more Booleans into one decision statement. To do this, we use what are known as Boolean operators. The three most common and the ones we will use with the micro:bit are And, Or, and Not.

These operators can be used in conditionals and loops, like so:
* If condition A is true AND condition B is true
* If condition A is true OR condition B is true
* While event A has NOT happened
 
Let’s look at how each of these work.

## AND
(Condition A AND Condition B)
For this expression to evaluate as true, both conditions in the expression need to be true.
So, if both Condition A AND Condition B are true, the expression will evaluate as or return true.
 
## OR
(Condition A OR Condition B)
For this expression to evaluate as true, only one of the conditions in the expression needs to be true.
If Condition A is true, the expression will return true regardless of whether Condition B is true or false.
If Condition B is true, the expression will return true regardless of whether Condition A is true or false.
 
## NOT
NOT can be used when checking that a condition is false (or not true).
For example:
* (NOT Condition A and Condition B) evaluates as true only if Condition A is false and Condition B is true.
* (Condition A and NOT Condition B) evaluates as true only if Condition A is true and Condition B is false.
* (NOT Condition A and NOT Condition B) evaluates as true only if both Condition A and Condition B are true.
NOT is also useful when using a loop. For example, you can use a NOT to check  
While button A is NOT pressed, continue to run this code…
 
Note: ‘False’ can be thought of as equivalent to ‘NOT true’.

## Sidebar material
![George Boole](/static/courses/csintro/booleans/george-boole.jpg)
Image credit: Wikimedia Commons

George Boole (2 November 1815 – 8 December 1864) was an English mathematician, educator, philosopher and **logician**. He worked in the fields of differential equations and algebraic **logic**, and is best known as the author of The Laws of Thought (1854) which contains **Boolean** algebra.

