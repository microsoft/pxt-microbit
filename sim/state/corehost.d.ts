declare function setTimeout(handler: (...args: any[]) => void, timeout?: number, ...args: any[]): any;
declare function clearTimeout(handle?: any): void;
declare const console: {
    log(...data: any[]): void;
    debug(...data: any[]): void;
    info(...data: any[]): void;
    warn(...data: any[]): void;
    error(...data: any[]): void;
};

declare namespace pxsim {
    function board(): DalBoardState;
    function pause(milliseconds: number): void;

    namespace pins {
        function createBuffer(length: number): RefBuffer;
    }

    namespace pxtcore {
        function registerWithDal(id: number, eventId: number, handler: RefAction, mode?: number): void;
    }

    namespace control {
        function deviceSerialNumber(): number;
        function createBuffer(length: number): RefBuffer;
    }
}
