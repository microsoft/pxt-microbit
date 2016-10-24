# messenger

![](/static/mb/projects/a9-radio.png)

Use the radio to create an app that sends "YO" messages.

## Step 1

Use [on button pressed](/reference/input/on-button-pressed) to send the number "0" over radio.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0);
});
```

## Step 2

Use [radio on data packet received](/reference/radio/on-data-packet-received) display "YO" when the number ``0`` is received
by radio.

```blocks
let message = 0;
radio.onDataPacketReceived(({ receivedNumber }) => {
    message = receivedNumber;
    if (message == 0) {
        basic.showString("YO")
    }
})
```

Download the program and **upload the same .hex file to 2 devices!**

## Step 3

Use [on button pressed](/reference/input/on-button-pressed) to send the number "1" over radio.

```blocks
input.onButtonPressed(Button.B, () => {
    radio.sendNumber(1);
});
```

## Step 4

Add blocks in [radio on data packet received](/reference/radio/on-data-packet-received) to display "BYE" when the number ``1`` is received
by radio.

```blocks
let message = 0;
radio.onDataPacketReceived(({ receivedNumber }) => {
    message = receivedNumber;
    if (message == 0) {
        basic.showString("YO")
    }
    if (message == 1) {
        basic.showString("BYE")
    }
})
```


```package
radio
```
