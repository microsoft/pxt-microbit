# play Until Done

Play a sound expression until it finishes.

```sig
soundExpression.giggle.playUntilDone()
```

A sound expression is a preformatted set of tones that create a certain sound. There are several sounds to choose from. The sound is started and your program waits until the sound stops playing.

## Parameters

In blocks, the sound is selected from the list in the ``||music:play sound until done||`` block.

```block
soundExpression.giggle.playUntilDone()
```

When coding in JavaScript or Python, the sound is a ``soundExpression`` object which from which you run the ``playUntilDone()`` function from. For example, to play the ``soaring`` sound, select ``soaring`` from the ``soundExpression`` namespace and run ``playUntilDone()``:

```typescript
soundExpression.soaring.playUntilDone()
```

## Example

Play the ``twinkle`` sound on the speaker and wait until it finishes.

```blocks
soundExpression.twinkle.playUntilDone()
basic.showString("twinkle has stopped")
```

## See also

[play](/reference/music/play)