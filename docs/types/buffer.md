# Buffer

Memory used as temporary location for data in a program is commonly called a _buffer_. It's a transfer stop for data coming from some source like a network or pins operation. A program can read the data from the buffer when it's ready to work with it. Also, programs put their data in a buffer to make it ready for a transfer to a device or to somewhere else in memory on the @boardname@.

## Create a new buffer

Sending and receiving data over the pins might need a buffer if you use your own form of data. The **Pins** category contains a function to create buffers for this purpose.

Create a new buffer with a certain size. The size is specified in bytes.

```typescript
let buf = pins.createBuffer(16);
```

## Get number value from a buffer

You can get a number value from a particular place in a buffer. To do it, you have to say how big each of your number values are. Yous say the size of the number value using a [NumberFormat](/types/buffer/number-format).

```typescript
let num = buf.getNumber(NumberFormat.Int8LE, 5)
```

## Put a number value into a buffer

```typescript
let val = 15;
buf.setNumber(NumberFormat.Int8LE, 5, val);
```

## Get the length of the buffer

```typescript
let bufferLength = buf.length;
```

## Fill the buffer

```typescript
buf.fill(0);
```

## Make two buffers from one

```typescript
let newBuf = buf.slice(32, 64)
```

## Shift the buffer contents

```typescript
buf.shift(8)
```

|||||||||
|-|-|-|-|-|-|-|-|
|1|0|1|0|1|0|1|0|
|1|1|0|0|1|1|0|0|
|1|1|1|0|1|1|1|0|
|1|1|1|0|1|1|1|1|
<br/>
After shifting by 2 bytes...

|||||||||
|-|-|-|-|-|-|-|-|
|1|1|0|0|1|1|0|0|
|1|1|1|0|1|1|1|0|
|1|1|1|0|1|1|1|1|
|0|0|0|0|0|0|0|0|
|0|0|0|0|0|0|0|0|

