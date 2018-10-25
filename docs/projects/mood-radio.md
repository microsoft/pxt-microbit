# Mood Radio

## @description A mini mood messaging app using radio

![@boardname@ sending moods around](/static/mb/projects/mood-radio.png)

This project uses the [radio](/reference/radio) to share your mood with other @boardname@s.
When you press ``A``, your friends will see a **smiley** face. When you press ``B``, they will see a **frowny** face.

## Sending a smiley

The @boardname@ can't understand mood but it is pretty good with numbers. In fact, it can send numbers
between @boardname@s using the radio antenna, just like a phone can send text messages.

Let's add blocks that send a number when button ``A`` is pressed. We assume that `0` is the "mood code" to send for **smiley**.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0)
    basic.showIcon(IconNames.Happy)
})
```

## Receiving a smiley

We add a ``||radio:on received number||`` block that will run code whenever a new "mood" message comes in.
The ``receivedNumber`` variable contains the numeric value that was sent. Since we've decided that
`0` is **smiley**, we add a conditional ``||logic:if then||`` statement to show this icon.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showIcon(IconNames.Happy)
    }
})
```

## Sending a frowny

Adding another mood to our messaging app done in a similar way. We decide that the "mood code" of `1` means **frowny**. We can add a ``B`` button event that sends that code.

```blocks
input.onButtonPressed(Button.B, () => {
    radio.sendNumber(1)
    basic.showIcon(IconNames.Sad)
})
```

If the ``||radio:on received number||`` block, we add another conditional ``||logic:if then||`` statement to handle the **frowny** "mood code".

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showIcon(IconNames.Happy)
    }
    if (receivedNumber == 1) {
        basic.showIcon(IconNames.Sad)
    }
})
```

That's it. Download your code to multiple @boardname@s and try it out!

## Challenges

Try adding a new code and use the ``||input:on shake||`` event to send it.

## Full sources

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0)
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, () => {
    radio.sendNumber(1)
    basic.showIcon(IconNames.Sad)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showIcon(IconNames.Happy)
    }
    if (receivedNumber == 1) {
        basic.showIcon(IconNames.Sad)
    }
})
```

```package
radio
```