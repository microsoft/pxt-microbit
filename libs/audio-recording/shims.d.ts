// Auto-generated. Do not edit.
declare namespace recordAudio {

    /**
     * Record an audio clip
     */
    //% promise shim=recordAudio::record
    function record(): void;

    /**
     * Play the audio clip that is saved in the buffer
     */
    //% shim=recordAudio::play
    function play(): void;

    /**
     * Stop recording
     */
    //% shim=recordAudio::stop
    function stop(): void;

    /**
     * Clear the buffer
     */
    //% shim=recordAudio::erase
    function erase(): void;

    /**
     * Set amplification of the microphone input
     */
    //% shim=recordAudio::setMicrophoneGain
    function setMicrophoneGain(gain: int32): void;

    /**
     * Get the how long the recorded audio clip is
     */
    //% shim=recordAudio::audioDuration
    function audioDuration(sampleRate: int32): int32;

    /**
     * Get whether the playback is active
     */
    //% shim=recordAudio::audioIsPlaying
    function audioIsPlaying(): boolean;

    /**
     * Get whether the microphone is listening
     */
    //% shim=recordAudio::audioIsRecording
    function audioIsRecording(): boolean;

    /**
     * Gets whether the board is recording or playing back
     */
    //% shim=recordAudio::audioIsStopped
    function audioIsStopped(): boolean;
}

// Auto-generated. Do not edit. Really.
