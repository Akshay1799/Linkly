import {UAParser} from "ua-parser-js";

export const parseUserAgent = (userAgent)=>{
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    return {
        device: result.device.type || 'desktop',
        browser: result.browser.name || 'unknown',
        os: result.os.name || 'unknown'
    }
}