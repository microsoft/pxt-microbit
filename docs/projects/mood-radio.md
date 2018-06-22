# Mood Radio

## @description A mini mood messaging app using radio

![@boardname@ sending moods around](/static/mb/projects/mood-radio.png)

This project uses the [radio](/reference/radio) to share your mood with other @boardname@.
When you press ``A``, you friends will see a **smilley**. When you press ``B``, they will see a **frownie**.

## Sending a smiley

The @boardname@ can't understand mood but it is pretty good with numbers. In fact, it can send numbers
between @boardname@ using the radio antenna, just like phones.

Let's add blocks that send a number when button ``A`` is pressed. In our "code", 
we assume that **0** means "smiley".

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0)
    basic.showIcon(IconNames.Happy)
})
```

## Receiving a smiley

We add a ``radio on received`` block that will run code whenever a new message code in.
The ``receivedNumber`` variable contain the numeric value that was sent. Since we've decided that
**0** was **smiley**, we add a conditional **if** statement to show this icon.

```blocks
radio.onDataPacketReceived( ({ receivedNumber }) =>  {
    if (receivedNumber == 0) {
        basic.showIcon(IconNames.Happy)
    }
})
```

## Sending a frowney

Adding another code in our messaging app is very similar. We decide that **1** means **forwnie**.
Then we can add a ``B`` button event that sends that code.

```blocks
input.onButtonPressed(Button.B, () => {
    radio.sendNumber(1)
    basic.showIcon(IconNames.Sad)
})
```

If the ``on radio received`` block, we add an conditional **if** statement to handle the new code.

```blocks
radio.onDataPacketReceived( ({ receivedNumber }) =>  {
    if (receivedNumber == 0) {
        basic.showIcon(IconNames.Happy)
    }
    if (receivedNumber == 1) {
        basic.showIcon(IconNames.Sad)
    }
})
```

That's it. Download your code in multiple @boardname@ and try it out!

## Challenges

Try adding a new code and use the **shake** event to send it.

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
radio.onDataPacketReceived( ({ receivedNumber }) =>  {
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