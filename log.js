async function logVisit() {
  console.log("logVisit 函數開始執行");  // 確認函數被調用
  const website = window.location.href;
  const ipResponse = await fetch('https://api.ipify.org?format=json');
  const ipData = await ipResponse.json();
  const ip = ipData.ip;
  const device = navigator.userAgent;

  const scriptUrl = 'https://script.google.com/macros/s/AKfycbzNxW1O3jEU6mWO--K_r7_jWBCrJA5JmHhRweO5D5NdtlccJMiMNmuY2P6bzp17DP0/exec';
  console.log("發送資料到 Google Apps Script");

  await fetch(scriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ website, ip, device })
  }).then(response => console.log("請求已發送", response))
    .catch(error => console.error("發送請求時出錯", error));
}

logVisit();
