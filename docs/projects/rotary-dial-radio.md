# Rotary Dial Radio

Rotary dial phones may not be one of the latest tech fashions but they've still got some wings if you pair them with a @boardname@. If you are lucky enough to still own one of these antiques, follow this guide and you can bring it into the 21st century.

![A rotary dial phone connected to a @boardname@](/static/mb/projects/rotary-dial-radio/final.jpg)

This guide is mainly a journal of notes and techniques used to convert a 1945 rotary dial into a @boardname@ radio encoder. This is an example of **reverse engineering**, a treasure hunt for engineers if you wish.

### ~ hint

### Stay safe

Opening and handling any electrical device can be very dangerous. Make sure to unplug all sources of power. Unless you know what you are doing, stay away from wall power outlets (AC).

### ~

## What is Pulse dialing?


The phone below is a Belgium rotary dial phone from 1945. It's really heavy and the dial makes a wonderful clicking noise when it turns.

![Antique rotary dial phone](/static/mb/projects/rotary-dial-radio/oldphone.jpg)

If you skim through the WikiPedia on "rotary dial phones", you'll quickly learn that they operated by using something called **pulse dialing** (https://en.wikipedia.org/wiki/Pulse_dialing). In a nutshell, the dialing mechanism opens and closes a circuit while it rotates which sends a series of electrical pulses on the phone line. One pulse for number 1, two pulses for number 2, and so on. (Hey, what about 0?)

## Digging into the phone

Fortunately for us, the bottom of the phone is easily removed by pressing lever. It reveals the internals of the phone. One can see the two massive bells to ring the phone and some other capacitors and circuitery. 

![Inside of a rotary phone](/static/mb/projects/rotary-dial-radio/guts.jpg)

Most interestingly, there are 8 terminals near the 2 holes in the case for wires.

* The 2 terminals on each side are connected by a black wire. This is most likely the ground wire.
* The phone line was missing but there is still a hole for it. Since phone lines carry a bit of electrical current, we'll inject electricity on those terminals.
* Three (3) terminals seem to be used by the handset so they must be carrying some kind of microphone/speaker signal. We'll try each of them.

At this point, we have enough information to start "scoping" the lines and hopefully get lucky and see the pulses. (Did I mention treasure hunting?)

## Scoping the lines

Electrical engineers use tools called "scopes" to "see" the eletrical signals on the line. In our case, we'd like to see the pulses generated when the phone is dialing. We don't have a scope so we'll use the @boardname@ instead.

We connect the @boardname@ to the phone using 3 croc clips:

* **GND** pin goes to the ground terminal
* **3v** pin connects at the positive terminal on the phone line
* **P0** is attacned to one of the headset lines (not **GND**)

![Wiring](/static/mb/projects/rotary-dial-radio/wired.jpg)

In the MakeCode, we upload a program that reads the analog input on **P0** and plots it on the screen. If you pair your @boardname@, you can also see the data in the console view.

```blocks
basic.forever(function () {
    led.plotBarGraph(
    pins.analogReadPin(AnalogPin.P0),
    1023
    )
})
```

Try moving the dial slowly...click, click and you should see the pulses, e.g. the signal going high and low. If you don't see anything, keep trying other cables. Be patient, don't give up.

https://youtu.be/po9o77IEDaI

## Detecting the pulses

The @boardname@ can raise an event when an electrical signal on **P0** goes low or high. This is the most important step as it allows us to precisely detect and count pulses. Try the following program with the phone. When you move the dial, you see the first LED turn on and off as the line goes high and low.

```blocks
pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    led.plot(0, 0)
})
pins.onPulsed(DigitalPin.P0, PulseValue.Low, function () {
    led.unplot(0, 0)
})
```

## Counting the pulses

Now that we are detecting pulses, we can use a variable to count them too. In this test program, we increment the **pulseCount** variable by one on each high pulse and we display the number when pressing the **A** button. Try dialing a number; then press A.

```blocks
let pulseCount = 0
input.onButtonPressed(Button.A, function () {
    basic.showNumber(pulseCount)
    pulseCount = 0
})
pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    led.plot(0, 0)
})
pins.onPulsed(DigitalPin.P0, PulseValue.Low, function () {
    led.unplot(0, 0)
    pulseCount += 1
})
```

