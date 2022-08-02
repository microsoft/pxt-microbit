import * as React from "react";

export function cantImportAsync(project: pxt.editor.IProjectView) {
    // this feature is support in v0 only
    return project.showModalDialogAsync({
        header: lf("Can't import microbit.co.uk scripts..."),
        body: lf("Importing microbit.co.uk programs is not supported in this editor anymore. Please open this script in the https://makecode.microbit.org/v0 editor."),
        buttons: [
            {
                label: lf("Go to the old editor"),
                url: `https://makecode.microbit.org/v0`
            }
        ]
    }).then(() => project.openHome())
}


export async function showProgramTooLargeErrorAsync(variants: string[], confirmAsync: (opts: any) => Promise<number>) {
    if (variants.length !== 2) return undefined;

    const choice = await confirmAsync({
        header: lf("Program too large..."),
        body: lf("Your program is too large to fit on the micro:bit V1! Would you like to try compiling for the micro:bit V2? This hex file will not be able to run on the micro:bit V1"),
        bigHelpButton: true,
        agreeLbl: lf("Download for V2")
    });

    if (choice) {
        return {
            recompile: true,
            useVariants: ["mbcodal"]
        }
    }
    return {
        recompile: false,
        useVariants: []
    }
}
