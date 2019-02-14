# receive String

Find the next string sent by radio from another @boardname@.

```sig
radio.receiveString()
```
## ~ hint

**Deprecated**

This API has been deprecated! Use [on received string](/reference/radio/on-received-string) instead.

## ~

## Returns

* the first [string](/types/string) that was sent. If no
  string was sent, then this function returns an empty (blank) string.

## Example: Simple receiver

Show the string sent by another @boardname@.

```blocks
radio.onDataReceived(() => {
    basic.showString(radio.receiveString());
});
```

## Example: Two-way radio

If you load this program onto two or more @boardname@s, you can send a code word from one of them to the others by pressing button `A`.
The other @boardname@s will receive the code word and then show it.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendString("Codeword: TRIMARAN")
    basic.showString("SENT");
})

radio.onDataReceived(() => {
    basic.showString(radio.receiveString());
});
```

## ~hint

A radio that can both transmit and receive is called a _transceiver_.

## ~

## Example: Mood radio

This is a simple program to send whether you are happy or sad over ```radio```.
Use the `A` or `B` button to select an emotion.

This program will also receive your friend's mood.

```blocks
let data: string = "";
input.onButtonPressed(Button.A, () => {
    radio.sendString("H");
});
input.onButtonPressed(Button.B, () => {
    radio.sendString("S");
});
radio.onDataReceived(() => {
    data = radio.receiveString();
    if ("H" == data) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `);
    } else if ("S" == data) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `);
    } else {
        basic.showString("?");
    }
});
```

## See also

[send string](/reference/radio/send-string), [on data received](/reference/radio/on-data-received)

```package
radio
```