# Unplugged: Two heads are better than one

Materials: A penny for each student, paper and pencils 

Most students have used a penny to decide something. Ask for some examples. 
Who goes first in a game, to break a tie, to decide which activity to do... 

A simple penny is the most common binary decision making tool ever! 
When you flip a coin to decide something there are only two possible outcomes, heads or tails. 
When you flip a coin the outcome is random. 

 
What’s a common issue with coin tosses? Students may bring up issues of trust and fairness. Who gets to flip the coin? Who gets to ‘call’ it? What if it’s a ‘faulty’ coin?
 
Here’s a solution... The double coin toss. 

![Two pennies showing heads and tails](/static/courses/csintro/booleans/pennies.png)

In a double coin toss, both people have a coin and they flip the coins at the same time. 

Working in pairs, have the students make a table or list of the possible outcomes if each student flipped a coin at the same time.

Example:
 
```
    Coin A  Coin B
    ==============
    Heads   Heads
    Heads   Tails
    Tails   Heads
    Tails   Tails
```

There are 4 possible outcomes.

* For 2 outcomes, the result is the same for both coins, both heads or both tails.
* For the other 2 outcomes, the result for each coin is different, heads/tails and tails/heads.
 
So, if 2 coins are flipped, the chance that the outcomes will be the same (HH/TT) is equal to the chance that the outcomes will be different (HT/TH).  Both outcomes, coins the same/coins are different have a 2 in 4 or 50% chance of occurring.

Therefore, if Person A wins each time the outcomes are the same and Person B wins each time the outcomes are different, both have an equal chance of winning each double coin flip.  With this system, no one person’s outcome, heads or tails, guarantees a win.  If Person A’s coin flips to heads, she would win if Person B also flipped heads, but lose if Person B flipped tails. Students will usually see that this is a fair system.
 
Let the students experiment with this. Have students flip their coins together, keeping track of the outcomes, perhaps by adding another column to their table.

Example:
 
```
    Coin A  Coin B   Totals
    ======================== 
    Heads   Heads
    Heads   Tails
    Tails   Heads
    Tails   Tails
```
 
Just for fun, have them play to a certain total number of rounds.  

So, what does this have to do Boolean variables and operators? Think about how you would code a program a double coin flipper. How would you represent each of the 4 different possible double coin flip outcomes?

Let’s pseudocode it! 
 
We can create a Boolean variable to represent whether an outcome is heads or tails. We can make:

* Heads = True
* Tails = False

Note: Tails = False can also be thought of as Tails = not true. 

Have the students copy their Heads/Tails table of possible outcomes, but label the columns "Coin A Heads" and "Coin B Heads" and replace each entry of ‘Heads’ with ‘True’ and ‘Tails’ with ‘False’.  In the study of logic, this is known as a truth table.

We’ll use it to help us pseudocode our program, by adding a third column describing the results of each outcome.

```
    Coin A  Coin B    Results 
    Heads   Heads
    ================================================================================== 
    True    True     If Coin A is true AND Coin B is true, add one to Player A score 
    True    False    If Coin A is true AND Coin B is false, add one to Player B score 
    False   True     If Coin A is false AND Coin B is true, add one to Player B score 
    False   False    If Coin A is false AND Coin B is false, add one to Player A score 
``` 

Can we make this code more efficient? Can we combine any of these lines? Try using an OR to combine both conditions in which Player A scores a point. Do the same for both conditions in which Player B scores a point. 

Give the students a chance to work this out on their own. 

Combining the conditions in which each player wins, gives us: 

* If (Coin A is true AND Coin B is true) OR (Coin A is false AND Coin B is false), add one to Player A score. 
* If (Coin A is true AND Coin B is false) OR (Coin A is false AND Coin B is true), add one to Player B score. 

Note: Just as you do for math expressions with multiple operators, use parentheses to make it clear how the conditions and statements are grouped together.

The students are by now familiar with the MakeCode blocks. As they think through their algorithms, they may even have started to visualize the blocks they might use.  Visualizing the blocks as they pseudocode can help them with the logical steps of their program.  It can also help them to visualize and recognize the big picture of their code as well as the details.

Using blocks to start coding these two conditionals as currently written, might look like this: 

```block
let CoinAHeads = false
let CoinBHeads = false
if ((CoinAHeads && CoinBHeads) || (!CoinAHeads && !CoinBHeads)) {}
```

Then add one to Player A score.

```block
let CoinAHeads = false
let CoinBHeads = false
if ((CoinAHeads && !CoinBHeads) || (!CoinAHeads && CoinBHeads)) {}
```

Then add one to Player B score. 

Though this code will work as we want it to, it’s a lot of code. It is good practice to keep your code as simply as possible. Let’s see how we can do just that. 

## Booleans and simplifying code 

A boolean can have only one of two values: True or False. Conditionals like 'if...then' check whether a condition is true. Notice that the default condition for the 'if...then' blocks is true. In other words, the 'if...then' blocks will check to see whether whatever condition you place there is true.

```block 
basic.forever(() => { if (true) { } })
```

So now we have:

```block
let CoinAHeads = false
let CoinBHeads = false 
basic.forever(() => {
    if ((CoinAHeads && CoinBHeads) || (!CoinAHeads && !CoinBHeads)) {}
    if ((CoinAHeads && !CoinBHeads) || (!CoinAHeads && CoinBHeads)) {}
})
```

Can we simplify it even more? For this particular program, since we are checking to see if the conditions `CoinAHeads` and `CoinBHeads` are the same, whether both true or both false, we can use a logic equals block to simplify our code to: 

```block
let CoinAHeads = false
let CoinBHeads = false
if (CoinAHeads == CoinBHeads) {}
```

Then add one to Player A score. 

What about our other big block of code for the conditions for a Player B win? We could simplify that to:
 
```block
let CoinAHeads = false
let CoinBHeads = false
if (CoinAHeads != CoinBHeads) {}
```

Then add one to Player B score.

We don’t need to do this! Since the only other option to being equal is to be not equal, we can simply do this:

```block
let CoinAHeads = false
let CoinBHeads = false
let PlayerAScore = 0
let PlayerBScore = 0

basic.forever(() => {
    if (CoinAHeads != CoinBHeads) {
        PlayerAScore += 1
    } else {
        PlayerBScore += 1
    }
})
```

## Random functions

We use a coin flip to decide things because the result is random, meaning the result happens without any conscious decision or direction. We use dice and game spinners for the same reason. The results are not predetermined or directed in any way.

So, how do we get a random flip in code? Most computer programming languages have a built in function that will select a random number given a range of values. Microsoft MakeCode has a block for this.  And it also has a block for getting a random true or false value.

We will call on this built in function to get a random true or false value for each flip of a coin in the next [activity](/courses/csintro/booleans/activity).

Our basic pseudocode for our 'double coin flipper' could look like this: 

1. Use the random function to get a true/false value for Coin A.
2. Use the random function to get a true/false value for Coin A.
3. Compare the current values of Coin A and Coin B.
4. If the current true/false values of Coin A and Coin B are the same, add a point to Player A’s score.
5. Otherwise, the current true/false values of Coin A and Coin B must be different, so add a point to Player B’s score.
6. When players are done with their double coin flipping, show the final scores for each player.
