// 獲取用戶的 IP 地址
async function getUserIp() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

// 獲取設備和瀏覽器信息
function getDeviceAndBrowser() {
    const userAgent = navigator.userAgent;
    const parsedUA = new UAParser(userAgent);
    const device = parsedUA.getDevice();
    const browser = parsedUA.getBrowser();
    
    let deviceInfo = device.vendor || "未知設備";
    if (device.model) {
        deviceInfo += " " + device.model; // 獲取完整的設備型號
    } else {
        deviceInfo += " " + "未知型號";
    }

    return {
        device: deviceInfo,
        browser: browser.name || "未知瀏覽器",
    };
}

// 記錄瀏覽信息
async function logPageVisit() {
    const userIp = await getUserIp();
    const { device, browser } = getDeviceAndBrowser();
    
    // 獲取當
