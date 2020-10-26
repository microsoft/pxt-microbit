namespace pxsim.music {
    export function __playSoundExpression(notes: string, waitTillDone: boolean) {
        const b = board();
        if (!b) return;

        // v2 only...
        b.ensureHardwareVersion(2);

        // TODO simulator support        
    }
}