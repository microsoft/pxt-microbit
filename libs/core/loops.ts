namespace loops {
    /**
     * Repeats the code forever in the background.
     * After each iteration, allows other codes to run for a set duration
     * so that it runs on a timer
     * @param interval time (in ms) to wait between each iteration of the action.
     * @param body code to execute
     */
    //% weight=45 blockAllowMultiple=1
    //% interval.shadow=timePicker
    //% afterOnStart=true
    //% blockId=every_interval block="every $interval ms"
    export function everyInterval(interval: number, a: () => void): void {
        control.runInParallel(() => {
            while (true) {
                a();
                pause(interval);
            }
        });
    }
}