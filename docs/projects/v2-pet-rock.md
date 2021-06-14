# Pet Rock

## 1. Introduction @unplugged

Have you ever had a pet rock? Now, you can have a pet rock that can make noise ⛰️🔊
<br/>
<br/>
The new @boardname@s have gold logo buttons. This is because the logos are now touch sensors!
<br/>
<br/>
For this tutorial, we will create a "pet rock" whose mood changes depending on if you shake them or press their logo.

## 2. Cyrus's duck face

👋⛰️ Meet your new pet rock, Cyrus ⛰️👋
<br/>
Cyrus is a very sleepy rock. In fact, Cyrus is almost always sleeping! 😴

---

► From the ``||basic:Basic||`` category, find the ``||basic:show icon [ ]||`` block and add it to your ``||basic:on start||`` container.
<br/>
► Set it to show the asleep ``-_-`` face.
<br/>
&nbsp;&nbsp; 💡 In the ``show icon`` dropdown menu options, if you hover over them, you can see what they're called!

```blocks
basic.showIcon(IconNames.Asleep)
```

## 3. Dizzy Cyrus

Whenever Cyrus is shaken, they get sad 🙁

---

► From the ``||input:Input||`` category, find the ``||input:on [shake]||`` container and drag it into your workspace.
<br/>
► Look in the ``||basic:Basic||`` category to find another ``||basic:show icon [ ]||`` block and put it into your ``||input:on [shake]||`` container.
<br/>
► Set the icon (Cyrus's face) to sad ``:(``.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Sad)
})
basic.showIcon(IconNames.Asleep)
```

## 4. Giggly Cyrus

When Cyrus's logo is pressed, it tickles 😂

---

► From the ``||input:Input||`` category, find the ``||input:on logo [pressed]||`` container and drag it into your workspace.
<br/>
► Place a ``||basic:show icon [ ]||`` block into your ``||input:on logo [pressed]||`` container.
<br/>
► Set the icon (Cyrus's face) to happy ``:)``.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Sad)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
})
basic.showIcon(IconNames.Asleep)
```

## 5. Dizzy sound

When Cyrus is sad, they like to express themselves through sound 🎶

---

► From the ``||music:Music||`` category, find the ``||music:play sound [giggle] until done||`` block and add it to the end of your ``||input:on [shake]||`` container.
<br/>
► Set it so Cyrus plays a ``sad`` sound when shaken.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Sad)
    soundExpression.sad.playUntilDone()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
})
basic.showIcon(IconNames.Asleep)
```

## 6. Tickle sound

When Cyrus is tickled, they giggle 🤣

---

► From the ``||music:Music||`` category, get another ``||music:play sound [giggle] until done||`` block and add it to the end of your ``||input:on logo [pressed]||`` container.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Sad)
    soundExpression.sad.playUntilDone()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
    soundExpression.giggle.playUntilDone()
})
basic.showIcon(IconNames.Asleep)
```

## 7. Cyrus's default face

Right now, Cyrus stays sad even after they are shaken and also continues to be tickled even after their logo has been pressed. Let's ensure that Cyrus will always go back to sleep after being shaken or tickled.

---

► Duplicate Cyrus's asleep face ``||basic:show icon||`` block from the ``||basic:on start||`` container.
<br/>
&nbsp;&nbsp; 💡 **Right click > duplicate** to duplicate the asleep face.
<br/>
► Place your copied asleep face into the end of your ``||input:on [shake]||`` container.
<br/>
► Duplicate the face again and this time attach it to the end of your ``||input:on logo [pressed]||`` container.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Sad)
    soundExpression.sad.playUntilDone()
    basic.showIcon(IconNames.Asleep)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
    soundExpression.giggle.playUntilDone()
    basic.showIcon(IconNames.Asleep)
})
basic.showIcon(IconNames.Asleep)
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
    basic.showIcon(IconNames.Sad)
    soundExpression.sad.playUntilDone()
    basic.showIcon(IconNames.Asleep)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
    soundExpression.giggle.playUntilDone()
    basic.showIcon(IconNames.Asleep)
})
basic.showIcon(IconNames.Asleep)
```