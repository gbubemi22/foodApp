import { UAParser } from 'ua-parser-js'; // Corrected import
export function detectDeviceInfo(req, res, next) {
    const userAgent = req.headers['user-agent'] || '';
    const isPostman = userAgent.includes('PostmanRuntime');
    const deviceInfo = {
        deviceToken: req.headers['x-device-token']?.toString() || '',
        deviceName: req.headers['x-device-name']?.toString() || '',
        userAgent,
        deviceType: 'unknown',
        os: 'Unknown OS',
        browser: 'Unknown Browser',
        isPostman
    };
    if (isPostman) {
        deviceInfo.deviceType = 'postman';
        deviceInfo.os = 'Postman';
        deviceInfo.browser = 'Postman';
    }
    else {
        // Correct instantiation
        const parser = new UAParser(userAgent);
        const result = parser.getResult();
        deviceInfo.os = result.os.name || 'Unknown OS';
        deviceInfo.browser = result.browser.name || 'Unknown Browser';
        deviceInfo.deviceType = result.device.type || 'unknown';
    }
    req.deviceInfo = deviceInfo;
    next();
}
