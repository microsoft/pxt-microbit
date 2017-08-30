/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

interface Math {
    imul(x: number, y: number): number;
}
namespace pxt.editor {
    import UF2 = pxtc.UF2;

    const pageSize = 1024;
    const numPages = 256;

    function makeCRC32tab() {
        let tab: number[] = []
        for (let b = 0; b < 256; ++b) {
            let r = b;
            for (let j = 0; j < 8; ++j) {
                if (r & 1)
                    r = (r >>> 1) ^ 0xEDB88320;
                else
                    r = (r >>> 1);
            }
            tab.push(r >>> 0)
        }
        return new Uint32Array(tab)
    }
    let crcTab: Uint32Array
    function crc32(data: Uint8Array) {
        if (!crcTab) crcTab = makeCRC32tab()
        let crc = ~0;
        for (let i = 0; i < data.length; ++i)
            crc = (crcTab[data[i] ^ (crc & 0xff)] ^ (crc >>> 8)) >>> 0;
        return (~crc) >>> 0;
    }

    function murmur3_core(data: Uint8Array) {

        let h = 0x2F9BE6CC;
        for (let i = 0; i < data.length; i += 4) {
            let k = HF2.read32(data, i) >>> 0
            k = Math.imul(k, 0xcc9e2d51);
            k = (k << 15) | (k >>> 17);
            k = Math.imul(k, 0x1b873593);
            h ^= k;
            h = (h << 13) | (h >>> 19);
            h = (Math.imul(h, 5) + 0xe6546b64) >>> 0;
        }
        return h;
    }

    export function getChecksum(data: Uint8Array) {
        function h(n: number) {
            return "0x" + ("000000000" + (n >>> 0).toString(16)).slice(-8)
        }
        return h(crc32(data)) + ", " + h(murmur3_core(data))
    }

    export function testCheck() {
        let b = new Uint8Array(1024)
        console.log("zero: " + getChecksum(b))
        for (let i = 0; i < b.length; ++i)
            b[i] = i
        console.log("incr: " + getChecksum(b))
        for (let i = 0; i < b.length; ++i)
            b[i] = 108
        console.log("108: " + getChecksum(b))
    }

    class DAPWrapper {
        cortexM: DapJS.CortexM

        constructor(h: HF2.PacketIO) {
            let pbuf = new U.PromiseBuffer<Uint8Array>()

            let sendMany = (cmds: Uint8Array[]) => {
                return h.talksAsync(cmds.map(c => ({ cmd: 0, data: c })))
            }

            if (!h.talksAsync)
                sendMany = null

            let dev = new DapJS.DAP({
                write: writeAsync,
                close: closeAsync,
                read: readAsync,
                sendMany: sendMany
            })
            this.cortexM = new DapJS.CortexM(dev)
            let id = 0


            h.onData = buf => {
                pbuf.push(buf)
            }

            function writeAsync(data: ArrayBuffer) {
                //if (id++ == 13)
                //    debugger
                h.sendPacketAsync(new Uint8Array(data))
                return Promise.resolve()
            }

            function readAsync() {
                return pbuf.shiftAsync()
            }

            function closeAsync() {
                return h.disconnectAsync()
            }
        }

        reconnectAsync(first: boolean) {
            const showNumAsync = (addr: number) => {
                return this.cortexM.memory.read32(addr)
                    .then(buf => {
                        console.log(`at ${addr}: 0x${buf.toString(16)}`)
                    })
            }

            return this.cortexM.init()
            /*
                .then(() => this.cortexM.memory.readBlock(0x0, 100, pageSize))
                .then(buf => {
                    console.log("buf: " + U.toHex(buf))
                })
                .then(() => {
                    throw new Error("blah")   
                })
                */
        }
    }

    function hf2Async() {
        return pxt.HF2.mkPacketIOAsync()
            .then(h => {
                let w = new DAPWrapper(h)
                return w.reconnectAsync(true)
                    .then(() => w)
            })
    }

    let noHID = false

    let initPromise: Promise<DAPWrapper>
    function initAsync() {
        if (initPromise)
            return initPromise

        let canHID = false
        if (U.isNodeJS) {
            canHID = true
        } else {
            const forceHexDownload = /forceHexDownload/i.test(window.location.href);
            if (Cloud.isLocalHost() && Cloud.localToken && !forceHexDownload)
                canHID = true
        }

        if (noHID)
            canHID = false

        if (canHID) {
            initPromise = hf2Async()
                .catch(err => {
                    initPromise = null
                    noHID = true
                    return Promise.reject(err)
                })
        } else {
            noHID = true
            initPromise = Promise.reject(new Error("no HID"))
        }

        return initPromise
    }

