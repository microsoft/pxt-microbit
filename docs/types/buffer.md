# Buffer

Memory used as a temporary location for data in a program is commonly called a _buffer_. It's a transfer stop for data coming from some source like a network or pins operation. A program can read the data from the buffer when it's ready to work with it. Also, programs put their data in a buffer to make it ready for a transfer to a device or to somewhere else in memory on the @boardname@.

## Create a new buffer

Sending and receiving data over the pins might need a buffer if you use your own form of data. The **Pins** category contains a function to create buffers for this purpose.

A buffer is created with the **createBuffer** function by choosing a buffer size as a number of bytes.

```typescript-ignore
let bufr = pins.createBuffer(16);
```

## Get number value from a buffer

You can get a number value from a particular place in a buffer using **getNumber**. To do it, you have to say how big each of your number values are. The size of the number values is set using a [NumberFormat](/types/buffer/number-format#number-format-types) type. You use an _offset_ value which is the position in the buffer where the number value you want is at. 

```typescript-ignore
let num = bufr.getNumber(NumberFormat.Int8LE, 5)
```

## Put a number value into a buffer
A number is placed in a buffer with **setNumber**. You use a number format like with **getNumber**. A new value to goes into the buffer at the position you select.

```typescript-ignore
let val = 15;
bufr.setNumber(NumberFormat.Int8LE, 5, val);
```

## Get the length of the buffer

The buffer **length** property tells how big the buffer is in size as number of bytes.

```typescript-ignore
let bufrLength = bufr.length;
```

## Fill the buffer

You can fill an entire buffer so that every byte in the buffer has the same value. You use the 
**fill** function to initialize or reset the buffer contents to a default value. Typically the number `0`.

```typescript-ignore
bufr.fill(0);
```

## Make two buffers from one

A new smaller buffer is created from an original larger one using the **slice** function. You tell what position you want to start from in the original buffer and how many bytes from that position you want to copy.

```typescript-ignore
let newBufr = bufr.slice(32, 64);
```

## Shift the buffer contents

The contents of a buffer are shifted left or right by some amount of bytes with the **shift** function. A positive shift number moves the data to the left (to a lower position in the buffer). A negative number moves the data to the right (to a higher position in the buffer). Any data that is moved past the first or last position in the buffer is lost. Locations in the buffer where data is shifted out of are filled with `0` values.

```typescript-ignore
bufr.shift(8);
```
Here's an example of shifting a buffer to the left (higher positions to lower positions). The original buffer contains:

|||||||||
|-|-|-|-|-|-|-|-|
|0|1|1|1|0|1|0|0|
|1|0|1|0|1|0|1|0|
|1|1|0|0|1|1|0|0|
|1|1|1|0|1|1|1|0|
|1|1|1|0|1|1|1|1|
<br/>
After shifting by 2 bytes using **shift(2)**...

|||||||||
|-|-|-|-|-|-|-|-|
|1|1|0|0|1|1|0|0|
|1|1|1|0|1|1|1|0|
|1|1|1|0|1|1|1|1|
|0|0|0|0|0|0|0|0|
|0|0|0|0|0|0|0|0|

## Rotate the buffer contents

The contents of a buffer are rotated left or right by some amount of bytes with the **rotate** function. A positive rotate number rotates the data to the left (to a lower position in the buffer). A negative number moves the data to the right (to a higher position in the buffer). Any data that is moved past the first or last position in the buffer is placed back in the buffer at the location where the rotation ended.

```typescript-ignore
bufr.rotate(6);
```
Here's an example of rotating a buffer to the left (higher positions to lower positions). The original buffer contains:

|||||||||
|-|-|-|-|-|-|-|-|
|0|1|1|1|0|1|0|0|
|1|0|1|0|1|0|1|0|
|1|1|0|0|1|1|0|0|
|1|1|1|0|1|1|1|0|
|1|1|1|0|1|1|1|1|
<br/>
After shifting by 3 bytes using **rotate(3)**...

|||||||||
|-|-|-|-|-|-|-|-|
|1|1|1|0|1|1|1|0|
|1|1|1|0|1|1|1|1|
|0|1|1|1|0|1|0|0|
|1|0|1|0|1|0|1|0|
|1|1|0|0|1|1|0|0|

## Copy one buffer into another

The contents of another buffer are copied to a location in the current buffer using the **write** function. You say where (what position) in the current buffer you want to write the contents to and include the other buffer as the second parameter.

```typescript-ignore
let sourceBufr = serial.readBuffer(32);
bufr.write(128, sourceBufr);
```

## See also

 [using buffers](/types/buffer/using-buffers), [number format](/types/buffer/number-format)