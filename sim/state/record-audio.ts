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

        if (b.recordingState.recorder) {
            b.recordingState.recorder.stop();
        }

        if (b.recordingState.audioPlaying) {
            b.recordingState.recording.pause();
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                b.recordingState.stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
                b.recordingState.recorder = new MediaRecorder(b.recordingState.stream);
                b.recordingState.recorder.start();
                b.recordingState.currentlyRecording = true;
                runtime.queueDisplayUpdate();

                setTimeout(() => {
                    b.recordingState.recorder.stop();
                }, 4000)

                b.recordingState.recorder.ondataavailable = (e: BlobEvent) => {
                    b.recordingState.chunks.push(e.data);
                }

                b.recordingState.recorder.onstop = () => {
                    const blob = new Blob(b.recordingState.chunks, { type: "audio/ogg; codecs=opus" });
                    b.recordingState.audioURL = window.URL.createObjectURL(blob);
                    b.recordingState.recording = new Audio(b.recordingState.audioURL);
                    b.recordingState.currentlyRecording = false;
                    b.recordingState.recorder = null;
                    b.recordingState.chunks = [];
                }
            } catch (error) {
                console.log("An error occurred, could not get microphone access");
                if (b.recordingState.recorder) {
                    b.recordingState.recorder.stop();
                }
                b.recordingState.currentlyRecording = false;
            }

        } else {
            console.log("getUserMedia not supported on your browser!");
            b.recordingState.currentlyRecording = false;
        }
        runtime.queueDisplayUpdate();
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
        b.recordingState.recording = null;
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
        const isNotPlaying = !b.recordingState.audioPlaying;
        const isNotRecording = b.recordingState.recorder ? b.recordingState.recorder.state == "inactive" : true;
        return b.recordingState.recording ? isNotPlaying && isNotRecording : false;
    }

    export function setInputSampleRate(sampleRate: number): void {

    }

    export function setOutputSampleRate(sampleRate: number): void {

    }

    export function setBothSamples(sampleRate: number): void {

    }
}