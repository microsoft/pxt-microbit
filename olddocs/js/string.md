# String

a piece of text.

### @parent javascript/language

A *String* is a sequence of characters. For the @boardname@, ASCII character codes 32 to 126 are supported; letters, digits, punctuation marks, and a few symbols. All other character codes appear as a ? on the [LED screen](/device/screen).

### Declare a string

Use the [var statement](/reference/variables/var) and the [assignment operator](/reference/variables/assign) `:=` to declare a new *local* string variable. Like this:

```
let str = "this is a string"
```

To declare a string using the [Touch Develop editor](/js/editor):

1. Click `var` (on the Code Keyboard).

2. Type a name for your new string variable.

2. Click on the right side of the `:=` operator.

3. Type `"` (or click `"abc"`) and then type a string like `hello`.

4. Click the check mark.

Your code should look something like this:

```
let salutation = "Hello"
```

### The function `show string`

Use [show string](/reference/basic/show-string) to display a string on the [LED screen](/device/screen). If the string is multiple characters, the string scrolls right to left. The following example displays `Hello world!` on the @boardname@ screen:

```
basic.showString("Hello world!", 100)
```

The first parameter of `show string` specifies the string, and the second parameter specifies the number of milliseconds between scrolling by one LED column - the larger the value, the slower the scroll will be.

### More string functions

Want to compare or concatenate strings? Check out the [string functions](/reference/types/string-functions).

### Global string variables

Unlike [local variables](/reference/variables/var), global variables are accessible across functions and in nested code blocks. To find out how to declare a global string variable, see [global variables](/js/data).

### Lessons

[letter up](/lessons/letter-up)

### See also

[local variables](/reference/variables/var), [global variables](/js/data), [string functions](/reference/types/string-functions), [Number](/reference/types/number), [show string](/reference/basic/show-string)

