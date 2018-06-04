# @extends

## #examples

## Example: ``AND`` operator

This example turns on LED `3 , 3`, if LEDs `1 , 1` and `2 , 2` are both on:

```blocks
if (led.point(1,1) && led.point(2,2)) {
   led.plot(3,3)
}
```

## Example: Comparisons of numbers and strings

When you compare two Numbers, you get a Boolean value, such as the comparison `x < 5` in the code below:

```blocks
input.onButtonPressed(Button.A, () => {
    let x = Math.randomRange(0, 5)
    if(x < 5) {
    basic.showString("low");
    } else { 
    basic.showString("high");
    }
})
```

See the documentation on [Numbers](/types/number) for more information on comparing two Numbers.
