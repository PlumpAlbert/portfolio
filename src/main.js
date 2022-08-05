import "flowbite";
import {createApp} from "vue";
import {createPinia} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router";
// overmind
import {createOvermind} from "overmind";
import {withOvermind} from "overmind-vue/vue3";
import config from "./model";

import App from "./App.vue";

import "./assets/main.css";

const app = createApp(
  withOvermind(createOvermind(config, {devtools: true}), App)
);
const store = createPinia();
store.use(piniaPluginPersistedstate);

app.use(store);
app.use(router);

app.mount("#app");
