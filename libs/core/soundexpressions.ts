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
    //% parts=builtinspeaker
    //% deprecated=1
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
    //% parts=builtinspeaker
    //% deprecated=1
    playUntilDone() {
        music.__playSoundExpression(this.notes, true)
    }

    getNotes() {
        return this.notes;
    }
}

enum WaveShape {
    //% block="sine"
    Sine = 0,
    //% block="sawtooth"
    Sawtooth = 1,
    //% block="triangle"
    Triangle = 2,
    //% block="square"
    Square = 3,
    //% block="noise"
    Noise = 4
}

enum InterpolationCurve {
    //% block="linear"
    Linear,
    //% block="curve"
    Curve,
    //% block="logarithmic"
    Logarithmic
}

enum SoundExpressionEffect {
    //% block="none"
    None = 0,
    //% block="vibrato"
    Vibrato = 1,
    //% block="tremolo"
    Tremolo = 2,
    //% block="warble"
    Warble = 3
}

enum SoundExpressionPlayMode {
    //% block="until done"
    UntilDone,
    //% block="in background"
    InBackground
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

    export enum InterpolationEffect {
        None = 0,
        Linear = 1,
        Curve = 2,
        ExponentialRising = 5,
        ExponentialFalling = 6,
        ArpeggioRisingMajor = 8,
        ArpeggioRisingMinor = 10,
        ArpeggioRisingDiminished = 12,
        ArpeggioRisingChromatic = 14,
        ArpeggioRisingWholeTone = 16,
        ArpeggioFallingMajor = 9,
        ArpeggioFallingMinor = 11,
        ArpeggioFallingDiminished = 13,
        ArpeggioFallingChromatic = 15,
        ArpeggioFallingWholeTone = 17,
        Logarithmic = 18
    }

    export class Sound {
        src: string;

        constructor() {
            this.src = "000000000000000000000000000000000000000000000000000000000000000000000000"
        }

        get wave(): WaveShape {
            return this.getValue(0, 1);
        }

        set wave(value: WaveShape) {
            this.setValue(0, Math.constrain(value, 0, 4), 1);
        }

        get volume() {
            return this.getValue(1, 4);
        }

        set volume(value: number) {
            this.setValue(1, Math.constrain(value, 0, 1023), 4);
        }

        get frequency() {
            return this.getValue(5, 4);
        }

        set frequency(value: number) {
            this.setValue(5, value, 4);
        }

        get duration() {
            return this.getValue(9, 4);
        }

        set duration(value: number) {
            this.setValue(9, value, 4);
        }

        get shape(): InterpolationEffect {
            return this.getValue(13, 2);
        }

        set shape(value: InterpolationEffect) {
            this.setValue(13, value, 2);
        }

        get endFrequency() {
            return this.getValue(18, 4);
        }

        set endFrequency(value: number) {
            this.setValue(18, value, 4);
        }

        get endVolume() {
            return this.getValue(26, 4);
        }

        set endVolume(value: number) {
            this.setValue(26, Math.constrain(value, 0, 1023), 4);
        }

        get steps() {
            return this.getValue(30, 4);
        }

        set steps(value: number) {
            this.setValue(30, value, 4);
        }

        get fx(): SoundExpressionEffect {
            return this.getValue(34, 2);
        }

        set fx(value: SoundExpressionEffect) {
            this.setValue(34, Math.constrain(value, 0, 3), 2);
        }

        get fxParam() {
            return this.getValue(36, 4);
        }

        set fxParam(value: number) {
            this.setValue(36, value, 4);
        }

        get fxnSteps() {
            return this.getValue(40, 4);
        }

        set fxnSteps(value: number) {
            this.setValue(40, value, 4);
        }

        get frequencyRandomness() {
            return this.getValue(44, 4);
        }

        set frequencyRandomness(value: number) {
            this.setValue(44, value, 4);
        }

        get endFrequencyRandomness() {
            return this.getValue(48, 4);
        }

        set endFrequencyRandomness(value: number) {
            this.setValue(48, value, 4);
        }

        get volumeRandomness() {
            return this.getValue(52, 4);
        }

        set volumeRandomness(value: number) {
            this.setValue(52, value, 4);
        }

        get endVolumeRandomness() {
            return this.getValue(56, 4);
        }

        set endVolumeRandomness(value: number) {
            this.setValue(56, value, 4);
        }

        get durationRandomness() {
            return this.getValue(60, 4);
        }

        set durationRandomness(value: number) {
            this.setValue(60, value, 4);
        }

        get fxParamRandomness() {
            return this.getValue(64, 4);
        }

        set fxParamRandomness(value: number) {
            this.setValue(64, value, 4);
        }

        get fxnStepsRandomness() {
            return this.getValue(68, 4);
        }

        set fxnStepsRandomness(value: number) {
            this.setValue(68, value, 4);
        }

        copy() {
            const result = new Sound();
            result.src = this.src.slice(0);
            return result;
        }

        protected setValue(offset: number, value: number, length: number) {
            value = Math.constrain(value | 0, 0, Math.pow(10, length) - 1);
            this.src = this.src.substr(0, offset) + formatNumber(value, length) + this.src.substr(offset + length);
        }

