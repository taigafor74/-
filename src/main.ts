import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/reset.css";
import "element-plus/theme-chalk/dark/css-vars.css";

import VueSocketIO from "vue-socket.io";
import { registerSockets, destroySockets } from "./utils/sockets";

import echarts from "./echarts";

const app = createApp(App);

app.config.globalProperties.$echarts = echarts;
// const socket = new VueSocketIO({
//   debug: false, // debug调试，生产建议关闭
//   connection: "http://localhost:3000",
// });

// // 便于在任意位置获取到 socket 对象
// app.config.globalProperties.$socket = socket;
// // 监听事件
// app.config.globalProperties.$addSockets = registerSockets;
// // 移除事件
// app.config.globalProperties.$removeSockets = destroySockets;

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.mount("#app");
