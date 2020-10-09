export function queryStringify(obj: object): string {
    return encodeURIComponent(JSON.stringify(obj));
}

export function serialize(obj: any) {
    var str = [];
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            str.push(encodeURIComponent(prop) + "=" + encodeURIComponent(obj[prop]));
        }
    }
    return str.join("&");
};

function getParentNode(node: Node, path: Node[]) {
    if (node.parentNode) {
        path.push(node.parentNode);
        getParentNode(node.parentNode, path);
    }
}

function getPath(node: Node) {
    const path: Node[] = [];
    path.push(node);
    getParentNode(node, path);
    return path;
}

export const getNodeDetail = (event: Event) => {
    // @ts-ignore
    const path = typeof event.path === 'undefined' ? getPath(event.target as Node) : event.path
    return path.reverse().map((node: Element) => {
        return (node.localName || '') + (node.id ? `#${node.id}` : '') + (node.className ? `.${node.className}` : '')
    })
    .filter((v: string): boolean => Boolean(v))
    .join(' > ');
}