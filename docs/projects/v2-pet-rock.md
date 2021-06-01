# Pet Rock

## Introduction @unplugged

Have you ever had a pet rock? Now, you can have a pet rock that can make noise 🐵🔊
<br/>
<br/>
Let's learn how to code one!
<br/>
<br/>
For this tutorial, we will create a "pet rock" whose mood changes depending on if you shake them or press their logo

## Cyrus's duck face

Meet your new pet rock, Cyrus. Cyrus likes to make duck faces. Let's set up Cyrus's duck face! 🦆😏

---

► From the ``||basic:Basic||`` category, find the ``||basic:show icon [ ]||`` block and add it to your ``||basic:on start||`` container.
<br/>
► Set it to show the ``:O`` face.

```blocks
basic.showIcon(IconNames.Surprised)
```

## Dizzy Cyrus

Whenever Cyrus is shaked, they get confused and dizzy 😵‍💫

---

► From the ``||input:Input||`` category, find the ``||input:on [shake]||`` container and drag it into your workspace.
<br/>
► Place a ``||basic:show icon [ ]||`` block into your ``||input:on [shake]||`` container.
<br/>
► Set the icon (Cyrus's face) to confused.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Confused)
})
basic.showIcon(IconNames.Surprised)
```

## Giggly Cyrus

When Cyrus's logo is pressed, it tickles! 😹

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

## Adding sounds

Let's add some noises to complement Cyrus's feelings 🎶

---

► From the ``||music:Music||`` category, find the ``||music:play sound [giggle] until done||`` block and add it to the end of your ``||input:on [shake]||`` container.
<br/>
► Drag another or copy the ``||music:play sound [giggle] until done||`` block and add it to the end of your ``||input:on logo [pressed]||`` container.
<br/>
► Set it so Cyrus plays sound ``mysterious`` until done getting shaken. It already makes sense that Cyrus giggles when tickled.

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

## Cyrus's default face

Right now, Cyrus stays mad even after they are shaken and also continues to be tickled even after their logo has been pressed. Let us ensure that Cyrus will always go back to their duck face after being shaken or tickled!

---

► Copy Cyrus's duck face from the ``||basic:on start||`` container.
<br/>
► Paste one and attach it to the end of your ``||input:on [shake]||`` container.
<br/>
► Paste another and attach it to the end of your ``||input:on logo [pressed]||`` container.

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

## Testing in the simulator

🐾 **Let's test what you've created** 🐾
<br/>
<br/>
Check out the simulator, and make sure your speakers are on 🔊
<br/>
<br/>
Shake or press Cyrus's logo to see how they interact with you!
<br/>
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