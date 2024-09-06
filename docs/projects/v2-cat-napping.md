# Cat Napping

## {Introduction @unplugged}

Lychee the cat loves the sun and wants to know if your home has a good sunbathing spot. Are you up for the challenge?

![Cat Tanning banner message, an image of a cat](/static/mb/projects/cat-napping/1_lychee.png)

## {Setting logging to false on start}

First, we want to make sure we know when our micro:bit is collecting data. To do this, let's create a [__*boolean*__](#boolean "something that is only true or false") [__*variable*__](#variable "a holder for information that may change") and use it to track when the @boardname@ is logging data. We'll start with the logging variable set to false.

► In the ``||variables:Variables||`` category, click on ``Make a Variable...`` and make a variable named ``logging``.  
► From the ``||variables:Variables||`` category, grab the ``||variables:set [logging] to [0]||`` block and snap it into the empty ``||basic:on start||`` container.  
► From the ``||logic:Logic||`` category, grab a ``||logic:<false>||`` argument and snap it in to **replace** the ``||variables:[0]||`` value in your ``||variables:set [logging] to [0]||`` statement.

```blocks
let logging = false
logging = false
```

## {Toggle logging on A press}

Let's give Lychee some control over when she wants to start and stop logging data on the @boardname@.

► From the ``||input:Input||`` category, grab a ``||input:on button [A] pressed||`` container and drag it into your workspace. Then, grab a ``||variables:set [logging] to [0]||`` block from ``||variables:Varables||`` and snap it inside of your ``||input:on button [A] pressed||`` container.  
► From the ``||logic:Logic||`` category, grab a ``||logic:<not []>||`` argument and snap it in to **replace** the ``0`` argument. Go back to the ``||variables:Variables||`` category, grab a ``||variables:logging||`` variable and snap it in to **replace** the empty ``||logic:<>||`` in the ``||logic:not <>||`` statement.

✋🛑 Take a moment to help Lychee answer the following question: _What is happening every time she presses the A button?_

```blocks
let logging = false
input.onButtonPressed(Button.A, function () {
    logging = !(logging)
})
```

## {Visual logging indicators}

It would help to know when the @boardname@ is logging data and when it isn't. For this step, we will be building out a visual indicator using an [__*if then / else*__](#ifthenelse "runs some code if a boolean condition is true and different code if the condition is false") statement.

► From the ``||logic:Logic||`` category, grab an ``||logic:if <true> then / else||`` statement and snap it in at the **bottom** of your ``||input:on button [A] pressed||`` container.  
► From ``||variables:Variables||``, grab a ``||variables:logging||`` variable and snap it in to **replace** the ``||logic:<true>||`` condition in your ``||logic:if then / else||`` statement.  

```blocks
let logging = false
input.onButtonPressed(Button.A, function () {
    logging = !(logging)
    if (logging) {
    } else {
    }
})
```

## {Set the indicator icon}

► Let's display an image when the @boardname@ is logging data. From the ``||basic:Basic||`` category, grab a ``||basic:show icon [ ]||`` block and snap it into the empty **top container** of your ``||logic:if then / else||`` statement.  
► Set it to show the "target" icon (it looks like an empty sun - scroll down to find it!).  This will show whenever your @boardname@ is collecting data.  
💡 In the ``show icon`` dropdown menu options, you can hover to see what each design is called.

```blocks
let logging = false
input.onButtonPressed(Button.A, function () {
    logging = !(logging)
    if (logging) {
        basic.showIcon(IconNames.Target)
    } else {
    }
})
```

## {Auditory logging indicators}

Let's now add an auditory indicator that your @boardname@ is logging data!

► From the ``||music:Music||`` category, grab a ``||music:play sound [dadadum] [in background]||`` block and snap it into the **bottom** of the **top container** of your ``||logic:if then / else||`` statement.  
► Click on the ``[dadadum]`` dropdown and select ``nyan``, then set the playback mode to ``||music:[until done]||``. Your block should now say ``||music:play melody [nyan] [until done]||``.

```blocks
let logging = false
input.onButtonPressed(Button.A, function () {
    logging = !(logging)
    if (logging) {
        basic.showIcon(IconNames.Target)
        music.play(music.builtInPlayableMelody(Melodies.Nyan), music.PlaybackMode.UntilDone)
    } else {
    }
})
```

## {Logging off indicator}

