import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router/index";
import store from "@/store/store.js";

declare global {
  interface Window {
    CESIUM_BASE_URL: string;
  }
}

createApp(App).use(router).use(store).mount("#app");
