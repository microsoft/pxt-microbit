# play

Play a sound expression.

```sig
soundExpression.giggle.play()
```

A sound expression is a preformatted set of tones that create a certain sound. There are several sounds to choose from. The sound is started and your program then continues.

## Parameters

In blocks, the sound is selected from the list in the ``||music:play sound||`` block.

```block
soundExpression.giggle.play()
```

When coding in JavaScript or Python, the sound is a ``soundExpression`` object which from which you run the ``play()`` function from. For example, to play the ``soaring`` sound, select ``soaring`` from the ``soundExpression`` namespace and run ``play()``:

```typescript
soundExpression.soaring.play()
```

## Example

Play the ``twinkle`` sound on the speaker.

```blocks
soundExpression.twinkle.play()
```

## See also

[play until done](/reference/music/play-until-done)