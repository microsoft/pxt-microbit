namespace pxsim.music {
    //%
    export function __playSoundExpression(notes: string, waitTillDone: boolean): void {
        const cb = getResume();
        const b = board();
        // v2 only...
        b.ensureHardwareVersion(2);

        let buf;
        switch (notes) {
            case "giggle":
            case "happy":
            case "hello":
            case "mysterious":
            case "sad":
            case "slide":
            case "soaring":
            case "spring":
            case "twinkle":
            case "yawn":
                // TODO wav file
                break;
        }

        // do we have any sound to play
        if (buf) {
            const p = AudioContextManager.playBufferAsync(buf)
            if (waitTillDone) {
                p.then(() => cb());
            }
        }

        // all done
        cb();
    }
}