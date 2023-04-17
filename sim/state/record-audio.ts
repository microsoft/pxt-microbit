namespace pxsim  {
    export class RecordingState {
        currentlyRecording = false;
    }
}
namespace pxsim.record {

    class AudioRecording {
        stream: MediaStream;
    }
    
    function init() {
        
    }

    function initRecording() {
        navigator.mediaDevices.getUserMedia({video: false, audio:true});
    }

    export async function record(): Promise<void> {
        //request permission is asynchronous
        let b = board();
        if (!b.recordingState.currentlyRecording) {
            b.recordingState.currentlyRecording = true;
            runtime.queueDisplayUpdate();
            const context = new AudioContext();
            const stream = await navigator.mediaDevices.getUserMedia({video: false, audio:true});
            const source1 = context.createMediaStreamSource(stream);
            const recorder = new MediaRecorder(stream);
            recorder.start(1000);
            let chunks: Blob[] = [];

            recorder.onstop = (e: BlobEvent) => {
                const audio = document.createElement("audio");
                const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                chunks = []
                const audioURL = URL.createObjectURL(blob);
                audio.src = audioURL;
            }
            // recorder.stop();
            recorder.ondataavailable = (e: BlobEvent) => {
                chunks.push(e.data);
            }
            // source1.connect(context.destination);



            // const buffer = context.createBuffer(1, 22050, 44100);
            // const source = context.createBufferSource();
            // source.buffer = buffer;
            // source.connect(context.destination);
            // source1.start();
            // stream.getAudioTracks();

        }
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

    export function setSampleRate(rate: number): void {
    }

    export function getSampleRate(): number {
        return 0;
    }
}