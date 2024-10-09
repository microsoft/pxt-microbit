# Project: Make a binary cash register

The unplugged activity uses a vending machine as a model for creating different combinations of binary place values. We found that for n coins, there is one and only one way to make every number between 0 and 2^_n-1_.

For this project, students should invent a paper and cardboard version of the binary counter, then program it to display the decimal value of those numbers.

Materials
* Cardboard or heavy paper
* Copper tape - sources:
>https://www.adafruit.com/product/1128<br/>https://www.sparkfun.com/products/10561
* 3 quarters or other heavy coins
* Scissors
* Duct tape

![micro:bit cash register](/static/courses/csintro/binary/microbit-cash-register.png)
Binary micro:bit Cash Register

## Tips
This is one possible design for a binary cash register. We used coins and copper tape on a piece of cardboard. Normally, the coins are flipped up (“off” or 0) and to indicate “on” or 1, the coin is flipped so it lays flat across both pieces of copper tape, completing the circuit so the micro:bit can detect that that pin has been activated, and calculates and displays the decimal value of the binary number that is indicated by the coins.

Copper tape is a thin, flexible strip of copper with an adhesive back. You can sometimes find copper tape at the hardware, sold as slug tape, to keep slugs out of your garden. Usually, copper tape can conduct electricity even through the sticky side but if you are sticking one piece of copper tape to another, be sure to go over the connection with your fingernail, pressing it down firmly.

Because the micro:bit only has three pins, this binary register is limited to three place values. Students might use variables to represent each of the three place values, or they can simply keep a running total by adding the appropriate amount when each of the three pins is pressed.

You can stick the micro:bit into place using some sticky tape, or you can create an actual holder. The copper tape connections are delicate though, so be careful when plugging and unplugging the power cable from the board.

![Binary cash register project](/static/courses/csintro/binary/binary-cash-register.jpg)
An implementation of the Binary Cash Register

## Extra mods
* Write some code that will display the number in binary when you press the A button. 
* Think of a way to create more place values, perhaps by using a second micro:bit and a Radio connection.

## Optional project: Build a binary wristwatch
* Write a program that will display the correct time (once set) on the micro:bit. 
* The 3-4 numbers displayed will be in binary (not decimal).
* To make the strap of the wristwatch, put 2 pieces of duct tape back-to-back, and use velcro tabs as the fasteners

![Binary wrist watch project](/static/courses/csintro/binary/binary-wrist-watch.jpg)

To make the strap of the wristwatch, you can put two pieces of duct tape back-to-back, and use Velcro tabs as the fasteners.

![Holder](/static/courses/csintro/binary/microbit-holder.jpg)
This is a holder that allows the micro:bit to be worn on the wrist.

![Wooden structure to hold the micro:bit on the wrist](/static/courses/csintro/conditionals/microbit-holder.jpg)
This design supports the micro:bit in a rigid cradle and allows more delicate connections to the pins.

## Reflection
Have students write a reflection of about 150–300 words, addressing the following points:

* Describe what the physical component of yur micro:bit project was (e.g., an armband, a cardboard mount, a holder, etc.)
* How well did your prototype work? What were you happy with? What would you change? 
* What was something that was surprising to you about the process of creating this project?
* Describe one way in which your project differed from the example that was given. How would you recognize it as your own?

## Assessment

**Competency scores**: 4, 3, 2, 1

### Binary display

**4 =** All binary numerals display correctly.<br/>
**3 =** At least 2 binary numerals display correctly.<br/>
**2 =** At least 1 binary numeral displays.<br/>
**1 =** No binary numerals display correctly.

### micro:bit program

**4 =** micro:bit program:<br/>
`*` Uses binary in a way that is integral to the program<br/>
`*` Uses mathematical operations to convert decimal-binary<br/>
`*` Compiles and runs as intended<br/>
`*` Meaningful comments in code<br/>
**3 =** micro:bit program lacks 1 of the required elements.<br/>
**2 =** micro:bit program lacks 2 of the required elements.<br/>
**1 =** micro:bit program lacks 3 or more of the required elements.

### Reflection

**4 =** Reflection piece includes addresses all prompts.<br/>
**3 =** Reflection piece lacks 1 of the required elements.<br/>
**2 =** Reflection piece lacks 2 of the required elements.<br/>
**1 =** Reflection piece lacks 3 of the required elements. 

## Additional questions to ponder
* How could you use a row of flashlights to represent a number to someone else far away? 
* How might you use those flashlights to send a message?
	
## Resources

[Math is fun: Binary number system](https://www.mathsisfun.com/binary-number-system.html)


