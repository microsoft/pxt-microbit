# Radio bridge

```typescript
/**
* Download this code and connect the device to the computer.
* Press A and B to select the radio group or change it in the code.
*/
let group = 0
/**
 * Send all received packets to serial output
 */
radio.onDataPacketReceived(function () {
    radio.writeReceivedPacketToSerial()
    led.toggle(Math.randomRange(0, 4), Math.randomRange(0, 4))
})
/**
 * Decrement radio group by 1
 */
input.onButtonPressed(Button.A, function () {
    group = Math.max(0, group - 1)
    radio.setGroup(group)
    led.stopAnimation()
    basic.showNumber(group)
})
/**
 * Increment radio group by 1
 */
input.onButtonPressed(Button.B, function () {
    group = Math.min(255, group + 1)
    radio.setGroup(group)
    led.stopAnimation()
    basic.showNumber(group)
})
group = 128
radio.setGroup(group)
```