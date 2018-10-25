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
    //% jres=icons.heart
    Heart = 0,
    //% block="small heart"
    //% jres=icons.smallheart
    SmallHeart,
    //% block="yes"
    //% jres=icons.yes
    Yes,
    //% block="no"
    //% jres=icons.no
    No,
    //% block="happy"
    //% jres=icons.happy
    Happy,
    //% block="sad"
    //% jres=icons.sad
    Sad,
    //% block="confused"
    //% jres=icons.confused
    Confused,
    //% block="angry"
    //% jres=icons.angry
    Angry,
    //% block="asleep"
    //% jres=icons.asleep
    Asleep,
    //% block="surprised"
    //% jres=icons.surprised
    Surprised,
    //% block="silly"
    //% jres=icons.silly
    Silly,
    //% block="fabulous"
    //% jres=icons.fabulous
    Fabulous,
    //% block="meh"
    //% jres=icons.meh
    Meh,
    //% block="t-shirt"
    //% jres=icons.tshirt
    TShirt,
    //% block="roller skate"
    //% jres=icons.rollerskate
    Rollerskate,
    //% block="duck"
    //% jres=icons.duck
    Duck,
    //% block="house"
    //% jres=icons.house
    House,
    //% block="tortoise"
    //% jres=icons.tortoise
    Tortoise,
    //% block="butterfly"
    //% jres=icons.butterfly
    Butterfly,
    //% block="stick figure"
    //% jres=icons.stickfigure
    StickFigure,
    //% block="ghost"
    //% jres=icons.ghost
    Ghost,
    //% block="sword"
    //% jres=icons.sword
    Sword,
    //% block="giraffe"
    //% jres=icons.giraffe
    Giraffe,
    //% block="skull"
    //% jres=icons.skull
    Skull,
    //% block="umbrella"
    //% jres=icons.umbrella
    Umbrella,
    //% block="snake"
    //% jres=icons.snake
    Snake,
    //% block="rabbit"
    //% jres=icons.rabbit
    Rabbit,
    //% block="cow"
    //% jres=icons.cow
    Cow,
    //% block="quarter note"
    //% jres=icons.quarternote
    QuarterNote,
    //% block="eigth note"
    //% jres=icons.eigthnote
    EigthNote,
    //% block="pitchfork"
    //% jres=icons.pitchfork
    Pitchfork,
    //% block="target"
    //% jres=icons.target
    Target,
    //% block="triangle"
    //% jres=icons.triangle
    Triangle,
    //% block="left triangle"
    //% jres=icons.lefttriangle
    LeftTriangle,
    //% block="chess board"
    //% jres=icons.chessboard
    Chessboard,
    //% block="diamond"
    //% jres=icons.diamond
    Diamond,
    //% block="small diamond"
    //% jres=icons.smalldiamond
    SmallDiamond,
    //% block="square"
    //% jres=icons.square
    Square,
    //% block="small square"
    //% jres=icons.smallsquare
    SmallSquare,
    //% block="scissors"
    //% jres=icons.scissors
    Scissors
}

enum ArrowNames {
    //% blockIdentity=images.arrowNumber block="North"
    North = 0,
    //% blockIdentity=images.arrowNumber block="North East"
    NorthEast,
    //% blockIdentity=images.arrowNumber block="East"
    East,
    //% blockIdentity=images.arrowNumber block="South East"
    SouthEast,
    //% blockIdentity=images.arrowNumber block="South"
    South,
    //% blockIdentity=images.arrowNumber block="South West"
    SouthWest,
    //% blockIdentity=images.arrowNumber block="West"
    West,
    //% blockIdentity=images.arrowNumber block="North West"
    NorthWest,
}

namespace basic {

    /**
     * Draws the selected icon on the LED screen
     * @param icon the predifined icon id
     * @param interval the amount of time (milliseconds) to show the icon. Default is 600.
     */
    //% weight=90 blockGap=8
    //% blockId=basic_show_icon
    //% block="show icon %i" icon="\uf00a"
    //% parts="ledmatrix"
    //% help=basic/show-icon
    //% icon.fieldEditor="imagedropdown"
    //% icon.fieldOptions.columns="5"
    //% icon.fieldOptions.width="380"
    //% icon.fieldOptions.maxRows=4
    export function showIcon(icon: IconNames, interval = 600) {
        let res = images.iconImage(icon)
        res.showImage(0, interval)
    }

    /**
     * Draws an arrow on the LED screen
     * @param direction the direction of the arrow
     * @param interval the amount of time (milliseconds) to show the icon. Default is 600.
     */
    //% weight=50 blockGap=8
    //% blockId=basic_show_arrow
    //% block="show arrow %i=device_arrow"
    //% parts="ledmatrix"
    //% advanced=true
    //% help=basic/show-arrow
    export function showArrow(direction: number, interval = 600) {
        let res = images.arrowImage(direction)
        res.showImage(0, interval)
    }
}


