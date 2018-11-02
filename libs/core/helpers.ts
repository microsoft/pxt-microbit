namespace Math {
    /**
     * Generates a `true` or `false` value randomly, just like flipping a coin.
     */
    //% blockId=logic_random block="pick random true or false"
    //% help=math/random-boolean weight=0
    export function randomBoolean(): boolean {
        return Math.randomRange(0, 1) === 1;
    }
}