namespace pxsim.control {
    export function __midiSend(data: RefBuffer) {
        const b = board();
        audiohost.audio().sendMidiMessage(data);
    }
}