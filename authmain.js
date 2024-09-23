async function configureAuth0() {
    // Auth0 設置
    const auth0Client = await createAuth0Client({
        domain: "dev-5m5rsaavaelf0ss3.us.auth0.com",
        client_id: "ldVbBX9hxFRpLfvYbEfQSavq47lZI3lX",
        redirect_uri: "https://ningggggggyu.github.io/Chiayiddd/CALDBS.html"  // 統一使用這個 URL
    });

    // 檢查使用者是否已經登入
    const isAuthenticated = await auth0Client.isAuthenticated();

    if (!isAuthenticated) {
        // 使用者未登入，重定向到 Auth0 登入頁面
        await auth0Client.loginWithRedirect({
            redirect_uri: "https://ningggggggyu.github.io/Chiayiddd/CALDBS.html"  // 這裡要與 createAuth0Client 的 URL 一致
        });
    } else {
        // 使用者已登入，繼續顯示內容
        const user = await auth0Client.getUser();
        console.log("Logged in as:", user);
    }
}

// 在頁面載入時執行 Auth0 配置和身份驗證邏輯
window.onload = async () => {
    await configureAuth0();
};
