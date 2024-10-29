// 獲取 IP 地址
async function getUserIp() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Unknown IP';
    }
}

// 獲取裝置和瀏覽器資訊
function getDeviceAndBrowser() {
    const parser = new UAParser();
    const result = parser.getResult();
    const device = result.device.model || 'Unknown Device';
    const browser = result.browser.name || 'Unknown Browser';
    return { device, browser };
}

// 記錄使用者訪問
async function logPageVisit() {
    const userIp = await getUserIp();
    const { device, browser } = getDeviceAndBrowser();
    const visitTime = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
    const currentUrl = window.location.href;

    fetch('https://chiayiddd.vercel.app/log', {  // 更新為您的 Vercel API URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userIp,
            device,
            visitTime,
            browser,
            currentUrl,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => console.log('Data logged:', data))
    .catch(error => console.error('Error logging data:', error));
}

// 當網頁載入時執行
window.onload = logPageVisit;
