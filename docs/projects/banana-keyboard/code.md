# Code

Have you ever tried making beat box sounds? Let's try making a beatbox with code and, yes, a banana!

## Code the banana key

Start by adding a variable to store a musical note. Rename the variable to `sound`. Set the value of the variable to the note block `Middle A` from the **Music** drawer.

```blocks
let sound = music.noteFrequency(Note.A);
```

We want to play music when the fruit connected to a pin pressed. So, we register an event handler that executes whenever pin **1** is pressed. Pin **1** is, of course, connected to the banana. Add a ``||input:on pin pressed||`` block from the **Input** drawer.

```blocks
let sound = music.noteFrequency(Note.A);
input.onPinPressed(TouchPin.P1, () => {

})
```

Now, let's create some notes to play when the banana is pressed. Click on the **Loops** drawer then insert a ``||loops:repeat||`` loop into the ``||input:on pin pressed||`` block. Click on the **Variables** drawer and pull out a ``||variables:change item by||`` block and put it into the loop. Rename the variable to `sound`. Change the value from `1` to `25`. This will increase the variable `sound` from the note frequency of block `Middle A` to `Middle A` plus 25 and so on. Put a ``||variables:set to||`` block for `sound` right after the loop. Set it to `Middle A` a in order to reset the sound after a banana press.

```blocks
let sound = music.noteFrequency(Note.A);

input.onPinPressed(TouchPin.P1, () => {
    for (let i = 0; i < 4; i++) {
        sound += 25;
    }
    sound = music.noteFrequency(Note.A);
});
```

Finally, insert a ``||music:play tone||`` above the ``||variables:change by||``. Pull out the ``sound`` variable block and drop it in the note slot of ``||music:play tone||``. Change the beat fraction from `1` to `1/4`.

```blocks
let sound = music.noteFrequency(Note.A);

input.onPinPressed(TouchPin.P1, () => {
    for (let i = 0; i < 4; i++) {
        music.playTone(sound, music.beat(BeatFraction.Quarter));
        sound += 25;
    }
    sound = music.noteFrequency(Note.A);
});
```

Click `|Download|` and try a banana press. Did you hear 4 notes play?


## Add another banana key
Go back to **[Make](/projects/banana-keyboard/make)** and repeat steps 7 and 8 with another banana but this time connect the crocodile clip to pin **3**.

Duplicate the ``||input:on pin pressed||`` event handler to make a second one. For the new ``||input:on pin pressed||``, change the pin name to **P2**. In the pin **P2** event, let's have the the frequency in the variable `sound` decrease by 25 instead of having it increase. Change the `25` in the ``||variables:change by||`` block to `-25`. OK, your code now looks like this:

```blocks
let sound = music.noteFrequency(Note.A);

input.onPinPressed(TouchPin.P1, () => {
    for (let i = 0; i < 4; i++) {
        music.playTone(sound, music.beat(BeatFraction.Quarter));
        sound += 25;
    }
    sound = music.noteFrequency(Note.A);
});

input.onPinPressed(TouchPin.P2, () => {
    for (let i = 0; i < 4; i++) {
        music.playTone(sound, music.beat(BeatFraction.Quarter));
        sound += -25;
    }
    sound = music.noteFrequency(Note.A);
});
```

Click `|Download|` again and play both bananas. It's a fruit jam session!
