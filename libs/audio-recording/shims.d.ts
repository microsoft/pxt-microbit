// Auto-generated. Do not edit.
declare namespace record {

    /**
     * Record an audio clip
     */
    //% promise shim=record::record
    function record(): void;

    /**
     * Play the audio clip that is saved in the buffer
     */
    //% shim=record::play
    function play(): void;

    /**
     * Stop recording
     */
    //% shim=record::stop
    function stop(): void;

    /**
     * Clear the buffer
     */
    //% shim=record::erase
    function erase(): void;

    /**
     * Set sensitity of the microphone input
     */
    //% shim=record::setMicrophoneGain
    function setMicrophoneGain(gain: int32): void;

    /**
     * Get how long the recorded audio clip is
     */
    //% shim=record::audioDuration
    function audioDuration(sampleRate: int32): int32;

    /**
     * Get whether the playback is active
     */
    //% shim=record::audioIsPlaying
    function audioIsPlaying(): boolean;

    /**
     * Get whether the microphone is listening
     */
    //% shim=record::audioIsRecording
    function audioIsRecording(): boolean;

    /**
     * Get whether the board is recording or playing back
     */
    //% shim=record::audioIsStopped
    function audioIsStopped(): boolean;
}

// Auto-generated. Do not edit. Really.
