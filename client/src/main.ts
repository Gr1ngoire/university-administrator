import { createApp } from "vue";
import { App } from "./components/components";
import router from "./router";
import { store, key } from "./store/store";

import "@/assets/styles/main.scss";

const app = createApp(App);

app.use(store, key);
app.use(router);

app.mount("#app");
