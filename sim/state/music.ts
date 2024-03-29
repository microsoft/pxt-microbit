namespace pxsim.music {
    export function setBuiltInSpeakerEnabled(enabled: boolean) {
        const b = board();
        if (!b) return;

        // TODO some rendering about this
        b.ensureHardwareVersion(2);
        b.speakerEnabled = !!enabled;
    }

    export function setSilenceLevel(level: number) { 
        // ignore in v1,v2
    }

    export function isSoundPlaying(): boolean {
        const audioActive = pxsim.AudioContextManager.isAudioElementActive();
        const soundExpressionPlaying = pxsim.codal.music.isSoundExpPlaying();
        return audioActive || soundExpressionPlaying || pxsim.record.audioIsPlaying();
    }
}
