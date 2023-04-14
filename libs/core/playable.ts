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
        if (stateStack) return;
        stateStack = [new PlayableState()];

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

    // export class MelodyPlayable extends Playable {
    //     constructor(public melody: Melody) {
    //         super();
    //     }

    //     play(playbackMode: PlaybackMode) {
    //         if (playbackMode === PlaybackMode.InBackground) {
    //             this.melody.play(music.volume());
    //         }
    //         else if (playbackMode === PlaybackMode.UntilDone) {
    //             this.melody.playUntilDone(music.volume());
    //         }
    //         else {
    //             this.melody.loop(music.volume());
    //         }
    //     }
    // }

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
    //% block="play $toPlay $playbackMode"
    //% toPlay.shadow=music_tone_playable
    //% group="Tone"
    //% help="music/play"
    export function play(toPlay: Playable, playbackMode: PlaybackMode) {
        toPlay.play(playbackMode);
    }

    // //% blockId="music_melody_playable"
    // //% block="sound $melody"
    // //% toolboxParent=music_playable_play
    // //% toolboxParentArgument=toPlay
    // //% group="Sounds"
    // //% duplicateShadowOnDrag
    // //% blockHidden
    // //% help=music/melody-playable
    // export function melodyPlayable(melody: Melody): Playable {
    //     return new MelodyPlayable(melody);
    // }


    // //% blockId="music_string_playable"
    // //% block="melody $melody at tempo $tempo|(bpm)"
    // //% toolboxParent=music_playable_play
    // //% toolboxParentArgument=toPlay
    // //% weight=85 blockGap=8
    // //% help=music/melody-editor
    // //% group="Melody"
    // //% duplicateShadowOnDrag
    // //% melody.shadow=melody_editor
    // //% tempo.min=40 tempo.max=500
    // //% tempo.defl=120
    // //% help=music/string-playable
    // export function stringPlayable(melody: string, tempo: number): Playable {
    //     let notes: string[] = melody.split(" ").filter(n => !!n);
    //     let formattedMelody = "";
    //     let newOctave = false;

    //     // build melody string, replace '-' with 'R' and add tempo
    //     // creates format like "C5-174 B4 A G F E D C "
    //     for (let i = 0; i < notes.length; i++) {
    //         if (notes[i] === "-") {
    //             notes[i] = "R";
    //         } else if (notes[i] === "C5") {
    //             newOctave = true;
    //         } else if (newOctave) { // change the octave if necesary
    //             notes[i] += "4";
    //             newOctave = false;
    //         }
    //         // add tempo after first note
    //         if (i == 0) {
    //             formattedMelody += notes[i] + "-" + tempo + " ";
    //         } else {
    //             formattedMelody += notes[i] + " ";
    //         }
    //     }

    //     return new MelodyPlayable(new Melody(formattedMelody));
    // }

    //% blockId="music_tone_playable"
    //% block="tone $note for $duration"
    //% toolboxParent=music_playable_play
    //% toolboxParentArgument=toPlay
    //% group="Tone"
    //% note.defl="Note.C"
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