/// <reference path="../node_modules/@types/react/index.d.ts"/>
/// <reference path="../node_modules/@types/react-dom/index.d.ts"/>

namespace pxt.editor.microbit {
    export function webUsbPairDialogAsync(confirmAsync: (options: any) => Promise<number>): Promise<number> {
        const boardName = pxt.appTarget.appTheme.boardName || "???";
        const docUrl = pxt.appTarget.appTheme.usbDocs;
        const jsx =
            <div className="ui grid stackable">
                <div className="column five wide firmware">
                    <div className="ui header">{lf("First time here?")}</div>
                    <strong className="ui small">{lf("You must have version 0249 or above of the firmware")}</strong>
                    <div className="image">
                        <img className="ui image" src="./static/download/firmware.png" />
                    </div>
                    <a href="${docUrl}/webusb/troubleshoot" target="_blank">{lf("Check your firmware version here and update if needed")}</a>
                </div>
                <div className="column eleven wide instructions">
                    <div className="ui grid">
                        <div className="row">
                            <div className="column">
                                <div className="ui two column grid padded">
                                    <div className="column">
                                        <div className="ui">
                                            <div className="image">
                                                <img className="ui medium rounded image" src="./static/download/connect.png" />
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
                                                <img className="ui medium rounded image" src="./static/download/pair.png" />
                                            </div>
                                            <div className="content">
                                                <div className="description">
                                                    <span className="ui purple circular label">2</span>
                                                    <strong>{lf("Pair your {0}", boardName)}</strong>
                                                    <br />
                                                    <span className="ui small">{lf("Click 'Pair device' below and select <strong>BBC micro:bit CMSIS-DAP</strong> or <strong>DAPLink CMSIS-DAP</strong> from the list")}</span>
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

        const buttons: any[] = [];
        if (docUrl) {
            buttons.push({
                label: lf("Help"),
                icon: "help",
                className: "lightgrey",
                url: `${docUrl}/webusb`
            });
        }

        return confirmAsync({
            header: lf("Pair device for one-click downloads"),
            jsx,
            hasCloseIcon: true,
            agreeLbl: lf("Pair device"),
            agreeIcon: "usb",
            hideCancel: true,
            className: 'downloaddialog',
            buttons
        });
    }

    export function showUploadInstructionsAsync(fn: string, url: string, confirmAsync: (options: any) => Promise<number>) {
        const boardName = Util.htmlEscape(pxt.appTarget.appTheme.boardName || "???");
        const boardDriveName = Util.htmlEscape(pxt.appTarget.appTheme.driveDisplayName || pxt.appTarget.compile.driveName || "???");

        // https://msdn.microsoft.com/en-us/library/cc848897.aspx
        // "For security reasons, data URIs are restricted to downloaded resources.
        // Data URIs cannot be used for navigation, for scripting, or to populate frame or iframe elements"
        const userDownload = pxt.BrowserUtils.isBrowserDownloadWithinUserContext();
        const downloadAgain = !pxt.BrowserUtils.isIE() && !pxt.BrowserUtils.isEdge();
        const docUrl = pxt.appTarget.appTheme.usbDocs;

        const body =
            userDownload
                ? lf("Click 'Download' to open the {0} app.", pxt.appTarget.appTheme.boardName || "")
                : undefined;
        const jsx = !userDownload ?
            <div className="ui grid stackable upload">
                <div className="column sixteen wide instructions">
                    <div className="ui grid">
                        <div className="row">
                            <div className="column">
                                <div className="ui two column grid padded">
                                    <div className="column">
                                        <div className="ui">
                                            <div className="image">
                                                <img className="ui medium rounded image" src="./static/download/connect.png" />
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
                                                <img className="ui medium rounded image" src="./static/download/transfer.png" />
                                            </div>
                                            <div className="content">
                                                <div className="description">
                                                    <span className="ui purple circular label">2</span>
                                                    <strong>{lf("Move the .hex file to the {0}", boardName)}</strong>
                                                    <br />
                                                    <span className="ui small">{lf("Locate the downloaded .hex file and drag it to the <strong>{0}</strong> drive", boardDriveName)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : undefined;

        const buttons: any[] = [];

        if (downloadAgain) {
            buttons.push({
                label: userDownload ? lf("Download") : fn,
                icon: "download",
                class: `${userDownload ? "primary" : "lightgrey"}`,
                url,
                fileName: fn
            });
        }

        if (docUrl) {
            buttons.push({
                label: lf("Help"),
                icon: "help",
                className: "lightgrey",
                url: docUrl
            });
        }

        return confirmAsync({
            header: lf("Download to your {0}", pxt.appTarget.appTheme.boardName),
            body,
            jsx,
            hasCloseIcon: true,
            hideCancel: true,
            hideAgree: true,
            className: 'downloaddialog',
            buttons
            //timeout: 20000
        }).then(() => { });
    }
}