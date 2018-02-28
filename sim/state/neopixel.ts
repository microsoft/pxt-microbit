namespace pxsim {
    export function ws2812SendBufferAsm(buffer: RefBuffer, pin: DigitalPin) {
        sendBufferAsm(buffer, pin);
    }

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
