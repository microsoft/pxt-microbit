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
#include "StreamRecording.h"

using namespace pxt;

namespace record {

static StreamRecording *recording = NULL;
static SplitterChannel *splitterChannel = NULL;
static MixerChannel *channel = NULL;

void checkEnv(int sampleRate = -1) {
    if (recording == NULL) {
        if (sampleRate == -1)
            sampleRate = 11000;
        MicroBitAudio::requestActivation();

        splitterChannel = uBit.audio.splitter->createChannel();

        recording = new StreamRecording(*splitterChannel);

        channel = uBit.audio.mixer.addChannel(*recording, sampleRate);

        channel->setVolume(75.0);
        uBit.audio.mixer.setVolume(1000);
        uBit.audio.setSpeakerEnabled(true);
    }
}

/**
 * Record an audio clip
 */
//% promise
void record() {
    checkEnv();
    recording->recordAsync();
}

/**
 * Play the audio clip that is saved in the buffer
 */
//%
void play() {
    checkEnv();
    recording->playAsync();
}

/**
 * Stop recording
 */
//%
void stop() {
    checkEnv();
    recording->stop();
}

/**
 * Clear the buffer
 */
//%
void erase() {
    checkEnv();
    recording->erase();
}

/**
 * Set sensitity of the microphone input
 */
//%
void setMicrophoneGain(float gain) {
    uBit.audio.processor->setGain(gain);
}

/**
 * Get how long the recorded audio clip is
 */
//%
int audioDuration(int sampleRate) {
    return recording->duration(sampleRate);
}

/**
 * Get whether the playback is active
 */
//%
bool audioIsPlaying() {
    return recording->isPlaying();
}

/**
 * Get whether the microphone is listening
 */
//%
bool audioIsRecording() {
    return recording->isRecording();
}

/**
 * Get whether the board is recording or playing back
 */
//%
bool audioIsStopped() {
    return recording->isStopped();
}

/**
 * Change the sample rate of the splitter channel (audio input)
 */
//%
void setInputSampleRate(int sampleRate) {
    checkEnv();
    splitterChannel->requestSampleRate(sampleRate);
}


/**
 * Change the sample rate of the mixer channel (audio output)
 */
//%
void setOutputSampleRate(int sampleRate) {
    if (recording == NULL) {
        checkEnv(sampleRate);
    } else {
        channel->setSampleRate(sampleRate);
    }
}

/**
 * Set the sample rate for both input and output
*/
//%
void setBothSamples(int sampleRate) {
    setOutputSampleRate(sampleRate);
    splitterChannel->requestSampleRate(sampleRate);
}

} // namespace record