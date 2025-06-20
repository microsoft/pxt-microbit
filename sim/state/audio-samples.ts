namespace pxsim.samples {
    export interface SampleBoard extends EventBusBoard {
        samplesState: SamplesState;
    }

    class SampleChannel {
        sampleRate = 11000;
        protected playing: AudioContextManager.PlaySampleResult;

        constructor(public id: number) {

        }

        playSampleAsync(sample: RefBuffer) {
            if (this.playing) {
                this.playing.cancel();
            }
            this.playing = AudioContextManager.startSamplePlayback(sample, BufferMethods.NumberFormat.UInt8LE, 255, this.sampleRate, music.volume() / 0xff);
            this.playing.promise.then(() => {
                this.playing = undefined;
            });
        }
    }

    export class SamplesState {
        protected channels: SampleChannel[] = [];
        protected enabled: boolean = false;

        constructor() {
            this.channels = [
                new SampleChannel(0),
                new SampleChannel(1),
                new SampleChannel(2),
                new SampleChannel(3),
            ];
        }

        setEnabled(enabled: boolean): void {
            this.enabled = enabled;
        }

        setSampleRate(channelId: number, sampleRate: number): void {
            channelId |= 0;
            if (channelId < 0 || channelId >= this.channels.length) {
                return;
            }

            this.channels[channelId].sampleRate = sampleRate;
        }

        playSampleAsync(channelId: number, sample: RefBuffer): void {
            if (!this.enabled) {
                return;
            }
            channelId |= 0;
            if (channelId < 0 || channelId >= this.channels.length) {
                return;
            }

            this.channels[channelId].playSampleAsync(sample);
        }
    }

    export function enable(): void {
        board().samplesState.setEnabled(true);
    }

    export function disable(): void {
        board().samplesState.setEnabled(false);
    }

    export function setSampleRate(src: number, sampleRate: number): void {
        board().samplesState.setSampleRate(src, sampleRate);
    }

    export function playAsync(src: number, buf: RefBuffer): void {
        board().samplesState.playSampleAsync(src, buf);
    }
}