# Basic

Provides access to basic @boardname@ functionality.

```cards
basic.showNumber(0);
basic.showIcon(IconNames.Heart);
basic.showLeds(`
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .
`);
basic.showString("Hello!");
basic.clearScreen();
basic.forever(() => {
    
});
basic.pause(100);
basic.plotLeds(`
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .
`);
basic.showArrow(ArrowNames.North);
basic.showAnimation(`
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .
`);
```

### See Also

[showNumber](/reference/basic/show-number), 
[showIcon](/reference/basic/show-icon),
[showLeds](/reference/basic/show-leds), [showString](/reference/basic/show-string), 
[clearScreen](/reference/basic/clear-screen), [forever](/reference/basic/forever), [pause](/reference/basic/pause), 
[showAnimation](/reference/basic/show-animation)
