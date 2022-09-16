namespace pxsim.input {
    export function onPinPressed(pinId: number, handler: RefAction) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.isTouched();
        runtime.queueDisplayUpdate();
        pxtcore.registerWithDal(pin.id, DAL.MICROBIT_BUTTON_EVT_CLICK, handler);
    }

    export function onPinReleased(pinId: number, handler: RefAction) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.isTouched();
        runtime.queueDisplayUpdate();
        pxtcore.registerWithDal(pin.id, DAL.MICROBIT_BUTTON_EVT_UP, handler);
    }

    export function pinIsPressed(pinId: number): boolean {
        let pin = getPin(pinId);
        if (!pin) return false;
        return pin.isTouched();
    }
}

namespace pxsim {
    export function getPin(id: number) {
        return board().edgeConnectorState.getPin(id);
    }
}

namespace pxsim.pins {
    export let edgeConnectorSoundDisabled = false;

    export function digitalReadPin(pinId: number): number {
        let pin = getPin(pinId);
        if (!pin) return -1;
        pin.mode = PinFlags.Digital | PinFlags.Input;
        return pin.value > 100 ? 1 : 0;
    }

    export function digitalWritePin(pinId: number, value: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.mode = PinFlags.Digital | PinFlags.Output;
        pin.value = value > 0 ? 1023 : 0;
        runtime.queueDisplayUpdate();
    }

    export function setPull(pinId: number, pull: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.setPull(pull);
    }

    export function analogReadPin(pinId: number): number {
        let pin = getPin(pinId);
        if (!pin) return -1;
        pin.mode = PinFlags.Analog | PinFlags.Input;
        return pin.value || 0;
    }

    export function analogWritePin(pinId: number, value: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.mode = PinFlags.Analog | PinFlags.Output;
        pin.value = value | 0;
        runtime.queueDisplayUpdate();
    }

    export function analogSetPeriod(pinId: number, micros: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.mode = PinFlags.Analog | PinFlags.Output;
        pin.period = micros;
        runtime.queueDisplayUpdate();
    }

    export function servoWritePin(pinId: number, value: number) {
        let pin = getPin(pinId);
        if (!pin) return;

        analogSetPeriod(pinId, 20000);
        pin.servoAngle = value;
    }

    export function servoSetContinuous(pinId: number, value: boolean) {
        let pin = getPin(pinId);
        if (!pin) return;

        pin.servoSetContinuous(value);
    }

    export function servoSetPulse(pinId: number, micros: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        // TODO
    }

    export function analogSetPitchPin(pinId: number) {
        const b = board();
        if (!b) return;
        let pin = getPin(pinId);
        if (!pin) return;
        const ec = b.edgeConnectorState
        ec.pins.filter(p => !!p).forEach(p => p.pitch = false);
        pin.pitch = true;
    }

    export function setSoundOutputPinEnabled(enabled: boolean) {
        const b = board();
        if (!b) return;
        const ec = b.edgeConnectorState
        ec.pitchEnabled = !enabled;
    }

    export function analogSetPitchVolume(volume: number) {
        const ec = board().edgeConnectorState;
        ec.pitchVolume = Math.max(0, Math.min(0xff, volume | 0));
        AudioContextManager.setCurrentToneGain((ec.pitchVolume / 0xff) / 10);
    }

    export function analogPitchVolume() {
        const ec = board().edgeConnectorState;
        return ec.pitchVolume;
    }

    export function analogPitch(frequency: number, ms: number) {
        // update analog output
        const b = board();
        if (!b || isNaN(frequency) || isNaN(ms)) return;
        const ec = b.edgeConnectorState;
        const pins = ec.pins;
        const pin = ec.pitchEnabled && (pins.filter(pin => !!pin && pin.pitch)[0] || pins[0]);
        const pitchVolume = ec.pitchVolume | 0;
        if (pin && !edgeConnectorSoundDisabled) {
            pin.mode = PinFlags.Analog | PinFlags.Output;
            if (frequency <= 0 || pitchVolume <= 0) {
                pin.value = 0;
                pin.period = 0;
            } else {
                const v = 1 << (pitchVolume >> 5);
                pin.value = v;
                pin.period = 1000000 / frequency;
            }
            runtime.queueDisplayUpdate();
        }

        let cb = getResume();
        if (pin) {
            const v = pitchVolume / 0xff;
            AudioContextManager.tone(frequency, v / 10);
        }
        if (ms <= 0) cb();
        else {
            setTimeout(() => {
                AudioContextManager.stop();
                if (pin && !edgeConnectorSoundDisabled) {
                    pin.value = 0;
                    pin.period = 0;
                    pin.mode = PinFlags.Unused;
                }
                runtime.queueDisplayUpdate();
                cb()
            }, ms);
        }
    }

    export function pushButton(pinId: number) {
        const b = board();
        if (!b) return;
        const ec = b.edgeConnectorState;
        // TODO support buttons here
    }
}
namespace pxsim.music {
    export function setVolume(volume: number): void {
        pxsim.pins.analogSetPitchVolume(volume);
    }
    export function volume(): number {
        return pxsim.pins.analogPitchVolume();
    }
}

namespace pxsim.pins {
    export function setAudioPin(pinId: number) {
        pxsim.pins.analogSetPitchPin(pinId);
    }

    const disabledSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <clipPath id="bounds" clipPathUnits="userSpaceOnUse">
        <circle cx="50" cy="50" r="45" />
        </clipPath>
        <circle cx="50" cy="50" r="40" stroke-width="10" stroke="red" fill="none" clip-path="url(#bounds)" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="red" stroke-width="10" clip-path="url(#bounds)" />
    </svg>
    `

    export function setAudioPinEnabled(enabled: boolean) {
        edgeConnectorSoundDisabled = !enabled;

        const headphone = board().viewHost.getView().querySelector("g.sim-headphone-cmp");

        if (headphone) {
            const existing = headphone.querySelector("#headphone-disabled");

            if (existing) {
                if (enabled) {
                    existing.remove();
                }
                else {
                    return;
                }
            }

            if (!enabled) {
                const img = document.createElementNS("http://www.w3.org/2000/svg", "image") as SVGImageElement;
                img.setAttribute("href", "data:image/svg+xml;utf8," + encodeURIComponent(disabledSVG))
                img.setAttribute("id", "headphone-disabled");
                img.style.transform = "scale(1.5) translate(-10px, -10px)";
                headphone.appendChild(img)
            }
        }
    }
}