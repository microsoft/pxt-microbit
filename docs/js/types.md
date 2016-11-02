# Types

For programs to be useful, we need to be able to work with some of the simplest units of data: 
numbers, strings, structures, boolean values, and the like.

# Boolean

The most basic datatype is the simple true/false value, which is called a `boolean` value.

```ts
let isDone: boolean = false;
```

# Number

### ~ hint 
In JavaScript, `numbers` are floating point values.
However, for the @boardname@, `numbers` are integer values.
### ~

Integer values can be specified via decimal, hexadecimal and octal notation:

```ts
let decimal: number = 42;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

# String

As in other languages, we use the type `string` to refer to textual data.
Use double quotes (`"`) or single quotes (`'`) to surround string data.

```ts
let color: string = "blue";
color = 'red';
```

You can also use *template strings*, which can span multiple lines and have embedded expressions.
These strings are surrounded by the backtick/backquote (`` ` ``) character, and embedded expressions are of the form `${ expr }`.

```ts
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`
```

This is equivalent to declaring `sentence` like so:

```ts
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = "Hello, my name is " + fullName + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month."
```

# Array

Arrays allow you to work with an expandable sequence of values, addressed by an integer-valued index.
Array types can be written in one of two ways.
In the first, you use the type of the elements followed by `[]` to denote an array of that element type:

```ts
let list: number[] = [1, 2, 3];
```

The second way uses a generic array type, `Array<elemType>`:

```ts
let list: Array<number> = [1, 2, 3];
```

### ~hint
For the @boardname@, all elements of an array must have the same type.
### ~


# Enum

A helpful addition to the standard set of datatypes from JavaScript is the `enum`.
As in languages like C#, an enum is a way of giving more friendly names to sets of numeric values.

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

By default, enums begin numbering their members starting at `0`.
You can change this by manually setting the value of one of its members.
For example, we can start the previous example at `1` instead of `0`:

```ts
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```

Or, even manually set all the values in the enum:

```ts
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```

# Any

The TypeScript type `any` is not supported in the @boardname@.


# Void

`void` is the absence of having any type at all.
You may commonly see this as the return type of functions that do not return a value:

```ts
function warnUser(): void {
    basic.showString("This is my warning message");
}
```

Declaring variables of type `void` is not useful.

# Type Inference

In TypeScript, there are several places where type inference is used to provide type information when there is
no explicit type annotation. For example, in this code

```ts
let x = 3;
let y = x + 3
```

The type of the `x` variable is inferred to be `number`. Similarly, the type of `y` variable also is inferred to be `number`.
This kind of inference takes place when initializing variables and members, 
setting parameter default values, and determining function return types.


### ~button /js/classes
NEXT: Classes
### ~