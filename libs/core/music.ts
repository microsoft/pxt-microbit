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
    //% block="once"
    Once = 1,
    //% block="forever"
    Forever = 2,
    //% block="once in background"
    OnceInBackground = 4,
    //% block="forever in background"
    ForeverInBackground = 8
}

enum MelodyStopOptions {
    //% block="all"
    All = MelodyOptions.Once | MelodyOptions.OnceInBackground,
    //% block="foreground"
    Foreground = MelodyOptions.Once,
    //% block="background"
    Background = MelodyOptions.OnceInBackground
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
//% groups='["Melody", "Tone", "Volume", "Tempo", "Melody Advanced"]'
namespace music {
    const INTERNAL_MELODY_ENDED = 5;

    let beatsPerMinute: number = 120;
    let stopSoundHandlers: (() => void)[];
    //% whenUsed
    const freqs = hex`
        1f00210023002500270029002c002e003100340037003a003e004100450049004e00520057005c00620068006e00
        75007b0083008b0093009c00a500af00b900c400d000dc00e900f70006011501260137014a015d01720188019f01
        b801d201ee010b022a024b026e029302ba02e40210033f037003a403dc03170455049704dd0427057505c8052006
        7d06e0064907b8072d08a9082d09b9094d0aea0a900b400cfa0cc00d910e6f0f5a1053115b1272139a14d4152017
        8018f519801b231dde1e`;
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
    //% group="Tone"
    //% deprecated=1
    export function playTone(frequency: number, ms: number): void {
        if (isNaN(frequency) || isNaN(ms)) return;
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
    //% group="Tone"
    export function ringTone(frequency: number): void {
        playTone(frequency, 0);
    }

    /**
     * Rests (plays nothing) for a specified time through pin ``P0``.
     * @param ms rest duration in milliseconds (ms)
     */
    //% help=music/rest weight=79
    //% blockId=device_rest block="rest for |%duration=device_beat"
    //% parts="headphone"
    //% group="Tone"
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
    //% group="Tone"
    //% blockGap=8
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
    //% group="Tempo"
    //% blockGap=8
    export function beat(fraction?: BeatFraction): number {
        init();
        if (fraction == null) fraction = BeatFraction.Whole;
        let beat = Math.idiv(60000, beatsPerMinute);
        switch (fraction) {
            case BeatFraction.Half: return beat >> 1;
            case BeatFraction.Quarter: return beat >> 2;
            case BeatFraction.Eighth: return beat >> 3;
            case BeatFraction.Sixteenth: return beat >> 4;
            case BeatFraction.Double: return beat << 1;
            case BeatFraction.Breve: return beat << 2;
            default: return beat;
        }
    }

    /**
     * Returns the tempo in beats per minute. Tempo is the speed (bpm = beats per minute) at which notes play. The larger the tempo value, the faster the notes will play.
     */
    //% help=music/tempo weight=40
    //% blockId=device_tempo block="tempo (bpm)" blockGap=8
    //% group="Tempo"
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
    //% group="Tempo"
    //% weight=100
    export function changeTempoBy(bpm: number): void {
        init();
        if (isNaN(bpm)) return;
        setTempo(beatsPerMinute + bpm);
    }

    /**
     * Sets the tempo to the specified amount
     * @param bpm The new tempo in beats per minute, eg: 120
     */
    //% help=music/set-tempo weight=38
    //% blockId=device_set_tempo block="set tempo to (bpm)|%value"
    //% bpm.min=40 bpm.max=500
    //% group="Tempo"
    //% weight=99
    export function setTempo(bpm: number): void {
        init();
        if (isNaN(bpm)) return;
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
    //% weight=50 help=music/built-in-melody
    //% blockId=device_builtin_melody block="%melody"
    //% blockHidden=true
    //% group="Melody Advanced"
    //% deprecated=1
    export function builtInMelody(melody: Melodies): string[] {
        return getMelody(melody);
    }

    /**
     * Gets the melody array of a built-in melody.
     * @param melody the melody name
     */
    //% weight=60 help=music/built-in-playable-melody
    //% blockId=device_builtin_melody_playable block="melody $melody"
    //% toolboxParent=music_playable_play_default_bkg
    //% toolboxParentArgument=toPlay
    //% duplicateShadowOnDrag
    //% group="Melody Advanced"
    export function builtInPlayableMelody(melody: Melodies): StringArrayPlayable {
        return new StringArrayPlayable(getMelody(melody), undefined);
    }

    /**
     * Registers code to run on various melody events
     */
    //% blockId=melody_on_event block="music on %value"
    //% help=music/on-event weight=59 blockGap=32
    //% group="Melody Advanced"
    export function onEvent(value: MusicEvent, handler: () => void) {
        control.onEvent(MICROBIT_MELODY_ID, value, handler);
    }

    /**
     * Use startMelody instead
     */
    //% hidden=1 deprecated=1
    //% parts="headphone"
    //% group="Melody Advanced"
    export function beginMelody(melodyArray: string[], options: MelodyOptions = 1) {
        return startMelodyInternal(melodyArray, options);
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
    //% group="Melody Advanced"
    //% deprecated=1
    export function startMelody(melodyArray: string[], options: MelodyOptions = 1) {
        return startMelodyInternal(melodyArray, options);
    }

    /**
     * Play a melody from the melody editor.
     * @param melody string of up to eight notes [C D E F G A B C5] or rests [-] separated by spaces, which will be played one at a time, ex: "E D G F B A C5 B "
     * @param tempo number in beats per minute (bpm), dictating how long each note will play for
     */
    //% block="play melody $melody at tempo $tempo|(bpm)" blockId=playMelody
    //% weight=85 blockGap=8 help=music/play-melody
    //% melody.shadow="melody_editor"
    //% tempo.min=40 tempo.max=500
    //% tempo.defl=120
    //% parts=headphone
    //% group="Melody"
    //% deprecated=1
    export function playMelody(melody: string, tempo: number) {
        melody = melody || "";
        setTempo(tempo);
        let notes = getMelodyNotes(melody);

        music.startMelodyInternal(notes, MelodyOptions.Once)
        waitForMelodyEnd();
    }

    // Shared code between begin, start, and play Melody blocks (all deprecated), plus StringPlayable.play (NOT deprecated).
    export function startMelodyInternal(melodyArray: string[], options: MelodyOptions) {
        init();
        const isBackground = options & (MelodyOptions.OnceInBackground | MelodyOptions.ForeverInBackground);
        if (currentMelody != undefined) {
            if (!isBackground && currentMelody.background) {
                currentBackgroundMelody = currentMelody;
                currentMelody = null;
                control.raiseEvent(MICROBIT_MELODY_ID, MusicEvent.BackgroundMelodyPaused);
            }
            if (currentMelody)
                control.raiseEvent(MICROBIT_MELODY_ID, currentMelody.background | MusicEvent.MelodyEnded);
            currentMelody = new Melody(melodyArray, options);
            control.raiseEvent(MICROBIT_MELODY_ID, currentMelody.background | MusicEvent.MelodyStarted);
        } else {
            currentMelody = new Melody(melodyArray, options);
            control.raiseEvent(MICROBIT_MELODY_ID, currentMelody.background | MusicEvent.MelodyStarted);
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
                        control.raiseEvent(MICROBIT_MELODY_ID, INTERNAL_MELODY_ENDED);
                    }
                }
                control.raiseEvent(MICROBIT_MELODY_ID, currentMelody.background | MusicEvent.MelodyEnded);
                if (!currentMelody.background)
                    control.raiseEvent(MICROBIT_MELODY_ID, INTERNAL_MELODY_ENDED);
                currentMelody = null;
            })
        }
    }

