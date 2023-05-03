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

        play(playbackMode: PlaybackMode) {
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
                    this.play(PlaybackMode.UntilDone);
                }
            });
        }
    }

    export class TonePlayable extends Playable {
        constructor(public pitch: number, public duration: number) {
            super();
        }

        play(playbackMode: PlaybackMode) {
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
    //% toPlay.shadow=music_melody_playable
    //% group="Sounds"
    //% help="music/play"
    export function play(toPlay: Playable, playbackMode: PlaybackMode) {
        toPlay.play(playbackMode);
    }

    //% blockId="music_melody_playable"
    //% block="sound $melody"
    //% toolboxParent=music_playable_play
    //% toolboxParentArgument=toPlay
    //% group="Sounds"
    //% duplicateShadowOnDrag
    //% blockHidden
    export function melodyPlayable(melody: string): Playable {
        return undefined;
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