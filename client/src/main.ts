import { createApp } from "vue";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import { App } from "./components/components";
import router from "./router";
import { store, key } from "./store/store";

import "vue3-toastify/dist/index.css";

import "@/assets/styles/main.scss";

const DEFAULT_MILISECONDS_TIMEOUT = 3000;

const app = createApp(App);

app.use(store, key);
app.use(router);
app.use(Vue3Toastify, {
  autoClose: DEFAULT_MILISECONDS_TIMEOUT,
} as ToastContainerOptions);

app.mount("#app");
