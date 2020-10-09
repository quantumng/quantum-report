export default function bootConsole(options: any): void {
    if (options && options.entry) {
        window.addEventListener('load', function() {
            const entry = document.querySelector(options.entry);
            let count = 0;
            entry?.addEventListener('click', () => {
                count++;
                if (count > 5) {
                    count = -9999;
                    buildScript(options.plugin, options.callback || (() => {}));
                }
            })
        })
    }
}

function buildScript(url: string, callback: () => void): void {
    const ele = document.createElement('script');
    ele.type = 'text/javascript';
    ele.src = url;
    ele.onload = function() {
        callback();
    }
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(ele, firstScript);
}
