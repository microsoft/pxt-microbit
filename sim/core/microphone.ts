// move to common packages eventually
namespace pxsim.input {
    export function soundLevel(): number {
        const b = microphoneState();
        if (!b) return 0;
        b.setUsed();
        b.pingSoundLevel();
        return b.getLevel();
    }

    export function onSound(sound: number /* SoundThreshold */, body: RefAction) {
        const b = microphoneState();
        if (!b) return;
        b.setUsed();
        b.onSoundRegistered = true;
        pxtcore.registerWithDal(b.id, sound, body);
    }

    export function setSoundThreshold(sound: number, threshold: number){
        const b = microphoneState();
        if (!b) return;
        if (sound === 2 /* SoundThreshold.Loud */)
            b.setHighThreshold(threshold);
        else
            b.setLowThreshold(threshold);
    }

}