namespace images {

    //% weight=50 blockGap=8
    //% help=images/arrow-image
    //% blockId=builtin_arrow_image block="arrow image %i=device_arrow"
    export function arrowImage(i: ArrowNames): Image {
        switch (i) {
            // compass directions
            case ArrowNames.North: return images.createImage(`
                                        . . # . .
                                        . # # # .
                                        # . # . #
                                        . . # . .
                                        . . # . .`);
            case ArrowNames.NorthEast: return images.createImage(`
                                        . . # # #
                                        . . . # #
                                        . . # . #
                                        . # . . .
                                        # . . . .`);
            case ArrowNames.East: return images.createImage(`
                                        . . # . .
                                        . . . # .
                                        # # # # #
                                        . . . # .
                                        . . # . .`);
            case ArrowNames.SouthEast: return images.createImage(`
                                        # . . . .
                                        . # . . .
                                        . . # . #
                                        . . . # #
                                        . . # # #`);
            case ArrowNames.South: return images.createImage(`
                                        . . # . .
                                        . . # . .
                                        # . # . #
                                        . # # # .
                                        . . # . .`);
            case ArrowNames.SouthWest: return images.createImage(`
                                        . . . . #
                                        . . . # .
                                        # . # . .
                                        # # . . .
                                        # # # . .`);
            case ArrowNames.West: return images.createImage(`
                                        . . # . .
                                        . # . . .
                                        # # # # #
                                        . # . . .
                                        . . # . .`);
            case ArrowNames.NorthWest: return images.createImage(`
                                        # # # . .
                                        # # . . .
                                        # . # . .
                                        . . . # .
                                        . . . . #`);
            default: return images.createImage(`
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        `);
        }
    }

