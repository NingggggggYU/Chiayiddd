document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input");

    // 載入已儲存的值
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.name);
        if (savedValue) {
            input.value = savedValue;
        }
    });

    // 監聽表單提交事件，儲存輸入值
    form.addEventListener("submit", function () {
        inputs.forEach(input => {
            localStorage.setItem(input.name, input.value);
        });
    });
});
