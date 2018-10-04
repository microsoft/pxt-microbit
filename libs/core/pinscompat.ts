//% noRefCounting fixedInstances
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

interface DigitalInOutPin {
    digitalRead(): boolean;

    digitalWrite(value: boolean): void;

    onPulsed(pulse: PulseValue, body: () => void): void;

    onEvent(event: PinEvent, body: () => void): void;

    pulseIn(value: PulseValue, maxDuration?: number): number;

    setPull(pull: PinPullMode): void;
}

interface AnalogInPin extends DigitalInOutPin {
    analogRead(): number;
}

interface AnalogOutPin extends DigitalInOutPin {
    analogWrite(value: number): void;
}

interface AnalogInOutPin extends AnalogInPin, AnalogOutPin {
}

interface PwmOnlyPin extends DigitalInOutPin, AnalogOutPin {
    //% parts=microservo trackArgs=0
    analogSetPeriod(period: number): void;

    //% parts=microservo trackArgs=0
    servoWrite(value: number): void;

    //% parts=microservo trackArgs=0
    servoSetPulse(duration: number): void;
}

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
}
