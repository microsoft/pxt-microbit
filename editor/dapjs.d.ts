declare namespace DapJS {
    export interface IHID {
        write(data: ArrayBuffer): Promise<void>;
        read(): Promise<Uint8Array>;
        close(): Promise<void>;
        // sends each of commands and expects one packet in response
        // this makes for better performance when HID access is proxied
        sendMany?(commands: Uint8Array[]): Promise<Uint8Array[]>;
    }

    export class DAP {
        constructor(device: IHID);
        reconnect(): Promise<void>;
        init(): Promise<void>;
        close(): Promise<void>;
    }

    /**
     * # Memory Interface
     *
     * Controls access to the target's memory.
     *
     * ## Usage
     *
     * Using an instance of `CortexM`, as described before, we can simply read and
     * write numbers to memory as follows:
     *
     * ```typescript
     * const mem = core.memory;
     *
     * // NOTE: the address parameter must be word (4-byte) aligned.
     * await mem.write32(0x200000, 12345);
     * const val = await mem.read32(0x200000);
     *
     * // val === 12345
     *
     * // NOTE: the address parameter must be half-word (2-byte) aligned
     * await mem.write16(0x2000002, 65534);
     * const val16 = await mem.read16(0x2000002);
     *
     * // val16 === 65534
     * ```
     *
     * To write a larger block of memory, we can use `readBlock` and `writeBlock`. Again,
     * these blocks must be written to word-aligned addresses in memory.
     *
     * ```typescript
     * const data = new Uint32Array([0x1234, 0x5678, 0x9ABC, 0xDEF0]);
     * await mem.writeBlock(0x200000, data);
     *
     * const readData = await mem.readBlock(0x200000, data.length, 0x100);
     * ```
     *
     * ## See also
     *
     * `PreparedMemoryCommand` provides an equivalent API with better performance (in some
     * cases) by enabling batched memory operations.
     */
    export class Memory {
        private dev;
        constructor(dev: DAP);
        /**
         * Write a 32-bit word to the specified (word-aligned) memory address.
         *
         * @param addr Memory address to write to
         * @param data Data to write (values above 2**32 will be truncated)
         */
        write32(addr: number, data: number): Promise<void>;
        /**
         * Write a 16-bit word to the specified (half word-aligned) memory address.
         *
         * @param addr Memory address to write to
         * @param data Data to write (values above 2**16 will be truncated)
         */
        write16(addr: number, data: number): Promise<void>;
        /**
         * Read a 32-bit word from the specified (word-aligned) memory address.
         *
         * @param addr Memory address to read from.
         */
        read32(addr: number): Promise<number>;
        /**
         * Read a 16-bit word from the specified (half word-aligned) memory address.
         *
         * @param addr Memory address to read from.
         */
        read16(addr: number): Promise<number>;
        /**
         * Reads a block of memory from the specified memory address.
         *
         * @param addr Address to read from
         * @param words Number of words to read
         * @param pageSize Memory page size
         */
        readBlock(addr: number, words: number, pageSize: number): Promise<Uint8Array>;
        /**
         * Write a block of memory to the specified memory address.
         *
         * @param addr Memory address to write to.
         * @param words Array of 32-bit words to write to memory.
         */
        writeBlock(addr: number, words: Uint32Array): Promise<void>;
        private readBlockCore(addr, words);
        private writeBlockCore(addr, words);
    }

    /**
 * # Cortex M
 *
 * Manages access to a CPU core, and its associated memory and debug functionality.
 *
 * > **NOTE:** all of the methods that involve interaction with the CPU core
 * > are asynchronous, so must be `await`ed, or explicitly handled as a Promise.
 *
 * ## Usage
 *
 * First, let's create an instance of `CortexM`, using an associated _Debug Access
 * Port_ (DAP) instance that we created earlier.
 *
 * ```typescript
 * const core = new CortexM(dap);
 * ```
 *
 * Now, we can halt and resume the core just like this:
 *
 * > **NOTE:** If you're not using ES2017, you can replace the use of `async` and
 * > `await` with direct use of Promises. These examples also need to be run within
 * > an `async` function for `async` to be used.
 *
 * ```typescript
 * await core.halt();
 * await core.resume();
 * ```
 *
 * Resetting the core is just as easy:
 *
 * ```typescript
 * await core.reset();
 * ```
 *
 * You can even halt immediately after reset:
 *
 * ```typescript
 * await core.reset(true);
 * ```
 *
 * We can also read and write 32-bit values to/from core registers:
 *
 * ```typescript
 * const sp = await core.readCoreRegister(CortexReg.SP);
 *
 * await core.writeCoreRegister(CortexReg.R0, 0x1000);
 * await core.writeCoreRegister(CortexReg.PC, 0x1234);
 * ```
 *
 * ### See also
 *
 * For details on debugging and memory features, see the documentation for
 * `Debug` and `Memory`.
 */
    export class CortexM {
        /**
         * Read and write to on-chip memory associated with this CPU core.
         */
        memory: Memory;
        /**
         * Control the CPU's debugging features.
         */
        debug: Debug;
        /**
         * Underlying Debug Access Port (DAP).
         */
        private dev;
        constructor(device: DAP);
        /**
         * Initialise the debug access port on the device, and read the device type.
         */
        init(): Promise<void>;
        /**
         * Read the current state of the CPU.
         *
         * @returns A member of the `CoreState` enum corresponding to the current status of the CPU.
         */
        getState(): Promise<CoreState>;

        /**
         * Read a core register from the CPU (e.g. r0...r15, pc, sp, lr, s0...)
         *
         * @param no Member of the `CortexReg` enum - an ARM Cortex CPU general-purpose register.
         */
        readCoreRegister(no: CortexReg): Promise<number>;
        /**
         * Write a 32-bit word to the specified CPU general-purpose register.
         *
         * @param no Member of the `CortexReg` enum - an ARM Cortex CPU general-purpose register.
         * @param val Value to be written.
         */
        writeCoreRegister(no: CortexReg, val: number): Promise<void>;
        /**
         * Halt the CPU core.
         */
        halt(): Promise<void>;
        /**
         * Resume the CPU core.
         */
        resume(): Promise<void>;
        /**
         * Find out whether the CPU is halted.
         */
        isHalted(): Promise<boolean>;
        /**
         * Read the current status of the CPU.
         *
         * @returns Object containing the contents of the `DHCSR` register, the `DFSR` register, and a boolean value
         * stating the current halted state of the CPU.
         */
        status(): Promise<{
            dfsr: number;
            dhscr: number;
            isHalted: boolean;
        }>;
        /**
         * Reset the CPU core. This currently does a software reset - it is also technically possible to perform a 'hard'
         * reset using the reset pin from the debugger.
         */
        reset(halt?: boolean): Promise<void>;
        /**
         * Run specified machine code natively on the device. Assumes usual C calling conventions
         * - returns the value of r0 once the program has terminated. The program _must_ terminate
         * in order for this function to return. This can be achieved by placing a `bkpt`
         * instruction at the end of the function.
         *
         * @param code array containing the machine code (32-bit words).
         * @param address memory address at which to place the code.
         * @param pc initial value of the program counter.
         * @param lr initial value of the link register.
         * @param sp initial value of the stack pointer.
         * @param upload should we upload the code before running it.
         * @param args set registers r0...rn before running code
         *
         * @returns A promise for the value of r0 on completion of the function call.
         */
        runCode(code: Uint32Array, address: number, pc: number, lr: number, sp: number, upload: boolean, ...args: number[]): Promise<number>;
        /**
         * Spin until the chip has halted.
         */
        waitForHalt(timeout?: number): Promise<void>;

        prepareCommand(): PreparedCortexMCommand;

        private softwareReset();
    }

    /**
 * # Cortex M: Prepared Command
 *
 * Allows batching of Cortex M-related commands, such as writing to a register,
 * halting and resuming the core.
 *
 * ## Example
 *
 * When preparing the sequence of commands, we can use the same API to prepare
 * a command as we would to execute them immediately.
 *
 * ```typescript
 * // Note that only the .go method is asynchronous.
 *
 * const prep = core.prepareCommand();
 * prep.writeCoreRegister(CortexReg.R0, 0x1000);
 * prep.writeCoreRegister(CortexReg.R1, 0x0);
 * prep.writeCoreRegister(CortexReg.PC, 0x2000000);
 * prep.resume();
 * ```
 *
 * We can then execute them as efficiently as possible by combining them together
 * and executing them like so.
 *
 * ```typescript
 * await prep.go();
 * ```
 *
 * The code above is equivalent to the following _non-prepared_ command:
 *
 * ```typescript
 * await core.writeCoreRegister(CortexReg.R0, 0x1000);
 * await core.writeCoreRegister(CortexReg.R1, 0x0);
 * await core.writeCoreRegister(CortexReg.PC, 0x2000000);
 * await core.resume();
 * ```
 *
 * Since the batched version of this code avoids making three round-trips to the
 * target, we are able to significantly improve performance. This is especially
 * noticable when uploading a binary to flash memory, where are large number of
 * repetetive commands are being used.
 *
 * ## Explanation
 *
 * For a detailed explanation of why prepared commands are used in DAP.js, see the
 * documentation for `PreparedDapCommand`.
 */
    export class PreparedCortexMCommand {
        private cmd;
        constructor(dap: DAP);
        /**
         * Schedule a 32-bit integer to be written to a core register.
         *
         * @param no Core register to be written.
         * @param val Value to write.
         */
        writeCoreRegister(no: CortexReg, val: number): void;
        /**
         * Schedule a halt command to be written to the CPU.
         */
        halt(): void;
        /**
         * Schedule a resume command to be written to the CPU.
         */
        resume(): void;
        /**
         * Execute all scheduled commands.
         */
        go(): Promise<void>;
    }


    export const enum CortexReg {
        R0 = 0,
        R1 = 1,
        R2 = 2,
        R3 = 3,
        R4 = 4,
        R5 = 5,
        R6 = 6,
        R7 = 7,
        R8 = 8,
        R9 = 9,
        R10 = 10,
        R11 = 11,
        R12 = 12,
        SP = 13,
        LR = 14,
        PC = 15,
        XPSR = 16,
        MSP = 17,
        PSP = 18,
        PRIMASK = 20,
        CONTROL = 20,
    }
    export const enum CoreState {
        TARGET_RESET = 0,
        TARGET_LOCKUP = 1,
        TARGET_SLEEPING = 2,
        TARGET_HALTED = 3,
        TARGET_RUNNING = 4,
    }



    /**
     * # Debug Interface
     *
     * Keeps track of breakpoints set on the target, as well as deciding whether to
     * use a hardware breakpoint or a software breakpoint.
     *
     * ## Usage
     *
     * ```typescript
     * const dbg = core.debug;
     *
     * await dbg.setBreakpoint(0x123456);
     *
     * // resume the core and wait for the breakpoint
     * await core.resume();
     * await core.waitForHalt();
     *
     * // step forward one instruction
     * await dbg.step();
     *
     * // remove the breakpoint
     * await dbg.deleteBreakpoint(0x123456);
     * ```
     */
    export class Debug {
        private core;
        private breakpoints;
        private availableHWBreakpoints;
        private totalHWBreakpoints;
        private enabled;
        constructor(core: CortexM);
        init(): Promise<void>;
        /**
         * Enable debugging on the target CPU
         */
        enable(): Promise<void>;
        /**
         * Set breakpoints at specified memory addresses.
         *
         * @param addrs An array of memory addresses at which to set breakpoints.
         */
        setBreakpoint(addr: number): Promise<void>;
        deleteBreakpoint(addr: number): Promise<void>;
        /**
         * Step the processor forward by one instruction.
         */
        step(): Promise<void>;
        /**
         * Set up (and disable) the Flash Patch & Breakpoint unit. It will be enabled when
         * the first breakpoint is set.
         *
         * Also reads the number of available hardware breakpoints.
         */
        private setupFpb();
        /**
         * Enable or disable the Flash Patch and Breakpoint unit (FPB).
         *
         * @param enabled
         */
        private setFpbEnabled(enabled?);
    }

}