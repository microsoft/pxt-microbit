namespace radio {
    /**
     * Gets the message code
     */
    //% blockHidden=1 shim=ENUM_GET
    //% blockId=radioMessageCode block="$msg" enumInitialMembers="message1"
    //% enumName=RadioMessage enumMemberName=msg enumPromptHint="e.g. Start, Stop, Jump..."
    export function __message(msg: number): number {
        return msg;
    }

    /**
     * Broadcasts a message over radio
     * @param msg 
     */
    //% blockId=radioBroadcastMessage block="radio send $msg"
    //% msg.shadow=radioMessageCode draggableParameters
    //% weight=200
    //% blockGap=8
    //% help=radio/send-message
    export function sendMessage(msg: number): void {
        radio.raiseEvent(DAL.MES_BROADCAST_GENERAL_ID, msg);
    }

    /**
     * Registers code to run for a particular message
     * @param msg 
     * @param handler 
     */
    //% blockId=radioOnMessageReceived block="on radio $msg received"
    //% msg.shadow=radioMessageCode draggableParameters
    //% weight=199
    //% help=radio/on-received-message
    export function onReceivedMessage(msg: number, handler: () => void) {
        control.onEvent(DAL.MES_BROADCAST_GENERAL_ID, msg, handler);
    }
}