enum Note {
    //% blockIdentity=music.noteFrequency enumval=262
    C = 262,
    //% block=C#
    //% blockIdentity=music.noteFrequency enumval=277
    CSharp = 277,
    //% blockIdentity=music.noteFrequency enumval=294
    D = 294,
    //% blockIdentity=music.noteFrequency enumval=311
    Eb = 311,
    //% blockIdentity=music.noteFrequency enumval=330
    E = 330,
    //% blockIdentity=music.noteFrequency enumval=349
    F = 349,
    //% block=F#
    //% blockIdentity=music.noteFrequency enumval=370
    FSharp = 370,
    //% blockIdentity=music.noteFrequency enumval=392
    G = 392,
    //% block=G#
    //% blockIdentity=music.noteFrequency enumval=415
    GSharp = 415,
    //% blockIdentity=music.noteFrequency enumval=440
    A = 440,
    //% blockIdentity=music.noteFrequency enumval=466
    Bb = 466,
    //% blockIdentity=music.noteFrequency enumval=494
    B = 494,
    //% blockIdentity=music.noteFrequency enumval=131
    C3 = 131,
    //% block=C#3
    //% blockIdentity=music.noteFrequency enumval=139
    CSharp3 = 139,
    //% blockIdentity=music.noteFrequency enumval=147
    D3 = 147,
    //% blockIdentity=music.noteFrequency enumval=156
    Eb3 = 156,
    //% blockIdentity=music.noteFrequency enumval=165
    E3 = 165,
    //% blockIdentity=music.noteFrequency enumval=175
    F3 = 175,
    //% block=F#3
    //% blockIdentity=music.noteFrequency enumval=185
    FSharp3 = 185,
    //% blockIdentity=music.noteFrequency enumval=196
    G3 = 196,
    //% block=G#3
    //% blockIdentity=music.noteFrequency enumval=208
    GSharp3 = 208,
    //% blockIdentity=music.noteFrequency enumval=220
    A3 = 220,
    //% blockIdentity=music.noteFrequency enumval=233
    Bb3 = 233,
    //% blockIdentity=music.noteFrequency enumval=247
    B3 = 247,
    //% blockIdentity=music.noteFrequency enumval=262
    C4 = 262,
    //% block=C#4
    //% blockIdentity=music.noteFrequency enumval=277
    CSharp4 = 277,
    //% blockIdentity=music.noteFrequency enumval=294
    D4 = 294,
    //% blockIdentity=music.noteFrequency enumval=311
    Eb4 = 311,
    //% blockIdentity=music.noteFrequency enumval=330
    E4 = 330,
    //% blockIdentity=music.noteFrequency enumval=349
    F4 = 349,
    //% block=F#4
    //% blockIdentity=music.noteFrequency enumval=370
    FSharp4 = 370,
    //% blockIdentity=music.noteFrequency enumval=392
    G4 = 392,
    //% block=G#4
    //% blockIdentity=music.noteFrequency enumval=415
    GSharp4 = 415,
    //% blockIdentity=music.noteFrequency enumval=440
    A4 = 440,
    //% blockIdentity=music.noteFrequency enumval=466
    Bb4 = 466,
    //% blockIdentity=music.noteFrequency enumval=494
    B4 = 494,
    //% blockIdentity=music.noteFrequency enumval=523
    C5 = 523,
    //% block=C#5
    //% blockIdentity=music.noteFrequency enumval=555
    CSharp5 = 555,
    //% blockIdentity=music.noteFrequency enumval=587
    D5 = 587,
    //% blockIdentity=music.noteFrequency enumval=622
    Eb5 = 622,
    //% blockIdentity=music.noteFrequency enumval=659
    E5 = 659,
    //% blockIdentity=music.noteFrequency enumval=698
    F5 = 698,
    //% block=F#5
    //% blockIdentity=music.noteFrequency enumval=740
    FSharp5 = 740,
    //% blockIdentity=music.noteFrequency enumval=784
    G5 = 784,
    //% block=G#5
    //% blockIdentity=music.noteFrequency enumval=831
    GSharp5 = 831,
    //% blockIdentity=music.noteFrequency enumval=880
    A5 = 880,
    //% blockIdentity=music.noteFrequency enumval=932
    Bb5 = 932,
    //% blockIdentity=music.noteFrequency enumval=988
    B5 = 988,
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
    Sixteenth = 16,
    //% block="2"
    Double = 32,
    //% block="4",
    Breve = 64
}

enum MelodyOptions {
    //% block="once""
    Once = 1,
    //% block="forever"
    Forever = 2,
    //% block="once in background"
    OnceInBackground = 4,
    //% block="forever in background"
    ForeverInBackground = 8
}

