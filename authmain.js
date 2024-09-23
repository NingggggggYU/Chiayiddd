async function configureAuth0() {
    const auth0Client = await createAuth0Client({
        domain: "dev-5m5rsaavaelf0ss3.us.auth0.com",
        client_id: "ldVbBX9hxFRpLfvYbEfQSavq47lZI3lX",
        redirect_uri: "https://ningggggggyu.github.io/Chiayiddd/CALDBS.html"
    });

    // 檢查使用者是否已經登入
    const isAuthenticated = await auth0Client.isAuthenticated();
    console.log("Is Authenticated:", isAuthenticated);

    if (!isAuthenticated) {
        console.log("Redirecting to login...");
        await auth0Client.loginWithRedirect({
            redirect_uri: "https://ningggggggyu.github.io/Chiayiddd/CALDBS.html"
        });
    } else {
        const user = await auth0Client.getUser();
        console.log("Logged in as:", user);

        // 清理 URL 中的回調參數
        if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // 確保網站在這裡顯示內容
        displayUserContent(user);
    }
}

function displayUserContent(user) {
    // 在這裡顯示登入後的內容
    console.log("Welcome, ", user.name);
    // 其他顯示邏輯
}

window.onload = async () => {
    await configureAuth0();
};
