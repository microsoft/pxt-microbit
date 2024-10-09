# Unplugged: Binary vending machine

In this activity, students will explore the concept of binary numbers by experimenting with a very odd vending machine that only accepts Base-2 coins and doesn’t give change! In the process, students will become familiar with an alternate numbering system, in this case binary (Base-2). Students will learn how binary relates to decimal, and will be able to convert between the two systems.

## Materials
* Paper
* Pencil
* Set of ‘coins’ - these could be checkers/chess pieces, cardboard rounds, or even post-it notes
* Vending machine visual (optional) 

## Pre-activity preparation
Gather or create small counters or ‘coins’ in the following denominations: 1, 2, 4, 8, 16, 32
Plastic white poker chips work well as coins. You can write the denominations onto one side of the coins with a whiteboard marker.  You can also use small index cards or paper squares. Make sure to leave one side of each coin blank.

Amount: One set of coins (with one coin of each of the first four denominations in it) for each student or each pair of students.

Hold onto the 16 and 32 unit coins for later.

### ~hint
**Tip**

If you have time, create on a poster board, on the whiteboard, or on paper as a handout, a big rectangle representing a vending machine. Draw in different items for purchase that would appeal to the students. Have the different items priced differently from 1 unit to 15 units.  This is particularly good to have for younger and more visually oriented students.

You can also just make a very simple vending machine diagram like the one below:

![Vend-o-matic diagram](/static/courses/csintro/binary/vendomatic.png)
### ~
## Introduction
Ask the students the following questions to spark discussion:
* Have any of them bought anything in the last 24 hours? _Usually they have bought a snack or perhaps lunch._
* Did any of them use cash? 
* What bills or coins did they use? 
* What are the core denominations of money in the United States?

Lead the students to realize that our core monetary denominations, like our number system are based on ten.
* 1 penny
* 1 dime = 10 pennies
* 1 one dollar bill = 10 dimes (or 100 pennies)
* 1 ten dollar bill = 10 one dollar bills
* 1 hundred dollar bill = 10 ten dollar bills
	
Our money system is based on our number system, the decimal system. The _deci-_ prefix means ‘one tenth’. Each place value in the decimal is one tenth of the place value to its left.

**Example:** The amount eleven is written in decimal notation as 11. 
There is a numeral one in the ‘tens place’ and a numeral one in the ‘ones place’.
The leftmost numeral one in the ‘tens place’ represents one ten.
The next numeral one represents an amount that is one tenth the amount of the place value to its left; in this case, one tenth of ten, or one.

But what is it like to use a different monetary system? A monetary system that has a base other than ten?

## Process
* Give a set of the coins you prepared earlier to each student or pair of students
* Remember to hold onto the 16-unit and 32-unit coins for now
* Present the following scenario:

>* There is a vending machine that sells items of all prices
* However, the machine cannot give change
* Therefore, you must pay for everything in exact amounts 
* You have one of each coin: 1, 2, 4, 8.

**Questions**

* What is the price of the least expensive item you can buy? (1 unit)
* What is the price of the most expensive item you can buy? (15 units) 
* What else can you buy? What coin(s) would you use to do this?
* What is the price of something you cannot buy, because you don’t have exact change? 
	
Here is where students will start to figure out the different combined sums of different coins. 
You can also prompt them by saying, for example, “It’s impossible to buy something that costs 11 units, isn’t it?” Someone will immediately point out that you CAN buy an 11-unit item with 8 + 2 + 1. 

You can now have the students write down how they could pay, what coin(s) could they use to purchase each of the items priced 1 unit through 15 units with the coins they have OR have a whole class discussion with you keeping track of their methods of payment on the whiteboard.

There will soon be a general agreement among the students that:
* You can make every amount between 1 unit and 15 units with the 4 coins in their set
* There is only one way to make each of those amounts.

Have students line up the coins in their set from greatest to least denomination, left to right.

**Questions**

* What do you notice about the denominations as they increase from right to left? _Each amount is double (or times 2 or twice) the denomination before it (to its right)._
* If we added one more coin to your set of coins that is greater than the 8 unit coin, what is the next logical coin denomination? 16. Why? _Because 16 is ‘2 times’ greater than 8._
	
Hand out the 16 unit coins, one to each student or pair of students.

**Questions**

* What is the new maximum price you could pay for an item? _31_
* What combinations of coins can you use to pay for an item priced from 16 units to this new maximum price? 
	
Once again, you can now have the students write down how they could pay, what coin(s) could they use to purchase each of the items priced 16 units through the new maximum price with the coins they have, OR have a whole class discussion with you keeping track of their methods of payment on the whiteboard.

Again, there will soon be a general agreement among the students that:
* You can make every amount between 16 units and the new maximum with the 5 coins now in their set.
* There is only one way to make each of those amounts.
	
**Questions**

* If we added one more coin to your set of coins that is greater than the 16 unit coin, what is the next logical coin denomination?  32. Why? _Because 32 is ‘2 times’ greater than 16. _
	
Hand out the 32 unit coins, one to each student or pair of students.

**Questions**

* What is the new maximum price you could pay for an item? _63_
* What combinations of coins can you use to pay for an item priced from 32 units to this new maximum price? 

![Coins representing binary digits](/static/courses/csintro/binary/binary-place-values.png)
From coins to binary notation - the number 45

Once students are comfortable making combinations of numbers, encourage them to use ones and zeroes to represent the numbers instead. This number system uses the number 2 as its base (each place is two times the one before it.) It is called the Base-2 system, or binary system. The number system we are normally familiar with is the Base-10 system, or decimal system (each place is ten times the one before it.)

With their coins in a line in descending order from right to left on a piece of paper, ask students to represent a given number by keeping face up the coins they would use to make this amount and flipping over or putting face down the coins not used.

**Example:** Ask them to represent the number 45. _See image above._

They should have the 32, 8, 4, and 1 coins face up and the 16 and 2 coins face down.
Ask the students to place a numeral 1 above the coins that are face up and a numeral zero over the coins that are face down.

The ones and zeros they just drew are the binary number version of the amount represented by the flipped-up coins. For the example: 45 in Base-10 = 101101 in Base-2

Practice translating numbers from Base-10 to Base-2
The students can now use this same method to translate other numbers from Base-10 to Base-2.

**Examples:**
>22 (_1 0 1 1 0_ )<br/>
37 (_1 0 0 1 0 1_ )

Practice translating numbers from Base-2 to Base-10 
Next, have the students use the above method in reverse to translate numbers from Base-2 to Base-10. 
* Start with all the coins face up in a line from greatest to least denomination from left to right.
* Write the ones and zeros representing the binary number being translated above the coins.
* Flip to face down any coin with a zero above it.
* Add up the remaining face up coins.

**Examples:**
>0 1 0 1 0 (_10_ )<br/>
1 1 0 1 1 0 (_54_ )
	

