# Micro Chat

## Introduction @unplugged

![Two @boardname@ connected via radio](/static/mb/projects/a9-radio.png)

Use the **radio** to send and receive messages with other @boardname@.

## Set a radio group

The first thing you want to do is to put in a ``||radio:set group||``. This will make certain that you and another @boardname@ will receive just the messages assigned to that group and not the messages sent from some other @boardname@ that's not part of your conversation. This like tuning to a particular channel to talk on.

```blocks
radio.setGroup(1)
```

## Sending a message

Use ``||input:on button pressed||`` to send a text message over radio with ``||radio:send string||``.
Every @boardname@ nearby will receive this message.

```blocks
input.onButtonPressed(Button.A, function() {
    radio.sendString(":)")
})
```

## Receiving a message

Add a ``||radio:on received string||`` block to run when a message is received. 

```blocks
radio.onReceivedString(function (receivedString) {
})
```

## Displaying text

Add a ``||basic:show string||`` to display the string on the screen. Pull the ``||variables:receivedString||`` out of ``||radio:on received string||`` and put it into ``||basic:show string||``.

```blocks
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString);
})
```

## Testing in the simulator

Press button **A** on the simulator, you will notice that a second @boardname@ appears (if your screen is too small, the simulator might decide not to show it). Try pressing **A** again and notice that the ":)" message gets displayed on the other @boardname@.

```blocks
input.onButtonPressed(Button.A, function() {
    radio.sendString(":)");
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString);
})
```

## Try it for real

If you have two @boardname@s, download the program to each one. Press button **A** on one and see if the other gets a message.

```template
//
```

```package
radio
```
