namespace pxsim {
    export function sendBufferAsm(buffer: RefBuffer, pin: DigitalPin) {
        let b = board();
        if (b) {
            let np = b.neopixelState;
            if (np) {
                let buf = buffer.data;
                np.updateBuffer(buf as any, pin); // TODO this is wrong
                runtime.queueDisplayUpdate();
            }
        }
    }
}
