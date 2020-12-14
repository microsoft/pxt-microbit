namespace pxsim {
    export interface CommonBoard extends CoreBoard
        , EventBusBoard {
        bus: EventBus;
        edgeConnectorState: EdgeConnectorState;
    }
}