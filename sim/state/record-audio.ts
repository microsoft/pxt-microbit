namespace pxsim  {
    export class RecordingState {
        currentlyRecording = false;
        stream: MediaStream;
        recorder: MediaRecorder;
        chunks: Blob[];
        audioURL: string;
        recording: HTMLAudioElement;
        audioPlaying: boolean = false;
        recordTimeoutID: any;
        currentlyErasing: boolean;

        handleAudioPlaying = () => {
            this.audioPlaying = true;
        };

        handleAudioStopped = () => {
            this.audioPlaying = false;
        };

        initListeners = () => {
            if (this.recording) {
                this.recording.addEventListener("play", this.handleAudioPlaying, false);
                this.recording.addEventListener("ended", this.handleAudioStopped, false);
            }
        }
    }
}
namespace pxsim.record {

    function stopRecorder(b: DalBoard): void {
        b.recordingState.recorder.stop();
        b.recordingState.currentlyRecording = false;
        runtime.queueDisplayUpdate();
        if (b.recordingState.stream.active) {
            b.recordingState.stream.getAudioTracks().forEach(track => {
                track.stop();
                track.enabled = false;
            });
        }
    }

    async function populateRecording(b: DalBoard) {
        if (b.recordingState.currentlyErasing) {
            await erasingAsync(b);
        }
        if (b.recordingState.chunks[0].size > 0) {
            b.recordingState.audioURL = null;
            const blob = new Blob(b.recordingState.chunks, { type: "audio/ogg; codecs=opus" });
            b.recordingState.audioURL = window.URL.createObjectURL(blob);
            b.recordingState.recording = new Audio(b.recordingState.audioURL);
            b.recordingState.initListeners();
        }
        b.recordingState.currentlyRecording = false;
        b.recordingState.recorder = null;
        b.recordingState.chunks = [];
    }

    export async function record(): Promise<void> {
        let b = board();

        if (b.recordingState.recorder) {
            b.recordingState.recorder.stop();
            clearTimeout(b.recordingState.recordTimeoutID);
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                b.recordingState.stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
                b.recordingState.recorder = new MediaRecorder(b.recordingState.stream);
                b.recordingState.recorder.start();
                b.recordingState.currentlyRecording = true;
                runtime.queueDisplayUpdate();

                b.recordingState.recordTimeoutID = setTimeout(() => {
                    stopRecorder(b);
                }, 5000)

                b.recordingState.recorder.ondataavailable = (e: BlobEvent) => {
                    b.recordingState.chunks.push(e.data);
                }

                b.recordingState.recorder.onstop = async () => {
                    await populateRecording(b);
                    registerSimStop(b);
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

    function stopAudio() {
        const b = board();
        if (!b) return;
        if (b.recordingState.currentlyRecording && b.recordingState.recordTimeoutID) {
            clearTimeout(b.recordingState.recordTimeoutID);
            if (b.recordingState.recorder) {
                stopRecorder(b);
            }
        } else if (b.recordingState.recording && b.recordingState.audioPlaying) {
            b.recordingState.handleAudioStopped();
            stopPlayback();
        }
    }

    function registerSimStop(b: DalBoard) {
        pxsim.AudioContextManager.onStopAll(() => {
            if (b.recordingState.recording) {
                stopAudio();
                b.recordingState.recording.removeEventListener("play", b.recordingState.handleAudioPlaying);
                b.recordingState.recording.removeEventListener("ended", b.recordingState.handleAudioStopped);
            }
        })
    }

    function createPlayPromise(b: DalBoard, recording: HTMLAudioElement): Promise<any> {
        return new Promise((resolve, reject) => {
            recording.play()
            .then((_data) => {
                resolve(null);
            })
            .catch((error) => {
                // we don't care if a DOMException happens,
                // just have the user try again
                if (error instanceof DOMException) {
                    resolve(null);
                } else {
                    reject();
                }
            })
        })
    }

    export function play(): void {
        const b = board();
        if (!b) return;
        stopAudio();
        b.recordingState.audioPlaying = true;
        setTimeout(async () => {
            if (!b.recordingState.currentlyErasing && b.recordingState.recording) {
                try {
                    await b.recordingState.recording.play();
                } catch (e) {
                    if (!(e instanceof DOMException)) {
                        throw e;
                    }
                }
            } else {
                b.recordingState.audioPlaying = false;
            }
        }, 10)
    }

    export function stop(): void {
        stopAudio();
    }

    function stopPlayback(): void {
        const b = board();
        if (!b) return;
        b.recordingState.recording.pause();
        b.recordingState.recording.currentTime = 0;
        b.recordingState.recording.removeEventListener("play", b.recordingState.handleAudioPlaying);
        b.recordingState.recording.removeEventListener("ended", b.recordingState.handleAudioStopped);
    }

    function erasingAsync(b: DalBoard): Promise<any> {
        return new Promise((resolve, reject) => {
            if (b.recordingState.recording && b.recordingState.audioPlaying) {
                stopPlayback();
            }
            if (b.recordingState.audioURL) {
                window.URL.revokeObjectURL(b.recordingState.audioURL);
                b.recordingState.recording = null;
            }
            b.recordingState.audioPlaying = false;
            resolve(null);
            b.recordingState.currentlyErasing = false;
        })
    }

    export function erase(): void {
        const b = board();
        if (!b) return;
        b.recordingState.chunks = [];
        b.recordingState.currentlyErasing = true;
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
        return b.recordingState.recorder ? b.recordingState.recorder.state === "recording" : false;
    }

    export function audioIsStopped(): boolean {
        const b = board();
        if (!b) return true;
        const isNotPlaying = !audioIsPlaying();
        const isNotRecording = !audioIsRecording();
        return b.recordingState.recording ? isNotPlaying && isNotRecording : false;
    }

    export function setInputSampleRate(sampleRate: number): void {

    }

    export function setOutputSampleRate(sampleRate: number): void {

    }

    export function setBothSamples(sampleRate: number): void {

    }
}