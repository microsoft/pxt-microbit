namespace microcode {
    export function assert(cond: boolean, msg?: string) {
        if (!cond) {
            if (msg == null) msg = "Assertion failed"
            console.debug(msg)
            throw msg
        }
    }

    // use this to manage a buffer that may grow
    export class BufferWriter {
        private buf: Buffer
        private ptr: number = 0

        constructor() {
            this.buf = Buffer.create(64)
        }

        public get length() {
            return this.ptr
        }

        public get buffer() {
            const buf = Buffer.create(this.ptr)
            buf.write(0, this.buf.slice(0, this.ptr))
            return buf
        }

        public writeByte(v: number) {
            assert(
                0 <= v && v <= 0xff && (v | 0) == v,
                "writeByte: v=" + v.toString()
            )
            if (this.ptr >= this.buf.length) {
                const copy = Buffer.create(this.buf.length * 2)
                copy.write(0, this.buf)
                this.buf = copy
            }
            this.buf[this.ptr++] = v
        }

        public writeBuffer(b: Buffer) {
            for (let i = 0; i < b.length; ++i) this.writeByte(b[i])
        }
    }

    export class BufferReader {
        constructor(private buf: Buffer, private ptr: number = 0) {}

        public get buffer() {
            return this.buf
        }

        public eof() {
            return this.ptr >= this.buf.length
        }

        public peekByte() {
            assert(this.ptr < this.buf.length)
            return this.buf[this.ptr]
        }

        public readByte() {
            assert(this.ptr < this.buf.length)
            return this.buf[this.ptr++]
        }

        public readBuffer(len: number) {
            assert(this.ptr + len <= this.buf.length)
            const b = Buffer.create(len)
            for (let i = 0; i < len; ++i) b[i] = this.buf[this.ptr++]
            return b
        }
    }
}
