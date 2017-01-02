/// <reference path="../node_modules/pxt-core/typings/globals/bluebird/index.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtrunner.d.ts"/>

//HACK: allows instructions.html to access pxtblocks without requiring simulator.html to import blocks as well
if (!(<any>window).pxt) (<any>window).pxt = {};
import pxtrunner = pxt.runner;
import pxtdocs = pxt.docs;

namespace pxsim.instructions {
    export function drawInstructions() {
        pxsim.visuals.mkBoardView = (opts: pxsim.visuals.BoardViewOptions): pxsim.visuals.BoardView => {
            return new visuals.MicrobitBoardSvg({
                runtime: runtime,
                theme: visuals.randomTheme(),
                disableTilt: false,
                wireframe: opts.wireframe,
            });
        }

        let getQsVal = parseQueryString();

        //project name
        let name = getQsVal("name") || "Untitled";

        // board def
        const boardDef = JSON.parse(getQsVal("board")) as pxsim.BoardDefinition;

        //parts list
        let parts = (getQsVal("parts") || "").split(" ");
        parts.sort();

        // parts definitions
        let partDefinitions = JSON.parse(getQsVal("partdefs") || "{}") as pxsim.Map<PartDefinition>

        //fn args
        let fnArgs = JSON.parse((getQsVal("fnArgs") || "{}"));

        //project code
        let tsCode = getQsVal("code");
        let tsPackage = getQsVal("package") || "";
        let codeSpinnerDiv = document.getElementById("proj-code-spinner");
        let codeContainerDiv = document.getElementById("proj-code-container");
        if (tsCode) {
            //we use the docs renderer to decompile the code to blocks and render it
            //TODO: render the blocks code directly
            let md =
                `\`\`\`blocks
${tsCode}
\`\`\`
\`\`\`package
${tsPackage}
\`\`\`
`

            pxtdocs.requireMarked = function () { return (<any>window).marked; }
            pxtrunner.renderMarkdownAsync(codeContainerDiv, md)
                .done(function () {
                    let codeSvg = $("#proj-code-container svg");
                    if (codeSvg.length > 0) {
                        //code rendered successfully as blocks
                        codeSvg.css("width", "inherit");
                        codeSvg.css("height", "inherit");
                        //takes the svg out of the wrapper markdown
                        codeContainerDiv.innerHTML = "";
                        codeContainerDiv.appendChild(codeSvg[0]);
                    } else {
                        //code failed to convert to blocks, display as typescript instead
                        codeContainerDiv.innerText = tsCode;
                    }
                    $(codeContainerDiv).show();
                    $(codeSpinnerDiv).hide();
                });
        }


        if (name)
            $("#proj-title").text(name);

        //init runtime
        if (!pxsim.initCurrentRuntime)
            pxsim.initCurrentRuntime = initRuntimeWithDalBoard;

        renderParts({
            name,
            boardDef,
            parts,
            partDefinitions,
            fnArgs
        })
    }
}