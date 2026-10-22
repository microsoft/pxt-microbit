// Host-agnostic globals (browser, worker, Node) used by the DOM-free state sources.
// Mirrors pxt/pxtsimcore/globals.d.ts; used only by tsconfig.core.json.
declare function setTimeout(handler: (...args: any[]) => void, timeout?: number, ...args: any[]): any;
declare function clearTimeout(handle?: any): void;
declare const console: {
    log(...data: any[]): void;
    debug(...data: any[]): void;
    info(...data: any[]): void;
    warn(...data: any[]): void;
    error(...data: any[]): void;
};
