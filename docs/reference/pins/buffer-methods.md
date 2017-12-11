# Buffer

## Create a new buffer

Create a new buffer with a certain size. The size is specified in bytes.

```typescript
let buf = pins.createBuffer(16);
```

## Get number value from a buffer

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