enum MusicEvent {
    //% block="melody note played"
    MelodyNotePlayed = 1,
    //% block="melody started"
    MelodyStarted = 2,
    //% block="melody ended"
    MelodyEnded = 3,
    //% block="melody repeated"
    MelodyRepeated = 4,
    //% block="background melody note played"
    BackgroundMelodyNotePlayed = MelodyNotePlayed | 0xf0,
    //% block="background melody started"
    BackgroundMelodyStarted = MelodyStarted | 0xf0,
    //% block="background melody ended"
    BackgroundMelodyEnded = MelodyEnded | 0xf0,
    //% block="background melody repeated"
    BackgroundMelodyRepeated = MelodyRepeated | 0xf0,
    //% block="background melody paused"
    BackgroundMelodyPaused = 5 | 0xf0,
    //% block="background melody resumed"
    BackgroundMelodyResumed = 6 | 0xf0
}

/**
 * Generation of music tones.
 */
//% color=#E63022 weight=106 icon="\uf025"
namespace music {
    let beatsPerMinute: number = 120;
    let freqTable: number[] = [];
    let _playTone: (frequency: number, duration: number) => void;
    const MICROBIT_MELODY_ID = 2000;

    /**
     * Plays a tone through pin ``P0`` for the given duration.
     * @param frequency pitch of the tone to play in Hertz (Hz), eg: Note.C
     * @param ms tone duration in milliseconds (ms)
     */
    //% help=music/play-tone weight=90
    //% blockId=device_play_note block="play|tone %note=device_note|for %duration=device_beat" blockGap=8
    //% parts="headphone"
    //% useEnumVal=1
    export function playTone(frequency: number, ms: number): void {
        if (_playTone) _playTone(frequency, ms);
        else pins.analogPitch(frequency, ms);
    }

