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


export async function showProgramTooLargeErrorAsync(variants: string[], confirmAsync: (opts: any) => Promise<number>, saveOnly?: boolean) {
    if (variants.length !== 2) {
        if (variants[0] !== "mbcodal") return undefined;
        await confirmAsync({
            header: lf("Oops, there was a problem downloading your code"),
            body: lf("Great coding skills! Unfortunately, your program is too large to fit on a micro:bit V2😢. You can go back and try to make your program smaller, or continue to use the simulator to run your code."),
            bigHelpButton: true,
            hideAgree: true,
            disagreeLbl: lf("Go Back"),
            disagreeClass: "positive",
        });
        return undefined
    }

    if (pxt.packetio.isConnected() && pxt.packetio.deviceVariant() === "mbcodal" && !saveOnly) {
        // connected micro:bit V2 will be flashed; don't give warning dialog
        return {
            recompile: true,
            useVariants: ["mbcodal"]
        }
    }

    const choice = await confirmAsync({
        header: lf("Oops, there was a problem downloading your code"),
        body: lf("Great coding skills! Unfortunately, your program is too large to fit on a micro:bit V1😢. You can go back and try to make your program smaller, or you can download your program onto a micro:bit V2."),
        bigHelpButton: true,
        agreeLbl: lf("Go Back"),
        agreeClass: "cancel",
        agreeIcon: "cancel",
        disagreeLbl: lf("Download for V2 only"),
        disagreeClass: "positive",
        disagreeIcon: "checkmark"
    });

    if (!choice) {
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
