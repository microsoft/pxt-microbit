namespace pxsim  {
    export class RecordingState {
        currentlyRecording = false;
        stream: MediaStream;
        recorder: MediaRecorder;
        chunks: Blob[];

        audioURL: string;
        // The inputBitRate when the current audioUrl was recorded
        audioURLBitRate: number;

        recording: HTMLAudioElement;
        audioPlaying: boolean = false;
        recordTimeoutID: any;
        currentlyErasing: boolean;

        inputBitRate = record.defaultBitRate();
        outputBitRate = record.defaultBitRate();

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
    // Arbitrarily chosen lower bound. Can't go much lower than this without bugs cropping up
    const MIN_BIT_RATE = 3000;
    // This is double the default in chrome (128000)
    const MAX_BIT_RATE = 256000;

    const MAX_SAMPLE_RATE = 22000;
    const MIN_SAMPLE_RATE = 1000;

    const MIN_RECORDING_TIME = 3000;
    const MAX_RECORDING_TIME = 20000;

    let _initialized = false;
    function init() {
        if (!_initialized) {
            registerSimStop();
            _initialized = true;
        }
    }

    function stopRecorder(b: DalBoard): void {
        const state = b.recordingState;
        state.recorder.stop();
        state.currentlyRecording = false;
        runtime.queueDisplayUpdate();
        if (state.stream.active) {
            for (const track of state.stream.getAudioTracks()) {
                track.stop();
                track.enabled = false;
            }
        }
    }

    async function populateRecording(b: DalBoard) {
        const state = b.recordingState;

        if (state.currentlyErasing) {
            await erasingAsync(b);
        }
        if (state.chunks[0].size > 0) {
            state.audioURL = null;
            const recordingType = pxsim.isSafari() ? "audio/mp4" : "audio/ogg; codecs=opus";
            const blob = new Blob(state.chunks, { type: recordingType });
            state.audioURL = window.URL.createObjectURL(blob);
            state.recording = new Audio(state.audioURL);
            state.initListeners();
        }
        state.currentlyRecording = false;
        state.recorder = null;
        state.chunks = [];
    }

    export async function record(): Promise<void> {
        let b = board();
        init();

        const state = b.recordingState;

        if (state.recorder) {
            state.recorder.stop();
            clearTimeout(state.recordTimeoutID);
        }

        if (navigator.mediaDevices?.getUserMedia) {
            try {
                state.stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
                state.recorder = new MediaRecorder(state.stream, { audioBitsPerSecond: state.inputBitRate });
                state.recorder.start();
                state.currentlyRecording = true;
                runtime.queueDisplayUpdate();
                const recordBitRate = state.inputBitRate;

                const duration = (1 - ((recordBitRate - MIN_BIT_RATE) / (MAX_BIT_RATE - MIN_BIT_RATE))) * (MAX_RECORDING_TIME - MIN_RECORDING_TIME) + MIN_RECORDING_TIME;

                state.recordTimeoutID = setTimeout(() => {
                    stopRecorder(b);
                }, duration)

                state.recorder.ondataavailable = (e: BlobEvent) => {
                    state.chunks.push(e.data);
                }

                state.recorder.onstop = async () => {
                    await populateRecording(b);
                    state.audioURLBitRate = recordBitRate;
                }

            } catch (error) {
                console.log("An error occurred, could not get microphone access");
                if (state.recorder) {
                    state.recorder.stop();
                }
                state.currentlyRecording = false;
            }

        } else {
            console.log("getUserMedia not supported on your browser!");
            state.currentlyRecording = false;
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

    function registerSimStop() {
        pxsim.AudioContextManager.onStopAll(() => {
            const b = board();
            if (b && b.recordingState && b.recordingState.recording) {
                stopAudio();
                b.recordingState.recording.removeEventListener("play", b.recordingState.handleAudioPlaying);
                b.recordingState.recording.removeEventListener("ended", b.recordingState.handleAudioStopped);
            }
        });
    }

    export function play(): void {
        const b = board();
        if (!b) return;
        init();

        stopAudio();

        const state = b.recordingState;

        state.audioPlaying = true;
        setTimeout(async () => {
            if (!state.currentlyErasing && state.recording) {
                try {
                    const volume = AudioContextManager.isMuted() ? 0 : 1;
                    state.recording.volume = volume;

                    const minPlaybackRate = 0.15

                    // 15 is the maximum playback rate that still produced sound in Chrome on Windows.
                    // In Firefox, it seems like 8 is the max. Higher numbers silently fail.
                    let maxPlaybackRate = 15;
                    if (isFirefox()) {
                        maxPlaybackRate = 8;
                    }

                    const playbackRate = Math.max(minPlaybackRate,
                        Math.min(
                            maxPlaybackRate,
                            bitRateToSampleRate(state.outputBitRate) / bitRateToSampleRate(state.audioURLBitRate)
                        )
                    );

                    state.recording.playbackRate = playbackRate;
                    state.recording.preservesPitch = false;
                    await state.recording.play();
                }
                catch (e) {
                    if (!(e instanceof DOMException)) {
                        throw e;
                    }
                }
            }
            else {
                state.audioPlaying = false;
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
        const b = board();
        if (!b) return;

        b.recordingState.inputBitRate = sampleRateToBitRate(sampleRate);
    }

    export function setOutputSampleRate(sampleRate: number): void {
        const b = board();
        if (!b) return;

        b.recordingState.outputBitRate = sampleRateToBitRate(sampleRate);
    }

    export function setBothSamples(sampleRate: number): void {
        setInputSampleRate(sampleRate);
        setOutputSampleRate(sampleRate);
    }

    /**
     * The browser API doesn't allow us to control sample rate directly, but we
     * can affect it by setting the bit rate. This maps the supported sample rates
     * into a reasonable range of bit rates.
     */
    function sampleRateToBitRate(sampleRate: number) {
        return mapRange(sampleRate, MIN_SAMPLE_RATE, MAX_SAMPLE_RATE, MIN_BIT_RATE, MAX_BIT_RATE);
    }

    function bitRateToSampleRate(bitRate: number) {
        return mapRange(bitRate, MIN_BIT_RATE, MAX_BIT_RATE, MIN_SAMPLE_RATE, MAX_SAMPLE_RATE);
    }

    function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
        value = Math.min(Math.max(inMin, value), inMax);

        return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
    }

    export function defaultBitRate() {
        return sampleRateToBitRate(11000);
    }
}