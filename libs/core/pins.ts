/**
 * Control currents in Pins for analog/digital signals, servos, i2c, ...
 */
//% color=#B22222 weight=30 icon="\uf140"
//% advanced=true
//% groups='["Pins", "Pulse", "I2C", "SPI", "micro:bit (V2)"]'
namespace pins {
    /**
     * Returns the value of a C++ runtime constant
     */
    //% help=pins/digital-pin
    //% shim=TD_ID
    //% blockId=digital_pin
    //% block="digital pin $pin"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% group="Pins"
    //% weight=17
    //% blockGap=8
    //% advanced=true
    //% decompilerShadowAlias=digital_pin_shadow
    export function _digitalPin(pin: DigitalPin): number {
        return pin;
    }

    /**
     * Returns the value of a C++ runtime constant
     */
    //% help=pins/analog-pin
    //% shim=TD_ID
    //% blockId=analog_pin
    //% block="analog pin $pin"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% group="Pins"
    //% weight=16
    //% blockGap=8
    //% advanced=true
    //% decompilerShadowAlias=analog_pin_shadow
    export function _analogPin(pin: AnalogPin): number {
        return pin;
    }

    /**
     * Returns the value of a C++ runtime constant
     */
    //% help=pins/digital-pin
    //% shim=TD_ID
    //% blockId=digital_pin_shadow
    //% block="$pin"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% blockHidden=1
    export function _digitalPinShadow(pin: DigitalPin): number {
        return pin;
    }

    /**
     * Returns the value of a C++ runtime constant
     */
    //% help=pins/analog-pin
    //% shim=TD_ID
    //% blockId=analog_pin_shadow
    //% block="$pin"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% blockHidden=1
    export function _analogPinShadow(pin: AnalogPin): number {
        return pin;
    }

    /**
     * Returns the value of a C++ runtime constant
     */
    //% help=pins/analog-pin
    //% shim=TD_ID
    //% blockId=analog_read_write_pin_shadow
    //% block="$pin"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% blockHidden=1
    export function _analogReadWritePinShadow(pin: AnalogReadWritePin): number {
        return pin;
    }

    /**
     * Map a number from one range to another. That is, a value of ``from low`` would get mapped to ``to low``, a value of ``from high`` to ``to high``, values in-between to values in-between, etc.
     * @param value value to map in ranges
     * @param fromLow the lower bound of the value's current range
     * @param fromHigh the upper bound of the value's current range, eg: 1023
     * @param toLow the lower bound of the value's target range
     * @param toHigh the upper bound of the value's target range, eg: 4
     */
    //% help=pins/map weight=23
    //% blockId=pin_map block="map %value|from low %fromLow|from high %fromHigh|to low %toLow|to high %toHigh"
    export function map(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
        return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
    }

    /**
     * Read one number from 7-bit I2C address.
     */
    //% help=pins/i2c-read-number blockGap=8 advanced=true
    //% blockId=pins_i2c_readnumber block="i2c read number|at address %address|of format %format|repeated %repeat" weight=7
    //% group="I2C"
    //% weight=45
    export function i2cReadNumber(address: number, format: NumberFormat, repeated?: boolean): number {
        let buf = pins.i2cReadBuffer(address, pins.sizeOf(format), repeated)
        return buf.getNumber(format, 0)
    }

    /**
     * Write one number to a 7-bit I2C address.
     */
    //% help=pins/i2c-write-number blockGap=8 advanced=true
    //% blockId=i2c_writenumber block="i2c write number|at address %address|with value %value|of format %format|repeated %repeat" weight=6
    //% group="I2C"
    //% weight=44
    export function i2cWriteNumber(address: number, value: number, format: NumberFormat, repeated?: boolean): void {
        let buf = createBuffer(pins.sizeOf(format))
        buf.setNumber(format, 0, value)
        pins.i2cWriteBuffer(address, buf, repeated)
    }
}
