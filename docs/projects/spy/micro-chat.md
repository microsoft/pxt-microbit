# Micro Chat

### @explicitHints true

## {Introduction @unplugged}

![Two @boardname@ connected via radio](/static/mb/projects/a9-radio.png)

Use the micro:bit 📻 radio to send and receive 💬 messages between micro:bits!

## {Step 1}

Let's write some code to set the channel over which we'll send messages. Only micro:bits who are in the same group will be able to send and receive messages between them. Use the radio ``||radio:set group||`` function. Type the code below, or drag a code snippet from the ``||radio:Radio||`` Toolbox category.

```spy
radio.setGroup(1)
```

## {Step 2}

Now let's send a message when we press a button on our micro:bit. Use the input ``||input:on button pressed||`` function.

```spy
radio.setGroup(1)
input.onButtonPressed(Button.A, function() {
})
```

## {Step 3}

Add code to ``||radio:send a string||`` in the ``||input:on button pressed||`` function. This message will be sent to every micro:bit nearby in group 1.

```spy
radio.setGroup(1)
input.onButtonPressed(Button.A, function() {
    // @highlight
    radio.sendString("Micro Chat!")
})
```

## {Step 4}

Now let's add some code to receive messages. Use the radio ``||radio:on received string||`` function.

```spy
radio.setGroup(1)
input.onButtonPressed(Button.A, function() {
    radio.sendString("Micro Chat!")
})
radio.onReceivedString(function (receivedString) {
})
```

## {Step 5}

Inside the ``||radio:on received string||`` function, use the basic ``||basic:show string||`` function to show the value in the ``||variables:receivedString||`` variable.

```spy
radio.setGroup(1)
input.onButtonPressed(Button.A, function() {
    radio.sendString("Micro Chat!")
})
radio.onReceivedString(function (receivedString) {
    // @highlight
    basic.showString(receivedString)
})
```

## {Step 6}

Let's test our code! In the micro:bit on-screen simulator, press button **A**. You should see a second @boardname@ appear. Now try pressing **A** again. Do you see your message appear on the second micro:bit?  ⭐ Great job! ⭐ 

## {Step 7}

If you have a @boardname@ device, connect it to your computer and click the ``|Download|`` button. Follow the instructions to transfer your code onto the @boardname@.  If you have two micro:bits, download the program to each one. Press button **A** on one and see if the other gets the message!

## {Step 8}

Go further - try using different buttons to send a mix of messages 📝, or send secret 🔒 messages to different radio groups!

```package
radio
```