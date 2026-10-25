namespace pxsim  {
    export class RecordingState {
        currentlyRecording = false;
        session: record.RecordingSession;

        audioURL: string;
        // The inputBitRate when the current audioUrl was recorded
        audioURLBitRate: number;
        audioClippingThreshold: number = 0.08;

        recording: audiohost.AudioElementHandle;
        audioPlaying: boolean = false;
        recordTimeoutID: host.TimerHandle;
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
    /** An in-progress or finished capture, owned by the host (browser MediaRecorder, etc.). */
    export interface RecordingSession {
        stop(): void;
        isRecording(): boolean;
        /** Returns a playable URL for the captured data, or undefined if nothing was captured. */
        createURL(): string | undefined;
        /** Drops any captured data. */
        clearData(): void;
    }

    export interface RecorderHost {
        isSupported(): boolean;
        /** Starts capturing and resolves to the new session; onStopped is called with that session once it has stopped and its data is complete. */
        startAsync(bitRate: number, onStopped: (session: RecordingSession) => void): Promise<RecordingSession>;
        revokeURL(url: string): void;
        maxPlaybackRate(): number;
        /** True for expected playback interruptions that should not surface as errors. */
        isPlaybackInterruption(error: unknown): boolean;
    }

    /** Default RecorderHost.maxPlaybackRate: the highest playback rate at which recorded audio still produces sound. */
    export const DEFAULT_MAX_PLAYBACK_RATE = 15;

    const unsupportedHost: RecorderHost = {
        isSupported: () => false,
        startAsync: () => Promise.reject(new Error("recording is not supported")),
        revokeURL: () => { },
        maxPlaybackRate: () => DEFAULT_MAX_PLAYBACK_RATE,
        isPlaybackInterruption: () => false
    };

    let recorderHost: RecorderHost = unsupportedHost;

    export function setRecorderHost(host: RecorderHost) {
        recorderHost = host;
    }

    // Arbitrarily chosen lower bound. Can't go much lower than this without bugs cropping up
    const MIN_BIT_RATE = 3000;
    // This is double the default in chrome (128000)
    const MAX_BIT_RATE = 256000;

    const MAX_SAMPLE_RATE = 22000;
    const MIN_SAMPLE_RATE = 1000;

    const MIN_RECORDING_TIME = 2000;
    const MAX_RECORDING_TIME = 10000;

    let _initialized = false;
    function init() {
        if (!_initialized) {
            registerSimStop();
            _initialized = true;
        }
    }

    function stopRecorder(b: DalBoardState): void {
        const state = b.recordingState;
        state.session.stop();
        state.currentlyRecording = false;
        runtime.queueDisplayUpdate();
    }

    async function populateRecording(b: DalBoardState, session: RecordingSession, bitRate: number) {
        const state = b.recordingState;

        if (state.currentlyErasing) {
            await erasingAsync(b);
        }
        const url = session.createURL();
        if (url) {
            state.audioURL = url;
            state.audioURLBitRate = bitRate;
        }
        if (state.session === session) {
            state.currentlyRecording = false;
            state.session = null;
        }
        session.clearData();
    }

    export async function record(): Promise<void> {
        let b = board();
        init();

        const state = b.recordingState;

        if (state.session) {
            state.session.stop();
            host.timers().clearTimeout(state.recordTimeoutID);
        }

        if (recorderHost.isSupported()) {
            try {
                const recordBitRate = state.inputBitRate;
                state.session = await recorderHost.startAsync(recordBitRate, stopped => {
                    populateRecording(b, stopped, recordBitRate).catch(() => {
                        pxsim.error("An error occurred while saving the recording");
                    });
                });
                state.currentlyRecording = true;
                runtime.queueDisplayUpdate();

                const duration = (1 - ((recordBitRate - MIN_BIT_RATE) / (MAX_BIT_RATE - MIN_BIT_RATE))) * (MAX_RECORDING_TIME - MIN_RECORDING_TIME) + MIN_RECORDING_TIME;

                state.recordTimeoutID = host.timers().setTimeout(() => {
                    stopRecorder(b);
                }, duration)
            } catch (error) {
                pxsim.error("An error occurred, could not get microphone access");
                state.currentlyRecording = false;
            }

        } else {
            pxsim.warn("Audio recording is not supported here");
            state.currentlyRecording = false;
        }
    }

    function stopAudio() {
        const b = board();
        if (!b) return;
        if (b.recordingState.currentlyRecording && b.recordingState.recordTimeoutID) {
            host.timers().clearTimeout(b.recordingState.recordTimeoutID);
            if (b.recordingState.session) {
                stopRecorder(b);
            }
        } else if (b.recordingState.recording && b.recordingState.audioPlaying) {
            b.recordingState.handleAudioStopped();
            stopPlayback();
        }
    }

    function registerSimStop() {
        audiohost.audio().onStopAll(() => {
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
        const volume = audiohost.audio().isMuted() ? 0 : Math.round((music.volume() / 0xff) * 100) / 100;
        state.recording = audiohost.audio().createAudioElement(state.audioURL, state.audioClippingThreshold, volume);
        state.initListeners();

        state.audioPlaying = true;
        host.timers().setTimeout(async () => {
            if (!state.currentlyErasing && state.recording) {
                try {

                    const minPlaybackRate = 0.15

                    const maxPlaybackRate = recorderHost.maxPlaybackRate();

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
                    if (!recorderHost.isPlaybackInterruption(e)) {
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

    function erasingAsync(b: DalBoardState): Promise<any> {
        return new Promise((resolve, reject) => {
            if (b.recordingState.recording && b.recordingState.audioPlaying) {
                stopPlayback();
            }
            if (b.recordingState.audioURL) {
                recorderHost.revokeURL(b.recordingState.audioURL);
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
        if (b.recordingState.session) b.recordingState.session.clearData();
        b.recordingState.currentlyErasing = true;
    }

    export function setMicrophoneGain(gain: number): void {
        const b = board();
        if (!b) return;
        const tolerance = 0.1 * Number.EPSILON;
        if (gain - 0.079 < tolerance) { // low mic sensitivity
            b.recordingState.audioClippingThreshold = 0.08;
        } else if (gain - 0.2 < tolerance) { // mid mic sensitivity
            b.recordingState.audioClippingThreshold = 0.03;
        } else if (gain - 1.0 < tolerance) { // high mic sensitivity
            b.recordingState.audioClippingThreshold = 0.01;
        }
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
        return b.recordingState.session ? b.recordingState.session.isRecording() : false;
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