    function pageAlignBlocks(blocks: UF2.Block[], pageSize: number) {
        U.assert(pageSize % 256 == 0)
        let res: UF2.Block[] = []
        for (let i = 0; i < blocks.length;) {
            let b0 = blocks[i]
            let newbuf = new Uint8Array(pageSize)
            let startPad = b0.targetAddr & (pageSize - 1)
            let newAddr = b0.targetAddr - startPad
            for (; i < blocks.length; ++i) {
                let b = blocks[i]
                if (b.targetAddr + b.payloadSize > newAddr + pageSize)
                    break
                U.memcpy(newbuf, b.targetAddr - newAddr, b.data, 0, b.payloadSize)
            }
            let bb = U.flatClone(b0)
            bb.data = newbuf
            bb.targetAddr = newAddr
            bb.payloadSize = pageSize
            res.push(bb)
        }
        return res
    }

    const flashPageBINquick = new Uint32Array([
        0xbe00be00, // bkpt - LR is set to this
        0x2480b5f0, 0x00e42300, 0x58cd58c2, 0xd10342aa, 0x42a33304, 0xbdf0d1f8,
        0x4b162502, 0x509d4a16, 0x2d00591d, 0x24a1d0fc, 0x511800e4, 0x3cff3c09,
        0x591e0025, 0xd0fc2e00, 0x509c2400, 0x2c00595c, 0x2401d0fc, 0x509c2580,
        0x595c00ed, 0xd0fc2c00, 0x00ed2580, 0x002e2400, 0x5107590f, 0x2f00595f,
        0x3404d0fc, 0xd1f742ac, 0x50992100, 0x2a00599a, 0xe7d0d0fc, 0x4001e000,
        0x00000504,
    ])

    // doesn't check if data is already there - for timing
    const flashPageBIN = new Uint32Array([
        0xbe00be00, // bkpt - LR is set to this
        0x2402b5f0, 0x4a174b16, 0x2480509c, 0x002500e4, 0x2e00591e, 0x24a1d0fc,
        0x511800e4, 0x2c00595c, 0x2400d0fc, 0x2480509c, 0x002500e4, 0x2e00591e,
        0x2401d0fc, 0x595c509c, 0xd0fc2c00, 0x00ed2580, 0x002e2400, 0x5107590f,
        0x2f00595f, 0x3404d0fc, 0xd1f742ac, 0x50992100, 0x2a00599a, 0xbdf0d0fc,
        0x4001e000, 0x00000504,
    ])

    // void computeHashes(uint32_t *dst, uint8_t *ptr, uint32_t pageSize, uint32_t numPages)
    // requires just over 1k of stack!
    const computeChecksums = new Uint32Array([
        0x4c2bb5f0, 0x44a52580, 0x468c9201, 0x4e292200, 0x006d9303, 0x21080013,
        0x2401001f, 0x40e34027, 0xd0002f00, 0x39014073, 0xd1f52900, 0xac040097,
        0x513b3201, 0xd1ed42aa, 0x9b01000e, 0x9302089b, 0x429e9b03, 0x4661d02f,
        0x9b012201, 0x449c000c, 0xe00d4252, 0x782325ff, 0x406b4015, 0x3514adff,
        0x18eb009b, 0x0a124d14, 0x681b195b, 0x405a3401, 0xd1ef45a4, 0x271343d2,
        0x4c109d02, 0x4b106002, 0x3d01c904, 0x2311435a, 0x4b0e41da, 0x405c4353,
        0x230541fc, 0x4b0c435c, 0x2d0018e4, 0x6044d1ef, 0x30083601, 0xbe2ae7cc,
        0x4b082000, 0xbdf0449d, 0xfffffbec, 0xedb88320, 0xfffffc00, 0x2f9be6cc,
        0xcc9e2d51, 0x1b873593, 0xe6546b64, 0x00000414,
    ])


