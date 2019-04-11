/**
 * Tests for the radio. Press A on mbit 1 and B on mbit 2 to run the tests.
 * Sends random ints, doubles, strings, and buffers and checks them on
 * the other side
 */

class FastRandom {
    private lfsr: number;
    public seed: number;

    constructor(seed?: number) {
        if (seed === undefined) seed = Math.randomRange(0x0001, 0xFFFF);
        this.seed = seed;
        this.lfsr = seed;
    }

    next(): number {
        return this.lfsr = (this.lfsr >> 1) ^ ((-(this.lfsr & 1)) & 0xb400);
    }

    randomRange(min: number, max: number): number {
        return min + (max > min ? this.next() % (max - min + 1) : 0);
    }

    reset() {
        this.lfsr = this.seed;
    }
}

enum TestStage {
    Integer,
    String,
    Double,
    IntValue,
    DblValue,
    Buffer
}

const TEST_COUNT = 30;

radio.setGroup(78)
const rand = new FastRandom(1234);

let stage = TestStage.Integer;

function initSender() {
    let lastReceived: number;
    let lastString: string;
    let testIndex = 0;
    let lastBuf: Buffer;

    let lastAck = -1;

    rand.reset();
    basic.clearScreen();

    // Send loop
    control.inBackground(function () {
        while (true) {
            for (let i = 0; i < TEST_COUNT; i++) {
                toggle(testIndex);

                if (stage === TestStage.Integer) {
                    lastReceived = getNextInt();
                }
                else if (stage === TestStage.Double) {
                    lastReceived = getNextDouble();
                }
                else if (stage === TestStage.IntValue) {
                    lastString = getNextName();
                    console.log(truncateString(lastString, 8))
                    lastReceived = getNextInt();
                }
                else if (stage === TestStage.DblValue) {
                    lastString = getNextName();
                    lastReceived = getNextDouble();
                }
                else if (stage === TestStage.String) {
                    lastString = getNextString();
                    console.log(truncateString(lastString, 19))
                }
                else if (stage === TestStage.Buffer) {
                    lastBuf = getNextBuffer();
                }

                while (lastAck !== testIndex) {
                    if (stage === TestStage.Integer || stage === TestStage.Double) {
                        radio.sendNumber(lastReceived)
                    }
                    else if (stage === TestStage.IntValue || stage === TestStage.DblValue) {
                        radio.sendValue(lastString, lastReceived)
                    }
                    else if (stage === TestStage.String) {
                        radio.sendString(lastString);
                    }
                    else if (stage === TestStage.Buffer) {
                        radio.sendBuffer(lastBuf);
                    }
                    basic.pause(10);
                }
                testIndex++;
            }

            stage++;
            if (stage > TestStage.Buffer) {
                basic.showIcon(IconNames.Yes);
                return;
            }
        }
    })

    radio.onReceivedNumber(function (receivedNumber: number) {
        if (receivedNumber > lastAck) {
            lastAck = receivedNumber;
        }
    });
}

let lastReceived: number;
let lastString: string;
let testIndex = -1;
let running = true;
let lastBuf: Buffer;

let lastPacket = new radio.Packet();
let currentPacket = new radio.Packet();

function truncateString(str: string, bytes: number) {
    str = str.substr(0, bytes);
    let buff = control.createBufferFromUTF8(str);

    while (buff.length > bytes) {
        str = str.substr(0, str.length - 1);
        buff = control.createBufferFromUTF8(str);
    }

    return str;
}

function initReceiver() {

    rand.reset();

    basic.clearScreen();

    radio.onDataReceived(function () {
        radio.receiveNumber();

        currentPacket.receivedNumber = radio.receivedNumber();
        currentPacket.receivedString = radio.receivedString();
        currentPacket.receivedBuffer = radio.receivedBuffer();

        if (currentPacket.receivedNumber === lastPacket.receivedNumber &&
            currentPacket.receivedString === lastPacket.receivedString &&
            checkBufferEqual(currentPacket.receivedBuffer, lastPacket.receivedBuffer)) {
            return;
        }

        lastPacket.receivedNumber = currentPacket.receivedNumber
        lastPacket.receivedString = currentPacket.receivedString
        lastPacket.receivedBuffer = currentPacket.receivedBuffer

        switch (stage) {
            case TestStage.Integer:
                verifyInt(radio.receivedNumber());
                break;
            case TestStage.Double:
                verifyDouble(radio.receivedNumber());
                break;
            case TestStage.IntValue:
                verifyIntValue(radio.receivedString(), radio.receivedNumber());
                break;
            case TestStage.DblValue:
                verifyDblValue(radio.receivedString(), radio.receivedNumber());
                break;
            case TestStage.String:
                verifyString(radio.receivedString());
                break;
            case TestStage.Buffer:
                verifyBuffer(radio.receivedBuffer());
                break;
        }
    })

    control.inBackground(function () {
        while (running) {
            radio.sendNumber(testIndex);
            basic.pause(10)
        }
    })
}

