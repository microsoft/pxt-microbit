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

enum AudioEvent {
    //% block="Starts Playing"
    StartedPlaying,
    //% block="Stops Playing"
    StoppedPlaying,
    //% block="Starts Recording"
    StartedRecording,
    //% block="Stops Recording"
    StoppedRecording
}

enum AudioSampleRateScope {
    Everything,
    Playback,
    Recording
}

enum AudioGainEnum {
    Low,
    Medium,
    High
}

enum AudioRecordingMode {
    Stopped,
    Recording,
    Playing
}

/**
 * Functions to operate the v2 on-board microphone and speaker.
 */
//% weight=5 color=#e26fb4 icon="\uf130" block="V2 Audio" advanced=false
namespace codalAudio {

    // 
    const AUDIO_EVENT_ID: number     = 0xFF000
    const AUDIO_VALUE_OFFSET: number = 0x10

    // Expressed in samples, as we can have varying recording and playback rates!
    const MAX_SAMPLES: number = 55000
    const INTERVAL_STEP: number = 100

    // Shim state
    let _moduleMode: AudioRecordingMode = AudioRecordingMode.Stopped
    let _recordingFreqHz: number = 22000
    let _playbackFreqHz: number  = 22000
    let _micGain: AudioGainEnum  = AudioGainEnum.Medium

    // Track if we have a simulator tick timer to use...
    let _isSetup: boolean   = false
    let _memoryFill: number = 0
    let _playbackHead: number = 0

    function __init__(): void {
        if( _isSetup )
            return
        _isSetup = true

        _moduleMode = AudioRecordingMode.Stopped
        _recordingFreqHz = 22000
        _playbackFreqHz = 22000
        _micGain = AudioGainEnum.Medium


        control.runInBackground( () => {
            while (true) {

                switch (_moduleMode) {
                    case AudioRecordingMode.Playing:
                        if (_playbackHead >= _memoryFill) {
                            _playbackHead = 0
                            __setMode__(AudioRecordingMode.Stopped)
                        }
                        else {
                            _playbackHead += _playbackFreqHz / (1000 / INTERVAL_STEP)
                        }
                        break
                    
                    case AudioRecordingMode.Recording:
                        if (_memoryFill >= MAX_SAMPLES) {
                            console.log("reached or exceeded max samples");
                            console.log(_memoryFill);
                            _memoryFill = MAX_SAMPLES
                            __setMode__(AudioRecordingMode.Stopped)
                        }
                        else {
                            console.log("actively filling the buffer");
                            console.log(_memoryFill);
                            _memoryFill += _recordingFreqHz / (1000 / INTERVAL_STEP)
                        }
                        break
                    case AudioRecordingMode.Stopped:
                        if (_memoryFill > 0) {
                            stopShim();
                        }
                }

                //console.log(`Memory fill: ${_memoryFill}/${MAX_SAMPLES}, Playback: ${_playbackHead}/${_memoryFill} mode = ${_moduleMode}`)
                basic.pause( INTERVAL_STEP )
            }
            console.warn( "pxt-codal-audio: Impossible code state! Emergency reset of internal timing loop!" )
            _isSetup = false
        })
    }

    function __emitEvent__( type: AudioEvent ): void {
        control.raiseEvent(AUDIO_EVENT_ID, AUDIO_VALUE_OFFSET+type, EventCreationMode.CreateAndFire )
    }

    function __setMode__( mode: AudioRecordingMode ): void {
        switch( mode ) {
            case AudioRecordingMode.Stopped:
                if( _moduleMode == AudioRecordingMode.Recording ) {
                    _moduleMode = AudioRecordingMode.Stopped
                    return __emitEvent__( AudioEvent.StoppedRecording )
                }
                
                if( _moduleMode == AudioRecordingMode.Playing ) {
                    _moduleMode = AudioRecordingMode.Stopped
                    return __emitEvent__( AudioEvent.StoppedPlaying )
                }

                _moduleMode = AudioRecordingMode.Stopped
                return
            
            case AudioRecordingMode.Playing:
                if( _moduleMode !== AudioRecordingMode.Stopped ) {
                    __setMode__( AudioRecordingMode.Stopped )
                }
                
                _moduleMode = AudioRecordingMode.Playing
                return __emitEvent__( AudioEvent.StartedPlaying )
            
            case AudioRecordingMode.Recording:
                if (_moduleMode !== AudioRecordingMode.Stopped) {
                    __setMode__(AudioRecordingMode.Stopped)
                }

                _moduleMode = AudioRecordingMode.Recording
                return __emitEvent__( AudioEvent.StartedRecording )
        }
    }

