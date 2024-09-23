async function configureAuth0() {
    const auth0Client = await createAuth0Client({
        domain: "dev-5m5rsaavaelf0ss3.us.auth0.com",
        client_id: "ldVbBX9hxFRpLfvYbEfQSavq47lZI3lX",
        redirect_uri: "https://ningggggggyu.github.io/Chiayiddd/CALDBS.html"
    });

    try {
        // 獲取 Token 來檢查是否已登入
        const token = await auth0Client.getTokenSilently();
        const isAuthenticated = !!token; // 如果 token 存在則認為已登入

        console.log("Is Authenticated:", isAuthenticated);

        if (!isAuthenticated) {
            console.log("User not authenticated, redirecting to login...");
            await auth0Client.loginWithRedirect({
                redirect_uri: window.location.origin // 確保重定向回當前網站
            });
        } else {
            const user = await auth0Client.getUser();
            console.log("Logged in as:", user);

            // 清理 URL 中的回調參數
            if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
                console.log("Cleaning up URL parameters...");
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    } catch (error) {
        console.error("Error during authentication check:", error);
    }
}

// 在頁面載入時執行 Auth0 配置和身份驗證邏輯
window.onload = async () => {
    await configureAuth0();
};
