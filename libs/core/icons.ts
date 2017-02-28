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
    //% blockImage=1
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
    //% help=basic/show-icon
    export function showIcon(icon: IconNames) {
        let res = images.iconImage(icon)
        res.showImage(0)
    }

    //% weight=50 blockGap=8
    //% blockId=basic_show_arrow 
    //% block="show arrow %i=device_arrow"
    //% parts="ledmatrix"
    //% advanced=true
    //% help=basic/show-arrow
    export function showArrow(i: number) {
        let res = images.arrowImage(i)
        res.showImage(0)
    }
}


namespace images {

    function getArrow(i : ArrowNames): string {
            switch(i) {
            // compass directions
            case ArrowNames.North: return `    
                                        . . # . .
                                        . # # # .
                                        # . # . #
                                        . . # . .
                                        . . # . .`;
            case ArrowNames.NorthEast: return ` 
                                        . . # # #
                                        . . . # #
                                        . . # . #
                                        . # . . .
                                        # . . . .`;
            case  ArrowNames.East: return ` 
                                        . . # . .
                                        . . . # .
                                        # # # # #
                                        . . . # .
                                        . . # . .`;
            case ArrowNames.SouthEast: return ` 
                                        # . . . .
                                        . # . . .
                                        . . # . #
                                        . . . # #
                                        . . # # #`;
            case ArrowNames.South: return ` 
                                        . . # . .
                                        . . # . .
                                        # . # . #
                                        . # # # .
                                        . . # . .`;
            case ArrowNames.SouthWest: return ` 
                                        . . . . #
                                        . . . # .
                                        # . # . .
                                        # # . . .
                                        # # # . .`;
            case ArrowNames.West: return ` 
                                        . . # . .
                                        . # . . .
                                        # # # # #
                                        . # . . .
                                        . . # . .`;
            case ArrowNames.NorthWest: return ` 
                                        # # # . .
                                        # # . . .
                                        # . # . .
                                        . . . # .
                                        . . . . #`;
            default:                return `
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        `;
       }
    }
    