    /**
     * Record an audio clip
     * 
     * @param sync If true, block until we run out of memory!
     */
    //% block="start recording"
    export function startRecording(): void {
        __init__()
        console.log("before the audio is erased");
        console.log(_memoryFill);
        eraseRecording();
        console.log("after the audio is erased");
        console.log(_memoryFill);
        recordAudioTS();
        __setMode__( AudioRecordingMode.Recording )
    }

    //% shim=codalAudio::record
    function recordAudioTS(): void {
    }

    /**
     * Set the sample frequency for recording, playback, or both (default)
     * 
     * @param hz The sample frequency, in Hz
     */
    //% block="set sample frequency to %hz Hz || for %scope"
    //% expandableArgumentMode="enabled"
    //% hz.defl=22000
    export function setSampleRate(hz: number, scope?: AudioSampleRateScope): void {
        __init__()
        switch (scope) {
            case AudioSampleRateScope.Everything:
                _recordingFreqHz = hz
                _playbackFreqHz = hz
                break

            case AudioSampleRateScope.Playback:
                _playbackFreqHz = hz
                break

            case AudioSampleRateScope.Recording:
                _recordingFreqHz = hz
                break
        }
    }

    /**
     * Set the microphone gain. High values can cause distortion!
     * 
     * @param gain The gain to use.
     */
    //% block="set microphone gain to %gain"
    //% gain.defl=Medium
    //% shim=codalAudio::setMicrophoneGain
    export function setMicrophoneGainAudio(gain: AudioGainEnum): void {
        __init__()
        _micGain = gain
        return
    }

    /**
     * Play any recorded audio
     * 
     * @param sync If true, block until complete
     */
    //% block="​start playback"
    export function playAudio(): void {
        __init__()
        _playbackHead = 0
        if( !isEmpty() ) {
            __setMode__(AudioRecordingMode.Playing)
            playShim();
        }
        return
    }

    //% shim=codalAudio::play
    function playShim(): void {
    }

    //% block="stop"
    export function stopAudio(): void {
        __init__()
        __setMode__(AudioRecordingMode.Stopped)
        _playbackHead = 0
        stopShim();
        return
    }

    //% shim=codalAudio::stop
    function stopShim(): void {
    }

    //% block="erase recording"
    export function eraseRecording(): void {
        __init__()
        __setMode__(AudioRecordingMode.Stopped)
        _playbackHead = 0
        _memoryFill = 0
        eraseShim();
        return
    }

    //% shim=codalAudio::erase
    function eraseShim(): void {
    }

    //% block="microphone gain"
    export function micGain(): AudioGainEnum {
        return _micGain
    }

    //% block="recording frequency"
    export function recordingHz(): number {
        __init__()
        return _recordingFreqHz
    }

    //% block="playback frequency"
    export function playbackHz(): number {
        __init__()
        return _playbackFreqHz
    }

    //% block="audio duration at %hz hz"
    //% shim=codalAudio::audioDiration
    export function audioDurationAudio(hz?: number): number {
        __init__()
        return _memoryFill / hz
    }

    //% block="audio is playing"
    //% shim=codalAudio::audioIsPlaying
    export function audioIsPlayingAudio(): boolean {
        __init__()
        return _moduleMode === AudioRecordingMode.Playing
    }

    //% block="audio is recording"
    //% shim=codalAudio::audioIsRecording
    export function audioIsRecordingAudio(): boolean {
        __init__()
        return _moduleMode === AudioRecordingMode.Recording
    }

    //% block="audio is stopped"
    //% shim=codalAudio::audioIsStopped
    export function audioIsStoppedAudio(): boolean {
        __init__()
        return _moduleMode === AudioRecordingMode.Stopped
    }

    //% block="audio buffer is full"
    export function isFull(): boolean {
        __init__()
        return _memoryFill >= MAX_SAMPLES
    }

    //% block="audio buffer is empty"
    export function isEmpty(): boolean {
        __init__()
        return _memoryFill <= 0
    }

    //% block="when audio %eventType"
    export function audioEvent(eventType: AudioEvent, handler: () => void): void {
        __init__()
        control.onEvent(AUDIO_EVENT_ID, AUDIO_VALUE_OFFSET+eventType, handler )
    }


}