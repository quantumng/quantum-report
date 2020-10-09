export interface baseData {
    type: string;
    info?: string;
}

export interface ResourceErrorData extends baseData {
    outerHTML: string;
    src: string;
    tagName: string;
    id: string;
    className: string;
    name: string;
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
    nodeType: number;
    selector: string;
}

export interface UncaughtErrorData extends baseData {
    name: string;
    filename: string;
    lineno: number;
    colno: number;
    stack: string;
}

export interface UnhandledrejectionErrorData extends baseData {
    stack: string;
}

export interface UnknownErrorData extends baseData {}

export interface PerformanceData extends baseData {}

export interface MessageData extends baseData {
    [propName: string]: any;
}