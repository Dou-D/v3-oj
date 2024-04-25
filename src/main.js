import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "@/router";

import { install as VueMonacoEditorPlugin } from "@guolao/vue-monaco-editor";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-blue/theme.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import Button from "primevue/button";
import Slider from "primevue/slider";
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Editor from 'primevue/editor';
import Dialog from 'primevue/dialog';
const app = createApp(App);

app.use(VueMonacoEditorPlugin, {
  paths: {
    // The recommended CDN config
    // vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs",
    vs: "../node_modules/monaco-editor/min/vs"
  },
});

app.component("Dialog", Dialog);
app.component("Editor", Editor);
app.component("Slider", Slider);
app.component("Button", Button);
app.component("Toast", Toast);
app.use(ToastService);
app.use(createPinia());
app.use(router);
app.use(Antd);
app.use(PrimeVue);

app.mount("#app");
