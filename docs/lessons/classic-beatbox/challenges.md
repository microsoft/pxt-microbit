# beatbox challenges

Create sounds with variables.

## Before we get started

Complete the [beatbox](/lessons/classic-beatbox/activity) activity and your code will look like this:


```blocks
let sound = music.noteFrequency(Note.A);
input.onPinPressed(TouchPin.P1, () => {
    for (let i = 0; i < 4; i++) {
        sound = sound + 25
         music.playTone(music.noteFrequency(sound), music.beat(BeatFraction.Sixteenth));
    }
})
```

## Challenge 1

Let's include a second sound `on pin pressed` *P2*. To do this, you need to add the same blocks as the banana keyboard activity. However, you must change alter `on pin pressed` from P1 to P2. Additionally, you must *decrease* the frequency of the variable "sound" by 25. Modify your code so that your code looks like this


```blocks
let sound = music.noteFrequency(Note.A);
input.onPinPressed(TouchPin.P1, () => {
    for (let i = 0; i < 5; i++) {
        sound = sound + 25
        music.playTone(music.noteFrequency(sound), music.beat(BeatFraction.Sixteenth));
    }

})
input.onPinPressed(TouchPin.P2, () => {
    for (let i = 0; i < 5; i++) {
        sound = sound - 25
        music.playTone(music.noteFrequency(sound), music.beat(BeatFraction.Sixteenth));
    }

})
```

* click *run* to see if the code works as expected.

## Challenge 2

Finally, we want images to be displayed with sounds `on pin pressed`. Add `show LEDs` blocks under `on pin pressed` P1 and P2.

