# Making melodies

Composing some sound, or maybe some music, is done by putting tones to together, one after another. A _melody_ is a sequence of these tones each played, for some short amount of time, one after the other until all notes have played.

## Musical notes

A _note_ is a tone that is recognized as part of music. A note has a name like '**C**'. A note is played for an amount of time called its _duration_. 

On your @boardname@, a note is played on the speaker by sending a signal to a it with a certain _frequency_ called [Hertz](http://wikipedia.org/Hertz). Frequency is how fast something vibrates during one second. If you ring a bell that was made to play an '**A**' note, the bell will vibrate at 440 Hertz (440 times per second). So, notes are just certain frequencies that have special names.

## ~ hint

Watch this video to see how speakers and headphones make sound when connected to your @boardname@.

https://www.youtube.com/watch?v=cxfPNc4Wefo

### ~

In history, music came from tones that seemed nice to hear. The tones were played on wood, strings, metal, and skins. These tones were given names and they became what we know today as musical notes. Notes were named so we could write them down and remember how to play them again later.

## How are notes named?

Basic notes have names that use one of the first nine letters of the alphabet. They are:

``|A|``, ``|B|``, ``|C|``, ``|D|``, ``|E|``, ``|F|``, ``|G|``

Ther are other notes named like the basic notes but have extra parts to the name called _sharp_ and _flat_. These other notes are just a bit different from the basic notes and have frequencies a little higher or lower than the basic note. This makes music a little more complicated but much more interesting!

Some of these other notes look like:

``|C#|``, ``|Eb|``

When a small amount music or even a song is written down it is called [sheet music](https://wikipedia.org/wiki/Sheet_music).

## Sounds and music in code

Of course, we can't use written music in our code. We can make music another way. The way to do it is to put names of notes in [strings](/types/string). We make our notes using letters, symbols, and numbers. The notes of a melody are put together in an array like:

```block
let melody = ['E3:3', 'R:1', 'D#:3', 'R:1', 'D:4', 'R:1', 'C#:8']
```

In JavaScript code, it looks like this:

```typescript
let melody = ['E3:3', 'R:1', 'D#:3', 'R:1', 'D:4', 'R:1', 'C#:8']
```

What you see here is not some alien language but a bunch of notes with their duration. The form of a single note is **note : duration** or ``'C:2'``. This means play the '**C**' note for **2** beats of time. The notes are placed one after the other, in an array, with a comma between them, like ``'B:2', 'C#:6'``. If you want a note to play for **4** beats, you don't need to use any duration number (a note with 4 beats is called a _whole_ note). Just say something like ``'E'`` with no colon (leave out the ``':'``) and no duration number.

You might notice that the sound string has an ``'R:1'`` in it. The '**R**` means _rest_ and to rest for one beat. A rest is a pause, or a time of silence, in the sound.


#### ~ hint

**Duration**

The amount of time a note is played (duration) is measured as _beats_. The standard number _beats per minute_ (bpm) in music is 120 bpm which is one-half of a second of time. A _whole_ note lasts for 4 beats and a _quarter_ note takes just one beat.

#### ~

## Example

Compose the first few notes of Beethoven's 5th symphony.

```blocks
let beet5 = ['G:1', 'G:1', 'G:1', 'Eb', 'F:1', 'F:1', 'F:1', 'D']
```

## See also

[begin melody](/reference/music/begin-melody)

[Tempo](https://wikipedia.org/wiki/Tempo)
