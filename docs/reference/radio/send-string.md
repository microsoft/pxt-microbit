# Send String

Sends a string to other micro:bits in the area connected by radio. The
maximum string length is 19 characters.

```sig
radio.sendString("Hello!")
```

### Parameters

* `msg` is a [string](/reference/types/string) to send by radio.


### Example: Two-way radio

If you load this program onto two or more micro:bits, you can send a
code word from one of them to the others by pressing button `A`.  The
other micro:bits will receive the code word and then show it.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendString("Codeword: TRIMARAN")
    basic.showString("SENT");
})

radio.onDataPacketReceived(({ text }) => {
    basic.showString(text);
});
```

### ~hint

A radio that can both transmit and receive is called a _transceiver_.

### ~

### See also

[on data packet received](/reference/radio/on-data-packet-received)

```package
radio
```