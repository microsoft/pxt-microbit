# Pet Hamster

## 1. Introduction @unplugged

👋 Meet your new pet hamster, Cyrus 🐹

## 2. Cyrus's asleep face

😴 **Sleeping on the job** 😴

Cyrus is a very sleepy hamster. In fact, Cyrus is almost always sleeping.

<hr/>

► From the ``||basic:Basic||`` category, find the ``||basic:show icon [ ]||`` block and add it to your ``||basic:on start||`` container.

► Set it to show the asleep ``-_-`` face.
<br/>
&nbsp;&nbsp; 💡 In the ``show icon`` dropdown menu options, if you hover over them, you can see what they're called!

```blocks
basic.showIcon(IconNames.Asleep)
```

## 3. Dizzy Cyrus

😵 **All shaken up** 💫

Whenever Cyrus is shaken, they get sad 🙁

<hr/>

► From the ``||input:Input||`` category, find the ``||input:on [shake]||`` container and drag it into your workspace.

► From the ``||basic:Basic||`` category, grab a ``||basic:show icon [ ]||`` block and snap it into your ``||input:on [shake]||`` container.

► Set the icon (Cyrus's face) to sad ``:(``.

```blocks
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Sad)
})
basic.showIcon(IconNames.Asleep)
```

## 4. Giggly Cyrus

🤣 **That tickles** 🤣

Pressing Cyrus's logo tickles them!

<hr/>

► From the ``||input:Input||`` category, find the ``||input:on logo [pressed]||`` container and drag it into your workspace.

► Place a ``||basic:show icon [ ]||`` block into your **empty** ``||input:on logo [pressed]||`` container.

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

🎶 **The sounds of Cyrus** 🎶

<hr/>

► From the ``||music:Music||`` category, find the ``||music:play sound [giggle] until done||`` block and add it to the **end** of your ``||input:on [shake]||`` container.

► Click on the **dropdown** and set it so Cyrus plays a **``sad``** sound until done.

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

► From the ``||music:Music||`` category, get a ``||music:play sound [giggle] until done||`` block and add it to the **end** of your ``||input:on logo [pressed]||`` container.

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

💤 **Back to sleep** 💤

Let's ensure that Cyrus will always go back to sleep after being shaken or tickled.

<hr/>

► Look at your ``||basic:on start||`` container and **click on** the ``||basic:show icon[-_-]||`` block.

► **Right click > Duplicate** the block.

► Drag your copied block and snap it in at the **end** of your ``||input:on [shake]||`` container.

► Duplicate the block **again** and this time attach it to the **end** of your ``||input:on logo [pressed]||`` container.

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

Check out the simulator and make sure your speakers are on 🔊

Interact with Cyrus to see how they react 🐹
<br/>
&nbsp;&nbsp;&nbsp; **Click on the shake button** to shake Cyrus.
<br/>
&nbsp;&nbsp;&nbsp; **Touch the gold logo** (it looks like a piggy snout 🐽) to tickle Cyrus.

If you own a new @boardname@, you can download this code and try it out!

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