## Digits and Numbers

Our next task is to detect that the pulses for a digit have finished and we should then record the final number. The phone generates a train of pulses (typically 10 per second) per digit; the user might then move the dial back to start the next digit. This leaves a window of time when nothing happens on the line. If our decoder detects that nothing happens on the line for a long time, say 200ms, we assume that the train is done and save the digit.

Instead of using button **A**, we add a **forever** loop that monitors the elapsed time since the last pulse. 
If we have had a pulse (``pulseCount > 0``) **and** the last pulse was more than 200ms ago, we have a digit and we can send it. 

```blocks
let pulseCount = 0
let lastPulseMs = 0
pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    led.plot(0, 0)
})
pins.onPulsed(DigitalPin.P0, PulseValue.Low, function () {
    led.unplot(0, 0)
    pulseCount += 1
    lastPulseMs = input.runningTime()
})
basic.forever(function () {
    if (pulseCount > 0 && lastPulseMs - input.runningTime() > 200) {
        radio.sendNumber(pulseCount)
        basic.showNumber(pulseCount)
        pulseCount = 0
    }
})
```

## What about 0?

Great question! ``0`` is  a special case and is represented by 10 pulses, so we need to update our decoder to take this into account.

```blocks
let pulseCount = 0
let lastPulseMs = 0
pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    led.plot(0, 0)
})
pins.onPulsed(DigitalPin.P0, PulseValue.Low, function () {
    led.unplot(0, 0)
    pulseCount += 1
    lastPulseMs = input.runningTime()
})
basic.forever(function () {
    if (pulseCount > 0 && lastPulseMs - input.runningTime() > 200) {
        if(pulseCount == 10) {
            pulseCount = 0
        }
        radio.sendNumber(pulseCount)
        basic.showNumber(pulseCount)
        pulseCount = 0
    }
})
```

## Numbers and more

Improving the program is left as a challenge for you (treasure hunt). The following program was the result of the initial investigation; it waits 3 seconds between digits to send the entire number over radio and uses the screen to display how many digits were entered. This is just an example, you can come up with your own twist on this too!

https://youtu.be/gW6rLH7qH5Q

```blocks
pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    led.plot(0, 0)
})
function plotIndex (i: number, on: boolean) {
    row = Math.idiv(i, 5)
    col = i % 5
    if (on) {
        led.plot(col, row)
    } else {
        led.unplot(col, row)
    }
}
function codeDots () {
    for (let index = 0; index <= 4; index++) {
        led.plot(index, 2)
    }
    for (let index2 = 0; index2 <= 9; index2++) {
        plotIndex(15 + index2, index2 < code.length)
    }
}
pins.onPulsed(DigitalPin.P0, PulseValue.Low, function () {
    led.unplot(0, 0)
    if (lastPulseMs == 0) {
        pulseCount = 0
        lastPulseMs = input.runningTime()
    } else if (input.runningTime() - lastPulseMs > 85) {
        pulseCount += 1
        lastPulseMs = input.runningTime()
    }
})
let codeNumber = 0
let lastDigitMs = 0
let col = 0
let row = 0
let pulseCount = 0
let code = ""
let lastPulseMs = 0
radio.setGroup(1)
lastPulseMs = 0
code = ""
pulseCount = 0
basic.forever(function () {
    if (lastPulseMs > 0 && input.runningTime() - lastPulseMs >= 250) {
        led.plot(1, 0)
        if (pulseCount == 10) {
            pulseCount = 0
        }
        code = "" + code + convertToText(pulseCount)
        lastPulseMs = 0
        lastDigitMs = input.runningTime()
    } else if (lastPulseMs == 0 && (code.length > 0 && (code.length == 10 || input.runningTime() - lastDigitMs >= 3000))) {
        led.plot(2, 0)
        codeNumber = parseFloat(code)
        for (let index = 0; index < 1; index++) {
            radio.sendNumber(codeNumber)
            basic.pause(10)
        }
        basic.clearScreen()
        basic.showNumber(codeNumber)
        basic.clearScreen()
        code = ""
        lastPulseMs = 0
    } else {
        led.unplot(1, 0)
        led.unplot(2, 0)
    }
    codeDots()
})
```

```package
radio
```