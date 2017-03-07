# Return

Exit a function.

### @parent javascript/statement
 

The return statement exits a [function](/js/function) and returns a value to the code that called the function.

### Touch Develop syntax

return *expression*

### Square function

```
/**
 * // return the value x * x
 * @param x TODO
 */
export function square(x: number) : number {
    let result: number
    return x * x
    return result
}
```

### The type of *expression*

The type of *expression* should match the declared return type of the function; in the above example, the return type is Number and we see that the return expression `x * x` is a Number since the input parameter `x` is a Number.

### Storing the returned value

The following code calls the `square` function with the number 42 and stores the output parameter in the `result` variable:

```
let result1 = square(42)
```

`result` is the default variable name for the function output, as specified in the function

### Lessons

[transformers](/lessons/transformers)

### See also

[function](/js/function), [calling functions](/js/call), [function parameters](/js/functionparameters)

