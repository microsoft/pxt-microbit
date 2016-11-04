# Frequently asked questions

# What is the language supported for the @boardname@?

For the @boardname@, we support a "static" subset of TypeScript (itself a superset of JavaScript):

## Supported language features

* variables with `let`, `const`, and `var`
* functions with lexical scoping and recursion
* top-level code in the file; hello world really is `console.log("Hello world")`
* `if ... else if ... else` statements
* `while` and `do ... while` loops
* `for(;;)` loops (see below about `for ... in/of`)
* `break/continue`; also with labeled loops
* `switch` statement (on numbers only)
* `debugger` statement for breakpoints
* conditional operator `? :`; lazy boolean operators
* namespaces (a form of modules) 
* all arithmetic operators (including bitwise operators); note that in microcontroller targets
  all arithmetic is performed on integers, also when simulating in the browser
* strings (with a few common methods)
* [string templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) (`` `x is ${x}` ``)
* arrow functions `() => ...`
* classes with fields, methods and constructors; `new` keyword
* array literals `[1, 2, 3]`
* enums

## Unsupported language features

We generally stay away from the more dynamic parts of JavaScript. 
Things you may miss and we may implement:

* exceptions (`throw`, `try ... catch`, `try ... finally`)
* `for ... of` statements
* object literals `{ foo: 1, bar: "two" }`
* method-like properties (get/set accessors)
* class inheritance

For JS-only targets we may implement the following:

* regular expressions
* classes implementing interfaces

Things that we are not very likely to implement:

* file-based modules (`import * from ...`, `module.exports` etc); we do support namespaces
* spread operator
* `yield` expression and ``function*``
* `await` expression and `async function`
* `typeof` expression
* tagged templates ``tag `text ${expression} more text` ``; regular templates are supported
* binding with arrays or objects: `let [a, b] = ...; let { x, y } = ...`
* `with` statement
* `eval`
* `delete` statement
* `for ... in` statements
* JSX (HTML as part of JavaScript)