# Make

## Materials

* @boardname@, battery holder and 2 AAA batteries
* Bananas
* Orange
* Crocodile clips

## Steps

### Step 1

![](/static/mb/lessons/banana-keyboard-1.png)

Using the 1st crocodile clip, connect the end of the crocodile clip onto GND pin on the @boardname@.

### Step 2

![](/static/mb/lessons/banana-keyboard-2.png)

![](/static/mb/lessons/banana-keyboard-3.png)

Using the 2nd crocodile clip, connect the end of the crocodile clip onto the 0 pin on the @boardname@.

### Step 3

![](/static/mb/lessons/banana-keyboard-4.png)

Using the 1st crocodile clip, connect the second end of the crocodile clip onto based of the headphone jack.

### Step 4

![](/static/mb/lessons/banana-keyboard-5.png)

![](/static/mb/lessons/banana-keyboard-6.png)

Using the 2nd crocodile clip, connect the second end of the crocodile clip onto tip of the headphone jack.

### Step 5

![](/static/mb/lessons/banana-keyboard-7.png)

Using the 3rd crocodile clip, connect the end of the crocodile clip onto the 1st crocodile clip already clipped onto GND.

### Step 6

![](/static/mb/lessons/banana-keyboard-8.png)

![](/static/mb/lessons/banana-keyboard-9.png)

Using the 3rd crocodile clip, connect the unattached end of the crocodile clip onto the orange.

### Step 7

![](/static/mb/lessons/banana-keyboard-10.png)

Using the 4th crocodile clip, connect the end of the crocodile clip onto pin 1 on the @boardname@.

### Step 8

![](/static/mb/lessons/banana-keyboard-11.png)

Using the 4th crocodile clip, connect the unattached end of the crocodile clip onto the banana.

### Step 9

![](/static/mb/lessons/banana-keyboard-12.png)

Your banana keyboard is ready!

### Step 10

Connect your @boardname@ to your computer using your USB cable and run this script:
```blocks
input.onPinPressed(TouchPin.P1, () => {
    music.playTone(music.noteFrequency(Note.C), music.beat(BeatFraction.Quarter));
});
```

Tap your banana instrument to play sound against... the fruit!

### ~button /projects/banana-keyboard/code
NEXT: beat box
### ~
