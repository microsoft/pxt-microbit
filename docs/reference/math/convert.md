# convert

Converts a value from one unit to another.

```sig
Math.convert(0, UnitConversion.DegreesToRadians)
```

## Parameters

* **value**: a [number](/types/number) that is the value to convert to the new units.
* **type**: the unit type to convert to. The units available are:

>* `degrees to radians` - change from angle units of degrees to angle units of radians
>* `radians to degrees` - change from angle units of radians to angle units of degrees
>* `celsius to fahrenheit` - change from temperature units of degrees celsius to degrees fahrenheit
>* `fahrenheit to celsius` - change from temperature units of degrees fahrenheit to degrees celsius

## Returns

* a [number](/types/number) that is the **value** converted to a new value with the selected units.

## Example

Show what the measured temperature is every 30 seconds. Use degrees fahrenheit for the display.

```blocks
let tempc = 0
let tempf = 0
loops.everyInterval(500, function () {
    tempc = input.temperature()
    tempf = Math.convert(tempc, UnitConversion.CelsiusToFahrenheit)
    basic.showNumber(tempf)
})
```

## See Also

[random int](/reference/math/randint)