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
    function setMicrophoneGain(gain: number): void;

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

    /**
     * Change the sample rate of the splitter channel (audio input)
     */
    //% shim=record::setInputSampleRate
    function setInputSampleRate(sampleRate: int32): void;

    /**
     * Change the sample rate of the mixer channel (audio output)
     */
    //% shim=record::setOutputSampleRate
    function setOutputSampleRate(sampleRate: int32): void;

    /**
     * Set the sample rate for both input and output
     */
    //% shim=record::setBothSamples
    function setBothSamples(sampleRate: int32): void;
}

// Auto-generated. Do not edit. Really.
