import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import { Select, Button, List } from "ant-design-vue";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());

app.use(Select);
app.use(Button);
app.use(List);

app.mount("#app");
