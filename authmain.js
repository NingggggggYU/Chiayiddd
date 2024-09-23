async function configureAuth0() {
    const auth0Client = await createAuth0Client({
        domain: "dev-5m5rsaavaelf0ss3.us.auth0.com",
        client_id: "ldVbBX9hxFRpLfvYbEfQSavq47lZI3lX",
        redirect_uri: "https://ningggggggyu.github.io/Chiayiddd/CALDBS.html"
    });

    // 檢查是否有回調參數
    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
        console.log("Processing login callback...");
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    try {
        // 檢查使用者是否已經登入
        const isAuthenticated = await auth0Client.isAuthenticated();
        console.log("Is Authenticated:", isAuthenticated);

        if (!isAuthenticated) {
            console.log("User not authenticated, redirecting to login...");
            await auth0Client.loginWithRedirect({
                redirect_uri: "https://ningggggggyu.github.io/Chiayiddd/CALDBS.html"
            });
        } else {
            // 獲取 Token
            const token = await auth0Client.getTokenSilently();
            const user = await auth0Client.getUser();
            console.log("Logged in as:", user);
        }
    } catch (error) {
        console.error("Error during authentication check:", error);
    }
}

// 在頁面載入時執行 Auth0 配置和身份驗證邏輯
window.onload = async () => {
    await configureAuth0();
};
