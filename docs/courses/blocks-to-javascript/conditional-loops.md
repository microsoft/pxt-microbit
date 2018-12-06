# Conditional Loops

## ~ avatar

Work with your conditional loop blocks in JavaScript and make them do more.

## ~

The conditional loops let you run some part of a program multiples times while some condtion remains true. In MakeCode these conditional loops are in the **[while](/blocks/loops/while)**, **[for](/blocks/loops/for)**, and **[repeat](/blocks/loops/repeat)** blocks:

```block
while (true) {}
```

```block
for (let index = 0; index <= 4; index++) {}
```

```block
for (let i = 0; i < 4; i++) {}
```

In JavaScript, the code inside the loops is surrounded by a loop statement, its condition, and some braces `{ }`. The condition says whether the loop continues or stops and is inside parentheses ``( )`` right next to the loop statement. Go to the editor and drag out the three blocks shown above, then switch to JavaScript. You'll see that the code for them, without the comments, is just like this:

```typescript
// the 'while' loop of course
while (true) {
    // repeated code right here
}

// the for loop is here
for (let index = 0; index <= 4; index++) {
    // repeated code right here
}

// this is a 'repeat' loop, really!
for (let i = 0; i < 4; i++) {
    // repeated code right here
}
```

One thing you may not have expected is that the ``||loops:repeat||`` block is actually a ``for () { }`` loop in JavaScript. We'll talk about that a little later.

## While Loop

The ``||loops:while||`` loop is probably the simplist of the loops. It has just a single condition that, while true, causes the code inside the loop to continue to run. The loop here will show the number in the ``count`` variable on the screen until ``count`` reaches the value of `5`.


```block
let count = 0
while (count < 5) {
    basic.showNumber(count)
    count += 1
    basic.pause(500)
}
```

In JavaScript, the code inside the loop is surrounded by the **while** loop, its condition, and the braces `{ }`. The condition is inside parentheses right next to the **while** statement. Go ahead and copy this code into the JavaScript editor:

```typescript
let count = 0
while (count < 5) {
    basic.showNumber(count)
    count += 1
    basic.pause(500)
}
```

Watch in the simulator and see how the value of ``count`` goes from `0` to `4`.

Alright, now take the ``while (count < 5)`` out from the beginning of the loop and place at the end of loop on the same line as the `}` that closes the loop. Your loop should look like:

```typescript-ignore
let count = 0
 {
    basic.showNumber(count)
    count += 1
    basic.pause(500)
} while (count < 5)
```

You'll have a squiggle at the end of the line with ``} while (count < 5)`` which means we have invalid code. Don't worry, we'll fix that right now! At the beginning of the loop, insert the word ``do`` just before left brace `{`. The error should go away and the simulator will count from `0` to `4` just like before when the word ``while`` was at the beginning of the loop. 

```typescript
let count = 0
do {
    basic.showNumber(count)
    count += 1
    basic.pause(500)
} while (count < 5)
```

What we've just done is created a **do** loop or, as it's sometimes called, a **do while** loop. It's a **while** loop with its outsides flipped around. It works just like a regular **while** except that the loop's condition isn't checked until at the end. It expects that when the first time the code in the loop is run, the condition in the loop is satisfactory to run the code inside. However, if the value for ``count`` was initialized to something invalid, say ``let count = 5``, before loop, then the code inside will run even for a value we don't want. The **do** loop isn't used very often but it can be useful in some cases.

## For Loop

The ``||loops:for||`` loop block is super useful since it gives you both an index value and a condition to stop the loop with. The index value let's you _iterate_, or move, from one sequential value to the next. The condition for the loop can include the index value as part of it's check to continue the loop, like when the last value you want to use is reached. For our example that counts from `0` to `4`, we can just use the index as our count. Pull out the blocks for this example in the Blocks editor:

```block
for (let index = 0; index <= 4; index++) {
    basic.showNumber(index)
    basic.pause(500)
}
```

What if we want to change the direction of iteration and display the values of `4` to `0` by iterating in the negative direction (a decreasing index)? Switch over to the JavaScript editor and let's make this change. In the **for** statement line, change ``index = 0`` to ``index = 4``. Then, change the condition from ``index <= 4`` to ``index >= 0``. Finally, change the iterator ``index++`` to ``index--``.


```typescript
for (let index = 4; index >= 0; index--) {
    basic.showNumber(index)
    basic.pause(500)
}
```

You'll now see in the simulator that the value displayed on the screen counts down from `4` to `0`. This form of the **for** loop is too complicatied for blocks so when you switch back to the Blocks editor the entire loop is shown in a grey block.

```block
for (let index = 4; index >= 0; index--) {
    basic.showNumber(index)
    basic.pause(500)
}
```

### For Loop Condition

The condition in the **for** loop statement doesn't have to use the loop's index. You can use some other conditional value if you want. Let's restore our first example and pull in a ``||input:on button A pressed||``. Make a variable called ``showNumbers`` and set it to `true`. Inside ``||input:on button A pressed||`` set ``showNumbers`` to ``false``.

```blocks
let showNumbers = true
input.onButtonPressed(Button.A, function () {
    showNumbers = false
})
for (let index = 0; index <= 4; index++) {
    basic.showNumber(index)
    basic.pause(500)
}
```

The button press will change ``showNumbers`` to `true` but it doesn't do anything to the loop. Switch to JavaScript and change the condition in the **for** loop from ``index <= 4`` to be just ``showNumbers``. This is equivalent to the check for ``showNumbers == true`` but it's a shorter way to say it.

```typescript
let showNumbers = true
input.onButtonPressed(Button.A, function () {
    showNumbers = false
})
for (let index = 0; showNumbers; index++) {
    basic.showNumber(index)
    basic.pause(500)
}
```

Now that we changed the condition from using the index, the loop will keep counting forever until you press button **A**.

## Repeat Loop

So, as you saw earlier, the ``||loops:repeat||`` loop block actually turns out to be a **for** loop. Yes it's true, but this form of the **for** loop is used to simply repeat the code inside the loop. The code inside doesn't do anything with the index value used in the **for** loop statement.

```block
let count = 0
for (let index = 0; index < 5; index++) {
    basic.showNumber(count)
    count += 1
    basic.pause(500)
}
```

Let's modify the code for the ``||loops:repeat||`` block just a little. Pull out the block for the ``||loops:repeat||`` loop and the blocks inside it for counting and displaying the number `0` to `4`. Switch to JavaScript.

```typescript
let count = 0
for (let index = 0; index < 5; index++) {
    basic.showNumber(count)
    count += 1
    basic.pause(500)
}
```

Add the index value of ``index`` to ``count`` inside ``basic.showNumber()``. Also, delete the line for ``count += ``. Your code should now look like this:

```typescript
let count = 0
for (let index = 0; index < 5; index++) {
    basic.showNumber(count + index)
    basic.pause(500)
}
```

When run in the simulator, this code behaves just like before except that you're now increasing the value shown on the screen with the loop's index rather than with just the value of ``count`` itself. Now, switch back to Blocks and see what it looks like:

```block
let count = 0
for (let index = 0; index < 5; index++) {
    basic.showNumber(count + index)
    basic.pause(500)
}
```

Ah! Our original ``||loops:repeat||`` loop changed to a ``||loops:for||`` loop! Why? Well, this is because the code inside the loop used the index from the loop statement. This makes the loop more complex and it's no longer just simply repeating what's inside of it. 
