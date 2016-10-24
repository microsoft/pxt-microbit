# Send String

Sends a string to other micro:bits in the area connected by radio.

```sig
radio.sendString("Hello!")
```

### Parameters

* `msg` is a [string](/reference/types/string) to send by radio.

### Simulator

This function only works on the micro:bit, not in browsers.

### Example: Two-way radio

If you load this program onto two or more micro:bits, you can send a
code word from one of them to the others by pressing button `A`.  The
other micro:bits will receive the code word and then show it.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendString("Codeword: TRIMARAN")
    basic.showString("SENT");
})

radio.onDataReceived(() => {
    basic.showString(radio.receiveString());
});
```

### ~hint

A radio that can both transmit and receive is called a _transceiver_.

### ~

### See also

[receive string](/reference/radio/receive-string), [on data received](/reference/radio/on-data-received)

```package
radio
```