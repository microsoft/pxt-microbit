namespace pxsim.control {
    export function __midiSend(data: RefBuffer) {
        const b = board();
        pxsim.AudioContextManager.sendMidiMessage(data);
    }
}