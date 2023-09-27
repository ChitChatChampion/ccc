import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";
import Tailwind from "primevue/passthrough/tailwind";
import vue3GoogleLogin from "vue3-google-login";
import VueSweetalert2 from "vue-sweetalert2";
import VueGtag from "vue-gtag";

import "./index.css";
import "sweetalert2/dist/sweetalert2.min.css";

import { createApp } from "vue";

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createMetaManager } from 'vue-meta';
const app = createApp(App);
const clientId = "785838083864-vljpaavprlvsq83slqjtf46oop9qtcfd.apps.googleusercontent.com";

app.use(vue3GoogleLogin, {
  clientId: clientId,
});

app.use(VueSweetalert2);
app.use(PrimeVue, { unstyled: true, pt: Tailwind });

const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify);
app.use(router);
app.use(createMetaManager());

app.use(VueGtag, {
  config: { id: "G-5BP4VWC912" },
});

app.mount('#app');
console.log(app);