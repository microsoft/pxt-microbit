# Number format

Numbers get stored at some place in memory. They have a certain memory size (spaces in memory) and an arrangement for their bytes.

## Digital numbers

The data stored in memory is just a lot of tiny electronic connections in the circuits of the @boardname@. A number is the most basic type of data and other types of data are made using numbers (number are even used to act as text characters in memory). A number is made with combination of electronic connections that are either on and off. One connection is called a _bit_ and this is used as a single digit for computer numbers. A single bit can mean one of two numbers, 0 or 1. Two bits can mean one of four numbers, 00, 01, 10, or 11. We use decimal numbers normally so we give the decimal names to the computer numbers. So, for the two bit numbers, their decimal names are: 00 = 0, 01 = 1, 10 = 2, and 11 = 3. When you see numbers with ones and zeros, they are called _binary_ numbers.

## The 'byte'

The smallest amount of bits normally used to store a number in a computer is a combination of 8 bits. A group of 8 bits is called a _byte_. A byte looks like `10010010`. This binary number, for example, represents the number `162` in decimal.

The maximum absolute value for a number contained in a byte is `255`. You couldn't store the decimal number of `2552` in one byte, you need to use two bytes together. So, `2552` as a binary number is `00001001 11111000` using two bytes.

## Number formats on the @boardname@ 

Numbers are stored in memory in different ways. They can use one or more bytes, have a positive or negative value, and have their bytes switched around.

### Signed numbers

If you want a number that can have a positive value or a negative value, then you use a _signed_ number. This means that one bit of all the bits than make up the number value is treated as a plus sign or a minus sign. A bit value of `0` means a plus and a bit value of `1` means minus. Using one of the bits of the number for a sign means that the maximum possible value for a number gets reduced by about half.

As an example, the decimal numbers of `1` and `-1` are `00000001` and `11111111` in binary. You see that the bit on the left of the second binary number is a `1`. That bit is used as the minus sign (-) for the `-1`. 

### ~hint
**Two's complement**

You might think that the binary number for a decimal `-1` would be `10000001` if the left bit is a `1` for the minus sign. The binary number for a decimal `-1` is actually `11111111`. That's because computers and electronic devices use a special trick when working with negative numbers. The trick is called _two's complement_.

Making a negative number from a positive number is a two step process. The first step is the _one's complement_ of the number. This step switches all the bits in the number that are `1` to `0` and all the bits that are `0` to `1` (invert the bits). Then, the twos's complement step adds the value of `1` to the one's complement value. Here's how it works:

Start with the positive binary number for a decimal `1` which is `00000001`.
1. The **one's complement** switches the bits, the binary number is now `11111110`.
2. The **two's complement** adds a binary `1` to the one's complement value.

>`11111110` + `00000001` = `11111111`
### ~

### Unsigned numbers

Signed numbers use all of their bits for the value itself and are always positive values.

### Big end and little end (endian)

Earlier you saw that the decimal number `2552` needs two bytes in memory. The order in which these two bytes are placed in memory is called _endian_ order or _endianness_. Funny word, right? This comes from the idea that the byte with the larger part of the value is called the big end and the byte with smaller part of the value is called the little end.

For `2552` its binary number uses two bytes which are: `00001001 11111000`. The two parts (ends) of this number are:

* Big end: `00001001`
* Little end: `11111000`

If the big end of the number is stored in memory first, before the little end, the number is a _big endian_ number. Then, of course, if the little end of the number is stored in memory first, before the big end, the number is a _little endian_ number.

### Number format types

Sometimes you need to have your program tell what type of numbers it will store in memory. This often necessary when you use [pin](/reference/pins) operations with a [buffer](/types/buffer).

The formats for numbers stored on the @boardname@ are:

* `Int8LE`: one byte, signed, little endian 
* `UInt8LE`: one byte, unsigned, little endian
* `Int8BE`: one byte, signed, big endian
* `UInt8BE`: one byte, unsigned, big endian
* `Int16LE`: two bytes, signed, little endian
* `UInt16LE`: two bytes, unsigned, little endian
* `Int16BE`: two bytes, signed, big endian
* `UInt16BE`: two bytes, unsigned, big endian
* `Int32LE`: four bytes, signed, little endian
* `Int32BE`: four bytes, signed, big endian

#### ~ hint

The one byte formats really don't have endianness because there is no ordering needed for just one byte. They are given format types though so that they are consistent with the multi-byte formats. So, there is no difference between `Int8LE` and `Int8BE`, or `UInt8LE` and `UInt8BE`.

#### ~

## See also

[buffer](/types/buffer)
