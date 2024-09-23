// Auth0 設置
const auth0Client = await createAuth0Client({
    domain: "dev-5m5rsaavaelf0ss3.us.auth0.com",
    client_id: "ldVbBX9hxFRpLfvYbEfQSavq47lZI3lX",
    redirect_uri: window.location.origin
});

// 檢查使用者是否已經登入
async function checkAuthentication() {
    const isAuthenticated = await auth0Client.isAuthenticated();

    if (!isAuthenticated) {
        // 使用者未登入，重定向到 Auth0 登入頁面
        await auth0Client.loginWithRedirect({
            redirect_uri: window.location.origin
        });
    } else {
        // 使用者已登入，繼續顯示內容
        const user = await auth0Client.getUser();
        console.log("Logged in as:", user);
    }
}

// 在頁面載入時檢查身份驗證狀態
window.onload = async () => {
    // 檢查是否是 Auth0 回調
    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/"); // 移除查詢參數
    }

    // 檢查使用者是否已經登入
    await checkAuthentication();
};

// 登出功能
async function logout() {
    await auth0Client.logout({
        returnTo: window.location.origin
    });
}
