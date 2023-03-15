namespace pxsim.record {

    export async function record(): Promise<void> {
        //request permission is asynchronous
        board()
    }

    export function play(): void {

    }

    export function stop(): void {

    }

    export function erase(): void {

    }

    export function setMicrophoneGain(gain: number): void {

    }

    export function audioDuration(sampleRate: number): number {
        return 0;
    }

    export function audioIsPlaying(): boolean {
        return false;
    }


    export function audioIsRecording(): boolean {
        return false;
    }

    export function audioIsStopped(): boolean {
        return false;
    }
}