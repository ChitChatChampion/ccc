import { createApp } from 'vue';
import vue3GoogleLogin from 'vue3-google-login';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';

import './index.css'

const app = createApp(App);
const clientId = '785838083864-vljpaavprlvsq83slqjtf46oop9qtcfd.apps.googleusercontent.com';

app.use(vue3GoogleLogin, {
  clientId: clientId
});
app.use(router);
app.use(VueSweetalert2);

library.add(faArrowLeft);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
