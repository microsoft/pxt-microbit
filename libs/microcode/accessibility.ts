namespace accessibility {
    export interface AccessibilityMessage {
        type: "text" | "tile" | "rule" | "led" | "note"
        force?: boolean
    }

    export interface TextAccessibilityMessage extends AccessibilityMessage {
        type: "text"
        value: string
    }

    export interface LEDAccessibilityMessage extends AccessibilityMessage {
        type: "led"
        on: boolean
        x: number
        y: number
    }

    export interface NoteAccessibilityMessage extends AccessibilityMessage {
        type: "note"
        on: boolean
        index: number
    }
    
    export interface TileAccessibilityMessage extends AccessibilityMessage {
        type: "tile"
        value: string
    }

    export interface RuleAccessibilityMessage extends AccessibilityMessage {
        type: "rule"
        dos: string[]
        whens: string[]
    }

    /**
     * Notifies web application about the current content.
     */
    //% shim=TD_ID
    export function setLiveContent(msg: AccessibilityMessage) {
        const data = Buffer.fromUTF8(JSON.stringify(msg))
        control.simmessages.send("accessibility", data)
    }

    export function ariaToTooltip(ariaId: string) {
        return microcode.resolveTooltip(ariaId).replaceAll("_", " ")
    }
}
