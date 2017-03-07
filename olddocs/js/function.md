# Create a Function

How to define a function with input and output parameters.

### @parent javascript/language
 

A function is a unit of code that performs a specific task and returns a result.

Functions are ideal when you need to perform an action multiple times. Instead of repeating a block of code in your script, you can put the code in a function and simply [call the function](/js/call) when needed.

*Why use functions?* Functions makes your code easier to read, debug, and update.

### Add a function

To add a function to a Touch Develop script:

1. Open a script and then click `script` (in the upper-right corner).

2. Click `+` **add new**.

3. Click **function()**.

A new function appears, like this:

```
export function doStuff(p: number) {
}
```

Functions begin with the `function` keyword and end with `end function`. The function name appears after the `function` keyword (in this case, `do stuff`).

### ~hint 

Click the function name to edit the function properties (i.e. change the name or add parameters - see below).

### ~

### Function components

Functions have three parts:

*  [input and output parameters](/js/functionparameters)
* the function *body* (the code that performs a task)

- one or more [return](/js/return) statements (the output of the function)

#### Example function

```
/**
 * // returns the square of the input parameter x
 * @param x TODO
 */
export function square(x: number) : number {
    let result: number
    return x * x
    return result
}
```

In the above code...

* ``x `` is the [input parameter](/js/functionparameters) ([Number](/reference/types/number) type)
* ``result`` is the [output parameter](/js/functionparameters) ([Number](/reference/types/number) type)
* `return x * x` is the function body (which returns the value of the expression `x * x`)

### Add function parameters

1. Open your function (if needed). To do this, open your script and then click `script` (in the upper-right corner).

2. Under **code** click your function name.

3. Click the function name in the code window. This opens the function panel.

4. Click **add input parameter** or **add output parameter**. The parameter is added to your function.

Click the parameter name to rename it and click the [type](/js/types) to change the variable type. For more info, see [function parameters](/js/functionparameters).

### ~hide

### Extract code into a function

If you've already written some code that you'd like to have in a function, you can extract the code. Here's how:

1. Click the first line of code that you want to extract.

2. Press and hold the Shift key, and then press the Down arrow on your keyboard to select multiple lines of code.

3. In the block editing window, scroll down to **extract selection into function** and click `extract`.

### ~

### Function documentation

Use a [comment](/js/comment) at the beginning of your functions to describe the function. When you insert a function into your code, the comment text appears in the help area of the Code Keyboard.

### See all your functions

To see all the functions in a script, open the script and then click `script` (in the upper-right corner). All of the functions in your script appear under **code**.

### ~hide

### Private functions

If you don't want people to see the code in your function, you can make the function private. To do this, open the function, click the function name, and then mark the **private function** check box. Private functions have a locked icon instead of a play icon.

### ~

### Lessons

[digital pet](/lessons/digital-pet)

### See also

[function parameters](/js/functionparameters), [call a function](/js/call), [return from a function](/js/return)

