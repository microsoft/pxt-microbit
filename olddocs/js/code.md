# function

A function with inputs and outputs.

### @parent javascript/language
 

To add a **functions** to your script, click the `script` button, then click the `+` `add new function` button

### functions

A **function** takes [inputs](/actionparameters), runs code and (optionally) returns an output.

TouchDevelop functions are similar to `mathematical functions`. Consider the function that computes the square of `x`: `square(x) = x*x`. In code, it would look like this:

```
export function square(x: number) : number {
    let result: number
    return x * x
    return result
}
```

### private function

An function can be marked as **private** in the properties. A private function is not visible outside a library (if the script is a library)

### documentation

The comment(s) at the beginning of a function used to provide a description of its purpose. This text will show in the help area when the function is called from the code editor. This is particularly useful for [libraries](/libraries).

