// move to common packages eventually
namespace pxsim.input {
    export function soundLevel(): number {
        const b = microphoneState();
        if (!b) return 0;
        b.setUsed();
        return b.getLevel();
    }

    export function onSound(sound: number /* SoundThreshold */, body: RefAction) {
        const b = microphoneState();
        if (!b) return;
        b.setUsed();
        pxtcore.registerWithDal(b.id, sound, body);
    }

    export function setSoundThreshold(sound: number, threshold: number){
        const b = microphoneState();
        if (!b) return;
        b.setUsed();
        if (sound === DAL.SENSOR_THRESHOLD_HIGH /* SoundThreshold.Loud */)
            b.setHighThreshold(threshold);
        else
            b.setLowThreshold(threshold);
    }

}