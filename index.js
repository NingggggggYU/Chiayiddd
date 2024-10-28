const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const UserAgentParser = require('user-agent-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// 解析 JSON 請求體
app.use(bodyParser.json());

// Google Sheets API 設置
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
    keyFile: 'omega-castle-426910-k7-f1eb46411709.json', // 替換為您下載的 JSON 檔案的路徑
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

app.post('/log', async (req, res) => {
    const { userIp, device, visitTime, browser } = req.body; // 接收用戶數據

    const client = await auth.getClient();
    const spreadsheetId = '1RLou3yyu0-X1GAmCVen1d2_x54vth3TfabYhmXUCssE'; // 替換為您的 Google Sheets ID
    const range = 'Sheet1!A:D'; // 替換為您的數據範圍

    // 添加數據到 Google Sheets
    await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: {
            values: [[visitTime, userIp, device, browser]],
        },
    });

    res.status(200).send('Data logged successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
