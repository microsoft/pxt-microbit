# @boardname@ orientation

A #microbit library that exposes accelerometer events.

A simple library that exposes events to detect

* detect that the screen is facing up and the board is horizontal

```
onScreenUp(() => {
    micro_bit.showString("screen up", 100)
})
```

* detect that the screen is facing down and the board is horizontal

```
onScreenDown(() => {
    micro_bit.showString("screen down", 100)
})
```

* detect when the logo is up and the board is vertical

```
onLogoUp(() => {
    micro_bit.showString("logo up", 100)
})
```

* detect when the logo is down and the board is vertical

```
onLogoDown(() => {
    micro_bit.showString("r", 100)
})
```

* detect that the device is shaken

```
onShake(() => {
    micro_bit.showString("shake", 100)
})
```

