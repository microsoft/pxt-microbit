# Assignment Operator

Use an equals sign to make a [variable](/blocks/variables/var) store a [number](/types/number), [string](/types/string), or other [type](/types) of value.

When you use the equals sign (**=**) to store something in a variable, the equals sign is called
an *assignment operator*, and what you store is called a *value*.

When you work in JavaScript or Python the equals sign is used:

```typescript-ignore
item = 3
```

## The 'set' block

In blocks, a variable assignment happens with the ``||variables:set||`` block when you set a value to a [variable](/blocks/variables/var).

```block
let item = 3
```

### ~ hint

#### Setting a variable using the Toolbox

In the ``||variables:Variables||`` category of the **Toolbox** you can create or choose a variable to assign:

![Setting a variable to a value](/static/blocks/variables/assign.gif)

### ~

## Storing numbers in variables

This program makes the variable `item` equal `5` and then shows it on the [LED screen](/device/screen).

````blocks
let item = 5
basic.showNumber(item)
````

## Storing strings in variables

This program makes the variable `name` equal `Joe` and then shows it on the [LED screen](/device/screen).

````blocks
let name = "Joe"
basic.showString(name);
````

## Notes

You can use the assignment operator with variables of 
every [type](/types). A *type* is which kind of thing
a variable can store, like a number or string.

## See also

[variable](/blocks/variables/var), [types](/types)

