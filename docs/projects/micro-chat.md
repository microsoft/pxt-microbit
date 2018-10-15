# Micro Chat

## Introduction @unplugged

![Two @boardname@ connected via radio](/static/mb/projects/a9-radio.png)

Use the **radio** to send and receive messages with other @boardname@.

## Sending a message @fullscreen

Use ``||input:on button pressed||`` to send a number over radio with ``||radio:send string||``.
All @boardname@ nearby will receive this message.

You can also add ``||basic:show icon||`` and ``||basic:clear screen||`` blocks to show a little animation when the message is sent.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendString("Yo");
    basic.showIcon(IconNames.Chessboard)
    basic.clearScreen();
});
```

## Receiving a message @fullscreen

Add a ``||radio:on received number||`` block to run when a message is received. 

```blocks
radio.onReceivedString(function (receivedString) {
})
```

## Displaying text @fullscreen

Add a ``||basic:show string||`` to display the string on the screen. You will find the ``receivedString`` variable
under the **Variables** toolbox.

```blocks
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString);
})
```

## Testing in the simulator @fullscreen

Press button **A** on the simulator, you will notice that a second @boardname@ appears (if your screen is too small, this might not happen). Try pressing **A** again and notice that the "Yo" message gets displayed on the other @boardname@

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendString("Yo");
    basic.showIcon(IconNames.Chessboard)
    basic.clearScreen();
});
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString);
})
```

## Try it for real @fullscreen

If you have @boardname@s, download the program to two @boardname@. Press button **A** on one and see if the other gets a message.

## Groups @fullscreen

Use the ``||radio:set group||`` block to assign a **group** number to your program. You will only receive messages from @boardname@ within the same group. Use this to avoid receiving messages from all the other @boardname@.

```blocks
/**
* Pick a unique group in your classroom!
*/
radio.setGroup(123)
```


```package
radio
```
