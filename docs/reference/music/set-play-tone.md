# Set Play Tone

Replaces the implementation of the [music play tone](/reference/music/play-tone).


```sig
music.setPlayTone((freq, ms) => {})
```

### Parameters

* ``f`` the replacement function

### Example

This example send the tone over radio.

```typescript
music.setPlayTone((f,ms) => {
    radio.sendNumber((f & 0xff) << 16 | ms);
});
music.playTone(440, 500);
```
### See also

[rest](/reference/music/rest), [ring tone](/reference/music/ring-tone) , [tempo](/reference/music/tempo), [set tempo](/reference/music/set-tempo), 
[change tempo by](/reference/music/change-tempo-by)
