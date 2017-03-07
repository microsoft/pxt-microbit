# Function Parameters

How to use parameters to pass info in and out of an function.

### @parent javascript/function
 

A [function](/js/function) can have multiple input parameters and/or a single output parameter.  The parameters must be one of the supported variable [types](/js/types).

When you first [create a function](/js/function), it looks like this: 
```
export function doStuff() {
}
```

### Add a function parameter

1. Open your script (if needed) and then click `script` in the upper-right corner.

2. Under **code** click your function name.

3. Click the function name in your code (this opens the function panel).

4. Click **add input parameter** or **add output parameter**. The parameter is added to your function.

#### Input parameters

The default type for an input parameter is [Number](/reference/types/number):

```
export function oneInput(p: number) {
}
```

To change the default type, click the type ([Number](/reference/types/number) in this case) and change it to [String](/reference/types/string), [Boolean](/reference/types/boolean), or [Image](/reference/image/image). You can add multiple input parameters to a function.

#### Output parameter

the default type for an output parameter is [Number](/reference/types/number):

```
export function output() : number {
    let r: number
    return 42
    return r
}
```

To change the default type, click the type ([Number](/reference/types/number) in this case) and change it to [String](/reference/types/string), [Boolean](/reference/types/boolean), or [Image](/reference/image/image).

### Inputs and output function

The following sample function has two inputs and one output parameter (all are the Number type):

```
export function inputsAndOutput(p: number, q: number) : number {
    let r: number
    return p + q
    return r
}
```

### See also

[call a function](/js/call), [create a function](/js/function), [return](/js/return)

