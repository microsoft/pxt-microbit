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
    //% block="funeral" blockIdentity=music.builtInMelody
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
        return _bufferToMelody(_getMelodyBuffer(melody));
    }

    // The buffer format is 2 bytes per note. First note byte is midi
    // note number, second byte is duration in quarter beats. The note
    // number 0 is reserved for rests
    export function _getMelodyBuffer(melody: Melodies) {
        switch (melody) {
            case Melodies.Dadadadum:
                return hex`00024f024f024f024b0800024d024d024d024a08`;
            case Melodies.Entertainer:
                return hex`4a014b014c0154024c0154024c0154035401560157015801540156015802530156025404`;
            case Melodies.Prelude:
                return hex`48014c014f01540158014f015401580148014c014f01540158014f015401580148014a014f01560159014f015601590148014a014f01560159014f015601590147014a014f01560159014f015601590147014a014f01560159014f015601590148014c014f01540158014f015401580148014c014f01540158014f0154015801`;
            case Melodies.Ode:
                return hex`4c044c044d044f044f044d044c044a04480448044a044c044c064a024a084c044c044d044f044f044d044c044a04480448044a044c044a0648024808`;
            case Melodies.Nyan:
                return hex`5a025c02550157025301560155015302530255025602560155015301550157015a015c0157015a015501560153015501530157025a025c0157015a0155015701530156015701560155015301550156025301550157015a01550156015501530155025302550253024e01500153024e01500153015501570153015801570158015a01530253024e01500153014e0158015701550153014e014b014c014e0153024e01500153024e015001530153015501570153014e0150014e0153025301520153014e01500153015801570158015a0153025502`;
            case Melodies.Ringtone:
                return hex`48014a014c024f024a014c014d0251024c014d014f0253025404`;
            case Melodies.Funk:
                return hex`300230023302300135023001350236023702300230023702300136023001360235023302`;
            case Melodies.Blues:
                return hex`30023402370239023a0239023702340230023402370239023a02390237023402350239023c023e023f023e023c02390230023402370239023a0239023702340237023b023e024102350239023c023f0230023402370234023702350234023202`;
            case Melodies.Birthday:
                return hex`480348014a0448044d044c08480348014a0448044f044d0848034801540451044d044c044a045203520151044d044f044d08`;
            case Melodies.Wedding:
                return hex`48044d034d014d0848044f034c014d0848044d035101540451034d014d044c034d014f08`;
            case Melodies.Funeral:
                return hex`3c043c033c013c043f033e013e033c013c033b013c04`;
            case Melodies.Punchline:
                return hex`480343014201430144034303000347034803`;
            case Melodies.Baddy:
                return hex`3c0300033e023f0200023c0200024208`;
            case Melodies.Chase:
                return hex`5101530154015301510200025101530154015301510200025102580257025802590258025702580253015401560154015302000253015401560154015302000253025802570258025902580257025802`;
            case Melodies.BaDing:
                return hex`5f016403`;
            case Melodies.Wawawawaa:
                return hex`400300013f0300013e0400013d08`;
            case Melodies.JumpUp:
                return hex`54015601580159015b01`;
            case Melodies.JumpDown:
                return hex`5b015901580156015401`;
            case Melodies.PowerUp:
                return hex`4f01540158015b0258015b03`;
            case Melodies.PowerDown:
                return hex`5b01570154014f0253015403`;

            default: return undefined;
        }
    }
}