# Radio Bridge

Transfer the packet data received from the radio to the serial port. Use buttons **A** and **B** to select a radio group number.

```typescript
/**
* Download this code and connect the device to the computer.
* Press A and B to select the radio group or change it in the code.
*/
let group = 0
/**
 * Send all received packets to serial output
 */
radio.onReceivedNumber(function (receivedNumber) {
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

```package
radio
```