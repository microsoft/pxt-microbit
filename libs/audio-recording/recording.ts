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

    export enum AudioGain {
        Low = 1,
        Medium,
        High
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
    let _recordingFreqHz = 22000
    let _playbackFreqHz = 22000
    let _micGain: AudioGain = AudioGain.Medium

    // Track if we have a simulator tick timer to use...
    let _isSetup: boolean = false
    let _memoryFill: number = 0
    let _playbackHead: number = 0

    function _init(): void {
        if (_isSetup)
            return
        _isSetup = true

        _moduleMode = AudioRecordingMode.Stopped
        _recordingFreqHz = 22000
        _playbackFreqHz = 22000
        _micGain = AudioGain.Medium
        music._onStopSound(stopRecording);


        control.runInParallel(() => {
            while (true) {

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
                basic.pause(INTERVAL_STEP)
            }
        })
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
    //% weight=70
    export function startRecording(): void {
        _init()
        eraseRecording();
        record();
        _setMode(AudioRecordingMode.Recording)
    }



    /**
     * Play recorded audio
     */
    //% block="play recording"
    //% weight=60
    export function playAudio(): void {
        _init()
        _playbackHead = 0
        if (!isEmpty()) {
            _setMode(AudioRecordingMode.Playing)
            play();
        }
        return
    }

    export function stopRecording(): void {
        _init()
        _setMode(AudioRecordingMode.Stopped)
        _playbackHead = 0
        stop();
        return
    }

    export function eraseRecording(): void {
        _init()
        _setMode(AudioRecordingMode.Stopped)
        _playbackHead = 0
        _memoryFill = 0
        erase();
        return
    }

    /**
     * Do something based on what the audio is doing
     */
    //% block="on audio $eventType"
    //% weight=10
    export function audioEvent(eventType: AudioEvent, handler: () => void): void {
        _init()
        control.onEvent(AUDIO_EVENT_ID, AUDIO_VALUE_OFFSET + eventType, handler)
    }

    /**
     * Test what the audio is doing
     */
    //% block="audio is $status"
    export function audioStatus(status: AudioStatus): boolean {
        _init();
        switch (status) {
            case AudioStatus.Playing:
                return _moduleMode === AudioRecordingMode.Playing;
            case AudioStatus.Recording:
                return _moduleMode === AudioRecordingMode.Recording;
            case AudioStatus.Stopped:
                return _moduleMode === AudioRecordingMode.Stopped;
            case AudioStatus.BufferFull:
                return _memoryFill > 0;
        }
    }

    export function isEmpty(): boolean {
        _init()
        return _memoryFill <= 0
    }

    /**
     * Change how sensitive the microphone is. This changes the recording quality!
     */
    //% block="set microphone sensitivity to $gain"
    //% gain.defl=Medium
    //% weight=40
    export function setMicGain(gain: AudioGain): void {
        _init()
        _micGain = gain
        setMicrophoneGain(gain);
        return
    }
}