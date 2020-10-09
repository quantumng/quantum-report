import { getConfig } from './config';
import { serialize } from './utils/util';

function reportByImg(url: string, data: any) {
    const reportContent = serialize(data);
    const imgUrl = `${url}?${reportContent}`;
    new Image().src = imgUrl;
}

function reportByAjax(url: string, data: any) {
    const reportContent = JSON.stringify(data);
    const xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = () => {
    //     if (xhr.readyState === XMLHttpRequest.DONE) {
    //         if (xhr.status >= 200 && xhr.status < 300) {}
    //     }
    // }
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(reportContent);
}

function reportBySendBeacon(url: string, data: any) {
    const reportContent = JSON.stringify(data);
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url, reportContent);
    } else {
        console.warn('[Quantum Reporter] Current environment do not support SendBeacon function.');
        reportByAjax(url, data);
    }
}

const sendTypeMap = new Map([
    ['ajax', reportByAjax],
    ['image', reportByImg],
    ['sendBeacon', reportBySendBeacon],
]);

function reporter(data: any) {
    const url = getConfig('reportUrl');
    const customData = getConfig('extraInfo');
    const type = getConfig('sendType');
    const appId = getConfig('appId');
    const content = {
        appId,
        ...data,
        ...customData
    }
    const method = sendTypeMap.get(type) || reportByAjax;
    return method(url, content);
}

export default reporter;