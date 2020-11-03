# play

Play a sound expression.

```sig
soundExpression.giggle.play()
```

A sound expression is a preformatted set of tones that create a certain sound. There are several sounds to choose from. The sound is started and your program then continues.

### ~ reminder

![works with micro:bit V2 only image](/static/v2/v2-only.png)

This block requires the [micro:bit V2](/device/v2) hardware. If you use this block with a micro:bit v1 board, you will see the **927** error code on the screen.

### ~

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