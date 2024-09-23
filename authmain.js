async function configureAuth0() {
    const auth0Client = await createAuth0Client({
        domain: "dev-5m5rsaavaelf0ss3.us.auth0.com",
        client_id: "ldVbBX9hxFRpLfvYbEfQSavq47lZI3lX",
        redirect_uri: "https://ningggggggyu.github.io/Chiayiddd/CALDBS.html"
    });

    // 檢查是否有 Auth0 的回調參數
    const queryString = window.location.search;
    if (queryString.includes("code=") && queryString.includes("state=")) {
        // 處理回調
        await auth0Client.handleRedirectCallback();
        window.location.replace(window.location.origin + "/CALDBS.html"); // 重新導向到主要頁面
    }

    // 檢查使用者是否已經登入
    const isAuthenticated = await auth0Client.isAuthenticated();

    if (!isAuthenticated) {
        // 使用者未登入，重定向到 Auth0 登入頁面
        await auth0Client.loginWithRedirect({
            redirect_uri: "https://ningggggggyu.github.io/Chiayiddd/CALDBS.html"
        });
    } else {
        // 使用者已登入，繼續顯示內容
        const user = await auth0Client.getUser();
        console.log("Logged in as:", user);
    }
}
