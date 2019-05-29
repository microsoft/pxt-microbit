# Chapter 1 

Here are the code examples from Chapter 1 
of [Foundations of Computing and Programming: exploring the micro:bit](../fcp).
You can switch between the Blocks and JavaScript versions of each example,
as well as run the example in the web browser, and retrieve a file to
install on a micro:bit.

## Figure 1.11
LED Screen with code:
```blocks
basic.showIcon(IconNames.Square)
led.plot(2, 2)
```

## Figure 1.12

Take action on button A/B pressed.
```blocks
input.onButtonPressed(Button.A, () => {
    basic.showIcon(IconNames.Square)
})
input.onButtonPressed(Button.B, () => {
    led.plot(2, 2)
})
```

## Figure 1.13

Take action on button A/B pressed, as
well as shaking the micro:bit.
```blocks
input.onButtonPressed(Button.A, () => {
    basic.showIcon(IconNames.Square)
})
input.onButtonPressed(Button.B, () => {
    led.plot(2, 2)
})
input.onGesture(Gesture.Shake, () => {
    basic.clearScreen()
}) 
```

## Figure 1.15

Program to send signals over pin P0.
```blocks
basic.forever(() => {
    pins.digitalWritePin(DigitalPin.P0, 1)
    basic.pause(1000)
    pins.servoWritePin(AnalogPin.P0, 180)
    basic.pause(1000)
})
```

## Figure 1.17

Communicating using radio.
```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendString("A")
})
input.onButtonPressed(Button.B, () => {
    radio.sendString("B")
})
radio.onReceivedNumber(({ receivedString }) => {
    basic.showString(receivedString)
})
```