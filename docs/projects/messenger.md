# Messenger

![](/static/mb/projects/a9-radio.png)

Use the radio in an app that sends "YO" messages.

## Step 1

Use ``||input:on button pressed||`` to send the number `0` over radio.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0);
});
```

## Step 2

Use ``||radio:on data packet received||`` display "YO" when the number ``0`` is received
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

Download the program to one @boardname@ and then to another. Press button **A** on one and see if the other gets a message.

## Step 3

Use ``||input:on button pressed||`` to send the number `1` over radio.

```blocks
input.onButtonPressed(Button.B, () => {
    radio.sendNumber(1);
});
```

## Step 4

Add blocks in ``||radio:on data packet received||`` to display "BYE" when the number ``1`` is received
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

Download the program to the @boardname@s again and try your messenger!

```package
radio
```