    // void computeHashes(uint32_t *dst, uint8_t *ptr, uint32_t pageSize, uint32_t numPages)
    const computeSHA = new Uint32Array([
        0xb0d3b5f0, 0x23009311, 0x91069005, 0x93079210, 0x9a119b07, 0xd1004293,
        0x9b06e0c6, 0x4b649304, 0x4b64930d, 0x4b64930c, 0x4b64930b, 0x4b64930a,
        0x4b649309, 0x4b649308, 0x4b649302, 0xe0939301, 0x9a042100, 0x78537810,
        0x041b0600, 0x78d04303, 0x78904303, 0x02003204, 0xa8124303, 0x3104500b,
        0xd1ef2940, 0xac420003, 0x2107685a, 0x26120015, 0x001141cd, 0x08d241f1,
        0x404a4069, 0x68196a5d, 0x19496b98, 0x00051852, 0x41cd2111, 0x36010001,
        0x0a8041f1, 0x40414069, 0x64191851, 0x429c3304, 0x9b09d1e2, 0x930f2700,
        0x9d089b0d, 0x9b0c930e, 0x93039e02, 0x98019b0b, 0x990a469c, 0x000c230b,
        0x41dc000a, 0x41da3b05, 0x000c4062, 0x41dc3313, 0x40544b3f, 0x58fbaa12,
        0x370458ba, 0x18a2189a, 0x9b034664, 0x438b400c, 0x18d24063, 0x00049b0e,
        0x930e18d3, 0x41dc230d, 0x00232202, 0x41d40004, 0x405c0002, 0x41da2316,
        0x4054002b, 0x4073002a, 0x40034032, 0x18e44053, 0x9b0f9a0e, 0x18d3950f,
        0x9c031912, 0x2480940e, 0x42a70064, 0x9c01d134, 0x920118a2, 0x18129a02,
        0x9a089202, 0x92081992, 0x19529a09, 0x9a0a9209, 0x930a18d3, 0x9a039b0b,
        0x930b185b, 0x44639b0c, 0x930c4694, 0x44639b0d, 0x9b04930d, 0x93043340,
        0x9b049a06, 0x9a101a9b, 0xd900429a, 0x9b05e764, 0x601a9a01, 0x605a9a02,
        0x9a052308, 0x9a1018d3, 0x46949305, 0x44639b06, 0x9b079306, 0xe73a3301,
        0x00060035, 0x46620010, 0x9203468c, 0xe7890019, 0x2000be2a, 0xbdf0b053,
        0x5be0cd19, 0x1f83d9ab, 0x9b05688c, 0x510e527f, 0xa54ff53a, 0x3c6ef372,
        0xbb67ae85, 0x6a09e667, 0x200001d4,
        // this is 0x200001d4
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
        0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
        0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
        0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
        0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
        0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
        0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
        0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
        0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ])

    let startTime = 0
    function log(msg: string) {
        let now = Date.now()
        if (!startTime) startTime = now
        now -= startTime
        let ts = ("00000" + now).slice(-5)
        console.log(`HID ${ts}: ${msg}`)
    }

    const membase = 0x20000000
    const loadAddr = membase
    const dataAddr = 0x20002000
    const stackAddr = 0x20001000

    function getFlashChecksumsAsync(wrap: DAPWrapper) {
        U.assert(computeSHA.length == 0x1d4 / 4 + 64)

        let pages = numPages

        return wrap.cortexM.runCode(computeChecksums, loadAddr, loadAddr + 1, 0xffffffff, stackAddr, true,
            dataAddr, 0, pageSize, pages)
            .then(() => wrap.cortexM.memory.readBlock(dataAddr, pages * 2, pageSize))
            .then(buf => {
                console.log(U.toHex(buf))
            })
    }

