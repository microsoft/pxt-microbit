# Set Play Tone

Replaces the implementation of the [music play tone](/reference/music/play-tone).


```sig
music.setPlayTone((frequency: number, duration: number) => {})
```

## Parameters

* ``f`` the replacement function

## Example

This example send the frequency and duration over radio 
and plays it on the remote @boardname@.

```typescript
input.onButtonPressed(Button.A, () => {
    music.playTone(440, 120)
    led.toggle(0, 0)
})
radio.onReceivedNumber(function (receivedNumber) {
    const freq = receivedNumber >> 16;
    const duration = receivedNumber & 0xffff;
    music.playTone(freq, duration);
})
input.onButtonPressed(Button.B, () => {
    music.setPlayTone((frequency: number, duration: number) => {
        radio.sendNumber((frequency << 16) | (duration & 0xffff));
    })    
})
```
## See also

[rest](/reference/music/rest), [ring tone](/reference/music/ring-tone) , [tempo](/reference/music/tempo), [set tempo](/reference/music/set-tempo), 
[change tempo by](/reference/music/change-tempo-by)
