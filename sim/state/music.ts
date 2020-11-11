namespace pxsim.music {
    export function setBuiltInSpeakerEnabled(enabled: boolean) {
        const b = board();
        if (!b) return;

        // TODO some redering about this
        b.ensureHardwareVersion(2);
        b.speakerEnabled = !!enabled;
    }
}
