# Pet Rock

## 1. Introduction @unplugged

Have you ever had a pet rock? Now, you can have a pet rock that can make noise 🐵🔊
<br/>
<br/>
One of the new @boardname@ features is a capacitive touch sensor (a bit like your phone!). This sensor is the logo button on your @boardname@.
<br/>
<br/>
For this tutorial, we will create a "pet rock" whose mood changes depending on if you shake them or press their logo.

## 2. Cyrus's duck face

👋 Meet your new pet rock, Cyrus 👋
<br/>
Cyrus likes to make duck faces. Let's set up Cyrus's duck face! 🦆😏

---

► From the ``||basic:Basic||`` category, find the ``||basic:show icon [ ]||`` block and add it to your ``||basic:on start||`` container.
<br/>
► Set it to show the ``:O`` face.

```blocks
basic.showIcon(IconNames.Surprised)
```

## 3. Dizzy Cyrus

Whenever Cyrus is shaken, they get confused and dizzy 😵‍💫

---

► From the ``||input:Input||`` category, find the ``||input:on [shake]||`` container and drag it into your workspace.
<br/>
► Look in the ``||basic:Basic||`` category to find another ``||basic:show icon [ ]||`` block and put it into your ``||input:on [shake]||`` container.
<br/>
► Set the icon (Cyrus's face) to confused.
<br/>
&nbsp;&nbsp; 💡 In the ``show icon`` dropdown menu options, if you hover over them, you can see what they're called!

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Confused)
})
basic.showIcon(IconNames.Surprised)
```

## 4. Giggly Cyrus

When Cyrus's logo is pressed, it tickles 😹

---

► From the ``||input:Input||`` category, find the ``||input:on logo [pressed]||`` container and drag it into your workspace.
<br/>
► Place a ``||basic:show icon [ ]||`` block into your ``||input:on logo [pressed]||`` container.
<br/>
► Set the icon (Cyrus's face) to happy.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Confused)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
})
basic.showIcon(IconNames.Surprised)
```

## 5. Dizzy sound

When Cyrus is dizzy, he likes to express himself through sound 🎶

---

► From the ``||music:Music||`` category, find the ``||music:play sound [giggle] until done||`` block and add it to the end of your ``||input:on [shake]||`` container.
<br/>
► Set it so Cyrus plays a ``mysterious`` sound when shaken.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Confused)
    soundExpression.mysterious.playUntilDone()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
})
basic.showIcon(IconNames.Surprised)
```

## 6. Tickle sound

When Cyrus is tickled, he giggles 🤣

---

► From the ``||music:Music||`` category, get another ``||music:play sound [giggle] until done||`` block and add it to the end of your ``||input:on logo [pressed]||`` container.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Confused)
    soundExpression.mysterious.playUntilDone()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
    soundExpression.giggle.playUntilDone()
})
basic.showIcon(IconNames.Surprised)
```

## 7. Cyrus's default face

Right now, Cyrus stays mad even after they are shaken and also continues to be tickled even after their logo has been pressed. Let us ensure that Cyrus will always go back to their duck face after being shaken or tickled!

---

► Duplicate Cyrus's duck face ``||basic:show icon||`` block from the ``||basic:on start||`` container.
<br/>
&nbsp;&nbsp; 💡 **Right click > duplicate** to duplicate the duck face.
<br/>
► Place your copied duck face into the end of your ``||input:on [shake]||`` container.
<br/>
► Duplicate the face again and this time attach it to the end of your ``||input:on logo [pressed]||`` container.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Confused)
    soundExpression.mysterious.playUntilDone()
    basic.showIcon(IconNames.Surprised)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
    soundExpression.giggle.playUntilDone()
    basic.showIcon(IconNames.Surprised)
})
basic.showIcon(IconNames.Surprised)
```

## 8. Testing in the simulator

🐾 **Let's test what you've created** 🐾
<br/>
<br/>
Check out the simulator, and make sure your speakers are on 🔊
<br/>
Shake or press Cyrus's logo to see how they interact with you!
<br/>
If you own a new @boardname@, you can download this code and try it out 🥳

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Confused)
    soundExpression.mysterious.playUntilDone()
    basic.showIcon(IconNames.Surprised)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
    soundExpression.giggle.playUntilDone()
    basic.showIcon(IconNames.Surprised)
})
basic.showIcon(IconNames.Surprised)
```