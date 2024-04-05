import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/router'

import PrimeVue from 'primevue/config';
import "primevue/resources/themes/aura-light-blue/theme.css";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import Button from 'primevue/button';

const app = createApp(App)
app.component('Button', Button);



app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(PrimeVue);



app.mount('#app')
