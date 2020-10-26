/**
 * A sound expression.
 */
//% fixedInstances
class SoundExpression {
    constructor(private notes: string) {
    }

    play() {
        music.__playSoundExpression(this.notes, false)
    }

    playUntilDone() {
        music.__playSoundExpression(this.notes, true)
    }
}

//% fixedInstance whenUsed block="soundexpression:giggle"
const giggle = new SoundExpression("giggle");
//% fixedInstance whenUsed block="soundexpression:happy"
const happy = new SoundExpression("happy");
//% fixedInstance whenUsed block="soundexpression:hello"
const hello = new SoundExpression("hello");
//% fixedInstance whenUsed block="soundexpression:mysterious"
const mysterious = new SoundExpression("mysterious");
//% fixedInstance whenUsed block="soundexpression:sad"
const sad = new SoundExpression("sad");
//% fixedInstance whenUsed block="soundexpression:slide"
const slide = new SoundExpression("slide");
//% fixedInstance whenUsed block="soundexpression:soaring"
const soaring = new SoundExpression("soaring");
//% fixedInstance whenUsed block="soundexpression:spring"
const spring = new SoundExpression("spring");
//% fixedInstance whenUsed block="soundexpression:twinkle"
const twinkle = new SoundExpression("twinkle");
//% fixedInstance whenUsed block="soundexpression:yawn"
const yawn = new SoundExpression("yawn");
