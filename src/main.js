import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";
import Tailwind from "primevue/passthrough/tailwind";
import vue3GoogleLogin from "vue3-google-login";
import VueSweetalert2 from "vue-sweetalert2";

import "./index.css";
import "sweetalert2/dist/sweetalert2.min.css";

import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";

library.add(faClipboard);

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const app = createApp(App);
const clientId = "785838083864-vljpaavprlvsq83slqjtf46oop9qtcfd.apps.googleusercontent.com";

app.use(vue3GoogleLogin, {
  clientId: clientId,
});

app.use(VueSweetalert2);
app.use(PrimeVue, { unstyled: true, pt: Tailwind });

app.component('font-awesome-icon', FontAwesomeIcon);

const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify);
app.use(router);

app.mount('#app');
