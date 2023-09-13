# Smiley Buttons

### @explicitHints true

## Code a micro:bit emoji! @unplugged

Program the buttons on the @boardname@ to show a happy 😀 or sad face 🙁

![Pressing the A and B buttons](/static/mb/projects/smiley-buttons/sim.gif)

## {Step 1}

Use the ``||input:on button pressed||`` function to run code when button **A** is pressed. Type the code below, or drag a code snippet from the ``||input:Input||`` Toolbox category.

```spy
input.onButtonPressed(Button.A, function() {})
```

## {Step 2}

Use the basic ``||basic:show icon||`` statement inside the ``||input:on button pressed||`` function display a **Happy** face when button **A** is pressed.

```spy
input.onButtonPressed(Button.A, function() { 
    basic.showIcon(IconNames.Happy)
})
```

## {Step 3}

Run your code in the @boardname@ simulator on the screen, press the **A** button. Do you see a happy face? ⭐ Great job! ⭐

## {Step 4}

Write another ``||input:on button pressed||`` function with a ``||basic:show icon||`` inside to display a **Sad** face when button **B** is pressed. Try copying and pasting your existing code, and change **A** to **B** and Happy to Sad.

```spy
input.onButtonPressed(Button.B, function() { 
    basic.showIcon(IconNames.Sad)
})
```

## {Step 5}

Run your code in the @boardname@ simulator on the screen, press the **B** button. Do you see a sad face? ⭐ Great job! ⭐

## {Step 6}

If you have a @boardname@ device, connect it to your computer and click the ``|Download|`` button. Follow the instructions to transfer your code onto the @boardname@. Try pressing the **A** and **B** buttons on the micro:bit to see your Happy 😀 and Sad 🙁 emojis!

## {Step 7}

Go further - try adding a secret emoji that appears when **A** and **B** buttons are pressed together! 
Learn more about how the @boardname@ buttons work by watching [this video](https://youtu.be/t_Qujjd_38o).
