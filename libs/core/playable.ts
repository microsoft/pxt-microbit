namespace music {
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
            if (!looping) {
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

    export class StringArrayPlayable extends Playable {
        constructor(private notes: string[], private tempo: number) {
            super();
        }

        _play(playbackMode: PlaybackMode) {
            if(this.tempo) {
                music.setTempo(this.tempo);
            }
            if (playbackMode == PlaybackMode.InBackground) {
                startMelodyInternal(this.notes, MelodyOptions.OnceInBackground);
            }
            else if (playbackMode == PlaybackMode.LoopingInBackground) {
                startMelodyInternal(this.notes, MelodyOptions.ForeverInBackground);
            }
            else {
                startMelodyInternal(this.notes, MelodyOptions.Once);
                waitForMelodyEnd();
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
            }
            else {
                this.loop();
            }
        }
    }

    /**
     * Play a song, melody, or other sound. The music plays until finished or can play as a
     * background task.
     * @param toPlay the song or melody to play
     * @param playbackMode play the song or melody until it's finished or as background task
     */
    //% blockId="music_playable_play"
    //% block="play $toPlay $playbackMode"
    //% toPlay.shadow=music_string_playable
    //% group="Melody"
    //% help="music/play"
    //% blockHidden
    export function play(toPlay: Playable, playbackMode: PlaybackMode) {
        toPlay._play(playbackMode);
    }

    //% blockId="music_playable_play_default_bkg"
    //% block="play $toPlay $playbackMode"
    //% toPlay.shadow=music_string_playable
    //% playbackMode.defl=music.PlaybackMode.InBackground
    //% group="Melody"
    //% help="music/play"
    //% blockHidden
    export function _playDefaultBackground(toPlay: Playable, playbackMode: PlaybackMode) {
        return play(toPlay, playbackMode);
    }

    /**
     * Play a melody from the melody editor
     * @param melody string of up to eight notes [C D E F G A B C5] or rests [-] separated by spaces, which will be played one at a time, ex: "E D G F B A C5 B "
     * @param bpm number in beats per minute dictating how long each note will play
     */
    //% blockId="music_string_playable"
    //% block="melody $melody at tempo $bpm|(bpm)"
    //% weight=85 blockGap=8
    //% help=music/string-playable
    //% group="Melody"
    //% toolboxParent=music_playable_play
    //% toolboxParentArgument=toPlay
    //% duplicateShadowOnDrag
    //% melody.shadow=melody_editor
    //% bpm.min=40 bpm.max=500
    //% bpm.defl=120
    export function stringPlayable(melody: string, bpm: number): Playable {
        return new StringArrayPlayable(music.getMelodyNotes(melody), bpm);
    }

    /**
     * Plays a tone through pin ``P0`` for the given duration.
     * @param note pitch of the tone to play in Hertz (Hz).
     * @param duration tone duration in milliseconds (ms)
     */
    //% blockId="music_tone_playable"
    //% block="tone $note for $duration"
    //% toolboxParent=music_playable_play
    //% toolboxParentArgument=toPlay
    //% group="Tone"
    //% weight=85
    //% duplicateShadowOnDrag
    //% note.shadow=device_note
    //% duration.shadow=device_beat
    //% parts="headphone"
    //% help=music/tone-playable
    export function tonePlayable(note: number, duration: number): Playable {
        return new TonePlayable(note, duration);
    }

    export function _stopPlayables() {
        if (!looping) return;

        for (const p of looping) {
            p.stopped = true;
        }
        looping = undefined;
    }
}