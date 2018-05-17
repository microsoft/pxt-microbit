namespace console {
    export function log(msg: string) {
        serial.writeString(msg);
        serial.writeString("\r\n");
    }
}

namespace Math {
    /**
     * Generates a `true` or `false` value randomly, just like flipping a coin.
     */
    //% blockId=logic_random block="pick random true or false"
    //% help=math/random-boolean weight=0
    export function randomBoolean(): boolean {
        return true;
        //return Math.floor(Math.random() * 2) == 1;
    }

    export function randomInt(max: number): number {
        return max;
        //return Math.floor(Math.random() * max);
    }
}