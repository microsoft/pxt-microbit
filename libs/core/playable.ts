namespace music {
    export enum PlaybackMode {
        //% block="until done"
        UntilDone,
        //% block="in background"
        InBackground,
        //% block="looping in background"
        LoopingInBackground
    }

    let stateStack: PlayableState[];

    class PlayableState {
        looping: Playable[];
        constructor() {
            this.looping = [];
        }

        stopLooping() {
            for (const p of this.looping) {
                p.stopped = true;
            }
            this.looping = [];
        }
    }

    function state() {
        _init();
        return stateStack[stateStack.length - 1];
    }

    function _init() {
        // TODO thsparks : How to make this work in microbit?
        // if (stateStack) return;
        // stateStack = [new PlayableState()];

        // game.addScenePushHandler(() => {
        //     stateStack.push(new PlayableState());
        // });

        // game.addScenePopHandler(() => {
        //     stateStack.pop();
        //     if (stateStack.length === 0) stateStack.push(new PlayableState());
        // });
    }

    export class Playable {
        stopped: boolean;
        constructor() {

        }

        play(playbackMode: PlaybackMode) {
            // subclass
        }

        loop() {
            state().looping.push(this);
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

    // TODO thsparks - bring back % toPlay.shadow=music_melody_playable
    //% blockId="music_playable_play"
    //% block="[new] play $toPlay $playbackMode"
    //% group="Sounds"
    //% help="music/play"
    export function play(toPlay: Playable, playbackMode: PlaybackMode) {
        toPlay.play(playbackMode);
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
        state().stopLooping();
    }
}