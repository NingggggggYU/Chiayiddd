const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');
const app = express();
const port = process.env.PORT || 3000;

// 啟用 CORS
app.use(cors());
app.use(bodyParser.json());

// Google Sheets API 設定
const auth = new google.auth.GoogleAuth({
    keyFile: 'omega-castle-426910-k7-f1eb46411709.json',  // 請確認此為正確的憑證路徑
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Google Sheets 的 ID
const SPREADSHEET_ID = '1RLou3yyu0-X1GAmCVen1d2_x54vth3TfabYhmXUCssE';

app.post('/log', async (req, res) => {
    const { userIp, device, visitTime, browser, currentUrl } = req.body;

    try {
        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });

        const request = {
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:E',
            valueInputOption: 'RAW',
            resource: {
                values: [[userIp, device, visitTime, browser, currentUrl]],
            },
        };

        await sheets.spreadsheets.values.append(request);
        res.status(200).send('Data logged to Google Sheets');
    } catch (error) {
        console.error('Error logging data:', error);
        res.status(500).send('Error logging data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
