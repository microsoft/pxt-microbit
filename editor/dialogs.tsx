import * as React from "react";

export function webUsbPairDialogAsync(confirmAsync: (options: any) => Promise<number>): Promise<number> {
    const boardName = pxt.appTarget.appTheme.boardName || "???";
    const helpUrl = pxt.appTarget.appTheme.usbDocs;
    const jsx =
        <div className="ui grid stackable">
            <div className="column five wide firmware">
                <div className="ui header">{lf("First time here?")}</div>
                <strong className="ui small">{lf("You must have version 0249 or above of the firmware")}</strong>
                <div className="image">
                    <img alt={lf("Comic rainbow updating micro:bit firmware")} className="ui image" src="./static/download/firmware.png" />
                </div>
                <a href={`${helpUrl}/webusb/troubleshoot`} target="_blank">{lf("Check your firmware version here and update if needed")}</a>
            </div>
            <div className="column eleven wide instructions">
                <div className="ui grid">
                    <div className="row">
                        <div className="column">
                            <div className="ui two column grid padded">
                                <div className="column">
                                    <div className="ui">
                                        <div className="image">
                                            <img alt={lf("Comic connecting micro:bit to computer")} className="ui medium rounded image" src="./static/download/connect.png" />
                                        </div>
                                        <div className="content">
                                            <div className="description">
                                                <span className="ui purple circular label">1</span>
                                                <strong>{lf("Connect the {0} to your computer with a USB cable", boardName)}</strong>
                                                <br />
                                                <span className="ui small">{lf("Use the microUSB port on the top of the {0}", boardName)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="ui">
                                        <div className="image">
                                            <img alt={lf("Comic of successful micro:bit connection")} className="ui medium rounded image" src="./static/download/pair.png" />
                                        </div>
                                        <div className="content">
                                            <div className="description">
                                                <span className="ui purple circular label">2</span>
                                                <strong>{lf("Pair your {0}", boardName)}</strong>
                                                <br />
                                                <span className="ui small">{lf("Click 'Pair device' below and select BBC micro:bit CMSIS-DAP or DAPLink CMSIS-DAP from the list")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;

    return confirmAsync({
        header: lf("Pair device for one-click downloads"),
        jsx,
        hasCloseIcon: true,
        agreeLbl: lf("Pair device"),
        agreeIcon: "usb",
        hideCancel: true,
        helpUrl,
        className: 'downloaddialog'
    });
}

export function renderBrowserDownloadInstructions(): JSX.Element {
    const boardName = pxt.appTarget.appTheme.boardName || lf("device");
    const boardDriveName = pxt.appTarget.appTheme.driveDisplayName || pxt.appTarget.compile.driveName || "???";
    return <div className="ui grid stackable upload">
            <div className="column sixteen wide instructions">
                <div className="ui grid">
                    <div className="row">
                        <div className="column">
                            <div className="ui two column grid padded">
                                <div className="column">
                                    <div className="ui">
                                        <div className="image">
                                            <img alt={lf("Comic connecting micro:bit to computer")} className="ui medium rounded image" src="./static/download/connect.png" />
                                        </div>
                                        <div className="content">
                                            <div className="description">
                                                <span className="ui purple circular label">1</span>
                                                <strong>{lf("Connect the {0} to your computer with a USB cable", boardName)}</strong>
                                                <br />
                                                <span className="ui small">{lf("Use the microUSB port on the top of the {0}", boardName)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="ui">
                                        <div className="image">
                                            <img alt={lf("Comic moving hex file to micro:bit")} className="ui medium rounded image" src="./static/download/transfer.png" />
                                        </div>
                                        <div className="content">
                                            <div className="description">
                                                <span className="ui purple circular label">2</span>
                                                <strong>{lf("Move the .hex file to the {0}", boardName)}</strong>
                                                <br />
                                                <span className="ui small">{lf("Locate the downloaded .hex file and drag it to the {0} drive", boardDriveName)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
}

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
