// Auto-generated. Do not edit.
declare namespace codalAudio {

    /**
     * Record an audio clip
     */
    //% shim=codalAudio::record
    function record(): void;

    /**
     * Play the audio clip that is saved in the buffer
     */
    //% shim=codalAudio::play
    function play(): void;

    /**
     * Stop recording
     */
    //% shim=codalAudio::stop
    function stop(): void;

    /**
     * Clear the buffer
     */
    //% shim=codalAudio::erase
    function erase(): void;

    /**
     * Set amplification of the microphone input
     */
    //% shim=codalAudio::setMicrophoneGain
    function setMicrophoneGain(gain: int32): void;

    /**
     * Get the how long the recorded audio clip is
     */
    //% shim=codalAudio::audioDuration
    function audioDuration(sampleRate: int32): int32;

    /**
     * Get whether the playback is active
     */
    //% shim=codalAudio::audioIsPlaying
    function audioIsPlaying(): boolean;

    /**
     * Get whether the microphone is listening
     */
    //% shim=codalAudio::audioIsRecording
    function audioIsRecording(): boolean;

    /**
     * Gets whether the board is recording or playing back
     */
    //% shim=codalAudio::audioIsStopped
    function audioIsStopped(): boolean;
}

// Auto-generated. Do not edit. Really.
