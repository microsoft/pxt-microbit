const enum PinEvent {
    //% block="pulse high"
    PulseHigh = DAL.MICROBIT_PIN_EVT_PULSE_HI,  // DEVICE_PIN_EVT_PULSE_HI
    //% block="pulse low"
    PulseLow = DAL.MICROBIT_PIN_EVT_PULSE_LO,  // DEVICE_PIN_EVT_PULSE_LO
    //% block="rise"
    Rise = DAL.MICROBIT_PIN_EVT_RISE,  // DEVICE_PIN_EVT_RISE
    //% block="fall"
    Fall = DAL.MICROBIT_PIN_EVT_FALL,  // DEVICE_PIN_EVT_FALL
}

//% noRefCounting fixedInstances
interface DigitalInOutPin {
    digitalRead(): boolean;

    digitalWrite(value: boolean): void;

    onPulsed(pulse: PulseValue, body: () => void): void;

    onEvent(event: PinEvent, body: () => void): void;

    pulseIn(value: PulseValue, maxDuration?: number): number;

    setPull(pull: PinPullMode): void;
}

//% noRefCounting fixedInstances
interface AnalogInPin extends DigitalInOutPin {
    analogRead(): number;
}

//% noRefCounting fixedInstances
interface AnalogOutPin extends DigitalInOutPin {
    analogWrite(value: number): void;
}

//% noRefCounting fixedInstances
interface AnalogInOutPin extends AnalogInPin, AnalogOutPin {
}

//% noRefCounting fixedInstances
interface PwmOnlyPin extends DigitalInOutPin, AnalogOutPin {
    //% parts=microservo trackArgs=0
    analogSetPeriod(period: number): void;

    //% parts=microservo trackArgs=0
    servoWrite(value: number): void;

    //% parts=microservo trackArgs=0
    servoSetPulse(duration: number): void;
}

//% noRefCounting fixedInstances
interface PwmPin extends PwmOnlyPin, DigitalInOutPin, AnalogInPin {
}

//% noRefCounting fixedInstances
class MicrobitPin implements AnalogInPin, AnalogOutPin, AnalogInOutPin, PwmOnlyPin {
    public id: number;
    constructor(id: number) {
        this.id = id;
    }

    protected digitalId(): DigitalPin {
        return <DigitalPin>this.id;
    }

    protected analogId(): AnalogPin {
        return <AnalogPin>this.id;
    }

    digitalRead(): boolean {
        return pins.digitalReadPin(this.digitalId()) != 0;
    }

    digitalWrite(value: boolean): void {
        pins.digitalWritePin(this.digitalId(), value ? 1 : 0);
    }

    onPulsed(pulse: PulseValue, body: () => void): void {
        pins.onPulsed(this.digitalId(), pulse, body);
    }

    onEvent(event: PinEvent, body: () => void): void {
        // TODO
    }

    pulseIn(value: PulseValue, maxDuration?: number): number {
        return pins.pulseIn(this.digitalId(), value, maxDuration);
    }

    setPull(pull: PinPullMode): void {
        pins.setPull(this.digitalId(), pull);
    }

    analogRead(): number {
        return pins.analogReadPin(this.analogId());
    }

    analogWrite(value: number): void {
        pins.analogWritePin(this.analogId(), value);
    }

    analogSetPeriod(period: number): void {
        pins.analogSetPeriod(this.analogId(), period);
    }

    servoWrite(value: number): void {
        pins.servoWritePin(this.analogId(), value);
    }

    servoSetPulse(duration: number): void {
        pins.servoSetPulse(this.analogId(), duration);
    }
}

namespace pins {
    /**
     * Pin P0
     */
    //% fixedInstance whenUsed
    export const P0: PwmPin = new MicrobitPin(DigitalPin.P0);

    /**
     * Pin P1
     */
    //% fixedInstance whenUsed
    export const P1: PwmPin = new MicrobitPin(DigitalPin.P1);

    /**
     * Pin P2
     */
    //% fixedInstance whenUsed
    export const P2: PwmPin = new MicrobitPin(DigitalPin.P2);

    /**
     * Pin P3
     */
    //% fixedInstance whenUsed
    export const P3: AnalogInPin = new MicrobitPin(DigitalPin.P3);

    /**
     * Pin P4
     */
    //% fixedInstance whenUsed
    export const P4: AnalogInPin = new MicrobitPin(DigitalPin.P4);

    /**
     * Pin P5
     */
    //% fixedInstance whenUsed
    export const P5: DigitalInOutPin = new MicrobitPin(DigitalPin.P5);

    /**
     * Pin P6
     */
    //% fixedInstance whenUsed
    export const P6: DigitalInOutPin = new MicrobitPin(DigitalPin.P6);

    /**
     * Pin P7
     */
    //% fixedInstance whenUsed
    export const P7: DigitalInOutPin = new MicrobitPin(DigitalPin.P7);

    /**
     * Pin P8
     */
    //% fixedInstance whenUsed
    export const P8: DigitalInOutPin = new MicrobitPin(DigitalPin.P8);

    /**
     * Pin P9
     */
    //% fixedInstance whenUsed
    export const P9: DigitalInOutPin = new MicrobitPin(DigitalPin.P9);

    /**
     * Pin P10
     */
    //% fixedInstance whenUsed
    export const P10: AnalogInPin = new MicrobitPin(DigitalPin.P10);

    /**
     * Pin P3
     */
    //% fixedInstance whenUsed
    export const P11: DigitalInOutPin = new MicrobitPin(DigitalPin.P11);

    /**
     * Pin P12
     */
    //% fixedInstance whenUsed
    export const P12: DigitalInOutPin = new MicrobitPin(DigitalPin.P12);

    /**
     * Pin P13
     */
    //% fixedInstance whenUsed
    export const P13: DigitalInOutPin = new MicrobitPin(DigitalPin.P13);

    /**
     * Pin P14
     */
    //% fixedInstance whenUsed
    export const P14: DigitalInOutPin = new MicrobitPin(DigitalPin.P14);

    /**
     * Pin P15
     */
    //% fixedInstance whenUsed
    export const P15: DigitalInOutPin = new MicrobitPin(DigitalPin.P15);

    /**
     * Pin P16
     */
    //% fixedInstance whenUsed
    export const P16: DigitalInOutPin = new MicrobitPin(DigitalPin.P16);

    /**
     * Pin P19
     */
    //% fixedInstance whenUsed
    export const P19: DigitalInOutPin = new MicrobitPin(DigitalPin.P19);

    /**
     * Pin P19
     */
    //% fixedInstance whenUsed
    export const P20: DigitalInOutPin = new MicrobitPin(DigitalPin.P20);
}
