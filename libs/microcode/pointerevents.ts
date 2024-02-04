namespace pointerevents {
    export interface PointerEventMessage {
        type: "pointerdown" | "pointerup" | "pointermove"
        x: number
        y: number
        buttons: number
    }

    export interface WheelEventMessage {
        type: "wheel"
        dx: number
        dy: number
        dz: number
    }

    const contexts: {
        click: (x: number, y: number) => void
        move: (x: number, y: number) => void
        wheel: (dx: number, dy: number) => void
    }[] = []
    //% shim=TD_NOOP
    export function pushContext(
        click: (x: number, y: number) => void,
        move: (x: number, y: number) => void,
        wheel: (dx: number, dy: number) => void
    ) {
        contexts.push({ click, move, wheel })
        setup()
    }

    //% shim=TD_NOOP
    export function popContext() {
        contexts.pop()
    }

    //% shim=TD_NOOP
    function setup() {
        control.simmessages.onReceived("pointer-events", data => {
            const ctx = contexts[contexts.length - 1]
            if (!ctx) return

            const msg = JSON.parse(data.toString())
            // down event!
            if (msg.type === "pointerdown") {
                const m = msg as PointerEventMessage
                ctx.click(m.x, m.y)
            } else if (msg.type === "pointermove") {
                const m = msg as PointerEventMessage
                ctx.move(m.x, m.y)
            } else if (msg.type === "wheel") {
                const m = msg as WheelEventMessage
                ctx.wheel(m.dx, m.dy)
            }
        })
    }
}
