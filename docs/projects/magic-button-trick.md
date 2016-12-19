# magic button trick 

### ~avatar avatar

Build a magic trick that uses the @boardname@'s compass to detect a nearby magnet!

### ~
This is a simple magic trick you can perform to amaze your friends, where by moving the sticky labels on your @boardname@'s **A** and **B** button you appear to make the buttons really switch over. To see the trick performed watch the video below.

https://youtu.be/-9KvmPopov8

## How the trick works

Unfortunately, the only magic here is in the code. This trick uses a magnet, hidden in your hand, to tell the @boardname@ to swap over the buttons so that when the magnet is near the microbit the **A** button starts working like the **B** button and the **B** button starts working like the **A** button.

## What you need

The only things you need for this trick are your @boardname@ and any magnet that is small enough to fit in your hand, even a fridge magnet will work.

![](/static/mb/projects/magic-button-trick/magnets.jpg "Magnets")


## Step 1: getting the buttons to display **A** and **B**

Before we code the trick itself, we need to get the buttons working as you would expect them to so that pressing button **A** displays 'A' and pressing button **B** displays 'B':

```blocks
input.onButtonPressed(Button.A, () => {
    basic.showString("A")
})
input.onButtonPressed(Button.B, () => {
    basic.showString("B")
})
```

## Step 2: measuring magnetic force

We will use the @boardname@'s compass to detect the magnet. Compass's tell us what direction we are pointing by detecting the Earth's magnetic field but they can also detect any other magnet nearby. We will use that to check if our magnet is next to the @boardname@ by using the [magnetic force](/reference/input/magnetic-force) block found in the input menu's 'more' section. As we only want to measure the strength we change the drop down to select 'strength':

```block
input.magneticForce(Dimension.Strength)
```

## Step 3: checking if the magnetic is nearby

Now we can measure the magnetic force near the microbit, we can check if the value we measure is so big that it means there must be a strong magnet nearby. 

If you have ever played with magnets you know they have two ends, often called a north and south 'pole'. Depending on which end of the magnet is pointing at the microbit the magnetic force measurement will either be a negative number like -100 or a positive number like 100. We just want to know if the strength is at least 100 we don't care if its negative or positive so we also use the 'absolute value of' block from the maths menu to tell our code to ignore the negative sign and just treat -100 as if its 100.

So in the code below we will check if the absolute value of our magnetic field strength reading is more than 100 and save the result of that check in a new variable called 'isSwitched':

```blocks
let force = Math.abs(input.magneticForce(Dimension.Strength));
let isSwitched = force > 100
```
## Step 4: running our 'magnet nearby' check all the time

At the moment our code to detect the magnet being nearby will only run once so we need to put it into a [forever](/reference/basic/forever) block so that it keeps getting run again and again checking for the magnet to come near to the @boardname@. We should also make sure 'isSwitched' is false when our program starts.

```blocks
let force = 0;
let isSwitched = false;
basic.forever(() => {
    force = Math.abs(input.magneticForce(Dimension.Strength));
    isSwitched = force > 100
})
```

## Step 5: swapping the buttons when we know the magnet is nearby

Now we can check the value of our variable 'isSwitched' whenever we want and we will know that the magnet is nearby if it's value is 'true'. Let's use that to change how the buttons work and complete the code for our trick. We will add an 'if, else' block to each button's code and check if we should swap over what each button displays because 'isSwitched' is equal to true:

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

## step 5: practice your performance
Now you just need to program your own @boardname@ and practice the trick a few times before performing to friends. Try asking your friends to click the buttons after you have switched the labels and the trick won't work for them as they don't have a hidden magnet in their hand.


## about the authors
This project was contributed by Brian and Jasmine Norman, aka [@MicroMonstersUK](https://twitter.com/MicroMonstersUK). You can chekout their [@boardname@ tutorials chanel on youtube](https://www.youtube.com/channel/UCK2DviDexh_Er2QYZerZyZQ) for more projects.