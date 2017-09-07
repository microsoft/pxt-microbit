# beatbox activity

Control images with variables. 

Have you ever tried to making beat box sounds? Let's try making a beatbox with code!

Let's start by adding a variable where you can store data. Then rename the variable to "sound". Then set the value of the variable to the note block `A` from the Music drawer. Modify your code so that your code looks like this.

```blocks
let sound = music.noteFrequency(Note.A);
```

We want to play music on pin pressed in order to register an event handler that will execute whenever when you run a script and click pin 1 on the simulator. We must start by opening the Input drawer and adding `on pin pressed` P1. Modify your code so that your code looks like this.

```blocks
let sound = music.noteFrequency(Note.A);
input.onPinPressed(TouchPin.P1, () => {

})
```

We want to code the notes that will be played `on pin pressed`. We click on the Input drawer then insert a `for loop` that will increment by *i*. Click on the Variables drawer. Add `set item` block. Rename the variable block to "sound." Then add a Maths block to increase the variable sound from the note frequency of block `A` to `A` plus 25.Modify your code so that your code looks like this

```blocks
let sound = music.noteFrequency(Note.A);
input.onPinPressed(TouchPin.P1, () => {
    for (let i = 0; i < 4; i++) {
        sound = sound + 25
    }
})
```

Include a play block with the variable called "sound" and insert a music note block `1/16`. Modify your code so that your code looks like this

```blocks
let sound = music.noteFrequency(Note.A);
input.onPinPressed(TouchPin.P1, () => {
    for (let i = 0; i < 5; i++) {
        sound = sound + 25
        music.playTone(music.noteFrequency(sound), music.beat(BeatFraction.Sixteenth));
    }

})

```


* click *run* to see if the code works as expected.

## ~avatar boothing

Excellent, you're ready to continue with the [challenges](/lessons/classic-beatbox/challenges)!

## ~