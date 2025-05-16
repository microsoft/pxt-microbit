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

#include "pxt.h"
#include "MicroBit.h"

#if MICROBIT_CODAL
#include "StreamRecording.h"
#endif

using namespace pxt;

namespace record {

#if MICROBIT_CODAL
static StreamRecording *recording = NULL;
static SplitterChannel *splitterChannel = NULL;
static MixerChannel *channel = NULL;
#endif


void checkEnv() {
#if MICROBIT_CODAL
    if (recording == NULL) {
        int defaultSampleRate = 11000;
        MicroBitAudio::requestActivation();

        splitterChannel = uBit.audio.splitter->createChannel();
        splitterChannel->requestSampleRate( defaultSampleRate );

        recording = new StreamRecording(*splitterChannel);

        channel = uBit.audio.mixer.addChannel(*recording, defaultSampleRate);

        channel->setVolume(75.0);
        uBit.audio.mixer.setVolume(1000);
        uBit.audio.setSpeakerEnabled(true);
    }
#endif
}

/**
 * Record an audio clip
 */
//% promise
void record() {
#if MICROBIT_CODAL
    checkEnv();
    recording->recordAsync();
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}

/**
 * Play the audio clip that is saved in the buffer
 */
//%
void play() {
#if MICROBIT_CODAL
    checkEnv();
    recording->playAsync();
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}

/**
 * Stop recording
 */
//%
void stop() {
#if MICROBIT_CODAL
    checkEnv();
    recording->stop();
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}

/**
 * Clear the buffer
 */
//%
void erase() {
#if MICROBIT_CODAL
    checkEnv();
    recording->erase();
#endif
}

/**
 * Set sensitity of the microphone input
 */
//%
void setMicrophoneGain(float gain) {
#if MICROBIT_CODAL
    uBit.audio.processor->setGain(gain);
#endif
}

/**
 * Get how long the recorded audio clip is
 */
//%
int audioDuration(int sampleRate) {
#if MICROBIT_CODAL
    return recording->duration(sampleRate);
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
    return MICROBIT_NOT_SUPPORTED;
#endif
}

/**
 * Get whether the playback is active
 */
//%
bool audioIsPlaying() {
#if MICROBIT_CODAL
    return recording->isPlaying();
#else
    return false;
#endif
}

/**
 * Get whether the microphone is listening
 */
//%
bool audioIsRecording() {
#if MICROBIT_CODAL
    return recording->isRecording();
#else
    return false;
#endif
}

/**
 * Get whether the board is recording or playing back
 */
//%
bool audioIsStopped() {
#if MICROBIT_CODAL
    return recording->isStopped();
#else
    return false;
#endif
}

/**
 * Change the sample rate of the splitter channel (audio input)
 */
//%
void setInputSampleRate(int sampleRate) {
#if MICROBIT_CODAL
    checkEnv();
    splitterChannel->requestSampleRate(sampleRate);
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}


/**
 * Change the sample rate of the mixer channel (audio output)
 */
//%
void setOutputSampleRate(int sampleRate) {
#if MICROBIT_CODAL
    checkEnv();
    channel->setSampleRate(sampleRate);
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}

/**
 * Set the sample rate for both input and output
*/
//%
void setBothSamples(int sampleRate) {
#if MICROBIT_CODAL
    setOutputSampleRate(sampleRate);
    splitterChannel->requestSampleRate(sampleRate);
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}

} // namespace record