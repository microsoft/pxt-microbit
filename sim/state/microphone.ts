// move to common packages eventually
namespace pxsim.input {
    export function onSound(sound: number, body: RefAction) {
        let b = microphoneState();
        if (!b) return;
        b.setUsed();
        pxtcore.registerWithDal(b.id, sound, body);
    }

    export function setSoundThreshold(sound: number, threshold: number){
        let b = microphoneState();
        if (!b) return;
        b.setUsed();
        if (sound === 0 /* SoundThreshold.Loud */)
            b.setHighThreshold(threshold);
        else
            b.setLowThreshold(threshold);
    }

}