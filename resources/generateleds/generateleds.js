var fs = require('fs');
var path = require('path');

// You need to npm install svg2png for this to work
var svg2png = require('svg2png');

var svgdir = "svg";
var outputdir = "out";

const svgNS = "http://www.w3.org/2000/svg";

const icons = {
    heart: `
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`,
    smallheart: `
    . . . . .
    . # . # .
    . # # # .
    . . # . .
    . . . . .`,
    happy: `
    . . . . .
    . # . # .
    . . . . .
    # . . . #
    . # # # .`,
    sad: `
    . . . . .
    . # . # .
    . . . . .
    . # # # .
    # . . . #`,
    confused: `
    . . . . .
    . # . # .
    . . . . .
    . # . # .
    # . # . #`,
    angry: `
    # . . . #
    . # . # .
    . . . . .
    # # # # #
    # . # . #`,
    asleep: `
    . . . . .
    # # . # #
    . . . . .
    . # # # .
    . . . . .`,
    surprised: `
    . # . # .
    . . . . .
    . . # . .
    . # . # .
    . . # . .`,
    silly: `
    # . . . #
    . . . . .
    # # # # #
    . . . # #
    . . . # #`,
    fabulous: `
    # # # # #
    # # . # #
    . . . . .
    . # . # .
    . # # # .`,
    meh: `
    # # . # #
    . . . . .
    . . . # .
    . . # . .
    . # . . .`,
    yes: `
    . . . . .
    . . . . #
    . . . # .
    # . # . .
    . # . . .`,
    no: `
    # . . . #
    . # . # .
    . . # . .
    . # . # .
    # . . . #`,
    triangle: `
    . . . . .
    . . # . .
    . # . # .
    # # # # #
    . . . . .`,
    lefttriangle: `
    # . . . .
    # # . . .
    # . # . .
    # . . # .
    # # # # #`,
    chessboard: `
    . # . # .
    # . # . #
    . # . # .
    # . # . #
    . # . # .`,
    diamond: `
    . . # . .
    . # . # .
    # . . . #
    . # . # .
    . . # . .`,
    smalldiamond: `
    . . . . .
    . . # . .
    . # . # .
    . . # . .
    . . . . .`,
    square: `
    # # # # #
    # . . . #
    # . . . #
    # . . . #
    # # # # #`,
    smallsquare: `
    . . . . .
    . # # # .
    . # . # .
    . # # # .
    . . . . .`,
    scissors: `
    # # . . #
    # # . # .
    . . # . .
    # # . # .
    # # . . #`,
    tshirt: `
    # # . # #
    # # # # #
    . # # # .
    . # # # .
    . # # # .`,
    rollerskate: `
    . . . # #
    . . . # #
    # # # # #
    # # # # #
    . # . # .`,
    duck: `
    . # # . .
    # # # . .
    . # # # #
    . # # # .
    . . . . .`,
    house: `
    . . # . .
    . # # # .
    # # # # #
    . # # # .
    . # . # .`,
    tortoise: `
    . . . . .
    . # # # .
    # # # # #
    . # . # .
    . . . . .`,
    butterfly: `
    # # . # #
    # # # # #
    . . # . .
    # # # # #
    # # . # #`,
    stickfigure: `
    . . # . .
    # # # # #
    . . # . .
    . # . # .
    # . . . #`,
    ghost: `
    . # # # .
    # . # . #
    # # # # #
    # # # # #
    # . # . #`,
    sword: `
    . . # . .
    . . # . .
    . . # . .
    . # # # .
    . . # . .`
    ,
    giraffe: `
    # # . . .
    . # . . .
    . # . . .
    . # # # .
    . # . # .`,
    skull: `
    . # # # .
    # . # . #
    # # # # #
    . # # # .
    . # # # .`,
    umbrella: `
    . # # # .
    # # # # #
    . . # . .
    # . # . .
    # # # . .`,
    snake: `
    # # . . .
    # # . # #
    . # . # .
    . # # # .
    . . . . .`,
    rabbit: `
    # . # . .
    # . # . .
    # # # # .
    # # . # .
    # # # # .`,
    cow: `
    # . . . #
    # . . . #
    # # # # #
    . # # # .
    . . # . .`,
    quarternote: `
    . . # . .
    . . # . .
    . . # . .
    # # # . .
    # # # . .`,
    eigthnote: `
    . . # . .
    . . # # .
    . . # . #
    # # # . .
    # # # . .`,
    pitchfork: `
    # . # . #
    # . # . #
    # # # # #
    . . # . .
    . . # . .`,
    target: `
    . . # . .
    . # # # .
    # # . # #
    . # # # .
    . . # . .`
}

Object.keys(icons).forEach(icon => {
    const data = icons[icon];
    const hexLiteral = data
        .replace(/[ \n`\(\)]/gi, '');

    var svg = `<svg xmlns="http://www.w3.org/2000/svg" height="200" width="200">`;
    const width = 200;
    const height = 200;
    for (var i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            const hexItemVal = hexLiteral[(i * 5) + j] ? hexLiteral[(i * 5) + j] == '#' : false;
            const x = j * (width / 5);
            const y = i * (height / 5);
            svg += `<rect y="0" x="0" width="25" height="25" rx="5" transform="translate(${x},${y})"
                style="${hexItemVal ? 'fill:#f00; stroke:#fff; stroke-width:2px;' : 'fill: #eee;'}"/>\n`;
        }
    }
    svg += `</svg>`;
    const svgPath = path.join(svgdir, icon + ".svg");
    fs.writeFile(svgPath, svg, { encoding: 'utf8', flag: 'w' })

    const sourceBuffer = Buffer.from(svg, 'utf8');
    svg2png(sourceBuffer, { width: 200, height: 200 })
        .then(buffer => fs.writeFile(path.join(outputdir, icon + "-icon.png"), buffer, { encoding: 'utf8', flag: 'w' }))
        .catch(e => console.error(e));
});