# love meter blocks quiz answers

The answers to the love meter quiz. 

This is the answer key for the [love meter quiz](/lessons/love-meter/quiz).

## 1. What does `on pin pressed(P0)` do?

<br/>

It's a method that runs code when the user holds the GND pin with a finger of one hand and presses pin P0, completing a circuit.

## 2. Write the code.

Create a condition for `on pin pressed (P0)`.

```blocks
input.onPinPressed(TouchPin.P0, () => {
    
})
```

## 3. What does this line of code doing?

```blocks
let x = Math.randomRange(0, 9)
```


It stores random number between 0 and 9 then stores that number in a variable.

## 4. Why do you have to add 1 to variable x?

```blocks
let item = 0;
item = 0;
basic.showNumber(item + 1);
```

You have to add 1 if you want to generate a random number between 1 and 10 .

## 5. Why do you have to hold ground (GND) to make this work on the @boardname@?


You have told GND to complete the circuit.

