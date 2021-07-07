# Blow Away

## 1. Introduction pt. 1 @unplugged

👻 Oh, no! Your @boardname@ is being haunted by a ghost named Haven 👻

For this tutorial, we'll learn how to blow Haven away 🌬️

![Blow away banner message](/static/mb/projects/blow-away.png)

## 2. Haunted ghost setup

🏚️ **BooOooOoo** 🏚️

A wild Haven has appeared!

---

► From the ``||basic:Basic||`` category, find ``||basic:show icon [ ]||`` and add it to your ``||basic:on start||`` container.

► Set it to show a ghost.  
💡 In the ``show icon`` dropdown menu options, you can hover to see what each design is called.

```blocks
// @highlight
basic.showIcon(IconNames.Ghost)
```

---

## 3. Loop setup

➰ **Looping around** ➰

---

► From the ``||loops:Loops||`` category, find the ``||loops:repeat [4] times do||`` loop and snap it into your empty ``||basic:forever||`` container.  
💡 Why do we need a [__*repeat loop*__](#repeatLoop "repeat code for a given number of times") when we already have a ``forever`` check? Because ``forever`` has a slight delay!

```blocks
basic.forever(function () {
    // @highlight
    for (let index = 0; index < 4; index++) {
        	
    }
})
```

## 4. Conditional setup

🤔 **Conditioning and comparing** 🤔

Haven hates noise and will blow away if they hear anything. Let's use an [__*if statement*__](#ifstatement "if this condition is met, do something") to check if Haven hears any sounds.

---

► From ``||logic:Logic||``, grab an ``||logic:if <true> then||`` statement and snap it into your empty ``||loops:repeat [4] times do||`` loop.

► Go back to ``||logic:Logic||`` to get a ``||logic:<[0] [=] [0]>||`` comparison.

► Snap ``||logic:<[0] [=] [0]>||`` in to **replace** the ``||logic:<true>||`` condition for your ``||logic:if then||`` statement.

```blocks
basic.forever(function () {
    // @highlight
    for (let index = 0; index < 4; index++) {
        // @highlight
        if (0 == 0) {
            
        }	
    }
})
```

## 5. Blow sound

👂 **Haven's ears** 👂

We will be using our own form of a [__*sound threshold*__](#soundThreshold "a number for how loud a sound needs to be to trigger an event. 0 = silence to 255 = maximum noise") to act as Haven's ears.

---

► From the ``||input:Input||`` category, drag ``||input:sound level||`` in to **replace** the **_left_ ``[0]``** of your ``||logic:<[0] [=] [0]>||`` comparison.

► Using the dropdown in the **middle** of ``||logic:<[sound level] [=] [0]>||``, change the comparison to be **``>``** (greater than).

► Finally, have the **right side** of the comparison say ``128`` so your full comparison reads: **``sound level > 128``**.  
💡 This means Haven will hear any sound above ``128``.

```blocks
basic.forever(function () {
    for (let index = 0; index < 4; index++) {
        // @highlight
        if (input.soundLevel() > 128) {
            
        }	
    }
})
```

## 6. Making variables

☀️ **Variable weather** 🌨️

Let's create some [__*variables*__](#variable "a holder for information that may change") to keep track of Haven's movement.

---

►  In the ``||variables:Variables||`` category, click on ``Make a Variable...`` and make a variable named ``col``.  
💡 ``col`` is short for "column".

►  Make **another** variable and name it ``row``.

## 7. Displacing LEDs part 1

🔀 **Random chance** 🔀

To show Haven is blowing away, we want to move a random set of lights sideways.

---

► Your ``||variables:Variables||`` category should now have the option to ``||variables:set [row] to [0]||``. Drag that block into your empty ``||logic:if then||`` statement.

► From the ``||math:Math||`` category, find ``||math:pick random [0] to [10]||`` and snap that in to **replace** the ``[0]`` in your ``||variables:set [row] to [0]||`` block.

► Set it so it picks a random number from ``0`` to **``4``**.  
💡 We are setting the maximum random value to 4 because the lights on the @boardname@ go from 0, 1, 2, 3, 4 columns and rows.

```blocks
basic.forever(function () {
    for (let index = 0; index < 4; index++) {
        if (input.soundLevel() > 128) {
            // @highlight
            row = randint(0, 4)            
        }	
    }
})
```

## 8. Displacing LEDs part 2

► Go back into ``||variables:Variables||`` and drag out another ``||variables:set [row] to [0]||``. Place this one at the **bottom** of your ``||logic:if then||`` statement.

► Using the **dropdown menu**, set it to read ``||variables:set [col] to [0]||``.

► From the ``||math:Math||`` category, grab another ``||math:pick random [0] to [10]||`` and snap that in to **replace** the ``[0]`` in your new ``||variables:set [col] to [0]||`` block.

► Set it to also pick a random number from ``0`` to **``4``**.

```blocks
let col = 0
let row = 0
basic.forever(function () {
    for (let index = 0; index < 4; index++) {
        if (input.soundLevel() > 128) {
            row = randint(0, 4)   
            // @highlight
            col = randint(0, 4)         
        }	
    }
})
```

## 9. Conditioning on one point

✨ **Ooh, sparkly** ✨

Time to move some lights around!

---

► From ``||logic:Logic||``, grab another ``||logic:if <true> then||`` and snap it at the **inside and at the bottom of** your ``||loops:repeat [4] times do||`` loop, right below your ``||logic:if [sound level] [>] [128]||`` statement.

► From the ``||led:Led||`` category, find ``||led:point x [0] y [0]||`` and drag it in to **replace** the ``||logic:<true>||`` condition in the **new** ``||logic:if then||`` statement.  
💡 This block will test if the light is on at the the given ``x`` and ``y`` coordinate points.

```blocks
let col = 0
let row = 0
basic.forever(function () {
    for (let index = 0; index < 4; index++) {
        if (input.soundLevel() > 128) {
            row = randint(0, 4)
            col = randint(0, 4)         
        }
        // @highlight
        if (led.point(0, 0)) 
    }
})
```

## 10. Unplotting and replotting LEDs

To create the animation effect of Haven blowing away, we will ``unplot``/turn off a light that is on and then ``plot``/turn it on in a different spot.

---

► From ``||led:Led||``, grab ``||led:unplot x [0] y [0]||`` and snap it inside the **empty** ``||logic:if <point x [0] y [0]> then||`` statement.

► Go back to ``||led:Led||`` and take out the ``||led:plot x [0] y [0]||`` block. Snap it in **beneath** the ``||led:unplot x [0] y [0]||`` that you just added.

```blocks
let col = 0
let row = 0
basic.forever(function () {
    for (let index = 0; index < 4; index++) {
        if (input.soundLevel() > 128) {
            row = randint(0, 4)
            col = randint(0, 4)         
        }
        // @highlight
        if (led.point(0, 0)) {
            led.unplot(0, 0)
            led.plot(0, 0)
        }
    }
})
```

## 11. Setting variables

📃 **Columns and rows** 📃

Notice how you have **three** blocks from the ``||led:Led||`` category. All three have ``||led:x||`` ``[0]`` and ``||led:y||`` ``[0]`` coordinates. In these **two** steps, we will set it so that every ``||led:x||`` is followed by the ``||variables:col||`` variable and every ``||led:y||`` is followed by the ``||variables:row||`` variable.

---

► From ``||variables:Variables||``, get three copies of ``||variables:col||``, and use them to **replace the _first_ ``0``'s** (the one to the right of ``x`` and the left of ``y``) in the following three blocks:  
**_1._** ``||led:point x [0] y [0]||``  
**_2._** ``||led:unplot x [0] y [0]||``  
**_3._** ``||led:plot x [0] y [0]||``

► Go into ``||variables:Variables||``, get three copies of ``||variables:row||``, and use them to **replace the _second_ ``0``'s** (the one to the right of ``y``) for **the same three blocks**.

```blocks
let col = 0
let row = 0
basic.forever(function () {
    for (let index = 0; index < 4; index++) {
        if (input.soundLevel() > 128) {
            row = randint(0, 4)
            col = randint(0, 4)         
        }
        // @highlight
        if (led.point(col, row)) {
            led.unplot(col, row)
            led.plot(col, row)
        }
    }
})
```

## 12. Moving LEDs

➕ **Math makes the lights go swoosh** ➗

Right now, we are unplotting and replotting in the same spot. What we want to do instead is move the lights we're unplotting just a smidge to the right every time.

---

► From ``||math:Math||``, find the ``||math:[0] [+] [0]||`` operation and use it to **replace** ``||variables:col||`` in your ``||led:plot x [col] y [row]||`` block.  
💡 If you move your entire ``||basic:forever||`` container, you should find a greyed out ``col`` variable in your workspace.

► Take the greyed out ``||variables:col||`` variable (or get a new one) and use it to **replace** the **_first_ ``[0]``** so the operation reads ``||math:[col] [+] [0]||``.

► Replace the **_second_ ``[0]``** with **``[1]``** so the operation reads ``||math:[col] [+] [1]||``.

```blocks
let col = 0
let row = 0
basic.forever(function () {
    for (let index = 0; index < 4; index++) {
        if (input.soundLevel() > 128) {
            row = randint(0, 4)
            col = randint(0, 4)         
        }
        // @highlight
        if (led.point(col, row)) {
            led.unplot(col, row)
            led.plot(col + 1, row)
        }
    }
})
```

## 13. Testing in the simulator

🌬️ **Test what you've created** 👻

Check out the simulator!

---

► Click on the pink bar underneath the microphone icon. Drag it above the sound number you chose (we used ``128``!) to blow Haven away.

► If you have a new @boardname@ (the one with the **shiny gold** logo at the top), download this code and try it out!  
💡 Blow close to the @boardname@ and watch Haven swoosh away 💨  
💡 Use your @boardname@'s reset button (it's on the back!) to bring Haven back 👻

```blocks
let col = 0
let row = 0
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    for (let index = 0; index < 4; index++) {
        if (input.soundLevel() > 128) {
            row = randint(0, 4)
            col = randint(0, 4)         
        }
        if (led.point(col, row)) {
            led.unplot(col, row)
            led.plot(col + 1, row)
        }
    }
})
```