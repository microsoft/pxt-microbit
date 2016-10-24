enum Note {
    //% blockIdentity=music.noteFrequency
    C = 262,
    //% block=C#
    //% blockIdentity=music.noteFrequency
    CSharp = 277,
    //% blockIdentity=music.noteFrequency
    D = 294,
    //% blockIdentity=music.noteFrequency
    Eb = 311,
    //% blockIdentity=music.noteFrequency
    E = 330,
    //% blockIdentity=music.noteFrequency
    F = 349,
    //% block=F#
    //% blockIdentity=music.noteFrequency
    FSharp = 370,
    //% blockIdentity=music.noteFrequency
    G = 392,
    //% block=G#
    //% blockIdentity=music.noteFrequency
    GSharp = 415,
    //% blockIdentity=music.noteFrequency
    A = 440,
    //% blockIdentity=music.noteFrequency
    Bb = 466,
    //% blockIdentity=music.noteFrequency
    B = 494,
    //% blockIdentity=music.noteFrequency
    C3 = 131,
    //% block=C#3
    //% blockIdentity=music.noteFrequency
    CSharp3 = 139,
    //% blockIdentity=music.noteFrequency
    D3 = 147,
    //% blockIdentity=music.noteFrequency
    Eb3 = 156,
    //% blockIdentity=music.noteFrequency
    E3 = 165,
    //% blockIdentity=music.noteFrequency
    F3 = 175,
    //% block=F#3
    //% blockIdentity=music.noteFrequency
    FSharp3 = 185,
    //% blockIdentity=music.noteFrequency
    G3 = 196,
    //% block=G#3
    //% blockIdentity=music.noteFrequency
    GSharp3 = 208,
    //% blockIdentity=music.noteFrequency
    A3 = 220,
    //% blockIdentity=music.noteFrequency
    Bb3 = 233,
    //% blockIdentity=music.noteFrequency
    B3 = 247,
    //% blockIdentity=music.noteFrequency
    C4 = 262,
    //% block=C#4
    //% blockIdentity=music.noteFrequency
    CSharp4 = 277,
    //% blockIdentity=music.noteFrequency
    D4 = 294,
    //% blockIdentity=music.noteFrequency
    Eb4 = 311,
    //% blockIdentity=music.noteFrequency
    E4 = 330,
    //% blockIdentity=music.noteFrequency
    F4 = 349,
    //% block=F#4
    //% blockIdentity=music.noteFrequency
    FSharp4 = 370,
    //% blockIdentity=music.noteFrequency
    G4 = 392,
    //% block=G#4
    //% blockIdentity=music.noteFrequency
    GSharp4 = 415,
    //% blockIdentity=music.noteFrequency
    A4 = 440,
    //% blockIdentity=music.noteFrequency
    Bb4 = 466,
    //% blockIdentity=music.noteFrequency
    B4 = 494,
    //% blockIdentity=music.noteFrequency
    C5 = 523,
    //% block=C#5
    //% blockIdentity=music.noteFrequency
    CSharp5 = 555,
    //% blockIdentity=music.noteFrequency
    D5 = 587,
    //% blockIdentity=music.noteFrequency
    Eb5 = 622,
    //% blockIdentity=music.noteFrequency
    E5 = 659,
    //% blockIdentity=music.noteFrequency
    F5 = 698,
    //% block=F#5
    //% blockIdentity=music.noteFrequency
    FSharp5 = 740,
    //% blockIdentity=music.noteFrequency
    G5 = 784,
    //% block=G#5
    //% blockIdentity=music.noteFrequency
    GSharp5 = 831,
    //% blockIdentity=music.noteFrequency
    A5 = 880,
    //% blockIdentity=music.noteFrequency
    Bb5 = 932,
    //% blockIdentity=music.noteFrequency
    B5 = 989,
}

