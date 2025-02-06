function getAccessToken() {
            const parameter = {
                grant_type: "client_credentials",
                client_id: "yuche0826-7e3f053e-05b0-4345",
                client_secret: "4541eb2b-6bbd-4a5b-a025-2335227d4c96"
            };

            return fetch("https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token", {
                method: 'POST',
                headers: {
                    "Accept-Encoding": "br,gzip",
                },
                body: new URLSearchParams(parameter)
            })
            .then(response => response.json())
            .then(data => data.access_token)
            .catch(error => {
                console.error('Error fetching access token:', error);
                return null;
            });
        }