function nextTest() {
    testIndex++;
    toggle(testIndex);
    console.log(`test ${testIndex}`)
    if (((testIndex + 1) % TEST_COUNT) === 0) {
        stage++;

        if (stage > TestStage.Buffer) {
            basic.showIcon(IconNames.Yes)
            running = false;
        }
    }
}

function verifyInt(int: number) {
    if (int === lastReceived) return;
    lastReceived = int;
    if (lastReceived != getNextInt()) fail();
    nextTest()
}

function verifyDouble(dbl: number) {
    if (dbl === lastReceived) return;
    lastReceived = dbl;
    if (lastReceived != getNextDouble()) fail();
    nextTest()
}

function verifyIntValue(name: string, val: number) {
    if (val === lastReceived) return;
    lastReceived = val;

    if (name != truncateString(getNextName(), 8) || lastReceived != getNextInt()) fail();
    nextTest()
}

function verifyDblValue(name: string, val: number) {
    if (val === lastReceived) return;
    lastReceived = val;

    if (name != truncateString(getNextName(), 8) || lastReceived != getNextDouble()) fail();
    nextTest()
}

function verifyString(str: string) {
    if (!str || str === lastString) return;

    lastString = str;
    let next = truncateString(getNextString(), 19);

    if (lastString !== next) {
        console.log(`got ${control.createBufferFromUTF8(lastString).toHex()} expected ${control.createBufferFromUTF8(next).toHex()}`)
    }
    nextTest()
}

function verifyBuffer(buf: Buffer) {
    if (checkBufferEqual(lastBuf, buf)) return;

    lastBuf = buf;

    if (!checkBufferEqual(lastBuf, getNextBuffer())) {
        fail();
    }
    nextTest()
}

function fail() {
    control.panic(testIndex);
}


let _lastInt: number;
let _lastDbl: number;
let _lastStr: string;
let _lastBuf: Buffer;
let _lastNam: string;

function getNextInt(): number {
    let res = rand.next();
    if (!res || res === _lastInt) return getNextInt();
    _lastInt = res;
    return res;
}

function getNextDouble(): number {
    let res = rand.next() / rand.next();
    if (res === _lastDbl) return getNextDouble();
    _lastDbl = res;
    return res;
}

function getNextString(): string {
    let len = rand.randomRange(1, 19);
    let res = "";
    for (let i = 0; i < len; i++) {
        res += String.fromCharCode(rand.next() & 0xbfff);
    }

    if (res === _lastStr) return getNextString();

    _lastStr = res;
    return res;
}

function getNextName(): string {
    let len = rand.randomRange(1, 8);
    let res = "";
    for (let i = 0; i < len; i++) {
        res += String.fromCharCode(rand.next() & 0xbfff);
    }

    if (res === _lastNam) return getNextName();

    _lastNam = res;
    return res;
}

function getNextBuffer(): Buffer {
    let len = rand.randomRange(0, 8);
    let res = control.createBuffer(len);

    for (let i = 0; i < len; i++) {
        res[i] = rand.next() & 0xff;
    }

    if (checkBufferEqual(_lastBuf, res)) return getNextBuffer();

    _lastBuf = res;
    return res;
}

function checkBufferEqual(a: Buffer, b: Buffer) {
    if (a === b) return true;
    if ((!a && b) || (a && !b)) return false;
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

input.onButtonPressed(Button.A, function () {
    basic.showString("S");
    initSender();
})

input.onButtonPressed(Button.B, function () {
    basic.showString("R");
    initReceiver();
})

function toggle(index: number) {
    const x = index % 5;
    const y = Math.idiv(index, 5) % 5;
    led.toggle(x, y);
}
