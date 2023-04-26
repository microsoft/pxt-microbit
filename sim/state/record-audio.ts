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

    export async function record(): Promise<void> {
        //request permission is asynchronous
        let b = board();
        if (!b.recordingState.currentlyRecording) {
            b.recordingState.currentlyRecording = true;
            runtime.queueDisplayUpdate();

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    stream = await navigator.mediaDevices.getUserMedia({video: false, audio:true});
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
        if (recording) {
            recording.play();
        }
    }

    export function stop(): void {

    }

    export function erase(): void {
        chunks = [];
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
        return recorder?.state == "recording";
    }

    export function audioIsStopped(): boolean {
        return recorder?.state == "inactive";
    }

    export function setSampleRate(rate: number): void {
    }

    export function getSampleRate(): number {
        return 0;
    }
}