import {
    resourceErrorHandler,
    uncaughtErrorHandler,
    unhandledrejectionErrorHandler,
    unknownErrorHandler,
    performanceHandler
} from './handler';

export function listenError() {
    window?.addEventListener?.('error', handlerSwitcher, true)
}

export function removeListenError() {
    window?.removeEventListener?.('error', handlerSwitcher, true)
}

export function listenUnhandledrejection() {
    window?.addEventListener?.('unhandledrejection', handlerSwitcher, true)
}

export function removeListenUnhandledrejection() {
    window?.removeEventListener?.('unhandledrejection', handlerSwitcher, true)
}

export function listenLoad() {
    window?.addEventListener?.('load', performanceHandler);
}

export function removeListenLoad() {
    window?.removeEventListener?.('load', performanceHandler);
}

function handlerSwitcher(e: ErrorEvent | PromiseRejectionEvent) {
    try {
        const { type } = e;
        switch (type) {
            case 'error':
                const _e = e as ErrorEvent;
                const { message, error } = _e;
                const immutableTarget = e.target || e.srcElement;
                if (message && error) {
                    uncaughtErrorHandler(_e);
                } else if (immutableTarget) {
                    resourceErrorHandler(_e);
                }
                break;
            case 'unhandledrejection':
                unhandledrejectionErrorHandler(e as PromiseRejectionEvent);
            default:
                unknownErrorHandler(e);
                break;
        }
    } catch (error) {
        unknownErrorHandler(error)
    }
}