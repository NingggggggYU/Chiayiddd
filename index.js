const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis'); // 引入 Google APIs
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// 設定 Google Sheets API
const auth = new google.auth.GoogleAuth({
    keyFile: 'omega-castle-426910-k7-f1eb46411709.json', // 將此處替換為您的 JSON 憑證文件路徑
    scopes: ['https://www.googleapis.com/auth/spreadsheets'], // 設置所需的授權範圍
});

// 設定您的 Google Sheets ID
const SPREADSHEET_ID = '您的 Google Sheets ID';

app.post('/log', async (req, res) => {
    const { userIp, device, visitTime, browser, currentUrl } = req.body;

    try {
        const client = await auth.getClient();
        const request = {
            spreadsheetId: '1RLou3yyu0-X1GAmCVen1d2_x54vth3TfabYhmXUCssE',
            range: 'Sheet1!A1:E1', // 指定要寫入的範圍
            valueInputOption: 'RAW',
            resource: {
                values: [[userIp, device, visitTime, browser, currentUrl]], // 將資料寫入表格
            },
            auth: client,
        };

        await google.sheets('v4').spreadsheets.values.append(request);
        res.status(200).send('Data logged to Google Sheets');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
