namespace pxsim {
    export interface CommonBoard extends CoreBoard
        , EventBusBoard {
        bus: EventBus;
        edgeConnectorState: EdgeConnectorState;
    }

    export function allocateNotifyEvent(): number {
        let b = board();
        return b.bus.nextNotifyEvent++;
    }
}