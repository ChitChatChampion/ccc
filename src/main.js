import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

import vue3GoogleLogin from 'vue3-google-login';
const clientId = '785838083864-vljpaavprlvsq83slqjtf46oop9qtcfd.apps.googleusercontent.com';
app.use(vue3GoogleLogin, {
  clientId: clientId
});

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
app.use(VueSweetalert2);

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowLeft);
library.add(faTrash);
library.add(faSave);
app.component('font-awesome-icon', FontAwesomeIcon);

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
const vuetify = createVuetify({
  components,
  directives,
})
app.use(vuetify);

import router from './router';
app.use(router);

import './index.css';

app.mount('#app');
