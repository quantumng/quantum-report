import reporter from './reporter';
import { getNodeDetail, queryStringify } from './utils/util';
import {
    ResourceErrorData,
    UncaughtErrorData,
    UnhandledrejectionErrorData,
    UnknownErrorData,
    PerformanceData,
    MessageData
} from './typings/reportData';
import {
    UNCAUGHT_ERROR,
    RESOURCE_ERROR,
    UNHANDLEDREJECTION_ERROR,
    UNKNOWN_ERROR,
    MESSAGE,
    PERFORMANCE
} from './typings/types';

export function resourceErrorHandler(error: ErrorEvent) {
    const target = (error.target || error.srcElement) as any;
    const { outerHTML } = target;
    const selector = getNodeDetail(error);

    const reportContent: ResourceErrorData = {
        type: RESOURCE_ERROR,
        outerHTML,
        src: target && target.src,
        tagName: target && target.tagName,
        id: target && target.id,
        className: target && target.className,
        name: target && target.name,
        nodeType: target && target.nodeType,
        selector,
    };
    reporter(reportContent);
}

export function uncaughtErrorHandler(error: ErrorEvent) {
    const {
        message,
        filename,
        lineno,
        colno,
        error: { stack, name },
    } = error;

    const reportContent: UncaughtErrorData = {
        type: UNCAUGHT_ERROR,
        name,
        info: message,
        filename,
        lineno,
        colno,
        stack,
    };
    reporter(reportContent);
}

export function unhandledrejectionErrorHandler(error: PromiseRejectionEvent) {
    const reportContent: UnhandledrejectionErrorData = {
        type: UNHANDLEDREJECTION_ERROR,
        info: error.reason.message || error.reason,
        stack: error.reason.stack,
    };
    reporter(reportContent);
}

export function unknownErrorHandler(error: any) {
    const reportContent: UnknownErrorData = error.message ? {
        type: UNKNOWN_ERROR,
        info: error.message
    } : {
        type: UNKNOWN_ERROR,
        info: queryStringify(error)
    };
    reporter(reportContent);
}

export function performanceHandler() {
    const reportContent: PerformanceData = {
        type: PERFORMANCE,
        info: queryStringify(window?.performance?.timing)
    };
    reporter(reportContent);
}

export function messageHandler(message: any) {
    const reportContent: MessageData = {
        type: MESSAGE,
        info: message.message || queryStringify(message),
        ...message
    }
    reporter(reportContent);
}




