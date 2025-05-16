/// <reference path="../node_modules/pxt-core/localtypings/pxtblockly.d.ts"/>

const pxtblockly = pxt.blocks.requirePxtBlockly()
const Blockly = pxt.blocks.requireBlockly();

const WARNING_ID = "pinpicker_warning";

export class FieldPinPicker extends pxtblockly.FieldGridPicker {
    protected warningVisible: boolean;

    override init() {
        super.init();

        const sourceBlock = this.sourceBlock_;
        if (sourceBlock.isShadow() || sourceBlock.isInFlyout) {
            return;
        }

        sourceBlock.workspace.addChangeListener(this.changeListener);
    }

    private changeListener = (e: any) => {
        if (e.type === Blockly.Events.BLOCK_MOVE && e.blockId === this.sourceBlock_.id) {
            this.updateWarning();
        }
    }

    protected override doValueUpdate_(newValue: string): void {
        super.doValueUpdate_(newValue);
        this.updateWarning();
    }

    protected updateWarning() {
        this.hideWarning();
        const sourceBlock = this.sourceBlock_;

        if (!sourceBlock || !this.value_ || sourceBlock.isShadow() || sourceBlock.isInFlyout) {
            return;
        }

        const pin = this.value_.split(".")[1];

        if (!isAnalogWriteOnlyPin(pin)) {
            return;
        }

        const parent = sourceBlock.outputConnection.targetBlock();

        if (!parent || parent.type !== "device_get_analog_pin") {
            return;
        }

        this.showWarning(pin);
    }

    protected showWarning(pin: string) {
        if (!this.sourceBlock_) {
            return;
        }
        this.sourceBlock_.setWarningText(pxt.U.lf("{0} is a write only analog pin", pin), WARNING_ID);
    }

    protected hideWarning() {
        if (!this.sourceBlock_) {
            return;
        }
        this.sourceBlock_.setWarningText(null, WARNING_ID)
    }

    override dispose(): void {
        super.dispose();
        this.sourceBlock_?.workspace?.removeChangeListener(this.changeListener);
    }
}

function isAnalogWriteOnlyPin(pin: string) {
    switch (pin) {
        case "P5":
        case "P6":
        case "P7":
        case "P8":
        case "P9":
        case "P11":
        case "P12":
        case "P13":
        case "P14":
        case "P15":
        case "P16":
            return true;
        default:
            return false;
    }
}