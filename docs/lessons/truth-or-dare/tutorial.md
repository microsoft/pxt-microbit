# truth or dare tutorial

## ~avatar avatar



The *Truth or dare!* game works as follows: a player spins the @boardname@ on the table. 
When the @boardname@ stops spinning, the player pointed by the arrow (displayed on screen) must press the button "A" 
to see if she has to provide a *truth* or a *dare*.

## ~

## Rebuild the game!

The blocks have been shuffled! Put them back together so that...
* an up arrow is displayed when the @boardname@ is powered on.
* on button `A` is pressed,
  * randomly display "TRUTH" or "DARE" on the screen
  * show the up arrow again.

```shuffle
basic.showLeds(`
    . . # . .
    . # # # .
    # # # # #
    . . # . .
    . . # . .
    `)
input.onButtonPressed(Button.A, () => {
    let random = Math.randomRange(0, 2)
    if (random == 0) {
        basic.showString("TRUTH")
    } else {
        basic.showString("DARE")
    }
    basic.showLeds(`
    . . # . .
    . # # # .
    # # # # #
    . . # . .
    . . # . .
    `)
})
```
## Hints and tips
Cut out these documentation cards to help you!

```cards
basic.showLeds(`
    . . # . .
    . # # # .
    # . # . #
    . . # . .
    . . # . .
    `);
Math.randomRange(0, 2);
basic.showString("TRUTH");
if (true) {} else {}
"TRUTH";
0;
input.onButtonPressed(Button.A, () => {});
```