    /**
     * Plays a tone through pin ``P0``.
     * @param frequency pitch of the tone to play in Hertz (Hz), eg: Note.C
     */
    //% help=music/ring-tone weight=80
    //% blockId=device_ring block="ring tone (Hz)|%note=device_note" blockGap=8
    //% parts="headphone"
    //% useEnumVal=1
    export function ringTone(frequency: number): void {
        playTone(frequency, 0);
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
    //% blockId=device_note block="%name"
    //% shim=TD_ID color="#FFFFFF" colorSecondary="#FFFFFF"
    //% name.fieldEditor="note" name.defl="262"
    //% name.fieldOptions.decompileLiterals=true
    //% useEnumVal=1
    export function noteFrequency(name: Note): number {
        return name;
    }

    function init() {
        if (beatsPerMinute <= 0) beatsPerMinute = 120;
        if (freqTable.length == 0) freqTable = [31, 33, 35, 37, 39, 41, 44, 46, 49, 52, 55, 58, 62, 65, 69, 73, 78, 82, 87, 92, 98, 104, 110, 117, 123, 131, 139, 147, 156, 165, 175, 185, 196, 208, 220, 233, 247, 262, 277, 294, 311, 330, 349, 370, 392, 415, 440, 466, 494, 523, 554, 587, 622, 659, 698, 740, 784, 831, 880, 932, 988, 1047, 1109, 1175, 1245, 1319, 1397, 1480, 1568, 1661, 1760, 1865, 1976, 2093, 2217, 2349, 2489, 2637, 2794, 2960, 3136, 3322, 3520, 3729, 3951, 4186]
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
        switch (fraction) {
            case BeatFraction.Half: return beat / 2;
            case BeatFraction.Quarter: return beat / 4;
            case BeatFraction.Eighth: return beat / 8;
            case BeatFraction.Sixteenth: return beat / 16;
            case BeatFraction.Double: return beat * 2;
            case BeatFraction.Breve: return beat * 4;
            default: return beat;
        }
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
    //% bpm.min=4 bpm.max=400
    export function setTempo(bpm: number): void {
        init();
        if (bpm > 0) {
            beatsPerMinute = Math.max(1, bpm);
        }
    }

    let currentMelody: Melody;
    let currentBackgroundMelody: Melody;

    /**
     * Gets the melody array of a built-in melody.
     * @param name the note name, eg: Note.C
     */
    //% weight=50 help=music/builtin-melody
    //% blockId=device_builtin_melody block="%melody"
    //% blockHidden=true
    export function builtInMelody(melody: Melodies): string[] {
        return getMelody(melody);
    }

    /**
     * Registers code to run on various melody events
     */
    //% blockId=melody_on_event block="music on %value"
    //% help=music/on-event weight=59 blockGap=32
    export function onEvent(value: MusicEvent, handler: () => void) {
        control.onEvent(MICROBIT_MELODY_ID, value, handler);
    }

    /**
     * Starts playing a melody.
     * Notes are expressed as a string of characters with this format: NOTE[octave][:duration]
     * @param melodyArray the melody array to play
     * @param options melody options, once / forever, in the foreground / background
     */
    //% help=music/begin-melody weight=60 blockGap=16
    //% blockId=device_start_melody block="start melody %melody=device_builtin_melody| repeating %options"
    //% parts="headphone"
    export function beginMelody(melodyArray: string[], options: MelodyOptions = 1) {
        init();
        if (currentMelody != undefined) {
            if (((options & MelodyOptions.OnceInBackground) == 0)
                && ((options & MelodyOptions.ForeverInBackground) == 0)
                && currentMelody.background) {
                currentBackgroundMelody = currentMelody;
                currentMelody = null;
                control.raiseEvent(MICROBIT_MELODY_ID, MusicEvent.BackgroundMelodyPaused);
            }
            if (currentMelody)
                control.raiseEvent(MICROBIT_MELODY_ID, currentMelody.background ? MusicEvent.BackgroundMelodyEnded : MusicEvent.MelodyEnded);
            currentMelody = new Melody(melodyArray, options);
            control.raiseEvent(MICROBIT_MELODY_ID, currentMelody.background ? MusicEvent.BackgroundMelodyStarted : MusicEvent.MelodyStarted);
        } else {
            currentMelody = new Melody(melodyArray, options);
            control.raiseEvent(MICROBIT_MELODY_ID, currentMelody.background ? MusicEvent.BackgroundMelodyStarted : MusicEvent.MelodyStarted);
            // Only start the fiber once
            control.inBackground(() => {
                while (currentMelody.hasNextNote()) {
                    playNextNote(currentMelody);
                    if (!currentMelody.hasNextNote() && currentBackgroundMelody) {
                        // Swap the background melody back
                        currentMelody = currentBackgroundMelody;
                        currentBackgroundMelody = null;
                        control.raiseEvent(MICROBIT_MELODY_ID, MusicEvent.MelodyEnded);
                        control.raiseEvent(MICROBIT_MELODY_ID, MusicEvent.BackgroundMelodyResumed);
                    }
                }
                control.raiseEvent(MICROBIT_MELODY_ID, currentMelody.background ? MusicEvent.BackgroundMelodyEnded : MusicEvent.MelodyEnded);
                currentMelody = null;
            })
        }
    }

    /**
     * Sets a custom playTone function for playing melodies
     */
    //% help=music/set-play-tone
    //% advanced=true
    export function setPlayTone(f: (frequency: number, duration: number) => void) {
        _playTone = f;
    }

    function playNextNote(melody: Melody): void {
        // cache elements
        let currNote = melody.nextNote();
        let currentPos = melody.currentPos;
        let currentDuration = melody.currentDuration;
        let currentOctave = melody.currentOctave;

        let note: number;
        let isrest: boolean = false;
        let beatPos: number;
        let parsingOctave: boolean = true;

        for (let pos = 0; pos < currNote.length; pos++) {
            let noteChar = currNote.charAt(pos);
            switch (noteChar) {
                case 'c': case 'C': note = 1; break;
                case 'd': case 'D': note = 3; break;
                case 'e': case 'E': note = 5; break;
                case 'f': case 'F': note = 6; break;
                case 'g': case 'G': note = 8; break;
                case 'a': case 'A': note = 10; break;
                case 'b': case 'B': note = 12; break;
                case 'r': case 'R': isrest = true; break;
                case '#': note++; break;
                case 'b': note--; break;
                case ':': parsingOctave = false; beatPos = pos; break;
                default: if (parsingOctave) currentOctave = parseInt(noteChar);
            }
        }
        if (!parsingOctave) {
            currentDuration = parseInt(currNote.substr(beatPos + 1, currNote.length - beatPos));
        }
        let beat = (60000 / beatsPerMinute) / 4;
        if (isrest) {
            music.rest(currentDuration * beat)
        } else {
            let keyNumber = note + (12 * (currentOctave - 1));
            let frequency = keyNumber >= 0 && keyNumber < freqTable.length ? freqTable[keyNumber] : 0;
            music.playTone(frequency, currentDuration * beat);
        }
        melody.currentDuration = currentDuration;
        melody.currentOctave = currentOctave;
        const repeating = melody.repeating && currentPos == melody.melodyArray.length - 1;
        melody.currentPos = repeating ? 0 : currentPos + 1;

        control.raiseEvent(MICROBIT_MELODY_ID, melody.background ? MusicEvent.BackgroundMelodyNotePlayed : MusicEvent.MelodyNotePlayed);
        if (repeating)
            control.raiseEvent(MICROBIT_MELODY_ID, melody.background ? MusicEvent.BackgroundMelodyRepeated : MusicEvent.MelodyRepeated);
    }

    class Melody {
        public melodyArray: string[];
        public currentDuration: number;
        public currentOctave: number;
        public currentPos: number;
        public repeating: boolean;
        public background: boolean;

        constructor(melodyArray: string[], options: MelodyOptions) {
            this.melodyArray = melodyArray;
            this.repeating = ((options & MelodyOptions.Forever) != 0);
            this.repeating = this.repeating ? true : ((options & MelodyOptions.ForeverInBackground) != 0)
            this.background = ((options & MelodyOptions.OnceInBackground) != 0);
            this.background = this.background ? true : ((options & MelodyOptions.ForeverInBackground) != 0);
            this.currentDuration = 4; //Default duration (Crotchet)
            this.currentOctave = 4; //Middle octave
            this.currentPos = 0;
        }

        hasNextNote() {
            return this.repeating || this.currentPos < this.melodyArray.length;
        }

        nextNote(): string {
            const currentNote = this.melodyArray[this.currentPos];
            return currentNote;
        }
    }
}