    function getIcon(i: IconNames): string {

            switch (i) {
            case IconNames.Heart : return `
                                        . # . # .
                                        # # # # #
                                        # # # # #
                                        . # # # .
                                        . . # . .`;

            case IconNames.SmallHeart : return `
                                        . . . . .
                                        . # . # .
                                        . # # # .
                                        . . # . .
                                        . . . . .`;
                                            //faces
            case IconNames.Happy: return `
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        # . . . #
                                        . # # # .`;
            case IconNames.Sad: return `
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        . # # # .
                                        # . . . #`;
            case IconNames.Confused: return `
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        . # . # .
                                        # . # . #`;
            case IconNames.Angry: return `
                                        # . . . #
                                        . # . # .
                                        . . . . .
                                        # # # # #
                                        # . # . #`;
            case IconNames.Asleep: return `
                                        . . . . .
                                        # # . # #
                                        . . . . .
                                        . # # # .
                                        . . . . .`;
            case IconNames.Surprised: return `
                                        . # . # .
                                        . . . . .
                                        . . # . .
                                        . # . # .
                                        . . # . .`;
            case IconNames.Silly: return `
                                        # . . . #
                                        . . . . .
                                        # # # # #
                                        . . . # #
                                        . . . # #`;
            case IconNames.Fabulous: return `
                                        # # # # #
                                        # # . # #
                                        . . . . .
                                        . # . # .
                                        . # # # .`;
            case IconNames.Meh: return `
                                        # # . # #
                                        . . . . .
                                        . . . # .
                                        . . # . .
                                        . # . . .`;
            case IconNames.Yes: return `
                                        . . . . .
                                        . . . . #
                                        . . . # .
                                        # . # . .
                                        . # . . .`;
            case IconNames.No: return `
                                        # . . . #
                                        . # . # .
                                        . . # . .
                                        . # . # .
                                        # . . . #`;
            case IconNames.Triangle: return `
                                        . . . . .
                                        . . # . .
                                        . # . # .
                                        # # # # #
                                        . . . . .`;
            case IconNames.LeftTriangle: return `
                                        # . . . .
                                        # # . . .
                                        # . # . .
                                        # . . # .
                                        # # # # #`;
            case IconNames.Chessboard: return `
                                        . # . # .
                                        # . # . #
                                        . # . # .
                                        # . # . #
                                        . # . # .`;
            case IconNames.Diamond: return `
                                        . . # . .
                                        . # . # .
                                        # . . . #
                                        . # . # .
                                        . . # . .`;
            case IconNames.SmallDiamond: return `
                                        . . . . .
                                        . . # . .
                                        . # . # .
                                        . . # . .
                                        . . . . .`;
            case IconNames.Square: return `
                                        # # # # #
                                        # . . . #
                                        # . . . #
                                        # . . . #
                                        # # # # #`;
            case IconNames.SmallSquare: return `
                                        . . . . .
                                        . # # # .
                                        . # . # .
                                        . # # # .
                                        . . . . .`;
                                            // The following images were designed by Abbie Brooks.
            case IconNames.TShirt: return `
                                        # # . # #
                                        # # # # #
                                        . # # # .
                                        . # # # .
                                        . # # # .`;
            case IconNames.Rollerskate: return `
                                        . . . # #
                                        . . . # #
                                        # # # # #
                                        # # # # #
                                        . # . # .`;
            case IconNames.Duck: return `
                                        . # # . .
                                        # # # . .
                                        . # # # #
                                        . # # # .
                                        . .. . .`;
            case IconNames.House: return `
                                        . . # . .
                                        . # # # .
                                        # # # # #
                                        . # # # .
                                        . # . # .`;
            case IconNames.Tortoise: return `
                                        . . . . .
                                        . # # # .
                                        # # # # #
                                        . # . # .
                                        . . . . .`;
            case IconNames.Butterfly: return `
                                        # # . # #
                                        # # # # #
                                        . . # . .
                                        # # # # #
                                        # # . # #`;
            case IconNames.StickFigure: return `
                                        . . # . .
                                        # # # # #
                                        . . # . .
                                        . # . # .
                                        # . . . #`;
            case IconNames.Ghost: return `
                                        . # # # .
                                        # . # . #
                                        # # # # #
                                        # # # # #
                                        # . # . #`;
            case IconNames.Sword: return `
                                        . . # . .
                                        . . # . .
                                        . . # . .
                                        . # # # .
                                        . . # . .`;
            case IconNames.Giraffe: return `
                                        # # . . .
                                        . # . . .
                                        . # . . .
                                        . # # # .
                                        . # . # .`;
            case IconNames.Skull: return `
                                        . # # # .
                                        # . # . #
                                        # # # # #
                                        . # # # .
                                        . # # # .`;
            case IconNames.Umbrella: return `
                                        . # # # .
                                        # # # # #
                                        . . # . .
                                        # . # . .
                                        # # # . .`;
            case IconNames.Snake: return `
                                        # # . . .
                                        # # . # #
                                        . # . # .
                                        . # # # .
                                        . . . . .`;
                                        // animals    
            case IconNames.Rabbit: return `
                                        # . # . .
                                        # . # . .
                                        # # # # .
                                        # # . # .
                                        # # # # .`;
            case IconNames.Cow: return `
                                        # . . . #
                                        # . . . #
                                        # # # # #
                                        . # # # .
                                        . . # . .`;
                                        // musical notes
            case IconNames.QuarterNote: return `
                                        . . # . .
                                        . . # . .
                                        . . # . .
                                        # # # . .
                                        # # # . .`;
            case IconNames.EigthNote: return `
                                        . . # . .
                                        . . # # .
                                        . . # . #
                                        # # # . .
                                        # # # . .`;
                                        // other icons
            case IconNames.Pitchfork: return `
                                        # . # . #
                                        # . # . #
                                        # # # # #
                                        . . # . .
                                        . . # . .`;
            case IconNames.Pacman: return `
                                        . # # # #
                                        # # # # .
                                        # # # . .
                                        # # # # .
                                        . # # # #`;
            case IconNames.Target: return `
                                        . . # . .
                                        . # # # .
                                        # # . # #
                                        . # # # .
                                        . . # . .`;
            default:                return `
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        `;
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
        let res = images.createImage(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        return set(res, getArrow(i));
    }

    //% weight=50 blockGap=8
    //% blockId=builtin_image block="icon image %i"
    export function iconImage(i: IconNames): Image {
        let res = images.createImage(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        return set(res, getIcon(i));
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