    export function waitForMelodyEnd() {
        control.waitForEvent(MICROBIT_MELODY_ID, INTERNAL_MELODY_ENDED);
    }

    export function getMelodyNotes(melody: string) {
        let notes: string[] = melody.split(" ").filter(n => !!n);
        let newOctave = false;

        // build melody string, replace '-' with 'R' and add tempo
        // creates format like "C5-174 B4 A G F E D C "
        for (let i = 0; i < notes.length; i++) {
            if (notes[i] === "-") {
                notes[i] = "R";
            } else if (notes[i] === "C5") {
                newOctave = true;
            } else if (newOctave) { // change the octave if necesary
                notes[i] += "4";
                newOctave = false;
            }
        }

        // Switch back to octave 4 on first note if repeating and final note is octave 5.
        // Otherwise the higher octave will persist.
        if (notes[notes.length - 1] === "C5" && notes[0] != "C5") {
            notes[0] += "4";
        }

        return notes;
    }

    /**
     * Create a melody with the melody editor.
     * @param melody
     */
    //% block="$melody" blockId=melody_editor
    //% blockHidden = true
    //% weight=85 blockGap=8
    //% duplicateShadowOnDrag
    //% melody.fieldEditor="melody"
    //% melody.fieldOptions.decompileLiterals=true
    //% melody.fieldOptions.decompileIndirectFixedInstances="true"
    //% melody.fieldOptions.onParentBlock="true"
    //% shim=TD_ID
    //% group="Melody"
    export function melodyEditor(melody: string): string {
        return melody;
    }

    /**
     * Stops the melodies
     * @param options which melody to stop
     */
    //% help=music/stop-melody weight=59 blockGap=16
    //% blockId=device_stop_melody block="stop melody $options"
    //% parts="headphone"
    //% group="Melody Advanced"
    export function stopMelody(options: MelodyStopOptions) {
        if (options & MelodyStopOptions.Background)
            startMelody([], MelodyOptions.OnceInBackground);
        if (options & MelodyStopOptions.Foreground)
            startMelody([], MelodyOptions.Once);
    }

    export function _onStopSound(handler: () => void) {
        if (!stopSoundHandlers) {
            stopSoundHandlers = [];
        }
        stopSoundHandlers.push(handler);
    }

