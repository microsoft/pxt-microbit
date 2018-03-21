# Stop watch

Press ``A`` to start the counter. Press ``A`` again to stop and display the count. 

```blocks
let msec = 0
let sec = 0
let end = 0
let d = 0
let start = 0
input.onButtonPressed(Button.A, () => {
    if (!(start)) {
        start = input.runningTime()
        end = 0
    } else {
        d = input.runningTime() - start
        start = 0
        basic.clearScreen()
        basic.pause(1000)
        sec = d / 1000
        msec = d % 1000
        basic.showString("" + sec + "." + msec)
    }
})
basic.forever(() => {
    if (start) {
        led.toggle(Math.random(5), Math.random(5))
    }
})
```