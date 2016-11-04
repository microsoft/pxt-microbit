# Call a function

The simplest way to get started in JavaScript with your @boardname@ is to
call one of the @boardname@'s built-in JavaScript functions. Just like Blocks
are organized into categories/drawers, the @boardname@ functions are organized by
namespaces, with names corresponding to the drawer names.  The `basic` namespace 
contains a number of helpful functions, such as:

```typescript
basic.showString("Hello!")
```

If you want to see all functions available in the `basic` namespace, simply type `basic`
followed by `.` and a list of all the functions will appear. 

![](/static/mb/js/basicFuns.png)

This feature is known as "Intellisense". Continue typing to select one of the functions, 
or click on one of the functions to select. You also narrow down the set of functions by typing, as below:

![](/static/mb/js/basicIntell.png)

You can type anything to see what Intellisense will find for you. Here's an example
of what happens when you type the word `for`:
![](/static/mb/js/forIntell.png)

## Function parameter values

You might have noticed that the call `showString` above takes one parameter value, 
the string to be scrolled on the LED screen. There is a second (optional)
parameter that controls the speed of the scroll. Try this:

```typescript
basic.showString("Hello!",50)
```

Intellisense shows all the available parameters for a function. 

## Left and right parentheses, please!

Whenever you want to call a function, you give the name of the function
followed by `(` and ending with `)`. Inbetween the left and right
parentheses go the function arguments.  If a function has zero arguments, you still
need the parentheses in order to call the function. For example

```typescript
basic.clearScreen()
```

It's a syntax error to have a left parenthesis without the "closing" right parenthesis:

```
basic.clearScreen(
```

### ~button /js/sequence
NEXT: Sequencing Commands
### ~
