# String

a piece of text.

### @parent blocks/language

A *String* is a sequence of characters. For the @boardname@, ASCII character codes 32 to 126 are supported; letters, digits, punctuation marks, and a few symbols. All other character codes appear as a ? on the [LED screen](/device/screen).

### Create a string variable

```block
let salutation = "Hello";
```

To create a variable that holds a string:

1. Click `Variables` (in the Block drawer).

2. Type a name for your new string variable by clicking the down arrow, then click New Variable. Then type the variable name "salutation"

2. Drag a string block on the right side of the operator.

3. Click `"Hello"` and then type a string like `hello`.

Your code should look something like this:

```block
let salutation = "Hello";
```

### The function `show string`

Use [show string](/reference/basic/show-string) to display a string on the [LED screen](/device/screen). 
If the string is multiple characters, the string scrolls right to left. The following example displays `Hello world!` on the @boardname@ screen:

```block
basic.showString("Hello world!");
```

The  parameter of `show string` specifies the string

### See also
 
[string functions](/reference/types/string-functions), [Number](/reference/types/number), [show string](/reference/basic/show-string)

