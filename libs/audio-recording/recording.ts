/*
    The MIT License (MIT)

    Copyright (c) 2022 Lancaster University

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
    THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
*/

/**
 * Functions to operate the v2 on-board microphone and speaker.
 */
//% weight=5 color=#015f85 icon="\uf130" block="Record" advanced=false
namespace record {
    // 

    export enum AudioEvent {
        //% block="starts playing"
        StartedPlaying,
        //% block="stops playing"
        StoppedPlaying,
        //% block="starts recording"
        StartedRecording,
        //% block="stops recording"
        StoppedRecording
    }

    export enum AudioLevels {
        //% block="low"
        Low = 1,
        //% block="medium"
        Medium,
        //% block="high"
        High
    }

    export enum AudioSampleRateScope {
        //% block="everything"
        Everything,
        //% block="playback"
        Playback,
        //% block="recording"
        Recording
    }

    export enum AudioRecordingMode {
        //% block="stopped"
        Stopped,
        //% block="recording"
        Recording,
        //% block="playing"
        Playing
    }

    export enum AudioStatus {
        //% block="playing"
        Playing,
        //% block="recording"
        Recording,
        //% block="stopped"
        Stopped,
        //% block="full"
        BufferFull,
    }

    let _recordingPresent: boolean = false;

    /**
     * Record an audio clip for a maximum of 3 seconds
     */
    //% block="record audio clip"
    //% blockId="record_startRecording"
    //% weight=70
    //% parts="microphone"
    export function startRecording(): void {
        music._onStopSound(stopPlayback);
        eraseRecording();
        record();
        _recordingPresent = true;
    }

    /**
     * Play recorded audio
     */
    //% block="play audio clip"
    //% blockId="record_playAudio"
    //% weight=60
    //% shim=record::play
    //% parts="microphone"
    export function playAudio(): void {
    }

    function stopPlayback(): void {
        if (audioIsPlaying()) {
            stop();
        }
    }

    //% shim=record::stop
    export function stopRecording(): void {
    }

    export function eraseRecording(): void {
        _recordingPresent = false;
        erase();
        return
    }

    /**
     * Test what the audio is doing
     */
    //% block="audio is $status"
    //% blockId="record_audioStatus"
    //% parts="microphone"
    export function audioStatus(status: AudioStatus): boolean {
        switch (status) {
            case AudioStatus.Playing:
                return audioIsPlaying();
            case AudioStatus.Recording:
                return audioIsRecording();
            case AudioStatus.Stopped:
                return audioIsStopped();
            case AudioStatus.BufferFull:
                return _recordingPresent;
        }
    }

    /**
     * Change how sensitive the microphone is. This changes the recording quality!
     */
    //% block="set microphone sensitivity to $gain"
    //% blockId="record_setMicGain"
    //% parts="microphone"
    //% weight=30
    export function setMicGain(gain: AudioLevels): void {
        setMicrophoneGain(gain);
        return
    }

    /**
     * Set the sample frequency for recording, playback, or both (default)
     * 
     * @param hz The sample frequency, in Hz
     */
    //% block="set sample rate to $hz || for $scope"
    //% blockId="record_setSampleRate"
    //% hz.min=1000 hz.max=22000 hz.defl=11000
    //% expandableArgumentMode="enabled"
    //% parts="microphone"
    //% weight=40
    export function setSampleRate(hz: number, scope?: AudioSampleRateScope): void {
        switch (scope) {
            case AudioSampleRateScope.Playback:
                setOutputSampleRate(hz);
                break;

            case AudioSampleRateScope.Recording:
                setInputSampleRate(hz);
                break;
            case AudioSampleRateScope.Everything:
            default:
                setBothSamples(hz);
                break;
        }
    }
}