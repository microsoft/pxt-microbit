/*
The MIT License (MIT)

Copyright (c) 2013-2016 The MicroPython-on-micro:bit Developers, as listed
in the accompanying AUTHORS file

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Images from file microbitconstimage.cpp https://github.com/bbcmicrobit/micropython

enum IconNames {
    //% block="heart"
    Heart = 0,
    //% block="small heart"
    SmallHeart,
    //% block="yes"
    Yes,
    //% block="no"
    No,
    //% block="happy"
    Happy,
    //% block="sad"
    Sad,
    //% block="confused"
    Confused,
    //% block="angry"
    Angry,
    //% block="asleep"
    Asleep,
    //% block="surprised"
    Surprised,
    //% block="silly"
    Silly,
    //% block="fabulous"
    Fabulous,
    //% block="meh"
    Meh,
    //% block="t-shirt"
    TShirt,
    //% block="roller skate"
    Rollerskate,
    //% block="duck"
    Duck,
    //% block="house"
    House,
    //% block="tortoise"
    Tortoise,
    //% block="butterfly"
    Butterfly,
    //% block="stick figure"
    StickFigure,
    //% block="ghost"
    Ghost,
    //% block="sword"
    Sword,
    //% block="giraffe"
    Giraffe,
    //% block="skull"
    Skull,
    //% block="umbrella"
    Umbrella,
    //% block="snake"
    Snake,
    //% block="rabbit"
    Rabbit,
    //% block="cow"
    Cow,
    //% block="quarter note"
    QuarterNote,
    //% block="eigth note"
    EigthNote,
    //% block="pitchfork"
    Pitchfork,
    //% block="pac man"
    Pacman,
    //% block="target"
    Target,
    //% block="triangle"
    Triangle,
    //% block="left triangle"
    LeftTriangle,
    //% block="chess board"
    Chessboard,
    //% block="diamond"
    Diamond,
    //% block="small diamond"
    SmallDiamond,
    //% block="square"
    Square,
    //% block="small square"
    SmallSquare, 
}

enum ArrowNames {
    //% blockIdentity=images.arrowNumber
    North = 0,
    //% blockIdentity=images.arrowNumber
    NorthEast,
    //% blockIdentity=images.arrowNumber
    East,
    //% blockIdentity=images.arrowNumber
    SouthEast,
    //% blockIdentity=images.arrowNumber
    South,
    //% blockIdentity=images.arrowNumber 
    SouthWest,
    //% blockIdentity=images.arrowNumber
    West,
    //% blockIdentity=images.arrowNumber
    NorthWest,
}

namespace basic {

    /**
     * Draws the selected icon on the LED screen
     */
    //% weight=90 blockGap=8
    //% blockId=basic_show_icon 
    //% block="show icon %i" icon="\uf00a"
    //% parts="ledmatrix"
    export function showIcon(icon: IconNames) {
        let res = images.iconImage(icon)
        res.showImage(0)
    }

    //% weight=50 blockGap=8
    //% blockId=basic_show_arrow 
    //% block="show arrow %i=device_arrow"
    //% parts="ledmatrix"
    //% advanced=true
    export function showArrow(i: number) {
        let res = images.arrowImage(i)
        res.showImage(0)
    }
}


namespace images {
    let iconDefinitions : string[] = null;
    let arrowDefinitions : string[] = null;

    function initArrows(): void {
        if (arrowDefinitions == null) {
            arrowDefinitions = [];
                                            // compass directions
            arrowDefinitions[ArrowNames.North] = `    
                                        . . # . .
                                        . # # # .
                                        # . # . #
                                        . . # . .
                                        . . # . .`;
            arrowDefinitions[ArrowNames.NorthEast] = ` 
                                        . . # # #
                                        . . . # #
                                        . . # . #
                                        . # . . .
                                        # . . . .`;
            arrowDefinitions[ArrowNames.East] = ` 
                                        . . # . .
                                        . . . # .
                                        # # # # #
                                        . . . # .
                                        . . # . .`;
            arrowDefinitions[ArrowNames.SouthEast] = ` 
                                        # . . . .
                                        . # . . .
                                        . . # . #
                                        . . . # #
                                        . . # # #`;
            arrowDefinitions[ArrowNames.South] = ` 
                                        . . # . .
                                        . . # . .
                                        # . # . #
                                        . # # # .
                                        . . # . .`;
            arrowDefinitions[ArrowNames.SouthWest] = ` 
                                        . . . . #
                                        . . . # .
                                        # . # . .
                                        # # . . .
                                        # # # . .`;
            arrowDefinitions[ArrowNames.West] = ` 
                                        . . # . .
                                        . # . . .
                                        # # # # #
                                        . # . . .
                                        . . # . .`;
            arrowDefinitions[ArrowNames.NorthWest] = ` 
                                        # # # . .
                                        # # . . .
                                        # . # . .
                                        . . . # .
                                        . . . . #`;
        }
    }
    
