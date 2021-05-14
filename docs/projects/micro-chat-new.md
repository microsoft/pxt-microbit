# Micro Chat

## Introduction @unplugged

💬 Multiple @boardname@s can communicate with one another! 💬

By the time you finish this tutorial, you will be able to communicate between multiple micro:bits 🥳

If you have the @boardname@ V2, we'll also add in a notification sound!

_**Note:** Do not worry if you don't own multiple @boardname@s. We will be able to simulate two in this tutorial._

![Two @boardname@ connected via radio](/static/mb/projects/a9-radio.png)

## Sending a message

Let's start by programming your @boardname@ to send out a text message when you press a button.

---

► From the ``||input:Input||`` category, find the ``||input:on button [A] pressed||`` container and add it to your workspace.
<br/>
&nbsp;&nbsp; 💡 This will allow you to map sending your text to a button being pressed.
<br/>
► Drag a ``||radio:radio send string [" "]||`` block into your  ``||input:on button [A] pressed||`` container and set the string to be a message of your choice, like a smiley face ``":)"``

```blocks
input.onButtonPressed(Button.A, function() {
    radio.sendString(":)");
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
► In order to display the string that you received, drag the ``||variables:receivedString||`` variable from the ``||radio:on radio received [receivedString]||`` and put it into ``||basic:show string [ ]||``.
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
    radio.sendString(":)");
});
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString);
})
```

## Try it on your hardware

If you own multiple @boardname@s, you can see this code happen on your hardware!

---

► Download this program to each of your @boardname@s.
<br/>
► Press button **A** on one and see if the other gets the message you wrote.

## Groups

With what you've created so far, your @boardname@s will send out and receive signals from every @boardname@ in the area. Let's make it so that you only receive messages from @boardname@s that are in the same group 🧑🏿‍🤝‍🧑🏼

---

► From the ``||radio:Radio||`` category, find the ``||radio:set group [1]||`` block and add it into your ``||basic:on start||`` container.
<br/>
&nbsp;&nbsp; 💡 This will allow you to assign a **group** number to your program. You will only receive messages from @boardname@s within the same group.
<br/>


```blocks
radio.setGroup(123)
```

## Adding a notification sound

The @boardname@ V2 can play music! 🎵 Let's add a notification sound when you receive a message.

---

► From the ``||music:Music||`` category, find the ``||music:play melody [ ] at tempo [120] (bpm)||`` block and place it at the beginning of your ``||radio:on radio received [receivedString]||`` container.
<br/>
► Click on the first white box in your ``||music:play melody||`` block to design a notification melody of your own! 🎶
<br/>
&nbsp;&nbsp; 💡 Not in the mood for a custom tune? When you're in the melody editor, flip to the _Gallery_ tab and choose from premade melodies.
<br/>
&nbsp;&nbsp; 💡 Want to alter the speed of your music? Try playing with different values for the ``||tempo [120] (bpm)||`` setting!

```blocks
radio.onReceivedString(function (receivedString) {
    music.playMelody("- - - - - - - - ", 120);
    basic.showString(receivedString);
})
```

## Try it on your hardware

If you own multiple @boardname@ V2s, you can see and hear this code happen on your hardware!

---

► Download this program to each of your @boardname@s.
<br/>
► Press button **A** on one and see if the other gets the message and melody you chose.

```package
radio
```