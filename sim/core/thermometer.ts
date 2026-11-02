namespace pxsim {
    export class ThermometerState {
        usesTemperature = false;
        temperature = 21;

    }
}

namespace pxsim.input {
    export function temperature(): number {
        let b = board();
        if (!b.thermometerState.usesTemperature) {
            b.thermometerState.usesTemperature = true;
            runtime.queueDisplayUpdate();
        }
        return b.thermometerState.temperature;
    }
}