enum BeatFraction {
    //% block=1
    Whole = 1,
    //% block="1/2"
    Half = 2,
    //% block="1/4"
    Quarter = 4,
    //% block="1/8"
    Eighth = 8,
    //% block="1/16"
    Sixteenth = 16
}

/**
 * Generation of music tones through pin ``P0``.
 */
//% color=#D83B01 weight=98
namespace music {
    let beatsPerMinute: number = 120;

    /**
     * Plays a tone through pin ``P0`` for the given duration.
     * @param frequency pitch of the tone to play in Hertz (Hz)
     * @param ms tone duration in milliseconds (ms)
     */
    //% help=music/play-tone weight=90
    //% blockId=device_play_note block="play|tone %note=device_note|for %duration=device_beat" icon="\uf025" blockGap=8
    //% parts="headphone"
    export function playTone(frequency: number, ms: number): void {
        pins.analogSetPitchPin(AnalogPin.P0);
        pins.analogPitch(frequency, ms);
    }

    /**
     * Plays a tone through pin ``P0``.
     * @param frequency pitch of the tone to play in Hertz (Hz)
     */
    //% help=music/ring-tone weight=80
    //% blockId=device_ring block="ring tone (Hz)|%note=device_note" icon="\uf025" blockGap=8
    //% parts="headphone"
    export function ringTone(frequency: number): void {
        pins.analogSetPitchPin(AnalogPin.P0);
        pins.analogPitch(frequency, 0);
    }

    /**
     * Rests (plays nothing) for a specified time through pin ``P0``.
     * @param ms rest duration in milliseconds (ms)
     */
    //% help=music/rest weight=79
    //% blockId=device_rest block="rest(ms)|%duration=device_beat"
    //% parts="headphone"
    export function rest(ms: number): void {
        playTone(0, ms);
    }


    /**
     * Gets the frequency of a note.
     * @param name the note name
     */
    //% weight=50 help=music/note-frequency
    //% blockId=device_note block="%note"
    //% shim=TD_ID
    export function noteFrequency(name: Note): number {
        return name;
    }

    function init() {
        if (beatsPerMinute <= 0) beatsPerMinute = 120;
    }

    /**
     * Returns the duration of a beat in milli-seconds
     */
    //% help=music/beat weight=49
    //% blockId=device_beat block="%fraction|beat"
    export function beat(fraction?: BeatFraction): number {
        init();
        if (fraction == null) fraction = BeatFraction.Whole;
        let beat = 60000 / beatsPerMinute;
        if (fraction == BeatFraction.Whole) return beat;
        else if (fraction == BeatFraction.Half) return beat / 2;
        else if (fraction == BeatFraction.Quarter) return beat / 4
        else if (fraction == BeatFraction.Eighth) return beat / 8;
        else return beat / 16;
    }

    /**
     * Returns the tempo in beats per minute. Tempo is the speed (bpm = beats per minute) at which notes play. The larger the tempo value, the faster the notes will play.
     */
    //% help=music/tempo weight=40
    //% blockId=device_tempo block="tempo (bpm)" blockGap=8
    export function tempo(): number {
        init();
        return beatsPerMinute;
    }

    /**
     * Change the tempo by the specified amount
     * @param bpm The change in beats per minute to the tempo, eg: 20
     */
    //% help=music/change-tempo-by weight=39
    //% blockId=device_change_tempo block="change tempo by (bpm)|%value" blockGap=8
    export function changeTempoBy(bpm: number): void {
        init();
        setTempo(beatsPerMinute + bpm);
    }

    /**
     * Sets the tempo to the specified amount
     * @param bpm The new tempo in beats per minute, eg: 120
     */
    //% help=music/set-tempo weight=38
    //% blockId=device_set_tempo block="set tempo to (bpm)|%value"
    export function setTempo(bpm: number): void {
        init();
        if (bpm > 0) {
            beatsPerMinute = Math.max(1, bpm);
        }
    }
}
