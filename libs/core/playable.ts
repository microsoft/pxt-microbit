namespace music {
    const MICROBIT_MELODY_ID = 2000;
    const INTERNAL_MELODY_ENDED = 5;

    export enum PlaybackMode {
        //% block="until done"
        UntilDone,
        //% block="in background"
        InBackground,
        //% block="looping in background"
        LoopingInBackground
    }

    let looping: Playable[];

    export class Playable {
        stopped: boolean;
        constructor() {

        }

        _play(playbackMode: PlaybackMode) {
            // subclass
        }

        loop() {
            if(!looping) {
                looping = [];
            }

            looping.push(this);
            this.stopped = false;

            control.runInParallel(() => {
                while (!this.stopped) {
                    this._play(PlaybackMode.UntilDone);
                }
            });
        }
    }

    export class StringPlayable extends Playable {
        notesStr: string;
        tempo: number;

        constructor(melody: string, tempo: number) {
            super();
            this.notesStr = melody;
            this.tempo = tempo;
        }

        _play(playbackMode: PlaybackMode) {
            const notes = music.getMelodyNotes(this.notesStr, playbackMode === PlaybackMode.LoopingInBackground);
            music.setTempo(this.tempo);
            if (playbackMode === PlaybackMode.InBackground) {
                music.startMelodyInternal(notes, MelodyOptions.OnceInBackground);
            }
            else if (playbackMode === PlaybackMode.UntilDone) {
                music.startMelodyInternal(notes, MelodyOptions.Once);
                control.waitForEvent(MICROBIT_MELODY_ID, INTERNAL_MELODY_ENDED);
            }
            else {
                music.startMelodyInternal(notes, MelodyOptions.ForeverInBackground);
            }
        }
    }

    export class TonePlayable extends Playable {
        constructor(public pitch: number, public duration: number) {
            super();
        }

        _play(playbackMode: PlaybackMode) {
            if (playbackMode === PlaybackMode.InBackground) {
                control.runInParallel(() => music.playTone(this.pitch, this.duration));
            }
            else if (playbackMode === PlaybackMode.UntilDone) {
                music.playTone(this.pitch, this.duration);
                if (this.duration > 2000) {
                    pause(this.duration);
                }
            }
            else {
                this.loop();
            }
        }
    }

    //% blockId="music_playable_play"
    //% block="[new] play $toPlay $playbackMode"
    //% toPlay.shadow=music_string_playable
    //% group="Sounds"
    //% help="music/play"
    export function play(toPlay: Playable, playbackMode: PlaybackMode) {
        toPlay._play(playbackMode);
    }

    //% blockId="music_string_playable"
    //% block="[new] melody $melody at tempo $bpm|(bpm)"
    //% weight=85 blockGap=8
    //% help=music/melody-editor
    //% group="Songs"
    //% duplicateShadowOnDrag
    //% melody.shadow=melody_editor
    //% bpm.min=40 bpm.max=500
    //% bpm.defl=120
    export function stringPlayable(melody: string, bpm: number): Playable {
        return new StringPlayable(melody, bpm);
    }

    /**
     * Plays a tone through pin ``P0`` for the given duration.
     * @param frequency pitch of the tone to play in Hertz (Hz), eg: Note.C
     * @param ms tone duration in milliseconds (ms)
     */
    //% blockId="music_tone_playable"
    //% block="[new] tone $note for $duration"
    //% toolboxParent=music_playable_play
    //% toolboxParentArgument=toPlay
    //% group="Tone"
    //% duplicateShadowOnDrag
    //% note.shadow=device_note
    //% duration.shadow=device_beat
    //% parts="headphone"
    //% help=music/tone-playable
    export function tonePlayable(note: number, duration: number): Playable {
        return new TonePlayable(note, duration);
    }

    export function _stopPlayables() {
        if(!looping) return;

        for (const p of looping) {
            p.stopped = true;
        }
        looping = undefined;
    }
}