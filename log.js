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
    
    // 獲取當前時間並轉換為台灣時間
    const visitTime = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

    // 獲取當前頁面的 URL
    const currentUrl = window.location.href;

    await fetch('https://chiayiddd.vercel.app/index.js', { // 使用 Vercel 的 API 網址
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userIp, device, visitTime, browser, currentUrl }), // 包含當前網址
    });
}

// 监听页面加載
window.addEventListener('load', logPageVisit);
