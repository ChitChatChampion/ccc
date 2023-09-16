import { createApp } from 'vue';
import { plugin, defaultConfig } from '@formkit/vue';
import vue3GoogleLogin from 'vue3-google-login';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const clientId = '785838083864-vljpaavprlvsq83slqjtf46oop9qtcfd.apps.googleusercontent.com';

app.use(vue3GoogleLogin, {
  clientId: clientId
});
app.use(router);
app.use(plugin, defaultConfig);
app.use(VueSweetalert2);

app.mount('#app');
