# Micro Chat

## Introduction @unplugged

💬 Multiple @boardname@s can communicate with one another! 💬

By the time you finish this tutorial, you will be able to send messages between at least two micro:bits 🥳

If you have the @boardname@ V2, we'll also add in a notification sound!

_**Note:** Do not worry if you don't own multiple @boardname@s. We will be able to simulate two in this tutorial._

![Two @boardname@ connected via radio](/static/mb/projects/a9-radio.png)

## Sending a message

Let's start by programming your @boardname@ to send out a text message when you press a button.

---

► From the ``||input:Input||`` category, find the ``||input:on button [A] pressed||`` container and add it to your workspace.
<br/>
► Drag a ``||radio:radio send string [" "]||`` block into your  ``||input:on button [A] pressed||`` container and set the string to be a message of your choice, like ``"Hi!"``

```blocks
input.onButtonPressed(Button.A, function() {
    radio.sendString("Hi!");
});
```

## Receiving a message

Now, we will need to program your @boardname@ to receive a message that is sent to it.

---

► From the ``||radio:Radio||`` category, find the ``||radio:on radio received [receivedString]||`` container and add it to your workspace.

```blocks
radio.onReceivedString(function (receivedString) {
})
```

## Displaying text

The next step is to have your @boardname@ display the text it has received. 📃

---

► Grab a ``||basic:show string ["Hello!"]||`` block and place it into your ``||radio:on radio received [receivedString]||`` container.
<br/>
&nbsp;&nbsp; 💡 If you skip the below step, your @boardname@ will display ``Hello!`` every time it receives a string.
<br/>
► In order to display the string that you received, drag the ``||variables:receivedString||`` variable from the ``||radio:on radio received [receivedString]||`` and put it in as the argument for ``||basic:show string [ ]||``.
󠀢
```blocks
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString);
})
```

## Testing in the simulator

Let's test what you've created! 👀

---

► Press button **A** on the simulator. You will notice that a second @boardname@ appears.
<br/>
&nbsp;&nbsp; 💡 If your screen is too small, the simulator might decide not to show it.
<br/>
► Press **A** again and notice that the message you wrote gets displayed on the other @boardname@.

```blocks
input.onButtonPressed(Button.A, function() {
    radio.sendString("Hi!");
});
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString);
})
```

## Groups

With what you've created so far, your @boardname@s will send out and receive signals from every @boardname@ in the area. Let's make it so that you only receive messages from @boardname@s that are in the same group 🧑🏿‍🤝‍🧑🏼

---

► From the ``||radio:Radio||`` category, find the ``||radio:set group [1]||`` block and add it into your ``||basic:on start||`` container.
<br/>
► Set your group to be a number of your choice. We chose ``123``!
<br/>
&nbsp;&nbsp; 💡 You will only receive messages from @boardname@s within the same group.

```blocks
radio.setGroup(123)
```

## Try it on your hardware

If you own multiple @boardname@s, you can see this code happen on your hardware!

---

► Download this program to each of your @boardname@s.
<br/>
► Press button **A** on one and see if the other gets the message you wrote.

```blocks
radio.setGroup(123);
input.onButtonPressed(Button.A, function() {
    radio.sendString("Hi!");
});
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString);
})
```

## Adding a notification sound in V2 @unplugged

🎉 You've now completed the part of the tutorial compatible with all the @boardname@ versions! 🎉
<br/>
<br/>
If you have the @boardname@ V2 or want to learn how to use some of V2 features, continue on in this tutorial to add a notification sound when you receive a message using the @boardname@ V2's built-in speaker! 🎵

## Turning on built-in speaker

To begin with, we need to turn on the built-in @boardname@ speaker.

---

► From the ``||music:Music||`` category, find the ``||music:set built-in speaker [OFF]||`` block and add it at the beginning of your ``||radio:on radio received [receivedString]||`` container.
<br/>
► Set the toggle on your ``||music:set built-in speaker [ ]||`` block to ``ON``.

```blocks
radio.onReceivedString(function (receivedString) {
    music.setBuiltInSpeakerEnabled(true);
    basic.showString(receivedString);
})
```

## Customizing notification sound

Now, let's choose a sound for your @boardname@ V2 to play when it receives a message. 🎶

---

► From the ``||music:Music||`` category, find the ``||play sound [giggle]||`` block and put it after your ``||music:set built-in speaker [enabled]||`` block.
<br/>
► Use the dropdown in the ``||play sound [ ]||`` block to select the sound you want to play. We chose ``hello``! 👋

```blocks
radio.onReceivedString(function (receivedString) {
    music.setBuiltInSpeakerEnabled(true);
    soundExpression.hello.play();
    basic.showString(receivedString);
})
```

## Try it on your hardware

If you own multiple @boardname@ V2s, you can see and hear this code happen on your hardware!

---

► Download this program to each of your @boardname@s.
<br/>
► Press button **A** on one and see if the other gets the message and melody you chose.

```blocks
radio.setGroup(123);
input.onButtonPressed(Button.A, function() {
    radio.sendString("Hi!");
});
radio.onReceivedString(function (receivedString) {
    music.setBuiltInSpeakerEnabled(true);
    soundExpression.hello.play();
    basic.showString(receivedString);
})
```

```package
radio
```