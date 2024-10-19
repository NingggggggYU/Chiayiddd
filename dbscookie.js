function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
}

window.onload = function() {
  let sessionId = getCookie("JSESSIONID");

  if (!sessionId) {
    console.log("JSESSIONID 不存在，正在跳轉...");
    window.location.href = "https://ningggggggyu.github.io/Chiayiddd/CALDBS.html"; // 將此處替換為你想跳轉的地址
  } else {
    console.log("JSESSIONID 存在:", sessionId);
  }
};
