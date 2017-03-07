# Call a Function

How to call a function in your code.

### @parent javascript/language
 

Type a function name in your code to call an existing [function](/javascript/function) in your script.

### Call a function

1. In the Touch Develop editor, click a line of code to open the on-screen [Code Keyboard](/javascript/editor).

2. Click `code` to see the functions in your script.

2. Click the function that you want to call.

3. Click `store in var` to store the return value in a variable.

### Example: the square function

Here's a function called `square`, with a [Number](/reference/types/number) input parameter:

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

The following code calls the `square` function, passing it an input parameter (`x`), and storing the return value in the `result` variable:

### ~hide

```
let x1 = 2
```

### ~

```
let result1 = square(x1)
```

Or this code, which displays the result of the `square` function (without first storing the value in a variable):

```
basic.showNumber(square(x1), 150)
```

### See all your functions

To see a list of the functions in a script, open the script and then click `script` (in the upper-right corner). All of the functions appear under the **code** heading. Click on a function to open it in the editor.

### See also

[function parameters](/javascript/functionparameters), [create a function](/javascript/function), [return statement](/javascript/return)

