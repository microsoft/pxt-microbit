# Cat Napping

## 1. Introduction @unplugged

Lychee the cat loves to sunbathe and wants to know if your home has a good sunbathing spot. Are you up for the challenge?

![Cat Tanning banner message, an image of a cat](/static/mb/projects/cat-napping/1_lychee.png)

## 2. Importing the Data Logger extension

💾 **Data logging** 💾

The micro:bit V2 has the ability to log data. This functionality comes from an [__*extension*__](#extension "functionality that you can add to your existing project"). Let's begin by adding the relevant extension to our workspace.

---

► Click on the **"➕ Extensions"** button on your toolbox.

► Find the **"datalogger"** extension and click on it. This should add it to your toolbox.

![Importing the Data Logger extension](/static/mb/projects/cat-napping/2_dl-extension.gif)

## 3. Setting up data logging columns

🌞 **Warm and sunny** 🌞

Lychee loves her sun spots because they provide a nice, sunny and warm place to nap. Because of this, she would like you to help her track two types of data: light and temperature.

---

► From the ``||datalogger:Data Logger||`` category, grab a ``||datalogger:set columns [""] +||`` block and snap it into your ``||basic:on start||`` container.

► Click on the ``""`` entry box and type in **``temperature``**.

► Click on the ➕ in the ``||datalogger:set columns ["temperature"] +]||`` block. This should produce a new ``""`` entry box.

► Click on the new, empty ``""`` entry box and type in **``light``**.

```blocks
datalogger.setColumnTitles(
    "temperature",
    "light"
    )
```

## 4. Time interval for data logging

📈 **A data point a minute** 📈

In order to get Lychee a good amount of data without running out of memory, we should collect one data point for her every minute.

---

► From the ``||loops:Loops||`` category, grab a ``||loops:every [500] ms||`` container and add it to your workspace.

► Click on the the ``500`` dropdown and select ``1 minute``.  
💡 1 minute is equivalent to 60000ms, which is what the number will automatically change to.

```blocks
loops.everyInterval(60000, function () {
})
```

## 5. Setting up a logging variable

We want to make sure we know when our micro:bit is collecting data. To do this, let's create a [__*variable*__](#variable "a holder for information that may change") and use it with an [__*if then*__](#ifthen "runs some code if a boolean condition is true") statement to keep track of if the @boardname@ is logging data.

---

► In the ``||variables:Variables||`` category, click on ``Make a Variable...`` and make a variable named ``logging``.

► From the ``||logic:Logic||`` category, grab a ``||logic:if <true> then||`` statement and snap it into your ``||loops:every [600000] ms||`` container.

► From the ``||variables:Variables||`` category, drag out a ``||variables:logging||`` variable and snap it in to **replace** the ``||logic:<true>||`` argument in the ``||logic:if <true> then||`` statement.

```blocks
loops.everyInterval(60000, function () {
    //@highlight
    if (logging) {
    }
})
```

## 6. Setting up logging pt. 1

🏁 **Ready...set...log!** 🏁

---

► From the ``||datalogger:Data Logger||`` category, grab a ``||datalogger:log data [column [""] value [0]] +||`` block and snap it **inside** the ``||logic:if [logging] then||`` statement.

► Click on the ``""`` after the word ``column`` and type in ``temperature``.  
💡 There will also be an option to autofill ``temperature`` by clicking on it on the dropdown. You can do this as well!

► From the ``||input:Input||`` category, select the ``||input:temperature (°C)||`` parameter and drag it in to **replace** the ``0`` parameter after the word ``value``.

```blocks
loops.everyInterval(60000, function () {
    if (logging) {
        datalogger.log(
            //@highlight
            datalogger.createCV("temperature", input.temperature())
        )
    }
})
```

## 6. Setting up logging pt. 2

► On the right of the ``||input:temperature (°C)||`` input that you just snapped in, there is a ➕ button. Click on it. You should now see a new row that says ``||datalogger:column [""] value [0]||``.

► Click on the empty ``""`` after the word ``column`` and type in or click on ``light``.

► From the ``||input:Input||`` category, select the ``||input:light level||`` parameter and drag it in to **replace** the ``0`` parameter after the word ``value``.

```blocks
loops.everyInterval(60000, function () {
    if (logging) {
        datalogger.log(
            datalogger.createCV("temperature", input.temperature()),
            //@highlight
            datalogger.createCV("light", input.lightLevel())
        )
    }
})
```

