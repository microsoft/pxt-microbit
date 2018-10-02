namespace pxsim.control {
    export function sendMidiMessageAsync(data: RefBuffer, offset: number): Promise<void> {
        const b = board();
        return pxsim.AudioContextManager.sendMidiMessageAsync(data, offset);
    }
}