    export function deployCoreAsync(resp: pxtc.CompileResult, isCli = false): Promise<void> {
        let saveHexAsync = () => {
            if (isCli) {
                return Promise.resolve()
            } else {
                return pxt.commands.saveOnlyAsync(resp)
            }
        }

        if (noHID) return saveHexAsync()

        let wrap: DAPWrapper

        log("init")

        let logV = (msg: string) => { }
        //let logV = log



        const runFlash = (b: UF2.Block, dataAddr: number) => {
            const cmd = wrap.cortexM.prepareCommand();

            cmd.halt();

            cmd.writeCoreRegister(DapJS.CortexReg.PC, loadAddr + 4 + 1);
            cmd.writeCoreRegister(DapJS.CortexReg.LR, loadAddr + 1);
            cmd.writeCoreRegister(DapJS.CortexReg.SP, stackAddr);

            cmd.writeCoreRegister(0, b.targetAddr);
            cmd.writeCoreRegister(1, dataAddr);

            return Promise.resolve()
                .then(() => {
                    logV("setregs")
                    return cmd.go()
                })
                .then(() => {
                    logV("dbg en")
                    // starts the program
                    return wrap.cortexM.debug.enable()
                })
        }

        return initAsync()
            .then(w => {
                wrap = w
                log("reset")
                return wrap.cortexM.reset(true)
            })
            .then(() => getFlashChecksumsAsync(wrap))
            .then(() => {
                log("write code")
                return wrap.cortexM.memory.writeBlock(loadAddr, flashPageBIN)
            })
            .then(() => {
                log("convert")
                // TODO this is seriously inefficient (130ms on a fast machine)
                let uf2 = UF2.newBlockFile()
                UF2.writeHex(uf2, resp.outfiles[pxtc.BINARY_HEX].split(/\r?\n/))
                let bytes = U.stringToUint8Array(UF2.serializeFile(uf2))
                let parsed = UF2.parseFile(bytes)

                let aligned = pageAlignBlocks(parsed, pageSize)

                log("check")
                let sums1 = aligned.map(b => crc32(b.data))
                let sums2 = aligned.map(b => murmur3_core(b.data))
                console.log(sums1, sums2)
                log("sha done")

                return Promise.mapSeries(U.range(aligned.length),
                    i => {
                        let b = aligned[i]
                        if (b.targetAddr >= 0x10000000)
                            return Promise.resolve()

                        logV("about to write at 0x" + b.targetAddr.toString(16))

                        let writeBl = Promise.resolve()

                        let thisAddr = (i & 1) ? dataAddr : dataAddr + pageSize
                        let nextAddr = (i & 1) ? dataAddr + pageSize : dataAddr

                        if (i == 0) {
                            let u32data = new Uint32Array(b.data.buffer) // assumes little endian
                            writeBl = wrap.cortexM.memory.writeBlock(thisAddr, u32data)
                        }

                        return writeBl
                            .then(() => runFlash(b, thisAddr))
                            .then(() => {
                                let next = aligned[i + 1]
                                if (!next)
                                    return Promise.resolve()
                                logV("write next")
                                let buf = new Uint32Array(next.data.buffer)
                                return wrap.cortexM.memory.writeBlock(nextAddr, buf)
                            })
                            .then(() => {
                                logV("wait")
                                return wrap.cortexM.waitForHalt(500)
                            })
                            .then(() => {
                                logV("done block")
                            })
                    })
                    .then(() => {
                        log("flash done")
                        return wrap.cortexM.reset(false)
                    })
            })
            .catch(e => {
                // if we failed to initalize, retry
                if (noHID)
                    return saveHexAsync()
                else
                    return Promise.reject(e)
            })
    }

    initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug('loading microbit target extensions...')

        if (!Math.imul)
            Math.imul = (a, b) => {
                var ah = (a >>> 16) & 0xffff;
                var al = a & 0xffff;
                var bh = (b >>> 16) & 0xffff;
                var bl = b & 0xffff;
                // the shift by 0 fixes the sign on the high part
                // the final |0 converts the unsigned value into a signed value
                return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
            };

        const res: pxt.editor.ExtensionResult = {
            hexFileImporters: [{
                id: "blockly",
                canImport: data => data.meta.cloudId == "microbit.co.uk" && data.meta.editor == "blockly",
                importAsync: (project, data) => project.createProjectAsync({
                    filesOverride: {
                        "main.blocks": data.source
                    }, name: data.meta.name
                })
            }, {
                    id: "td",
                    canImport: data => data.meta.cloudId == "microbit.co.uk" && data.meta.editor == "touchdevelop",
                    importAsync: (project, data) =>
                        project.createProjectAsync({
                            filesOverride: { "main.blocks": "", "main.ts": "  " },
                            name: data.meta.name
                        })
                            .then(() => project.convertTouchDevelopToTypeScriptAsync(data.source))
                            .then(text => project.overrideTypescriptFile(text))
                }]
        };
        pxt.commands.deployCoreAsync = deployCoreAsync;
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }

}
