namespace pxsim  {
    export class RecordingState {
        currentlyRecording = false;
        stream: MediaStream;
        recorder: MediaRecorder;
        chunks: Blob[];
        audioURL: string;
        recording: HTMLAudioElement;
        audioPlaying: boolean = false;
    }
}
namespace pxsim.record {
    export async function record(): Promise<void> {
        //request permission is asynchronous
        let b = board();
        let recordingState = b.recordingState;
        if (!b.recordingState.currentlyRecording) {
            b.recordingState.currentlyRecording = true;
            runtime.queueDisplayUpdate();

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    recordingState.stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
                    recordingState.recorder = new MediaRecorder(recordingState.stream);
                    recordingState.recorder.start();

                    setTimeout(() => {
                        recordingState.recorder.stop();
                        runtime.queueDisplayUpdate();
                    }, 4000)

                    recordingState.recorder.ondataavailable = (e: BlobEvent) => {
                        recordingState.chunks.push(e.data);
                    }

                    recordingState.recorder.onstop = () => {
                        const blob = new Blob(recordingState.chunks, { type: "audio/ogg; codecs=opus" });
                        recordingState.audioURL = window.URL.createObjectURL(blob);
                        recordingState.recording = new Audio(recordingState.audioURL);
                        b.recordingState.currentlyRecording = false;
                        erase();
                    }
                } catch (error) {
                    console.log("An error occurred, could not get microphone access");
                }

            } else {
                console.log("getUserMedia not supported on your browser!");
            }
        }
    }

    export function play(): void {
        const b = board();
        if (!b) return;
        if (b.recordingState.recording) {
            b.recordingState.recording.play();
        }
    }

    export function stop(): void {

    }

    export function erase(): void {
        const b = board();
        if (!b) return;
        b.recordingState.chunks = [];
    }

    export function setMicrophoneGain(gain: number): void {

    }

    export function audioDuration(sampleRate: number): number {
        return 0;
    }

    export function audioIsPlaying(): boolean {
        const b = board();
        if (!b) return false;
        if (b.recordingState.recording) {
            b.recordingState.recording.addEventListener("playing", () => {
                b.recordingState.audioPlaying = true;
            }, { once: true });

            b.recordingState.recording.addEventListener("ended", () => {
                b.recordingState.audioPlaying = false;
            }, { once: true });
        }
        return b.recordingState.audioPlaying;
    }

    export function audioIsRecording(): boolean {
        const b = board();
        if (!b) return false;
        return b.recordingState.recorder ? b.recordingState.recorder.state == "recording" : false;
    }

    export function audioIsStopped(): boolean {
        const b = board();
        if (!b) return true;
        return b.recordingState.recorder ? !b.recordingState.audioPlaying && b.recordingState.recorder.state == "inactive" : true;
    }

    export function setInputSampleRate(sampleRate: number): void {

    }

    export function setOutputSampleRate(sampleRate: number): void {

    }

    export function setBothSamples(sampleRate: number): void {

    }
}