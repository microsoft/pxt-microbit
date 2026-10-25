namespace pxsim.control {
    export function __midiSend(data: RefBuffer) {
        audiohost.audio().sendMidiMessage(data);
    }
}