import { mergeConfig, config } from './config';
import bootConsole from './console';
import {
	listenError,
	removeListenError,
	listenUnhandledrejection,
	removeListenUnhandledrejection,
	listenLoad,
	removeListenLoad
} from './eventListener';
import { messageHandler } from './handler';

class QuantumReporter {
	constructor(options: any) {
		this.init(options);
	}
	init(options: any): void {
		if (options && !options.appId) {
			console.warn('[Quantum Reporter] Please set an appId first.');
			return;
		}
		mergeConfig(options);
		config.console && bootConsole(config.console);
		this.monitor();
		this.destroy();
	}
	report(message: any) {
		messageHandler(message);
	}
	 monitor() {
		listenError();
		listenUnhandledrejection();
		config.reportPerf && listenLoad();
	}
	destroy() {
		window?.addEventListener?.('unload', function() {
			removeListenError();
			removeListenUnhandledrejection();
			config.reportPerf && removeListenLoad();
		}, true)
	}
}

export default QuantumReporter;
