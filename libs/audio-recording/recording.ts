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
    const AUDIO_EVENT_ID = 0xFF000
    const AUDIO_VALUE_OFFSET = 0x10

    // Expressed in samples, as we can have varying recording and playback rates!
    const MAX_SAMPLES = 55000
    const INTERVAL_STEP = 100

    // Shim state
    let _moduleMode: AudioRecordingMode = AudioRecordingMode.Stopped
    let _recordingFreqHz = 11000
    let _playbackFreqHz = 11000
    let _micGain: AudioLevels = AudioLevels.Low

    // Track if we have a simulator tick timer to use...
    let _isSetup: boolean = false
    let _memoryFill: number = 0
    let _playbackHead: number = 0

    function _init(): void {
        if (_isSetup)
            return
        _isSetup = true
        _micGain = AudioLevels.Low
        music._onStopSound(stopRecording);

        switch (_moduleMode) {
            case AudioRecordingMode.Playing:
                if (_playbackHead >= _memoryFill) {
                    _playbackHead = 0
                    _setMode(AudioRecordingMode.Stopped)
                }
                else {
                    _playbackHead += _playbackFreqHz / (1000 / INTERVAL_STEP)
                }
                break

            case AudioRecordingMode.Recording:
                // this should be handled in the cpp
                if (_memoryFill >= MAX_SAMPLES) {
                    _memoryFill = MAX_SAMPLES
                    _setMode(AudioRecordingMode.Stopped)
                }
                else {
                    _memoryFill += _recordingFreqHz / (1000 / INTERVAL_STEP)
                }
                break
            case AudioRecordingMode.Stopped:
                if (_memoryFill > 0) {
                    stop();
                }
        }
        basic.pause(INTERVAL_STEP);
    }

    function emitEvent(type: AudioEvent): void {
        control.raiseEvent(AUDIO_EVENT_ID, AUDIO_VALUE_OFFSET + type, EventCreationMode.CreateAndFire)
    }

    function _setMode(mode: AudioRecordingMode): void {
        switch (mode) {
            case AudioRecordingMode.Stopped:
                if (_moduleMode == AudioRecordingMode.Recording) {
                    _moduleMode = AudioRecordingMode.Stopped
                    return emitEvent(AudioEvent.StoppedRecording)
                }

                if (_moduleMode == AudioRecordingMode.Playing) {
                    _moduleMode = AudioRecordingMode.Stopped
                    return emitEvent(AudioEvent.StoppedPlaying)
                }

                _moduleMode = AudioRecordingMode.Stopped
                return

            case AudioRecordingMode.Playing:
                if (_moduleMode !== AudioRecordingMode.Stopped) {
                    _setMode(AudioRecordingMode.Stopped)
                }

                _moduleMode = AudioRecordingMode.Playing
                return emitEvent(AudioEvent.StartedPlaying)

            case AudioRecordingMode.Recording:
                if (_moduleMode !== AudioRecordingMode.Stopped) {
                    _setMode(AudioRecordingMode.Stopped)
                }

                _moduleMode = AudioRecordingMode.Recording
                return emitEvent(AudioEvent.StartedRecording)
        }
    }

    /**
     * Record an audio clip for a maximum of 3 seconds
     */
    //% block="record audio clip"
    //% blockId="record_startRecording"
    //% weight=70
    //% parts="microphone"
    export function startRecording(): void {
        // _init()
        eraseRecording();
        _setMode(AudioRecordingMode.Recording)
        record();
        _memoryFill = 1;
    }



    /**
     * Play recorded audio
     */
    //% block="play audio clip"
    //% blockId="record_playAudio"
    //% weight=60
    //% parts="microphone"
    export function playAudio(): void {
        // _init()
        _playbackHead = 0
        _setMode(AudioRecordingMode.Playing)
        play();
        return
    }

    export function stopRecording(): void {
        // _init()
        _setMode(AudioRecordingMode.Stopped)
        _playbackHead = 0
        stop();
        return
    }

    export function eraseRecording(): void {
        // _init()
        _setMode(AudioRecordingMode.Stopped)
        _playbackHead = 0
        _memoryFill = 0
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
        // _init();
        switch (status) {
            case AudioStatus.Playing:
                return audioIsPlaying();
            case AudioStatus.Recording:
                return audioIsRecording();
            case AudioStatus.Stopped:
                return audioIsStopped();
            case AudioStatus.BufferFull:
                return _memoryFill > 0;
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
        // _init()
        _micGain = gain
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
        // _init()
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