    /**
     * Stop all sounds and melodies currently playing.
     */
    //% help=music/stop-all-sounds
    //% blockId=music_stop_all_sounds block="stop all sounds"
    //% weight=10
    //% group="Volume"
    export function stopAllSounds() {
        rest(0);
        stopMelody(MelodyStopOptions.All);
        music.__stopSoundExpressions();
        _stopPlayables();
        if (stopSoundHandlers) {
            for (const handler of stopSoundHandlers) {
                handler()
            }
        }
    }


    /**
     * Sets a custom playTone function for playing melodies
     */
    //% help=music/set-play-tone
    //% advanced=true
    //% group="Tone"
    export function setPlayTone(f: (frequency: number, duration: number) => void) {
        _playTone = f;
    }

    /**
     * Converts an octave and note offset into an integer frequency.
     * Returns 0 if the note is out of range.
     *
     * @param octave    The octave of the note (1 - 8)
     * @param note      The offset of the note within the octave
     * @returns         A frequency in HZ or 0 if out of range
     */
    export function getFrequencyForNote(octave: number, note: number) {
        return freqs.getNumber(NumberFormat.UInt16LE, (note + (12 * (octave - 1))) * 2) || 0;
    }

    /*
     * Converts a simple positive string to an integer.
     * Pxt-common's parseInt is more robust, but it has a fairly large code size footprint.
     * When we know the provided string will be a simple number, we can use this instead,
     * which takes some shortcuts but does not use nearly as much space.
     */
    function parseIntSimple(text: string) {
        let result = 0;
        for (let i = 0; i < text.length; ++i) {
            const c = text.charCodeAt(i) - 48;
            if (c < 0 || c > 9) return NaN;
            result = result * 10 + c;
        }
        return result;
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
        let prevNote: boolean = false;

        for (let pos = 0; pos < currNote.length; pos++) {
            let noteChar = currNote.charAt(pos);
            switch (noteChar) {
                case 'c': case 'C': note = 1; prevNote = true; break;
                case 'd': case 'D': note = 3; prevNote = true; break;
                case 'e': case 'E': note = 5; prevNote = true; break;
                case 'f': case 'F': note = 6; prevNote = true; break;
                case 'g': case 'G': note = 8; prevNote = true; break;
                case 'a': case 'A': note = 10; prevNote = true; break;
                case 'B': note = 12; prevNote = true; break;
                case 'r': case 'R': isrest = true; prevNote = false; break;
                case '#': note++; prevNote = false; break;
                case 'b': if (prevNote) note--; else { note = 12; prevNote = true; } break;
                case ':': parsingOctave = false; beatPos = pos; prevNote = false; break;
                default: prevNote = false; if (parsingOctave) currentOctave = parseIntSimple(noteChar);
            }
        }
        if (!parsingOctave) {
            currentDuration = parseIntSimple(currNote.substr(beatPos + 1, currNote.length - beatPos));
        }
        let beat = Math.idiv(60000, beatsPerMinute) >> 2;
        if (isrest) {
            music.rest(currentDuration * beat)
        } else {
            music.playTone(getFrequencyForNote(currentOctave, note), currentDuration * beat);
        }
        melody.currentDuration = currentDuration;
        melody.currentOctave = currentOctave;
        const repeating = melody.repeating && currentPos == melody.melodyArray.length - 1;
        melody.currentPos = repeating ? 0 : currentPos + 1;

        control.raiseEvent(MICROBIT_MELODY_ID, melody.background | MusicEvent.MelodyNotePlayed);
        if (repeating)
            control.raiseEvent(MICROBIT_MELODY_ID, melody.background | MusicEvent.MelodyRepeated);
    }

    class Melody {
        public melodyArray: string[];
        public currentDuration: number;
        public currentOctave: number;
        public currentPos: number;
        public repeating: boolean;

        // This is bitwise or'd with the events. 0 is not in background, 0xf0 if in background
        public background: number;

        constructor(melodyArray: string[], options: MelodyOptions) {
            this.melodyArray = melodyArray;
            this.repeating = !!(options & (MelodyOptions.Forever | MelodyOptions.ForeverInBackground));
            this.background = (options & (MelodyOptions.OnceInBackground | MelodyOptions.ForeverInBackground)) ? 0xf0 : 0;
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

    export function _bufferToMelody(melody: Buffer) {
        if (!melody) return [];

        let currentDuration = 4;
        let currentOctave = -1;
        const out: string[] = [];

        const notes = "c#d#ef#g#a#b"
        let current = "";

        // The buffer format is 2 bytes per note. First note byte is midi
        // note number, second byte is duration in quarter beats. The note
        // number 0 is reserved for rests
        for (let i = 0; i < melody.length; i += 2) {
            let octave = 4;
            const note = melody[i] % 12;
            if (melody[i] === 0) {
                current = "r"
            }
            else {
                current = notes.charAt(note);
                if (current === "#") current = notes.charAt(note - 1) + current

                octave = Math.idiv((melody[i] - 24), 12)
            }

            const duration = melody[i + 1];

            if (octave !== currentOctave) {
                current += octave
                currentOctave = octave;
            }

            if (duration !== currentDuration) {
                current += ":" + duration;
                currentDuration = duration;
            }

            out.push(current);
        }

        return out;
    }
}
