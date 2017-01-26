# Code

Have you ever tried to making beat box sounds? Let's try making a beatbox with code!

We will register an event handler on the fruit that will execute when two things occur: first, the alligator clip attaches to GND and the other side of the alligator clip is inserted into a banana. Let's start by adding a variable where you can store data. Then rename the variable to "sound". Then set the value of the variable to the note block `A` from the Music drawer. Modify your code so that your code looks like this.

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


* click *Download* to see if the code works as expected.



Let's include a second sound `on pin pressed` *P2*. To do this, you need to add the same blocks as the banana keyboard activity. However, you must change alter `on pin pressed` from P1 to P2. Additionally, you must *decrease* the frequency of the variable "sound" by 25. Modify your code so that your code looks like this. You will need to include a second banana to a alligator (spring) clip in the same procedure as the first activity. 

```blocks
let sound = music.noteFrequency(Note.A);

input.onPinPressed(TouchPin.P1, () => {
    for (let i = 0; i < 4; i++) {
        sound = sound + 25
    }
})

input.onPinPressed(TouchPin.P2, () => {
    for (let i = 0; i < 4; i++) {
        sound = sound - 25
    }
})
```

* click *Download* to see if the code works as expected.
