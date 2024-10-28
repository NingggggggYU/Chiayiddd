<script>
async function logVisit() {
  const website = window.location.href;
  const ipResponse = await fetch('https://api.ipify.org?format=json');
  const ipData = await ipResponse.json();
  const ip = ipData.ip;
  const device = navigator.userAgent;

  const scriptUrl = 'https://script.google.com/macros/s/AKfycbzNxW1O3jEU6mWO--K_r7_jWBCrJA5JmHhRweO5D5NdtlccJMiMNmuY2P6bzp17DP0/exec'; // 使用 Google Apps Script 的 URL

  fetch(scriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ website, ip, device })
  });
}

logVisit();
</script>
