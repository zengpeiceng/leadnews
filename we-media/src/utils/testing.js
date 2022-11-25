import storage from "./localStorage";
import store from "../store";
let lastTime = new Date().getTime();
let currentTime = new Date().getTime();
let timeout = 1 * 60 * 1000; // 超时时间 15分钟

window.onload = () => {
  window.document.onmousedown = () => {
    storage.setItem("lastTime", new Date().getTime());
  };
};

function checkTimeout() {
  currentTime = new Date().getTime();
  lastTime = storage.getItem("lastTime");

  // 判断是否超时
  if (currentTime - lastTime > timeout) {
    storage.clear();
    if (window.location.pathname != "/login")
      store.commit("changeSysDialogStatus", true);
  }
}

export default function () {
  // 10秒检测一次是否长时间未操作页面;
  window.setInterval(checkTimeout, 10000);
}