## 7. Toggle logging on A press

▶️ **Starting and stopping** ⏸️

Let's give Lychee some more control over when she wants to start and stop logging data on the @boardname@.

---

► From the ``||input:Input||`` category, grab a ``||input:on button [A] pressed||`` container and drag it into your workspace.

► From the ``||variables:Variables||`` category, grab a ``||variables:set [item] to [0]||`` block and snap it inside of your ``||input:on button [A] pressed||`` container.

► Click on the ``||variables:item||`` dropdown and select ``||variables:logging||``.

► From the ``||logic:Logic||`` category, grab a ``||logic:<not []>||`` argument and snap it in to **replace** the ``0`` argument.

► From the ``||variables:Variables||`` category, grab a ``||variables:logging||`` variable and snap it in to **replace** the empty ``||logic:<>||`` in the ``||logic:not <>||`` statement.

✋🛑 Take a moment to help Lychee answer the following question: _What is happening every time she presses the A button?_

```blocks
input.onButtonPressed(Button.A, function () {
    logging = !(logging)
})
```

## 8. Visual logging indicators

👀 **Visual indicators** 👀

It would help to know when the @boardname@ is logging data and when it isn't. We can do this by adding visual or audio indicators. For this step, we will be building out a visual indicator and using an [__*if then / else*__](#ifthenelse "runs some code if a boolean condition is true and different code if the condition is false") statement to toggle the different indicators.

---

► From the ``||logic:Logic||`` category, grab an ``||logic:if <true> then / else||`` statement and snap it in at the **bottom** of your ``||input:on button [A] pressed||`` container.

► From the ``||variables:Variables||`` category, grab a ``||variables:logging||`` variable and snap it in to **replace** the ``||logic:<true>||`` condition in your ``||logic:if then / else||`` statement.

► Let's display an image when the @boardname@ is logging data. From the ``||basic:Basic||`` category, grab a ``||basic:show icon []||`` block and snap it into the empty **top container** of your ``||logic:if then / else||`` statement.  
💡 The default icon is a heart. Feel free to change the icon to your preference! It will display whenever your @boardname@ is tracking data.

► Let's clear the board when the @boardname@ is not logging data. From the ``||basic:Basic||`` category, grab a ``||basic:clear screen||`` block and snap it into the empty **bottom container** of your ``||logic:if then / else||`` statement.

```blocks
input.onButtonPressed(Button.A, function () {
    logging = !(logging)
    //@highlight
    if (logging) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.clearScreen()
    }
})
```

## 9. Set logging to false on start

✨ **Finishing touches** ✨

To provide more data logging control, let's have the @boardname@ default to not logging when it is turned on.

---

► Look in the ``||variables:Variables||`` category and snap the  ``||variables:set [item] to [0]||`` block ino the **top** of the ``||basic:on start||`` container.

► Click on the ``||variables:[item]||`` dropdown and select ``||variables:logging||``.

► From the ``||logic:Logic||`` category, grab a ``||logic:<false>||`` argument and snap it in to **replace** the ``||variables:[0]||`` value in your ``||variables:set [logging] to [0]||`` statement.

```blocks
let logging = false
//@highlight
logging = false
datalogger.setColumnTitles(
    "temperature",
    "light"
    )
```

## 10. Time to log data! @unplugged

🎉 **Time to log data!** 🎉

You did it! If you have a @boardname@ V2 (the one with the **shiny gold** logo at the top), download this code and try it out!

---

► Find a sun spot in your house and press the ``A`` button to start logging data - your display should show an icon to indicate that you are logging data.

► After some time (we recommend at least an hour), press the ``A`` button again to stop logging data - your display should clear to indicate that you are not logging data.

## 11. Reviewing your data @unplugged

🕵️ **Reviewing your data** 🕵️

Now that you have logged some data, plug your @boardname@ into a laptop or desktop computer. The @boardname@ will appear like a USB drive called MICROBIT. Look in there and you'll see a file called MY_DATA:

![MY_DATA file highlighted in file folder](/static/mb/projects/cat-napping/11_mydata.png)

Double-click on MY_DATA to open it in a web browser and you'll see a table with your data:

![MY_DATA file highlighted in file folder](/static/mb/projects/cat-napping/11_datafile.png)

## 12. Lychee's preferences

Does your home have a good sunbathing spot for Lychee? Comment on our [forum post](TODO) to let us know the max and min light and temperature levels you recorded!

```package
datalogger
```
