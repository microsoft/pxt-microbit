/**
 * A sound expression.
 */
//% fixedInstances
//% blockNamespace=music
//% group="micro:bit (V2)"
class SoundExpression {
    constructor(private notes: string) {
    }

    /**
     * Starts to play a sound expression.
     */
    //% block="play sound $this"
    //% weight=80
    //% blockGap=8
    //% help=music/play
    //% group="micro:bit (V2)"
    play() {
        music.__playSoundExpression(this.notes, false)
    }

    /**
     * Plays a sound expression until finished
     */
    //% block="play sound $this until done"
    //% weight=81
    //% blockGap=8
    //% help=music/play-until-done
    //% group="micro:bit (V2)"
    playUntilDone() {
        music.__playSoundExpression(this.notes, true)
    }
}

namespace soundExpression {
    //% fixedInstance whenUsed block="{id:soundexpression}giggle"
    export const giggle = new SoundExpression("giggle");
    //% fixedInstance whenUsed block="{id:soundexpression}happy"
    export const happy = new SoundExpression("happy");
    //% fixedInstance whenUsed block="{id:soundexpression}hello"
    export const hello = new SoundExpression("hello");
    //% fixedInstance whenUsed block="{id:soundexpression}mysterious"
    export const mysterious = new SoundExpression("mysterious");
    //% fixedInstance whenUsed block="{id:soundexpression}sad"
    export const sad = new SoundExpression("sad");
    //% fixedInstance whenUsed block="{id:soundexpression}slide"
    export const slide = new SoundExpression("slide");
    //% fixedInstance whenUsed block="{id:soundexpression}soaring"
    export const soaring = new SoundExpression("soaring");
    //% fixedInstance whenUsed block="{id:soundexpression}spring"
    export const spring = new SoundExpression("spring");
    //% fixedInstance whenUsed block="{id:soundexpression}twinkle"
    export const twinkle = new SoundExpression("twinkle");
    //% fixedInstance whenUsed block="{id:soundexpression}yawn"
    export const yawn = new SoundExpression("yawn");
}