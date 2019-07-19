# Boolean elements

Whether creating equations in Boolean algebra or using them in your programs, you'll form both simple and complex logical expressions that use basic operations to combine the logical conditions.

## Notation

Boolean (logical) equations are expressed in a way similar to mathmatical equations. Variables in Boolean expressions though, have only two possible values, ``true`` or ``false``. For an equation using a logical expression, the equivalant sides of the equal sign ,``=``, will be only ``true`` or ``false`` too.

The following list shows the basic notation elements for Boolean expressions.

* ``~A``: the inverse (**NOT**) of ``A``, when ``A`` is ``true``, ``~A`` is ``false``
* ``A + B``: the value of ``A`` **OR** ``B``
* ``A · B``: the value of ``A`` **AND** ``B``
* ``A ⊕ B``: the value of the exclusive OR (**XOR**) of ``A`` with ``B``
* ``Q``: equivalent result (OUTPUT) value of a logical expression

A resulting value, ``Q``, from a logical expression in is shown like:

``Q`` = ``A + B``

An equation to show logically equivalent expressions (where both sides have the same resulting value) can look like this:

``~(A + B)`` = ``~A · ~B``

## Logical operators

All Boolean expressions result from a combination of conditions and operators. These operators join individual conditons together and evaluate into a single ``true`` or ``false`` condition. The following are the basic logical operators. Their use in both Boolean algebra and in code is shown along with their truth table.

### Identity

Identity means that a result value is the same as the condition itself.

``Q = A``

```block
let A = false
let Q = A
```

#### Example - Blink LEDs on press

```blocks
let A = false
basic.forever(function () {
    A = input.buttonIsPressed(Button.A)
    if (A) {
        basic.showIcon(IconNames.Chessboard)
    } else {
        basic.clearScreen()
    }
    basic.pause(100)
})
```

#### Truth table

A | A
-|-
F | F
T | T

### NOT (Negation)

The NOT operator is called negation or the inverse. It takes a single logical value and makes it have the opposite value, ``true`` goes to ``false`` and ``false`` goes to ``true``.

``Q = ~A``

```block
let A = false
let Q = !(A)
```

#### Example - Blink LEDs on not pressed

```blocks
let A = false
basic.forever(function () {
    A = input.buttonIsPressed(Button.A)
    if (!(A)) {
        basic.showIcon(IconNames.Chessboard)
    } else {
        basic.clearScreen()
    }
    basic.pause(100)
})
```

#### Truth table

A | ~A
-|-
F | T
T | F

### OR (Disjunction)

The OR operator results in ``true`` when one or more conditions are ``true``.

``Q = A + B``

```block
let A = false
let B = false
let Q = A || B
```

#### Example - Blink on any press

```blocks
let A = false
let B = false
basic.forever(function () {
    A = input.buttonIsPressed(Button.A)
    B = input.buttonIsPressed(Button.B)
    if (A || B) {
        basic.showIcon(IconNames.Chessboard)
    } else {
        basic.clearScreen()
    }
    basic.pause(100)
})
```

#### Truth table

A | B | A + B
-|-|-
F | F | F
T | F | T
F | T | T
T | T | T

### AND (Conjunction)

The AND operator requires that all conditions are ``true`` for the result to be ``true``.

``Q = A · B``

```block
let A = false
let B = false
let Q = A && B
```

#### Example - Blink on double press only

```blocks
let A = false
let B = false
basic.forever(function () {
    A = input.buttonIsPressed(Button.A)
    B = input.buttonIsPressed(Button.B)
    if (A && B) {
        basic.showIcon(IconNames.Chessboard)
    } else {
        basic.clearScreen()
    }
    basic.pause(100)
})
```

#### Truth table

A | B | A · B
-|-|-
F | F | F
T | F | F
F | T | F
T | T | T

### XOR (Exclusive OR) #xor

Exclusive OR (XOR) means that only one or the other condition is true. Both conditions can't be true at the same time. XOR is common in Boolean algebra but it has no operator in JavaScript. Its operation can be made from combining a few simple expressions.

``Q = A ⊕ B``

```block
let A = false
let B = false
let Q = (A || B) && !(A && B)
```

#### Example - Blink on one press or the other

```blocks
let A = false
let B = false
basic.forever(function () {
    A = input.buttonIsPressed(Button.A)
    B = input.buttonIsPressed(Button.B)
    if ((A || B) && !(A && B)) {
        basic.showIcon(IconNames.Chessboard)
    } else {
        basic.clearScreen()
    }
    basic.pause(100)
})
```

#### Truth table

A | B | A ⊕ B
-|-|-
F | F | F
T | F | T
F | T | T
T | T | F
