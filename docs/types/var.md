# @extends

### #letexample

A variable is created for the number returned by the [brightness](/reference/led/brightness) function.

```block
let b = led.brightness();
```

### #readvariableexample

For example, the following code shows the value stored in `counter` on the LED screen:

```blocks
let counter = 1;
basic.showNumber(counter);
```

### #updatevariableexample

The following code sets `counter` to 1 and then increments `counter` by 10:

```block
let counter = 1;
counter = counter + 10;
basic.showNumber(counter);
```

### #whyusevariablesexample

A counter is a great example:

```block
let counter = 0;
input.onButtonPressed(Button.A, () => { 
  counter = counter + 1;
  basic.showNumber(counter);
});
```

### #localvariableexample
```block
// x does NOT exist here.
if (led.brightness() > 128) {
  // x exists here
  let x = 0;
}
```
