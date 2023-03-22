import { createApp } from 'vue'
import router from './router';
import App from './App.vue';
import store from './store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.js';

const app=createApp(App);
app.use(store);
app.use(bootstrap);

app.use(router);
app.mount('#app');
