# Project: Make a binary cash register

For this project, you'll be making a binary cash register out of paper, cardboard, and of course the micro:bit. This will involve programming your cash register to display the decimal value of various binary numbers.

Materials
* Cardboard or heavy paper
* Copper tape - sources:
>https://www.adafruit.com/product/1128<br/>https://www.sparkfun.com/products/10561
* 3 quarters or other heavy coins
* Scissors
* Duct tape

![micro:bit cash register](/static/courses/csintro/binary/microbit-cash-register.png)
_Binary micro:bit Cash Register_

## Project Example

![Binary cash register project](/static/courses/csintro/binary/binary-cash-register.jpg)
_An implementation of the Binary Cash Register_

This is one possible design for a binary cash register. It uses coins and copper tape on a piece of cardboard. Normally, to indicate “off” or 0, the coins are flipped up. And to indicate “on” or 1, the coin is flipped so it lays flat across both pieces of copper tape, completing the circuit so the micro:bit can detect that that pin has been activated, and calculates and displays the decimal value of the binary number that is indicated by the coins.

Copper tape is a thin, flexible strip of copper with an adhesive back. Usually, copper tape can conduct electricity even through the sticky side, but if you are sticking one piece of copper tape to another, be sure to go over the connection with your fingernail, pressing it down firmly.

Because the micro:bit only has three pins/rings, this binary register is limited to three place values. You might use variables to represent each of the three place values, or you can simply keep a running total by adding the appropriate amount when each of the three pins is pressed.

You will need to connect the ground (GND) pin using copper tape to the other side of the circuit – using the coin to connect them.

You can stick the micro:bit into place using some sticky tape, or you can create an actual holder. The copper tape connections are delicate though, so be careful when plugging and unplugging the power cable from the board.

Project mod options

## Mods for the binary cash register

* Write some code that will display the number in binary when you press the A button.
* Think of a way to create more place values, perhaps by using a second micro:bit and a Radio connection.

## Optional additional project: Build a binary wristwatch

Here's another idea for a project that deals with binary:

* Write a program that will display the correct time (once set) on the micro:bit.
* The three to four numbers displayed will be in binary (not decimal).

![Binary wrist watch project](/static/courses/csintro/binary/binary-wrist-watch.jpg)

* To make the strap of the wristwatch, put two pieces of duct tape back-to-back, and use Velcro tabs as the fasteners.

![Holder](/static/courses/csintro/binary/microbit-holder.jpg)

This is a holder that allows the micro:bit to be worn on the wrist.

![Wooden structure to hold the micro:bit on the wrist](/static/courses/csintro/conditionals/microbit-holder.jpg)

This design supports the micro:bit in a rigid cradle and allows more delicate connections to the pins.

## Reflection
Write a short reflection of about 150–300 words, addressing the following points:

* Describe what the physical component of yur micro:bit project was (e.g., an armband, a cardboard mount, a holder, etc.)
* How well did your prototype work? What were you happy with? What would you change? 
* What was something that was surprising to you about the process of creating this project?
* Describe one way in which your project differed from the example that was given. How would you recognize it as your own?
* Publish your MakeCode program and include the link.
	
## Resources

[Math is fun: Binary number system](https://www.mathsisfun.com/binary-number-system.html)


