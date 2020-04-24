# Micro Chat

### @explicitHints true

## Introduction @unplugged

![Two @boardname@ connected via radio](/static/mb/projects/a9-radio.png)

Use the **radio** to send and receive messages with another @boardname@.

## Handle buttons

Add an event to run code when ``||input:button A is pressed||``.

```spy
input.onButtonPressed(Button.A, function() {
});
```

## Sending a message

Add code to ``||radio:send a string||`` over ``||radio:radio||`` when ``||input:button A is pressed||``. 
Every @boardname@ nearby will receive this message.

```spy
input.onButtonPressed(Button.A, function() {
    // @highlight
    radio.sendString(":)");
});
```

## Receiving a message

Put in another event to run code when a ``||radio:string is received||`` over ``||radio:radio||``. 

```spy
radio.onReceivedString(function (receivedString) {
})
```

## Displaying text

Inside the event, add code to ``||basic:show||`` the ``||variables:receivedString||``.

```spy
radio.onReceivedString(function (receivedString) {
    // @highlight
    basic.showString(receivedString);
})
```

## Testing in the simulator

Press button **A** on the simulator, you will notice that a second @boardname@ appears (if your screen is too small, the simulator might decide not to show it). Try pressing **A** again and notice that the "Yo" message gets displayed on the other @boardname@.

## Try it for real

If you two @boardname@s, download the program to each one. Press button **A** on one and see if the other gets a message.

## Groups

Add code to ``||radio:set the group||`` number of your program. You will only receive messages from @boardname@s within the same group. Use this to avoid receiving messages from every @boardname@ that is transmitting.

```spy
radio.setGroup(123)
```

```package
radio
```