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
    //% blockId=radioBroadcastMessage block="radio broadcast $msg"
    //% msg.shadow=radioMessageCode draggableParameters
    //% weight=200
    //% blockGap=8
    export function sendMessage(msg: number): void {
        radio.sendNumber(msg);
    }

    class Listener {
        public msg: number;
        public cb: () => void;
    }

    let messageListeners: Listener[] = undefined;
    /**
     * Registers code to run for a particular message
     * @param msg 
     * @param handler 
     */
    //% blockId=radioOnMessageReceived block="on radio $msg received"
    //% msg.shadow=radioMessageCode draggableParameters
    //% weight=199
    export function onMessageReceived(msg: number, handler: () => void) {
        // store handler
        if (!messageListeners)
            messageListeners = [];
        let l: Listener;
        for (let i = 0; i < messageListeners.length; ++i) {
            if (messageListeners[i].msg == msg) {
                l = messageListeners[i];
                break;
            }
        }
        if (!l) {
            l = new Listener();
            l.msg = msg;
            messageListeners.push(l);
        }
        l.cb = handler;

        // register handler
        radio.onReceivedNumber(msg => {
            messageListeners
                .filter(listener => listener.msg == msg)
                .forEach(listener => listener.cb());
        })
    }
}