# Bits Library

Functions in the Bits library.

### @parent td/language

The binary numeral system represents numeric values using values 0 and 1. This is how almost all modern computers store data. Each 0 or 1 digit is called a binary digit, or bit for short.

The Bits library includes functions for bit-level manipulation of integers. In the [Touch Develop editor](/javascript/editor), click `bits` to see the following bit functions:

## Bitwise and, or, and xor functions

#### Syntax

bits `->` *and/or/xor* uint32 (x : [Number](/reference/types/number), y : [Number](/reference/types/number)) *returns* [Number](/reference/types/number)

#### Parameters

* x - an unsigned 32 bit integer [Number](/reference/types/number)
* y - another unsigned 32 bit integer [Number](/reference/types/number)

### and uint32

performs bitwise AND; returns `1` at position i if both bits *x[i]* and *y[i]* are `1`, otherwise returns `0`.

### or uint32

performs bitwise OR; returns `1` at position *i* if either bit *x[i]* or *y[i]* is `1`, otherwise returns `0`.

### xor uint32

performs bitwise exclusive XOR; returns `1` at position *i* if *x[i]=1 and y[i]=0* or *x[i] = 0 and y[i] =1*; returns `0` otherwise

## Rotate left and rotate right

Rotate bits to the left or the right, by the specified number of positions.

#### Syntax

bits `->` rotate left unint32 (x : [Number](/reference/types/number), bits : [Number](/reference/types/number)) *returns* [Number](/reference/types/number)

bits `->` rotate right unint32 (x : [Number](/reference/types/number), bits : [Number](/reference/types/number)) *returns* [Number](/reference/types/number)

#### Parameters

* x - [Number](/reference/types/number);
* bits - [Number](/reference/types/number);

## Shift left and shift  right

Shift bits to the left or the right, by the specified number of positions.

#### Syntax

bits `->` shift left unint32 (x : [Number](/reference/types/number), bits : [Number](/reference/types/number)) *returns* [Number](/reference/types/number)

bits `->` shift right unint32 (x : [Number](/reference/types/number), bits : [Number](/reference/types/number)) *returns* [Number](/reference/types/number)

#### Parameters

* x - [Number](/reference/types/number);
* bits - [Number](/reference/types/number);

### See also

[statements and operators](/javascript/statements), [math functions](/javascript/math), [Number](/reference/types/number)

