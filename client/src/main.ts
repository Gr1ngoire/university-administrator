import { createApp } from "vue";
import { App } from "./components/components";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");
