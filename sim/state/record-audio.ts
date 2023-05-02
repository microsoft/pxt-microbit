namespace pxsim  {
    export class RecordingState {
        currentlyRecording = false;
        stream: MediaStream;
        recorder: MediaRecorder;
        chunks: Blob[];
        audioURL: string;
        recording: HTMLAudioElement;
        audioPlaying: boolean = false;

        initListeners = () => {
            if (this.recording) {
                this.recording.addEventListener("playing", () => {
                    this.audioPlaying = true;
                }, { once: true });

                this.recording.addEventListener("ended", () => {
                    this.audioPlaying = false;
                }, { once: true });
            }
        }
    }
}
namespace pxsim.record {
    export async function record(): Promise<void> {
        //request permission is asynchronous
        let b = board();

        if (b.recordingState.recorder) {
            b.recordingState.recorder.stop();
        }

        if (b.recordingState.recording && b.recordingState.audioPlaying) {
            restartPlayback();
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
                    b.recordingState.currentlyRecording = false;
                    runtime.queueDisplayUpdate();
                }, 4000)

                b.recordingState.recorder.ondataavailable = (e: BlobEvent) => {
                    b.recordingState.chunks.push(e.data);
                }

                b.recordingState.recorder.onstop = () => {
                    const blob = new Blob(b.recordingState.chunks, { type: "audio/ogg; codecs=opus" });
                    b.recordingState.audioURL = window.URL.createObjectURL(blob);
                    b.recordingState.recording = new Audio(b.recordingState.audioURL);
                    b.recordingState.initListeners();
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
    }

    function restartPlayback() {
        const b = board();
        if (!b) return;
        if (b.recordingState.recording && b.recordingState.audioPlaying) {
            b.recordingState.recording.currentTime = 0;
            b.recordingState.recording.pause();
            b.recordingState.audioPlaying = false;
        }
    }

    export function play(): void {
        const b = board();
        if (!b) return;
        restartPlayback();
        if (b.recordingState.recording) {
            b.recordingState.audioPlaying = true;
            b.recordingState.recording.play();
        }
    }

    export function stop(): void {
        restartPlayback();
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
        const isNotRecording = !b.recordingState.currentlyRecording;
        return b.recordingState.recording ? isNotPlaying && isNotRecording : false;
    }

    export function setInputSampleRate(sampleRate: number): void {

    }

    export function setOutputSampleRate(sampleRate: number): void {

    }

    export function setBothSamples(sampleRate: number): void {

    }
}