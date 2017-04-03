
let item = pins.i2cReadNumber(123, NumberFormat.Int8LE)
pins.i2cWriteNumber(123, 0, NumberFormat.Int8LE)

let item2 = pins.i2cReadNumber(123, NumberFormat.Int8LE, true)
pins.i2cWriteNumber(123, 0, NumberFormat.Int8LE, true)
