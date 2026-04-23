enum UnitConversion {
    //% block="degrees to radians"
    DegreesToRadians,
    //% block="radians to degrees"
    RadiansToDegrees,
    //% block="celsius to fahrenheit"
    CelsiusToFahrenheit,
    //% block="fahrenheit to celsius"
    FahrenheitToCelsius
}

namespace Math {
    /**
     * Generates a `true` or `false` value randomly, just like flipping a coin.
     */
    //% blockId=logic_random block="pick random true or false"
    //% help=math/random-boolean weight=1
    export function randomBoolean(): boolean {
        return Math.randomRange(0, 1) === 1;
    }

    /**
     * Converts a value from one unit to another. For example, degrees to radians, fahrenheit to celsius, etc.
     * @param value The value to convert.
     * @param type The type of conversion to perform.
     */
    //% blockId=math_convert_unit
    //% block="convert $value|from $type"
    //% help=math/convert-unit
    //% weight=0
    export function convert(value: number, type: UnitConversion): number {
        switch (type) {
            case UnitConversion.DegreesToRadians: return value * 0.017453292519943295;
            case UnitConversion.RadiansToDegrees: return value * 57.29577951308232;
            case UnitConversion.CelsiusToFahrenheit: return (value * 1.8) + 32;
            case UnitConversion.FahrenheitToCelsius: return (value - 32) * 0.5555555555555556;
        }
        return value;
    }
}