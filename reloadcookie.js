document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input");

    // 取得 3 天後的日期
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 3); // 72小時後失效

    // 載入已儲存的 cookie 值
    inputs.forEach(input => {
        const cookieValue = getCookie(input.name);
        if (cookieValue) {
            input.value = cookieValue;
        }
    });

    // 監聽表單提交事件，儲存輸入值到 cookie
    form.addEventListener("submit", function () {
        inputs.forEach(input => {
            setCookie(input.name, input.value, expiresDate);
        });
    });

    // 設置 cookie 函數
    function setCookie(name, value, expires) {
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
    }

    // 取得 cookie 函數
    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const [cookieName, cookieValue] = cookies[i].split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }
});
