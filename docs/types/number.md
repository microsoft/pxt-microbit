# @extends

## Show number #print

The [show number](/reference/basic/show-number) function displays a number on the [LED screen](/device/screen). 
For example, this code displays the number 42:

```block
basic.showNumber(42);
```

### #declareexample

```block
let num = 42;
basic.showNumber(42);
```

### #functionreturnexample

For example the following code gets the display brightness 
(using the [brightness function](/reference/led/brightness)) and stores the value in a variable named `brightness`:

```block
let brightness = led.brightness()
```
