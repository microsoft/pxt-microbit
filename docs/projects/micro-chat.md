# Micro Chat

## {Introduction @unplugged}

![Two @boardname@ connected via radio](/static/mb/projects/a9-radio.png)

Use the micro:bit 📻 radio to send and receive 💬 messages between micro:bits!

## {Step 1}

From the ``||radio:Radio||`` Toolbox category, drag a ``||radio:radio set group||`` block into the ``||basic:on start||`` block. This will act as the channel over which we'll send messages. Only micro:bits who are in the same group will be able to send and receive messages between them.

```blocks
radio.setGroup(1)
```

## {Step 2}

From the ``||input:Input||`` Toolbox category, drag an ``||input:on button A pressed||`` block onto the Workspace.

```blocks
input.onButtonPressed(Button.A, function() {})
```

## {Step 3}

From the ``||radio:Radio||`` category, drag a ``||radio:radio send string||`` block into the ``||input:on button A pressed||`` block and type a message. When we press button A on our micro:bit, we'll send this message to every micro:bit nearby in group 1.

```blocks
input.onButtonPressed(Button.A, function() {
    radio.sendString("Micro Chat!")
})
```

## {Step 4}

From the ``||radio:Radio||`` category, drag an ``||radio:on radio received string||`` block onto the Workspace. 

```blocks
radio.onReceivedString(function (receivedString) {
})
```

## {Step 5}

From the ``||basic:Basic||`` category, get a ``||basic:show string||`` block and drop it in the ``||radio:on radio received string||`` block. 

```blocks
radio.onReceivedString(function (receivedString) {
    basic.showString("Hello!");
})
```

## {Step 6}

Pull the ``||variables:receivedString||`` variable block out of the ``||radio:on received string||`` block and put it into the ``||basic:show string||`` block replacing "Hello!"

```blocks
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString);
})
```

## {Step 7}

Let's test our code! In the micro:bit on-screen simulator, press button **A**. You should see a second @boardname@ appear. Now try pressing **A** again. Do you see your message appear on the second micro:bit?  ⭐ Great job! ⭐ 

```blocks
input.onButtonPressed(Button.A, function() {
    radio.sendString("Micro Chat!");
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString);
})
```

## {Step 8}

If you have a @boardname@ device, connect it to your computer and click the ``|Download|`` button. Follow the instructions to transfer your code onto the @boardname@.  If you have two micro:bits, download the program to each one. Press button **A** on one and see if the other gets the message!

## {Step 9}

Go further - try using different buttons to send a mix of messages 📝, or send secret 🔒 messages to different radio groups!

```template
//
```

```package
radio
```
