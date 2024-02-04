namespace microcode {
    export class Options {
        public static fps = false
        public static profiling = false
        public static menuProfiling = false // heap-dump on MENU press
    }

    export function profile() {
        if (Options.profiling) {
            control.heapSnapshot()
            control.gc() // displays stats on hardware
        }
    }
}
