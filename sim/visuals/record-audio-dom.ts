/// <reference path="../core/record-audio.ts"/>

// Browser (MediaRecorder / getUserMedia) implementation of pxsim.record.RecorderHost.
namespace pxsim.record {
    class MediaRecorderSession implements RecordingSession {
        private chunks: Blob[] = [];

        constructor(private stream: MediaStream, private recorder: MediaRecorder) {
            recorder.ondataavailable = (e: BlobEvent) => {
                this.chunks.push(e.data);
            };
        }

        onStopped(handler: () => void) {
            this.recorder.onstop = handler;
        }

        start() {
            this.recorder.start();
        }

        stop() {
            this.recorder.stop();
            if (this.stream.active) {
                for (const track of this.stream.getAudioTracks()) {
                    track.stop();
                    track.enabled = false;
                }
            }
        }

        isRecording() {
            return this.recorder.state === "recording";
        }

        createURL() {
            if (!this.chunks[0] || this.chunks[0].size <= 0) return undefined;
            const recordingType = pxsim.isSafari() ? "audio/mp4" : "audio/ogg; codecs=opus";
            return window.URL.createObjectURL(new Blob(this.chunks, { type: recordingType }));
        }

        clearData() {
            this.chunks = [];
        }
    }

    setRecorderHost({
        isSupported: () => !!navigator.mediaDevices?.getUserMedia,
        startAsync: async (bitRate, onStopped) => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
            const recorder = new MediaRecorder(stream, { audioBitsPerSecond: bitRate });
            const session = new MediaRecorderSession(stream, recorder);
            session.onStopped(onStopped);
            session.start();
            return session;
        },
        revokeURL: url => window.URL.revokeObjectURL(url),
        maxPlaybackRate: () => isFirefox() ? 8 : 15,
        isPlaybackInterruption: e => e instanceof DOMException
    });
}
