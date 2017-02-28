/*
The MIT License (MIT)

Copyright (c) 2013-2016 The MicroPython-on-micro:bit Developers, as listed
in the accompanying AUTHORS file

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Melodies from file microbitmusictunes.c https://github.com/bbcmicrobit/MicroPython

enum Melodies {
    //% block="dadadum" blockIdentity=music.builtInMelody
    Dadadadum = 0,
    //% block="entertainer" blockIdentity=music.builtInMelody
    Entertainer,
    //% block="prelude" blockIdentity=music.builtInMelody
    Prelude,
    //% block="ode" blockIdentity=music.builtInMelody
    Ode,
    //% block="nyan" blockIdentity=music.builtInMelody
    Nyan,
    //% block="ringtone" blockIdentity=music.builtInMelody
    Ringtone,
    //% block="funk" blockIdentity=music.builtInMelody
    Funk,
    //% block="blues" blockIdentity=music.builtInMelody
    Blues,
    //% block="birthday" blockIdentity=music.builtInMelody
    Birthday,
    //% block="wedding" blockIdentity=music.builtInMelody
    Wedding,
    //% block="funereal" blockIdentity=music.builtInMelody
    Funeral,
    //% block="punchline" blockIdentity=music.builtInMelody
    Punchline,
    //% block="baddy" blockIdentity=music.builtInMelody
    Baddy,
    //% block="chase" blockIdentity=music.builtInMelody
    Chase,
    //% block="ba ding" blockIdentity=music.builtInMelody
    BaDing,
    //% block="wawawawaa" blockIdentity=music.builtInMelody
    Wawawawaa,
    //% block="jump up" blockIdentity=music.builtInMelody
    JumpUp,
    //% block="jump down" blockIdentity=music.builtInMelody
    JumpDown,
    //% block="power up" blockIdentity=music.builtInMelody
    PowerUp,
    //% block="power down" blockIdentity=music.builtInMelody
    PowerDown,
}

namespace music {

    export function getMelody(melody: Melodies): string[] {
        switch (melody) {
            case Melodies.Dadadadum:
                return ['r4:2', 'g', 'g', 'g', 'eb:8', 'r:2', 'f', 'f', 'f', 'd:8'];
            case Melodies.Entertainer:
                return ['d4:1', 'd#', 'e', 'c5:2', 'e4:1', 'c5:2', 'e4:1', 'c5:3', 'c:1', 'd', 'd#', 'e', 'c', 'd', 'e:2', 'b4:1', 'd5:2', 'c:4'];
            case Melodies.Prelude:
                return ['c4:1', 'e', 'g', 'c5', 'e', 'g4', 'c5', 'e', 'c4', 'e', 'g', 'c5', 'e', 'g4', 'c5', 'e', 'c4', 'd', 'g', 'd5', 'f', 'g4', 'd5', 'f', 'c4', 'd', 'g', 'd5', 'f', 'g4', 'd5', 'f', 'b3', 'd4', 'g', 'd5', 'f', 'g4', 'd5', 'f', 'b3', 'd4', 'g', 'd5', 'f', 'g4', 'd5', 'f', 'c4', 'e', 'g', 'c5', 'e', 'g4', 'c5', 'e', 'c4', 'e', 'g', 'c5', 'e', 'g4', 'c5', 'e'];
            case Melodies.Ode:
                return ['e4', 'e', 'f', 'g', 'g', 'f', 'e', 'd', 'c', 'c', 'd', 'e', 'e:6', 'd:2', 'd:8', 'e:4', 'e', 'f', 'g', 'g', 'f', 'e', 'd', 'c', 'c', 'd', 'e', 'd:6', 'c:2', 'c:8'];
            case Melodies.Nyan:
                return ['f#5:2', 'g#', 'c#:1', 'd#:2', 'b4:1', 'd5:1', 'c#', 'b4:2', 'b', 'c#5', 'd', 'd:1', 'c#', 'b4:1', 'c#5:1', 'd#', 'f#', 'g#', 'd#', 'f#', 'c#', 'd', 'b4', 'c#5', 'b4', 'd#5:2', 'f#', 'g#:1', 'd#', 'f#', 'c#', 'd#', 'b4', 'd5', 'd#', 'd', 'c#', 'b4', 'c#5', 'd:2', 'b4:1', 'c#5', 'd#', 'f#', 'c#', 'd', 'c#', 'b4', 'c#5:2', 'b4', 'c#5', 'b4', 'f#:1', 'g#', 'b:2', 'f#:1', 'g#', 'b', 'c#5', 'd#', 'b4', 'e5', 'd#', 'e', 'f#', 'b4:2', 'b', 'f#:1', 'g#', 'b', 'f#', 'e5', 'd#', 'c#', 'b4', 'f#', 'd#', 'e', 'f#', 'b:2', 'f#:1', 'g#', 'b:2', 'f#:1', 'g#', 'b', 'b', 'c#5', 'd#', 'b4', 'f#', 'g#', 'f#', 'b:2', 'b:1', 'a#', 'b', 'f#', 'g#', 'b', 'e5', 'd#', 'e', 'f#', 'b4:2', 'c#5'];
            case Melodies.Ringtone:
                return ['c4:1', 'd', 'e:2', 'g', 'd:1', 'e', 'f:2', 'a', 'e:1', 'f', 'g:2', 'b', 'c5:4'];
            case Melodies.Funk:
                return ['c2:2', 'c', 'd#', 'c:1', 'f:2', 'c:1', 'f:2', 'f#', 'g', 'c', 'c', 'g', 'c:1', 'f#:2', 'c:1', 'f#:2', 'f', 'd#'];
            case Melodies.Blues:
                return ['c2:2', 'e', 'g', 'a', 'a#', 'a', 'g', 'e', 'c2:2', 'e', 'g', 'a', 'a#', 'a', 'g', 'e', 'f', 'a', 'c3', 'd', 'd#', 'd', 'c', 'a2', 'c2:2', 'e', 'g', 'a', 'a#', 'a', 'g', 'e', 'g', 'b', 'd3', 'f', 'f2', 'a', 'c3', 'd#', 'c2:2', 'e', 'g', 'e', 'g', 'f', 'e', 'd'];
            case Melodies.Birthday:
                return ['c4:3', 'c:1', 'd:4', 'c:4', 'f', 'e:8', 'c:3', 'c:1', 'd:4', 'c:4', 'g', 'f:8', 'c:3', 'c:1', 'c5:4', 'a4', 'f', 'e', 'd', 'a#:3', 'a#:1', 'a:4', 'f', 'g', 'f:8'];
            case Melodies.Wedding:
                return ['c4:4', 'f:3', 'f:1', 'f:8', 'c:4', 'g:3', 'e:1', 'f:8', 'c:4', 'f:3', 'a:1', 'c5:4', 'a4:3', 'f:1', 'f:4', 'e:3', 'f:1', 'g:8'];
            case Melodies.Funeral:
                return ['c3:4', 'c:3', 'c:1', 'c:4', 'd#:3', 'd:1', 'd:3', 'c:1', 'c:3', 'b2:1', 'c3:4'];
            case Melodies.Punchline:
                return ['c4:3', 'g3:1', 'f#', 'g', 'g#:3', 'g', 'r', 'b', 'c4'];
            case Melodies.Baddy:
                return ['c3:3', 'r', 'd:2', 'd#', 'r', 'c', 'r', 'f#:8'];
            case Melodies.Chase:
                return ['a4:1', 'b', 'c5', 'b4', 'a:2', 'r', 'a:1', 'b', 'c5', 'b4', 'a:2', 'r', 'a:2', 'e5', 'd#', 'e', 'f', 'e', 'd#', 'e', 'b4:1', 'c5', 'd', 'c', 'b4:2', 'r', 'b:1', 'c5', 'd', 'c', 'b4:2', 'r', 'b:2', 'e5', 'd#', 'e', 'f', 'e', 'd#', 'e'];
            case Melodies.BaDing:
                return ['b5:1', 'e6:3'];
            case Melodies.Wawawawaa:
                return ['e3:3', 'r:1', 'd#:3', 'r:1', 'd:4', 'r:1', 'c#:8'];
            case Melodies.JumpUp:
                return ['c5:1', 'd', 'e', 'f', 'g'];
            case Melodies.JumpDown:
                return ['g5:1', 'f', 'e', 'd', 'c'];
            case Melodies.PowerUp:
                return ['g4:1', 'c5', 'e', 'g:2', 'e:1', 'g:3'];
            case Melodies.PowerDown:
                return ['g5:1', 'd#', 'c', 'g4:2', 'b:1', 'c5:3'];
            default:
                return [];
        }
    }
}