import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

var app = createApp(App).use(router);
app.mount('#app');