► Let's clear the board when the @boardname@ is not logging data. From the ``||basic:Basic||`` category, grab a ``||basic:clear screen||`` block and snap it into the empty **bottom container** of your ``||logic:if then / else||`` statement.

```blocks
let logging = false
input.onButtonPressed(Button.A, function () {
    logging = !(logging)
    if (logging) {
        basic.showIcon(IconNames.Target)
        music.play(music.builtInPlayableMelody(Melodies.Nyan), music.PlaybackMode.UntilDone)
    } else {
        basic.clearScreen()
    }
})
```

## {Time interval for data logging}

Let's set up the data logging for Lychee! In order to get Lychee a good amount of data without running out of memory, we should collect one data point for her every minute.

► From the ``||loops:Loops||`` category, grab a ``||loops:every [500] ms||`` container and add it to your workspace.  
► Click on the the ``500`` dropdown and select ``1 minute``. <br />
💡 1 minute is equivalent to 60000ms, which is what the number will automatically change to.

```blocks
loops.everyInterval(60000, function () {
})
```

## {Setting up a logging variable}

Now, let's use an [__*if then*__](#ifthen "runs some code if a boolean condition is true") statement to track when the @boardname@ is logging data.

► From the ``||logic:Logic||`` category, grab a ``||logic:if <true> then||`` statement and snap it into your ``||loops:every [600000] ms||`` container.  
► From the ``||variables:Variables||`` category, drag out a ``||variables:logging||`` variable and snap it in to **replace** the ``||logic:<true>||`` argument in the ``||logic:if <true> then||`` statement.

```blocks
let logging = false
loops.everyInterval(60000, function () {
    if (logging) {
    }
})
```

## {Setting up logging - Part 1}

Lychee loves her sun spots because they provide a nice, sunny and warm place to nap. So, we'll need to measure the **temperature** and **light** in different places around the house.

► From the ``||datalogger:Data Logger||`` category, grab a ``||datalogger:log data [column [""] value [0]] +||`` block and snap it **inside** the ``||logic:if [logging] then||`` statement.  
► Click on the ``""`` after the word ``column`` and type in "``temp``".  
► From the ``||input:Input||`` category, select the ``||input:temperature (°C)||`` parameter and drag it in to **replace** the ``0`` after the word ``value``.

```blocks
let logging = false
loops.everyInterval(60000, function () {
    if (logging) {
        //@highlight
        datalogger.log(
            datalogger.createCV("temp", input.temperature())
        )
    }
})
```

## {Setting up logging - Part 2}

► On the right of the ``||input:temperature (°C)||`` input that you just snapped in, there is a ➕ button. Click on it. You should now see a new row that says ``||datalogger:column [""] value [0]||``.  
► Click on the empty ``""`` after the word ``column`` and type in "``light``".  
► From the ``||input:Input||`` category, select the ``||input:light level||`` parameter and drag it in to **replace** the ``0`` parameter after the word ``value``.

```blocks
let logging = false
loops.everyInterval(60000, function () {
    if (logging) {
        //@highlight
        datalogger.log(
            datalogger.createCV("temp", input.temperature()),
            datalogger.createCV("light", input.lightLevel())
        )
    }
})
```

## {Time to log data! @unplugged}

You did it! If you have a @boardname@ V2 (the one with the **shiny gold** logo at the top), download this code and try it out!

► Find a sun spot in your house and press the ``A`` button to start logging data - your display should show an icon and play a sound to indicate that you are logging data.  
► After some time (we recommend at least an hour), press the ``A`` button again to stop logging data - your display should clear to indicate that you are not logging data.

## {Reviewing your data @unplugged}

Now that you have logged some data, plug your @boardname@ into a laptop or desktop computer. The @boardname@ will appear like a USB drive called MICROBIT. Look in there and you'll see a file called MY_DATA:

![MY_DATA file highlighted in file folder](/static/mb/projects/cat-napping/11_mydata.png)

Double-click on MY_DATA to open it in a web browser and you'll see a table with your data:

![Image of sample data file](/static/mb/projects/cat-napping/11_datafile.png)

## {Lychee's preferences @unplugged}

Does your home have a good sunbathing spot for Lychee? Compare the light and temperature levels you record for different areas around your house! The sunniest and warmest spots will likely be her favorite ☀️😻

```template
//
```

```package
datalogger
```
