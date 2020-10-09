export let config: any = {
    reportUrl: '',
    appId: '',
    spa: false,
    sendType: 'ajax',
    // you can report extra info like userid,version and so on.please set your var begin with $, in case variable repeat.
    extraInfo: {},
    reportPerf: false,
    // open console plugin, fill in like this:
    // { plugin: your plugin link, entry: an element that you can click to open console, callback: init function if need }
    console: false
}

export function mergeConfig(options: any) {
    config = {
        ...config,
        ...options
    }
}

export function getConfig(option: string) {
    return option && config[option] ? config[option] : {};
}