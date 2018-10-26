# Writing Functions

## ~ avatar

Create functions to keep the code you want to use again. You can make really useful functions when you write them in JavaScript.

## ~

Often you'll want to use some portion of code to do a similar task multiple times. Rather than putting that code in your program at multiple places, you can put it in a function and reuse it!

## The function

You might have some code that shows your name on the screen:

```typescript
basic.showString("My name is: ")
basic.pause(300)
basic.showString("Super Coder")
```

If you want to display your name from multiple places in your program, you need to repeat these three lines at each place. With a function you can put all of the code for showing your name in just one place and reuse it by _calling_ the function. A function looks like this:

```typescript
function showMyName() {
    basic.showString("My name is: ")
    basic.pause(300)
    basic.showString("Super Coder")
}
```

The function uses the ``function`` statement, it has a name, **showMyName**, and the code for showing your name is inside brackets `{` and `}`. Code that is put inside the function, between the brackets, is called the _body_ of the function.

To use the function, you _call_ it. This means that you use the function name at some place in the program to actually run the code inside the function. It works like this:

```typescript
// A function to show my name
function showMyName() {
    basic.showString("My name is: ")
    basic.pause(300)
    basic.showString("Super Coder")
}

// Countdown to show my name
let count = 10
while (count > 0) {
    basic.showNumber(count)
    count -= 1
}
// show my name now...
showMyName()
// wait 2 seconds and show my name again
basic.pause(2000)
// show my name again...
showMyName()
```

You see that we used, or called, the function **showMyName** two times and didn't need to write those lines of code to display your name over again.

## Parameters

You can see that a function is really useful when you want to reuse some code, especially if it's a lot of code! But wait, functions are even more powerful when you can send them some information to work with!

The **showMyName** function would really be awesome if it could display anyone's name. So, how can we make it do that? Well, let's use a _parameter_. A parameter is like a variable but it's a special varialble only for the function. It allows your program to send, or _pass_, a value to the function. Just like a variable, the parameter has a [type](/types) for the value passed in it.

Let's rename the **showMyName** function to just **showName** and give it a parameter for anyone's name:

```typescript
// A function to show anyone's name
function showName(name: string) {
    basic.showString("My name is: ")
    basic.pause(300)
    basic.showString(name)
}
```

The parameter for **showName** has the name of, well, ``name`` of course. The parameter has a type of [string](/types/string) so it can have the text of anyone's name. The function is used, or called, with this new name and the text for someone's name is passed to it inside the function's parentheses `(` and `)`.

Inside the function, the parameter is used with ``basic.showString(name)``. The text value in the parameter will display on the screen rather than the actual, or _literal_ text of someone's name like before. This is how a name is _passed to_ and _used by_ this function. Now that the function has its new, extra power, let's use it!

```typescript
// my friend's name
let friendName = "Ace Debugger"

// A function to show anyone's name
function showName(name: string) {
    basic.showString("My name is: ")
    basic.pause(300)
    basic.showString(name)
}

// show my name...
showName("Super Coder")
// wait 2 seconds and show my friend's name
basic.pause(2000)
// show my friend's name...
showName(friendName)
```

Like before, we used the function two times except now we are sending the names to the function. The first call to **showName** uses a literal text string `"Super Coder"` as the value for the ``name`` parameter. Since the parameter is a string, we can also send a value from another string variable to the function. This is done when ``friendName`` is passed to **showName**.

Since your function now uses a parameter, it's too complicated to convert into a block. So, a grey block is shown for it if you switch over to **Blocks** view.

```blocks
// A function to show anyone's name
function showName(name: string) {
    basic.showString("My name is: ")
    basic.pause(300)
    basic.showString(name)
}

// show my name...
showName("Super Coder")
```

## Return value

Now you probably think that functions can't possibly be anymore awesome, right? Well, they get better still. A function can give you back a value after it finishes doing it's work. How amazing is that? This is called a _return value_ which is the result of some work or computation the function did. Not all functions have or need a return value. The function for showing a name just displayed it on the screen. It didn't need to give your program back any result. You can make functions though that work on some data and provide you with a result.

As an example, you might want to know what the total for a series of numbers is, starting from `1` to `100`. This could be calculated in a loop:

```typescript
let sum = 0;
for (let i = 1; i <= 100; i++) {
    sum += i;
}
basic.showNumber(sum)
```

A better way to do this is to make a function that will add up the numbers. We could even give it a parameter so the maximum number is passed in and not limited to just `100`:

```typescript
function seriesSum(n: number) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i
    }
    basic.showNumber(sum)
}

seriesSum(100)
basic.pause(2000)
seriesSum(25)
```

What if you didn't want to show the series total but wanted to use it somewhere else in the program? We can get the number by adding a return value to the function.

```typescript
function seriesSum(n: number) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i
    }
    return sum
}
```

This is done with the ``return`` statement along with the value to return. The return value could be a literal value such as `1`, or a variable like ``sum``. We can now use the return value from **seriesSum** in other parts of the program.

```typescript
let total = 0

function seriesSum(n: number) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i
    }
    return sum
}

total = seriesSum(100)
basic.showNumber(total)
```

Let's use the function multiple times in different ways:

```typescript
let total = 0

function seriesSum(n: number) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i
    }
    return sum
}

// add ten to the sum
total = seriesSum(100) + 10
basic.showNumber(total)
basic.pause(2000)
// add two sums together
total = seriesSum(100) + seriesSum(25)
basic.showNumber(total)
basic.pause(2000)
// use the sum of the last series as the maximum
total = seriesSum(total)
basic.showNumber(total)
basic.pause(2000)
// use the return code of the function as a parameter
basic.showNumber(seriesSum(100))
```

Your getting the idea that functions are really useful and quite versatile in what they can do and how you can use them!

## Functions and code changes

One real advantage to using functions is to limit _side-effects_ when modifying your code. You might realize that the code inside the **seriesSum** function could be replaced with a simple math formula that calculates the sum in one operation. The entire ``for`` loop can be replaced to make the function body really simple:

```typescript
function seriesSum(n: number) {
    return (n * (n + 1)) / 2
}
```

If a program wasn't using a function to calculate the series sum and you wanted to make this change, you would need to find every place in the program that had this `for` loop. That really increases both the work you have to do and the chances of making errors in your code. By using a function, a code change is just in one place and the rest of your program doesn't need to be changed. That helps limit where any new errors or strange behaviors might happen. 