    function initIcons(): void {
        if (iconDefinitions == null) {
            iconDefinitions = [];
            iconDefinitions[IconNames.Heart] = `
                                        . # . # .
                                        # # # # #
                                        # # # # #
                                        . # # # .
                                        . . # . .`;

            iconDefinitions[IconNames.SmallHeart] = `
                                        . . . . .
                                        . # . # .
                                        . # # # .
                                        . . # . .
                                        . . . . .`;
                                            //faces
            iconDefinitions[IconNames.Happy] = `
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        # . . . #
                                        . # # # .`;
            iconDefinitions[IconNames.Sad] = `
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        . # # # .
                                        # . . . #`;
            iconDefinitions[IconNames.Confused] = `
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        . # . # .
                                        # . # . #`;
            iconDefinitions[IconNames.Angry] = `
                                        # . . . #
                                        . # . # .
                                        . . . . .
                                        # # # # #
                                        # . # . #`;
            iconDefinitions[IconNames.Asleep] = `
                                        . . . . .
                                        # # . # #
                                        . . . . .
                                        . # # # .
                                        . . . . .`;
            iconDefinitions[IconNames.Surprised] = `
                                        . # . # .
                                        . . . . .
                                        . . # . .
                                        . # . # .
                                        . . # . .`;
            iconDefinitions[IconNames.Silly] = `
                                        # . . . #
                                        . . . . .
                                        # # # # #
                                        . . . # #
                                        . . . # #`;
            iconDefinitions[IconNames.Fabulous] = `
                                        # # # # #
                                        # # . # #
                                        . . . . .
                                        . # . # .
                                        . # # # .`;
            iconDefinitions[IconNames.Meh] = `
                                        # # . # #
                                        . . . . .
                                        . . . # .
                                        . . # . .
                                        . # . . .`;
            iconDefinitions[IconNames.Yes] = `
                                        . . . . .
                                        . . . . #
                                        . . . # .
                                        # . # . .
                                        . # . . .`;
            iconDefinitions[IconNames.No] = `
                                        # . . . #
                                        . # . # .
                                        . . # . .
                                        . # . # .
                                        # . . . #`;
            iconDefinitions[IconNames.Triangle] = `
                                        . . . . .
                                        . . # . .
                                        . # . # .
                                        # # # # #
                                        . . . . .`;
            iconDefinitions[IconNames.LeftTriangle] = `
                                        # . . . .
                                        # # . . .
                                        # . # . .
                                        # . . # .
                                        # # # # #`;
            iconDefinitions[IconNames.Chessboard] = `
                                        . # . # .
                                        # . # . #
                                        . # . # .
                                        # . # . #
                                        . # . # .`;
            iconDefinitions[IconNames.Diamond] = `
                                        . . # . .
                                        . # . # .
                                        # . . . #
                                        . # . # .
                                        . . # . .`;
            iconDefinitions[IconNames.SmallDiamond] = `
                                        . . . . .
                                        . . # . .
                                        . # . # .
                                        . . # . .
                                        . . . . .`;
            iconDefinitions[IconNames.Square] = `
                                        # # # # #
                                        # . . . #
                                        # . . . #
                                        # . . . #
                                        # # # # #`;
            iconDefinitions[IconNames.SmallSquare] = `
                                        . . . . .
                                        . # # # .
                                        . # . # .
                                        . # # # .
                                        . . . . .`;
                                            // The following images were designed by Abbie Brooks.
            iconDefinitions[IconNames.TShirt] = `
                                        # # . # #
                                        # # # # #
                                        . # # # .
                                        . # # # .
                                        . # # # .`;
            iconDefinitions[IconNames.Rollerskate] = `
                                        . . . # #
                                        . . . # #
                                        # # # # #
                                        # # # # #
                                        . # . # .`;
            iconDefinitions[IconNames.Duck] = `
                                        . # # . .
                                        # # # . .
                                        . # # # #
                                        . # # # .
                                        . .. . .`;
            iconDefinitions[IconNames.House] = `
                                        . . # . .
                                        . # # # .
                                        # # # # #
                                        . # # # .
                                        . # . # .`;
            iconDefinitions[IconNames.Tortoise] = `
                                        . . . . .
                                        . # # # .
                                        # # # # #
                                        . # . # .
                                        . . . . .`;
            iconDefinitions[IconNames.Butterfly] = `
                                        # # . # #
                                        # # # # #
                                        . . # . .
                                        # # # # #
                                        # # . # #`;
            iconDefinitions[IconNames.StickFigure] = `
                                        . . # . .
                                        # # # # #
                                        . . # . .
                                        . # . # .
                                        # . . . #`;
            iconDefinitions[IconNames.Ghost] = `
                                        . # # # .
                                        # . # . #
                                        # # # # #
                                        # # # # #
                                        # . # . #`;
            iconDefinitions[IconNames.Sword] = `
                                        . . # . .
                                        . . # . .
                                        . . # . .
                                        . # # # .
                                        . . # . .`;
            iconDefinitions[IconNames.Giraffe] = `
                                        # # . . .
                                        . # . . .
                                        . # . . .
                                        . # # # .
                                        . # . # .`;
            iconDefinitions[IconNames.Skull] = `
                                        . # # # .
                                        # . # . #
                                        # # # # #
                                        . # # # .
                                        . # # # .`;
            iconDefinitions[IconNames.Umbrella] = `
                                        . # # # .
                                        # # # # #
                                        . . # . .
                                        # . # . .
                                        # # # . .`;
            iconDefinitions[IconNames.Snake] = `
                                        # # . . .
                                        # # . # #
                                        . # . # .
                                        . # # # .
                                        . . . . .`;
                                        // animals    
            iconDefinitions[IconNames.Rabbit] = `
                                        # . # . .
                                        # . # . .
                                        # # # # .
                                        # # . # .
                                        # # # # .`;
            iconDefinitions[IconNames.Cow] = `
                                        # . . . #
                                        # . . . #
                                        # # # # #
                                        . # # # .
                                        . . # . .`;
                                        // musical notes
            iconDefinitions[IconNames.QuarterNote] = `
                                        . . # . .
                                        . . # . .
                                        . . # . .
                                        # # # . .
                                        # # # . .`;
            iconDefinitions[IconNames.EigthNote] = `
                                        . . # . .
                                        . . # # .
                                        . . # . #
                                        # # # . .
                                        # # # . .`;
                                        // other icons
            iconDefinitions[IconNames.Pitchfork] = `
                                        # . # . #
                                        # . # . #
                                        # # # # #
                                        . . # . .
                                        . . # . .`;
            iconDefinitions[IconNames.Pacman] = `
                                        . # # # #
                                        # # # # .
                                        # # # . .
                                        # # # # .
                                        . # # # #`;
            iconDefinitions[IconNames.Target] = `
                                        . . # . .
                                        . # # # .
                                        # # . # #
                                        . # # # .
                                        . . # . .`;
        }
    }

    //% weight=50 blockGap=8
    //% blockId=device_arrow block="%arrow"
    //% shim=TD_ID
    export function arrowNumber(arrow: ArrowNames): number {
        return arrow;
    }

    //% weight=50 blockGap=8
    //% blockId=builtin_arrow_image block="arrow image %i=device_arrow"
    export function arrowImage(i: ArrowNames): Image {
        initArrows();
        let res = images.createImage(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        if (i < arrowDefinitions.length) {
            return set(res, arrowDefinitions[i]);
        }
        return res;
    }

    //% weight=50 blockGap=8
    //% blockId=builtin_image block="icon image %i"
    export function iconImage(i: IconNames): Image {
        initIcons();
        let res = images.createImage(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        if (i < iconDefinitions.length) {
            return set(res, iconDefinitions[i])
        }
        return res;
    }

    function set(res: Image, s: string) {
        let j = 0;
        for (let x of s) {
            if (x == "." || x == "#") {
                res.setPixel(j % 5, j / 5, x == "#")
                j++
            }
        }
        return res
    }
}
