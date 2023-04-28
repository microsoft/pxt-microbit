namespace pxsim  {
    export class RecordingState {
        currentlyRecording = false;
    }
}
namespace pxsim.record {
    let stream: MediaStream;
    let recorder: MediaRecorder;
    let chunks: Blob[];
    let audioURL: string;
    let recording: HTMLAudioElement;
    let audioPlaying: boolean = false;

    export async function record(): Promise<void> {
        //request permission is asynchronous
        let b = board();
        b.recordingState.currentlyRecording = true;
        runtime.queueDisplayUpdate();

        if (recorder) {
            recorder.stop();
        }

        if (audioPlaying) {
            recording.pause();
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
                recorder = new MediaRecorder(stream);
                recorder.start();

                setTimeout(() => {
                    recorder.stop();
                    runtime.queueDisplayUpdate();
                }, 4000)

                recorder.ondataavailable = (e: BlobEvent) => {
                    chunks.push(e.data);
                }

                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                    audioURL = window.URL.createObjectURL(blob);
                    recording = new Audio(audioURL);
                    b.recordingState.currentlyRecording = false;
                    recorder = null;
                    chunks = [];
                }
            } catch (error) {
                console.log("An error occurred, could not get microphone access");
                if (recorder) {
                    recorder.stop();
                }
                b.recordingState.currentlyRecording = false;
            }

        } else {
            console.log("getUserMedia not supported on your browser!");
            b.recordingState.currentlyRecording = false;
        }
    }

    export function play(): void {
        if (recording) {
            recording.play();
        }
    }

    export function stop(): void {

    }

    export function erase(): void {
        chunks = [];
        recording = null;
    }

    export function setMicrophoneGain(gain: number): void {

    }

    export function audioDuration(sampleRate: number): number {
        return 0;
    }

    export function audioIsPlaying(): boolean {
        if (recording) {
            recording.addEventListener("playing", () => {
                audioPlaying = true;
            }, { once: true });

            recording.addEventListener("ended", () => {
                audioPlaying = false;
            }, { once: true });
        }
        return audioPlaying;
    }

    export function audioIsRecording(): boolean {
        return recorder ? recorder.state == "recording" : false;
    }

    export function audioIsStopped(): boolean {
        return recorder ? !audioPlaying && recorder.state == "inactive" : true;
    }

    export function setInputSampleRate(sampleRate: number): void {

    }

    export function setOutputSampleRate(sampleRate: number): void {

    }

    export function setBothSamples(sampleRate: number): void {

    }
}