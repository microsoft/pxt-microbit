/**
 * Control currents in Pins for analog/digital signals, servos, i2c, ...
 */
//% color=#A80000 weight=30 icon="\uf140"
//% advanced=true
namespace pins {
    /**
     * Re-maps a number from one range to another. That is, a value of ``from low`` would get mapped to ``to low``, a value of ``from high`` to ``to high``, values in-between to values in-between, etc.
     * @param value value to map in ranges
     * @param fromLow the lower bound of the value's current range
     * @param fromHigh the upper bound of the value's current range, eg: 1023
     * @param toLow the lower bound of the value's target range
     * @param toHigh the upper bound of the value's target range, eg: 4
     */
    //% help=pins/map weight=23
    //% blockId=math_map block="map %value|from low %fromLow|from high %fromHigh|to low %toLow|to high %toHigh"
    export function map(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
        return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
    }

    /**
     * Read one number from 7-bit I2C address.
     */
    //% help=pins/i2c-read-number blockGap=8 advanced=true
    //% blockId=pins_i2c_readnumber block="i2c read number|at address %address|of format %format|repeated %repeat" weight=7
    export function i2cReadNumber(address: number, format: NumberFormat, repeated?: boolean): number {
        let buf = pins.i2cReadBuffer(address, pins.sizeOf(format), repeated)
        return buf.getNumber(format, 0)
    }

    /**
     * Write one number to a 7-bit I2C address.
     */
    //% help=pins/i2c-write-number blockGap=8 advanced=true
    //% blockId=i2c_writenumber block="i2c write number|at address %address|with value %value|of format %format|repeated %repeat" weight=6
    export function i2cWriteNumber(address: number, value: number, format: NumberFormat, repeated?: boolean): void {
        let buf = createBuffer(pins.sizeOf(format))
        buf.setNumber(format, 0, value)
        pins.i2cWriteBuffer(address, buf, repeated)
    }

    /**
     * Get the size in bytes of specified number format.
     */
    //%
    export function sizeOf(format: NumberFormat) {
        switch (format) {
            case NumberFormat.Int8LE:
            case NumberFormat.UInt8LE:
            case NumberFormat.Int8BE:
            case NumberFormat.UInt8BE:
                return 1;
            case NumberFormat.Int16LE:
            case NumberFormat.UInt16LE:
            case NumberFormat.Int16BE:
            case NumberFormat.UInt16BE:
                return 2;
            case NumberFormat.Int32LE:
            case NumberFormat.Int32BE:
                return 4;
        }
        return 0;
    }

    export function createBufferFromArray(bytes: number[]) {
        let buf = createBuffer(bytes.length)
        for (let i = 0; i < bytes.length; ++i)
            buf[i] = bytes[i]
        return buf
    }

    function getFormat(pychar: string, isBig: boolean) {
        switch (pychar) {
            case 'B':
                return NumberFormat.UInt8LE
            case 'b':
                return NumberFormat.Int8LE
            case 'H':
                return isBig ? NumberFormat.UInt16BE : NumberFormat.UInt16LE
            case 'h':
                return isBig ? NumberFormat.Int16BE : NumberFormat.Int16LE
            //case 'I':
            //case 'L':
            //    return isBig ? NumberFormat.UInt32BE : NumberFormat.UInt32LE
            case 'i':
            case 'l':
                return isBig ? NumberFormat.Int32BE : NumberFormat.Int32LE
            //case 'f':
            //    return isBig ? NumberFormat.Float32BE : NumberFormat.Float32LE
            //case 'd':
            //    return isBig ? NumberFormat.Float64BE : NumberFormat.Float64LE
            default:
                return null as NumberFormat
        }
    }

    function packUnpackCore(format: string, nums: number[], buf: Buffer, isPack: boolean, off = 0) {
        let isBig = false
        let idx = 0
        for (let i = 0; i < format.length; ++i) {
            switch (format[i]) {
                case ' ':
                case '<':
                case '=':
                    isBig = false
                    break
                case '>':
                case '!':
                    isBig = true
                    break
                case 'x':
                    off++
                    break
                default:
                    let fmt = getFormat(format[i], isBig)
                    if (fmt === null) {
                        control.fail("Not supported format character: " + format[i])
                    } else {
                        if (buf) {
                            if (isPack)
                                buf.setNumber(fmt, off, nums[idx++])
                            else
                                nums.push(buf.getNumber(fmt, off))
                        }

                        off += pins.sizeOf(fmt)
                    }
                    break
            }
        }
        return off
    }

    export function packedSize(format: string) {
        return packUnpackCore(format, null, null, true)
    }

    export function packBuffer(format: string, nums: number[]) {
        let buf = createBuffer(packedSize(format))
        packUnpackCore(format, nums, buf, true)
        return buf
    }

    export function packIntoBuffer(format: string, buf: Buffer, offset: number, nums: number[]) {
        packUnpackCore(format, nums, buf, true, offset)
    }

    export function unpackBuffer(format: string, buf: Buffer, offset = 0) {
        let res: number[] = []
        packUnpackCore(format, res, buf, false, offset)
        return res
    }

    export class I2CDevice {
        public address: number;
        private _hasError: boolean;
        constructor(address: number) {
            this.address = address
        }
        public readInto(buf: Buffer, repeat = false, start = 0, end: number = null) {
            if (end === null)
                end = buf.length
            if (start >= end)
                return
            let res = i2cReadBuffer(this.address, end - start, repeat)
            if (!res) {
                this._hasError = true
                return
            }
            buf.write(start, res)
        }
        public write(buf: Buffer, repeat = false) {
            let res = i2cWriteBuffer(this.address, buf, repeat)
            if (res) {
                this._hasError = true
            }
        }
        public begin(): I2CDevice {
            this._hasError = false;
            return this;
        }
        public end() {
        }
        public ok() {
            return !this._hasError
        }
    }
}

namespace Math {
    export function map(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
        return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
    }
}

interface Buffer {
    [index: number]: number;
    // rest defined in buffer.cpp
}