        protected getValue(offset: number, length: number) {
            return parseInt(this.src.substr(offset, length));
        }
    }

    function formatNumber(num: number, length: number) {
        let result = num + "";
        while (result.length < length) result = "0" + result;
        return result;
    }

    export function playSound(toPlay: Sound | Sound[]) {
        let src = "";
        if (Array.isArray(toPlay)) {
            src = (toPlay as Sound[]).map(s => s.src).join(",");
        }
        else {
            src = (toPlay as Sound).src;
        }

        new SoundExpression(src).playUntilDone();
    }
}

namespace music {
    /**
     * Play a sound effect from a sound expression string.
     * @param sound the sound expression string
     * @param mode the play mode, play until done or in the background
     */
    //% blockId=soundExpression_playSoundEffect
    //% block="play sound $sound $mode"
    //% sound.shadow=soundExpression_createSoundEffect
    //% weight=100 help=music/play-sound-effect
    //% blockGap=8
    //% group="micro:bit (V2)"
    export function playSoundEffect(sound: string, mode: SoundExpressionPlayMode) {
        if (mode === SoundExpressionPlayMode.InBackground) {
            new SoundExpression(sound).play();
        }
        else {
            new SoundExpression(sound).playUntilDone();
        }
    }

    /**
     * Create a sound expression from a set of sound effect parameters.
     * @param waveShape waveform of the sound effect
     * @param startFrequency starting frequency for the sound effect waveform
     * @param endFrequency ending frequency for the sound effect waveform
     * @param startVolume starting volume of the sound, or starting amplitude
     * @param endVolume ending volume of the sound, or ending amplitude
     * @param duration the amount of time in milliseconds (ms) that sound will play for
     * @param effect the effect to apply to the waveform or volume
     * @param interpolation interpolation method for frequency scaling
     */
    //% blockId=soundExpression_createSoundEffect
    //% help=music/create-sound-effect
    //% block="$waveShape|| start frequency $startFrequency end frequency $endFrequency duration $duration start volume $startVolume end volume $endVolume effect $effect interpolation $interpolation"
    //% waveShape.defl=WaveShape.Sine
    //% waveShape.fieldEditor=soundeffect
    //% startFrequency.defl=5000
    //% startFrequency.min=0
    //% startFrequency.max=5000
    //% endFrequency.defl=0
    //% endFrequency.min=0
    //% endFrequency.max=5000
    //% startVolume.defl=255
    //% startVolume.min=0
    //% startVolume.max=255
    //% endVolume.defl=0
    //% endVolume.min=0
    //% endVolume.max=255
    //% duration.defl=500
    //% duration.min=1
    //% duration.max=9999
    //% effect.defl=SoundExpressionEffect.None
    //% interpolation.defl=InterpolationCurve.Linear
    //% compileHiddenArguments=true
    //% inlineInputMode="variable"
    //% inlineInputModeLimit=3
    //% expandableArgumentBreaks="3,5"
    //% group="micro:bit (V2)"
    export function createSoundEffect(waveShape: WaveShape, startFrequency: number, endFrequency: number, startVolume: number, endVolume: number, duration: number, effect: SoundExpressionEffect, interpolation: InterpolationCurve): string {
        const sound = new soundExpression.Sound();
        sound.wave = waveShape;
        sound.frequency = startFrequency;
        sound.volume = ((startVolume / 255) * 1023) | 0;
        sound.endFrequency = endFrequency;
        sound.endVolume = ((endVolume / 255) * 1023) | 0;
        sound.duration = duration;
        sound.fx = effect;

        switch (interpolation) {
            case InterpolationCurve.Linear:
                sound.shape = soundExpression.InterpolationEffect.Linear;
                sound.steps = 128;
                break;
            case InterpolationCurve.Curve:
                sound.shape = soundExpression.InterpolationEffect.Curve;
                sound.steps = 90;
                break;
            case InterpolationCurve.Logarithmic:
                sound.shape = soundExpression.InterpolationEffect.Logarithmic;
                sound.steps = 90;
                break;
        }

        switch (sound.fx) {
            case SoundExpressionEffect.Vibrato:
                sound.fxnSteps = 512;
                sound.fxParam = 2;
                break;
            case SoundExpressionEffect.Tremolo:
                sound.fxnSteps = 900;
                sound.fxParam = 3;
                break;
            case SoundExpressionEffect.Warble:
                sound.fxnSteps = 700;
                sound.fxParam = 2;
                break;
        }

        return sound.src;
    }

    /**
     * Get the sound expression string for a built-in a sound effect.
     * @param soundExpression a sound expression for a built-in sound effect
     */
    //% blockId=soundExpression_builtinSoundEffect
    //% block="$soundExpression"
    //% blockGap=8
    //% group="micro:bit (V2)"
    //% toolboxParent=soundExpression_playSoundEffect
    //% toolboxParentArgument=sound
    //% weight=98 help=music/builtin-sound-effect
    export function builtinSoundEffect(soundExpression: SoundExpression) {
        return soundExpression.getNotes();
    }
}