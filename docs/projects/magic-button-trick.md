# Magic Button Trick 

## ~avatar avatar

Build a magic trick that uses the @boardname@'s compass to detect a nearby magnet!

## ~

This is a simple magic trick you can perform to amaze your friends! When you move the sticky labels on your @boardname@'s **A** and **B** button, you appear to make the buttons really switch over. To see the trick performed watch the video below.

https://youtu.be/-9KvmPopov8

## How the trick works

The **magic** here is really in the code. This trick uses a magnet, hidden in your hand, to tell the @boardname@ to swap over the buttons. When the magnet is near the @boardname@, the **A** button starts working like the **B** button and the **B** button starts working like the **A** button. Tricky!

## What you need

The only things you need for this trick are your @boardname@ and any magnet that is small enough to fit in your hand, even a fridge magnet will work.

![](/static/mb/projects/magic-button-trick/magnets.jpg "Magnets")

## Step 1: Getting the buttons to display **A** and **B**

Before we code the trick itself, we need to get the buttons working as you would expect them to such that pressing button **A** displays 'A' and pressing button **B** displays 'B':

```blocks
input.onButtonPressed(Button.A, () => {
    basic.showString("A")
})
input.onButtonPressed(Button.B, () => {
    basic.showString("B")
})
```

## Step 2: Measuring magnetic force

We will use the @boardname@'s compass to detect the magnet. A compass tells us which direction we are pointing to by detecting the Earth's magnetic field, but it can also detect any other magnet nearby. We will use that to check if our magnet is next to the @boardname@ by using the ``||input:magnetic force||`` block found in the **Input** menu's **... More** section. Since we only want to measure the strength we change the drop down to select `strength`:

```block
let force = input.magneticForce(Dimension.Strength)
```

## Step 3: Checking if the magnetic is nearby

Now we can measure the magnetic force near the @boardname@. We can check if the value we measure is so big that it means there must be a strong magnet nearby. 

If you've ever played with magnets you know they have two ends, often called a North and South 'pole'. Depending on which end of the magnet is pointing at the @boardname@, the magnetic force measurement will either be a negative number (like, -100) or a positive number (like, 100). We just want to know if the strength is at least 100. We don't care if its negative or positive so we also use the ``||math:absolute of||`` block from the **Math** menu to tell our code to ignore the negative sign and just treat `-100` as if its `100`.

So, in the code below, we will check if the absolute value of our magnetic field strength reading is more than `100` and save the result of that check in a new variable called ``isSwitched``:

```blocks
let force = Math.abs(input.magneticForce(Dimension.Strength));
let isSwitched = force > 100
```
## Step 4: Running our 'magnet nearby' check all the time

At the moment, our code to detect a magnet being nearby will only run once. We need to put it into a ``||basic:forever||`` loop so that it keeps running again and again, checking for the magnet to come near to the @boardname@. We should also make sure ``isSwitched`` is set to `false` when our program starts.

```blocks
let force = 0;
let isSwitched = false;
basic.forever(() => {
    force = Math.abs(input.magneticForce(Dimension.Strength));
    isSwitched = force > 100
})
```

## Step 5: Swapping the buttons when we know the magnet is nearby

Now we can check the value of our variable ``isSwitched`` whenever we want and we will know that the magnet is nearby if it's value is `true`. Let's use that to change how the buttons work and complete the code for our trick. We will add an ``||logic:if then else||`` block to each button's code and check if we should swap over what's displayed for each button if ``isSwitched`` is equal to `true`:

```blocks
let force = 0;
let isSwitched = false;
basic.forever(() => {
    force = Math.abs(input.magneticForce(Dimension.Strength));
    isSwitched = force > 100
})

input.onButtonPressed(Button.A, () => {
    if (isSwitched) {
        basic.showString("B")
    } else {
        basic.showString("A")
    }
})
input.onButtonPressed(Button.B, () => {
    if (isSwitched) {
        basic.showString("A")
    } else {
        basic.showString("B")
    }
})
```

## Step 6: Practice your technique

Now you just need to program your own @boardname@ and practice the trick a few times before performing for your friends. Try asking your friends to click the buttons after you have switched the labels and the trick won't work for them because they don't have a hidden magnet in their hand!

Remember, that as we are using @boardname@'s compass, it will need to be [calibrated](https://support.microbit.org/support/solutions/articles/19000008874-calibrating-the-micro-bit-compass-what-does-it-mean-when-the-micro-bit-says-draw-a-circle-or-tilt) each time we flash the program or run it for the first time.

## About the authors

This project was contributed by Brian and Jasmine Norman, aka [@MicroMonstersUK](https://twitter.com/MicroMonstersUK). You can checkout their [MicroMonsters](https://www.youtube.com/channel/UCK2DviDexh_Er2QYZerZyZQ) tutorials channel on YouTube for more projects.
