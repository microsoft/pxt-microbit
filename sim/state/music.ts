namespace pxsim.music {
    export function setOnBoardSpeakerEnabled(enabled: boolean) {
        const b = board();
        if (!b) return;

        // TODO some redering about this
        b.ensureHardwareVersion(2);
        b.speakerEnabled = !!enabled;
    }
}
