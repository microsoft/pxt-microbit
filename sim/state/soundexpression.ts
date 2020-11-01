namespace pxsim.music {
    function loadWavAsync(path: string): Promise<Uint8Array> {
        return new Promise<Uint8Array>((resolve, reject) => {
            let httprequest = new XMLHttpRequest();
            httprequest.responseType = "arraybuffer";
            httprequest.onreadystatechange = function () {
                if (httprequest.readyState == XMLHttpRequest.DONE) {
                    if (httprequest.status == 200) {
                        const r = httprequest.response;
                        resolve(new Uint8Array(httprequest.response));
                    }
                    else {
                        reject(httprequest.status);
                    }
                }
            };
            httprequest.open("GET", path, true);
            httprequest.send();
        })
    }
    const wavPromises: Map<Promise<Uint8Array>> = {}
    //%
    export function __playSoundExpression(notes: string, waitTillDone: boolean): void {
        const cb = getResume();
        const b = board();
        // v2 only...
        b.ensureHardwareVersion(2);

        // load wav file
        let p: Promise<Uint8Array>;
        // defined in sim.html
        const path = (<any>pxsim).soundExpressionFiles[notes];
        if (path) {
            p = wavPromises[notes] || (wavPromises[notes] = loadWavAsync(path));
        } else
            p = Promise.resolve(undefined);

        p.then(data => {
            // failed to load data
            if (data) {
                // finally play
                const buf = new RefBuffer(data);
                const pp = AudioContextManager.playBufferAsync(buf)
                if (waitTillDone)
                    // wait until sound is done
                    return pp;
            }
            // don't wait
            return Promise.resolve();
        }).catch((e) => {
            console.log(e)
        }).finally(() => {
            cb();
        })
    }

    export function __stopSoundExpressions() {
        AudioContextManager.stopAll();
    }
}