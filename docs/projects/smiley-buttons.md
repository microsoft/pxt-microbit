# Smiley Buttons

## Code a micro:bit emoji! @unplugged

Program the buttons on the @boardname@ to show a happy 😀 or sad face 🙁

![Pressing the A and B buttons](/static/mb/projects/smiley-buttons/sim.gif)

## {Step 1}

Let's show a happy face when we press button **A**.  
Click on the ``||basic:Basic||`` category in the Toolbox. Drag a ``||basic:show icon||`` block into the ``||input:on button A pressed||`` block.  
In the ``||basic:show icon||`` block, click on the Heart icon to open the menu. Select a Happy Face icon.

```blocks
input.onButtonPressed(Button.A, function() { 
    basic.showIcon(IconNames.Happy)
})
```

## {Step 2}

In the @boardname@ simulator on the screen, press the **A** button. Do you see a happy face? ⭐ Great job! ⭐

## {Step 3}

Now let's show a sad face when we press button **B**.  
Click on the ``||input:Input||`` category in the Toolbox. 
Drag another ``||input:on button A pressed||`` block onto the coding workspace (you can place this anywhere). 
Click on the **A** button drop-down menu, and select **B**.

```blocks
input.onButtonPressed(Button.B, function() {})
```

## {Step 4}

From the ``||basic:Basic||`` category, drag another ``||basic:show icon||`` block into the ``||input:on button B pressed||`` block. 
In this ``||basic:show icon||`` block, click on the Heart icon to open the menu. 
Select a Sad Face icon.

```blocks
input.onButtonPressed(Button.B, function() {
    basic.showIcon(IconNames.Sad)
})
```
## {Step 5}

In the @boardname@ simulator on the screen, press the **B** button. Do you see a sad face? ⭐ Great job! ⭐

## {Step 6}

If you have a @boardname@ device, connect it to your computer and click the ``|Download|`` button. Follow the instructions to transfer your code onto the @boardname@. Try pressing the **A** and **B** buttons on the micro:bit to see your happy 😀 and sad 🙁 emojis!

## {Step 7}

Go further - try adding a secret emoji that appears when **A** and **B** buttons are pressed together! 
Learn more about how the @boardname@ buttons work by watching [this video](https://youtu.be/t_Qujjd_38o).

```template
input.onButtonPressed(Button.A, function() {})
```