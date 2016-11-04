# Shake

You can find when someone is shaking the @boardname@ by checking its
**accelerometer** (it finds whether the @boardname@ is speeding up or
slowing down).

Unscramble these blocks in the editor to show a frownie when someone
shakes the @boardname@. (Ouch!)

```shuffle
input.onGesture(Gesture.Shake, () => {
    basic.showLeds(`
. . . . .
. # . # .
. . . . .
. # # # .
# . . . #`);
});
```
Click **Download** to move your program to the @boardname@!

### ~button /getting-started/coin-flipper
NEXT: COIN FLIPPER GAME
### ~
