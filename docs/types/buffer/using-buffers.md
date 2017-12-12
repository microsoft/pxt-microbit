# Using buffers

Memory used as temporary location for data in a program is commonly called a _buffer_. It's a transfer stop for data coming from some source like a network or pins operation. A program can read the data from the buffer when it's ready to work with it. Also, programs put their data in a buffer to make it ready for a transfer to a device or to somewhere else in memory on the @boardname@.

## Multiple data types in one place

Much of the time you read and write [numbers](/types/number) and [strings](/types/string) to and from connected devices or to and from a part on the @boardname@. Sometimes, though, you need to transfer data that is more complicated just these simple types. Your data could be a combination of numbers and strings together, or just a lot of numbers together as a chunk. An example of where you might do this is if you have a external display module or a camera connected to the @boardname@. A buffer is kind of like an [array](/types/array) but it can have data of any type at any place in it.

## Get a buffer

Maybe we want to use a super accurate clock with our @boardname@. We can get an external Real Time Clock (RTC) device and connect it to the I2C pins. The time values returned from the RTC device come to us as a sequence of numbers (each number is one _byte_ of data, which means we use the number format of `UInt8LE`). The current time is read from the RTC in a buffer as 7 numbers of a time data (7 bytes). Here's an example of a function we can create to read the time and return the data in a buffer:

```typescript-ignore
const rtcAddress = 104;

function getTimeData() {
    pins.i2cWriteNumber(rtcAddress, 0, NumberFormat.UInt8LE, false)
    return pins.i2cReadBuffer(rtcAddress, pins.sizeOf(NumberFormat.UInt8LE) * 7)
}
```

The command to read the time uses just one number so we use [i2cWriteNumber](/reference/pins/i2c-write-number) to send this command. The time data that the RTC gives us comes back as a buffer from [i2cReadBuffer](/reference/pins/i2c-read-buffer).

## Reading from a buffer

Data items in buffers are located at _offsets_ inside the buffer. Like an _index_ in an [array](/types/array), an offset is the position number of some particular data in the buffer we want to access.

In the previous example, our **getTimeData** function returned the current time to us in a buffer. The time data is 7 numbers all together. Remember, for this device the numbers are bytes which means we use `UInt8LE` as the format. The time is formatted where the first number is seconds, the next number is minutes, and so on. So, if we wanted to know what the current day is, we have to look at the 6th number. This is how we get the 6th number from the the buffer:

```typescript-ignore
let timeBuf = getTimeData();
let day = timeBuf.getNumber(NumberFormat.Int8LE, 6);
```

If we want to decode the data further, we can convert the day number to a name:

```typescript-ignore
let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let timeBuf = getTimeData();
let day = timeBuf.getNumber(NumberFormat.Int8LE, 6);
basic.showString(dayNames[day]);
```

## ~hint
**RTC module**

Do you want to use a real RTC module and read accurate time data just like in the example? You can get a [precision RTC breakout](https://www.adafruit.com/product/3013) that connects on I2C.
## ~

## Writing to a buffer

To write to a buffer, you need to use an existing buffer or create one. There is a function that is part of **Pins** that lets you create one.

Let's say you want to see how quickly it gets dark in the evening over  a period of 4 hours. You set the @boardname@ next to the window with the room lights off and record a light level reading once every minute.

You could simply save the light measurements in an array like this:

```blocks
let darkness: number[] = []
input.onButtonPressed(Button.A, () => {
    for (let i = 0; i < 60 * 4; i++) {
        darkness.push(input.lightLevel())
        basic.pause(60000)
    }
})
```

This will save the light level measurements but we'd like to upload the data later to a laptop computer using the serial port. Also, we want the data to be compact and in the form of a file. We can use a buffer to do it.

The **Pins** category has a special function called **createBuffer**. It makes a buffer that holds data with a size specified in bytes. Here it is:

```typescript-ignore
let darkness = pins.createBuffer(60 * 4);
```

The code in blocks for recording the light level is modified to make our file data:

```typescript-ignore
let darkness = pins.createBuffer(60 * 4);
input.onButtonPressed(Button.A, () => {
    for (let i = 0; i < 60 * 4; i++) {
        darkness.setNumber(NumberFormat.UInt8LE, i, input.lightLevel())
        basic.pause(60000)
    }
})
```

Later, we can upload the file to the laptop computer by pressing the **B** button:

```typescript-ignore
let dataReady = false;
let darkness = pins.createBuffer(60 * 4);
input.onButtonPressed(Button.A, () => {
    for (let i = 0; i < 60 * 4; i++) {
        darkness.setNumber(NumberFormat.UInt8LE, i, input.lightLevel())
        basic.pause(60000)
    }
    dataReady = true;
})

input.onButtonPressed(Button.B, () => {
    if (dataReady) {
        serial.writeLine("Transferring file: DARKNESS, Length: " + darkness.length + " bytes...");
        serial.writeBuffer(darkness)
        darkness.fill(0);
        dataReady = false;
    }    
})
```

## See also

[buffer](/types/buffer), [number format](types/buffer/number-format),
[serial read buffer](/reference/serial/read-buffer), [serial write buffer](/reference/serial/write-buffer)