# Logic explorer

As a way to see how the basic logical operators work, we'll make a program to test them with all their possible input values.

## Inputs and output

Make an array called ``||variables:inputs||`` with two values, ``false`` and ``true``, as logical inputs. Add another variable ``||variables:Q||`` to receive the resulting value of a logical expression as output.

```blocks
let inputs = [false, true]
let Q = false
```

## Single input loop

To start with, we'll make a single input test for the variable ``||variables:A||``. The output, in variable ``||variables:Q||``, for the logical operator test will display an icon on the LEDs. A ``true`` value shows a ``t-shirt`` and ``false`` will show a ``small diamond``.

1. Get a ``||loops:for element||`` loop and put it in the ``||loops:on start||``. Rename the ``||variables:index||`` variable to ``||variables:A||`` and switch the ``||variables:list||`` variable to ``||variables:inputs||``.
2. Pull a ``||variables:set Q to||`` block into the ``||loops:for element||`` loop and set the value to ``||logic:false||``.
3. Go find the ``||logic:if then else||`` and put in below the ``||variables:set Q to||``. Pick up a ``||variables:Q||`` in ``||variables:VARIABLE||`` and drop it onto the ``||logic:false||`` to replace it.
4. Move a ``||basic:show icon||`` inside the ``||logic:if then||`` section and change the image to a ``t-shirt``. This is our image for a ``true`` output.
5. Move a ``||basic:show icon||`` inside the ``||logic:else||`` section and change the image to a ``small diamond``. This is our image for a ``false`` output.
6. Just below the ``||logic:if then else||``, put in a ``||loops:pause||``, a ``||basic:clear screen||``, and another ``||basic:pause||`` block. Set the time for each ``||basic:pause||`` to ``500``.

```blocks
let inputs = [false, true]
let Q = false
for (let A of inputs) {
    Q = false
    if (Q) {
        basic.showIcon(IconNames.TShirt)
    } else {
        basic.showIcon(IconNames.SmallDiamond)
    }
    basic.pause(500)
    basic.clearScreen()
    basic.pause(500)
}
```

## Identity test

The identity test is simple. It just makes the output have the same logical value as the input. Set the ``||variables:Q||`` output variable to the ``||variables:A||`` variable.

```block
let A = false
let Q = A
```

### Identity truth table

For the Identity test, these output values will show for the inputs:

A | Q = A
-|-
**false** | ``[basic.showIcon(IconNames.SmallDiamond)]``
**true** | ``[basic.showIcon(IconNames.TShirt)]``

## NOT test

Negation, or inversion, makes the output have the opposite value of the input. So, the output value is NOT the same as the input. Since there are only two possible values, the output is the other value that is NOT the input.

Replace the ``||logic:false||`` in the ``||variables:Q||`` equation with a ``||logic:not||`` operator. Pull the ``||variables:A||`` variable down from the ``||loops:for element||`` loop and drop it inside the ``||logic:not||`` operator.

```block
let A = false
let Q = !A
```

### NOT truth table

For the NOT test, these output values will show for the inputs:

A | ~A
-|-
**false** | ``[basic.showIcon(IconNames.TShirt)]``
**true** | ``[basic.showIcon(IconNames.SmallDiamond)]``

## Two input loop

For the rest of the operator tests, we need to have another input variable. This variable comes from a second ``||loops:for element||`` loop. With one input variable there was just two possible input values. Adding a second input variable increases the number of possible input combinations by two times. Now there will be 4 different input possibilities. This will result in the truth tables having 4 rows for the operator tests.

Go get another ``||loops:for element||`` loop and put it in so that it surrounds all the inside the first loop. Rename the ``||variables:index||`` variable to ``||variables:B||`` and switch the ``||variables:list||`` variable to ``||variables:inputs||``.

```blocks
let inputs = [false, true]
let Q = false
for (let A of inputs) {
    for (let B of inputs) {
        Q = !A
        if (Q) {
            basic.showIcon(IconNames.TShirt)
        } else {
            basic.showIcon(IconNames.SmallDiamond)
        }
        basic.pause(500)
        basic.clearScreen()
        basic.pause(500)
    }
}
```

## OR test

Now, grab an ``||logic:or||`` operator and replace the ``||logic:not||`` in the ``||variables:Q||`` equation with it. Pull the ``||variables:A||`` variable down from the outside ``||loops:for element||`` loop and drop it in on the left side the ``||logic:or||`` operator. Drag down the ``||variables:B||`` variable down from the inside ``||loops:for element||`` loop and drop it in on the right side the ``||logic:or||`` operator.

```block
let A = false
let B = false
let Q = A || B
```
### OR truth table

For the OR test, these output values will show for the inputs:

A | B | A + B
-|-|-
**false** | **false** |  ``[basic.showIcon(IconNames.SmallDiamond)]``
**false** | **true** |  ``[basic.showIcon(IconNames.TShirt)]``
**true** | **false** |  ``[basic.showIcon(IconNames.TShirt)]``
**true** | **true** |  ``[basic.showIcon(IconNames.TShirt)]``

## AND test

Now, switch the ``||logic:or||`` operator type in the ``||variables:Q||`` equation to the ``||logic:and||`` operator type:

```block
let A = false
let B = false
let Q = A && B
```

### AND truth table

For the AND test, these output values will show for the inputs:

A | B | A · B
-|-|-
**false** | **false** |  ``[basic.showIcon(IconNames.SmallDiamond)]``
**false** | **true** |  ``[basic.showIcon(IconNames.SmallDiamond)]``
**true** | **false** |  ``[basic.showIcon(IconNames.SmallDiamond)]``
**true** | **true** |  ``[basic.showIcon(IconNames.TShirt)]``

## XOR test

To test XOR, we'll use the XOR expression from [Boolean elements](/courses/logic-lab/elements#xor). Drag and place the ``||logic:LOGIC||`` blocks to make the ``||variables:Q||`` equation to look like this:

```block
let A = false
let B = false
let Q = (A || B) && !(A && B)
```
### XOR truth table

For the XOR test, these output values will show for the inputs:

A | B | A ⊕ B
-|-|-
**false** | **false** |  ``[basic.showIcon(IconNames.SmallDiamond)]``
**false** | **true** |  ``[basic.showIcon(IconNames.TShirt)]``
**true** | **false** |  ``[basic.showIcon(IconNames.TShirt)]``
**true** | **true** |  ``[basic.showIcon(IconNames.SmallDiamond)]``