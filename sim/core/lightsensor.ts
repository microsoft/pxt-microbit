namespace pxsim.input {
    export function lightLevel(): number {
        let b = board().lightSensorState;
        if (!b.usesLightLevel) {
            b.usesLightLevel = true;
            runtime.queueDisplayUpdate();
        }
        return b.lightLevel;
    }
}