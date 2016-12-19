# Boolean

true or false.

A Boolean has one of two possible values: `true`; `false`.  Boolean (logical) operators (*and*, *or*, *not*) take Boolean inputs and yields a Boolean value. Comparison operators on other types ([numbers](/reference/types/number), [strings](/reference/types/string) yields a Boolean value.

The following blocks represent the true and false Boolean values, which can be plugged in anywhere a Boolean value is expected:

```blocks
true;
false;
```

The next three blocks represent the three Boolean (logic) operators:

```blocks
true && false;
true || false;
!true;
```

The next six blocks represent comparison operators that yield a Boolean value. Most comparisons you will do involve [numbers](/reference/types/number):

```blocks
42 == 0;
42 != 0;
42 < 0;
42 > 0;
42 <= 0;
42 >= 0;
```

Boolean values and operators are often used with an [if](/blocks/logic/if) or [while](/blocks/loops/while) statement to determine which code will execute next. For example:

### Functions that return a Boolean

Some functions return a Boolean value, which you can store in a Boolean variable. For example, the following code gets the on/off state of `point (1, 2)` and stores this in the Boolean variable named `on`. Then the code clears the screen if `on` is `true`:

### Boolean operators

Boolean operators take Boolean inputs and evaluate to a Boolean output:

### Conjunction: `A and B`

`A and B` evaluates to `true` if-and-only-if both A and B are true:

```blocks
false && false == false;
false && true == false;
true && false == false;
true && true == true;
```

### Disjunction: `A or B`

`A or B` evaluates to `true` if-and-only-if either A is true or B is true:

```blocks
false || false == false;
false || true == true;
true || false == true;
true || true == true;
```

### Negation: `not A`

`not A` evaluates to the opposite (negation) of A:

```blocks
!false == true;
!true == false;
```

### Example

This example turns on LED `3 , 3`, if LEDs `1 , 1` and `2 , 2` are both on:

```blocks
if (led.point(1,1) && led.point(2,2)) {
   led.plot(3,3)
}
```

### Comparisons of numbers and strings

When you compare two Numbers, you get a Boolean value, such as the comparison `x < 5` in the code below:

```blocks
input.onButtonPressed(Button.A, () => {
    let x = Math.random(5)
    if(x < 5) {
    basic.showString("low");
    } else { 
    basic.showString("high");
    }
})
```

See the documentation on [Numbers](/reference/types/number) for more information on comparing two Numbers. You can also [compare strings](/reference/types/string-functions) using the `equals` function.

### See also

[if](/blocks/logic/if), [while](/blocks/loops/while), [number](/reference/types/number)

