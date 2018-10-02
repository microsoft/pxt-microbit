namespace pxsim.control {
    export function sendMidiMessage(data: RefBuffer, offset: number) {
        const b = board();
        pxsim.AudioContextManager.sendMidiMessageAsync(data, offset)
            .done();
    }
}