    //% weight=50 blockGap=8
    //% help=images/icon-image
    //% blockId=builtin_image block="icon image %i"
    //% i.fieldEditor="imagedropdown"
    //% i.fieldOptions.columns="5"
    //% i.fieldOptions.width="380"
    //% i.fieldOptions.maxRows=4
    export function iconImage(i: IconNames): Image {
        switch (i) {
            case IconNames.Heart: return images.createImage(`
                                        . # . # .
                                        # # # # #
                                        # # # # #
                                        . # # # .
                                        . . # . .`);

            case IconNames.SmallHeart: return images.createImage(`
                                        . . . . .
                                        . # . # .
                                        . # # # .
                                        . . # . .
                                        . . . . .`);
            //faces
            case IconNames.Happy: return images.createImage(`
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        # . . . #
                                        . # # # .`);
            case IconNames.Sad: return images.createImage(`
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        . # # # .
                                        # . . . #`);
            case IconNames.Confused: return images.createImage(`
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        . # . # .
                                        # . # . #`);
            case IconNames.Angry: return images.createImage(`
                                        # . . . #
                                        . # . # .
                                        . . . . .
                                        # # # # #
                                        # . # . #`);
            case IconNames.Asleep: return images.createImage(`
                                        . . . . .
                                        # # . # #
                                        . . . . .
                                        . # # # .
                                        . . . . .`);
            case IconNames.Surprised: return images.createImage(`
                                        . # . # .
                                        . . . . .
                                        . . # . .
                                        . # . # .
                                        . . # . .`);
            case IconNames.Silly: return images.createImage(`
                                        # . . . #
                                        . . . . .
                                        # # # # #
                                        . . . # #
                                        . . . # #`);
            case IconNames.Fabulous: return images.createImage(`
                                        # # # # #
                                        # # . # #
                                        . . . . .
                                        . # . # .
                                        . # # # .`);
            case IconNames.Meh: return images.createImage(`
                                        # # . # #
                                        . . . . .
                                        . . . # .
                                        . . # . .
                                        . # . . .`);
            case IconNames.Yes: return images.createImage(`
                                        . . . . .
                                        . . . . #
                                        . . . # .
                                        # . # . .
                                        . # . . .`);
            case IconNames.No: return images.createImage(`
                                        # . . . #
                                        . # . # .
                                        . . # . .
                                        . # . # .
                                        # . . . #`);
            case IconNames.Triangle: return images.createImage(`
                                        . . . . .
                                        . . # . .
                                        . # . # .
                                        # # # # #
                                        . . . . .`);
            case IconNames.LeftTriangle: return images.createImage(`
                                        # . . . .
                                        # # . . .
                                        # . # . .
                                        # . . # .
                                        # # # # #`);
            case IconNames.Chessboard: return images.createImage(`
                                        . # . # .
                                        # . # . #
                                        . # . # .
                                        # . # . #
                                        . # . # .`);
            case IconNames.Diamond: return images.createImage(`
                                        . . # . .
                                        . # . # .
                                        # . . . #
                                        . # . # .
                                        . . # . .`);
            case IconNames.SmallDiamond: return images.createImage(`
                                        . . . . .
                                        . . # . .
                                        . # . # .
                                        . . # . .
                                        . . . . .`);
            case IconNames.Square: return images.createImage(`
                                        # # # # #
                                        # . . . #
                                        # . . . #
                                        # . . . #
                                        # # # # #`);
            case IconNames.SmallSquare: return images.createImage(`
                                        . . . . .
                                        . # # # .
                                        . # . # .
                                        . # # # .
                                        . . . . .`);

            case IconNames.Scissors: return images.createImage(`
                                        # # . . #
                                        # # . # .
                                        . . # . .
                                        # # . # .
                                        # # . . #`);
            // The following images were designed by Abbie Brooks.
            case IconNames.TShirt: return images.createImage(`
                                        # # . # #
                                        # # # # #
                                        . # # # .
                                        . # # # .
                                        . # # # .`);
            case IconNames.Rollerskate: return images.createImage(`
                                        . . . # #
                                        . . . # #
                                        # # # # #
                                        # # # # #
                                        . # . # .`);
            case IconNames.Duck: return images.createImage(`
                                        . # # . .
                                        # # # . .
                                        . # # # #
                                        . # # # .
                                        . . . . .`);
            case IconNames.House: return images.createImage(`
                                        . . # . .
                                        . # # # .
                                        # # # # #
                                        . # # # .
                                        . # . # .`);
            case IconNames.Tortoise: return images.createImage(`
                                        . . . . .
                                        . # # # .
                                        # # # # #
                                        . # . # .
                                        . . . . .`);
            case IconNames.Butterfly: return images.createImage(`
                                        # # . # #
                                        # # # # #
                                        . . # . .
                                        # # # # #
                                        # # . # #`);
            case IconNames.StickFigure: return images.createImage(`
                                        . . # . .
                                        # # # # #
                                        . . # . .
                                        . # . # .
                                        # . . . #`);
            case IconNames.Ghost: return images.createImage(`
                                        . # # # .
                                        # . # . #
                                        # # # # #
                                        # # # # #
                                        # . # . #`);
            case IconNames.Sword: return images.createImage(`
                                        . . # . .
                                        . . # . .
                                        . . # . .
                                        . # # # .
                                        . . # . .`);
            case IconNames.Giraffe: return images.createImage(`
                                        # # . . .
                                        . # . . .
                                        . # . . .
                                        . # # # .
                                        . # . # .`);
            case IconNames.Skull: return images.createImage(`
                                        . # # # .
                                        # . # . #
                                        # # # # #
                                        . # # # .
                                        . # # # .`);
            case IconNames.Umbrella: return images.createImage(`
                                        . # # # .
                                        # # # # #
                                        . . # . .
                                        # . # . .
                                        # # # . .`);
            case IconNames.Snake: return images.createImage(`
                                        # # . . .
                                        # # . # #
                                        . # . # .
                                        . # # # .
                                        . . . . .`);
            // animals
            case IconNames.Rabbit: return images.createImage(`
                                        # . # . .
                                        # . # . .
                                        # # # # .
                                        # # . # .
                                        # # # # .`);
            case IconNames.Cow: return images.createImage(`
                                        # . . . #
                                        # . . . #
                                        # # # # #
                                        . # # # .
                                        . . # . .`);
            // musical notes
            case IconNames.QuarterNote: return images.createImage(`
                                        . . # . .
                                        . . # . .
                                        . . # . .
                                        # # # . .
                                        # # # . .`);
            case IconNames.EigthNote: return images.createImage(`
                                        . . # . .
                                        . . # # .
                                        . . # . #
                                        # # # . .
                                        # # # . .`);
            // other icons
            case IconNames.Pitchfork: return images.createImage(`
                                        # . # . #
                                        # . # . #
                                        # # # # #
                                        . . # . .
                                        . . # . .`);
            case IconNames.Target: return images.createImage(`
                                        . . # . .
                                        . # # # .
                                        # # . # #
                                        . # # # .
                                        . . # . .`);
            default: return images.createImage(`
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        `);
        }
    }

    //% weight=50 blockGap=8
    //% help=images/arrow-number
    //% blockId=device_arrow block="%arrow"
    //% shim=TD_ID
    export function arrowNumber(arrow: ArrowNames): number {
        return arrow;
    }
}
