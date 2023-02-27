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

namespace codalAudio {

    static StreamRecording * recording = NULL;

    void enableMic() {
        uBit.audio.activateMic();
        uBit.audio.mic->enable();
    }

    void disableMic() {
        uBit.audio.mic->disable();
        uBit.audio.deactivateMic();
    }

    void checkEnv() {
        if( recording == NULL ) {
            MicroBitAudio::requestActivation();
            
            recording = new StreamRecording( *uBit.audio.splitter );

            MixerChannel * channel = uBit.audio.mixer.addChannel( *recording, 22000 );

            // By connecting to the mic channel, we activate it automatically, so shut it down again.
            disableMic();

            channel->setVolume( 100.0 );
            uBit.audio.mixer.setVolume( 1000 );
            uBit.audio.setSpeakerEnabled( true );
        }
    }

    //%
    void record() {
        checkEnv();
        enableMic();
        recording->record();
    }

    //%
    void play() {
        checkEnv();
        disableMic();
        recording->play();
    }

    //%
    void stop() {
        checkEnv();
        disableMic();
        recording->stop();
    }

    //%
    void erase() {
        checkEnv();
        disableMic();
        recording->erase();
    }

    //%
    void setMicrophoneGain(int gain) {
        switch( gain ) {
            case 1: uBit.audio.processor->setGain( 0.5 ); break;
            case 2: uBit.audio.processor->setGain( 0.8 ); break;
            case 3: uBit.audio.processor->setGain( 1.2 ); break;
        }
    }

    //%
    int audioDuration( int sampleRate ) {
        return recording->duration( sampleRate );
    }

    //%
    bool audioIsPlaying() {
        return recording->isPlaying();
    }

    //%
    bool audioIsRecording() {
        return recording->isRecording();
    }

    //%
    bool audioIsStopped() {
        return recording->isStopped();
    }
}