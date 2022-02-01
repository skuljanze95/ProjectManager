import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

import AppLayout from './layouts/AppLayout.vue';
import authModule from './modules/auth';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { registerModules } from './services/registre-modules';
import setupInterceptors from './services/setupInterceptors';

registerModules({
  auth: authModule,
});
setupInterceptors(store);

loadFonts();

createApp(App)
  .use(VueAxios, axios)
  .use(router)
  .use(store)
  .component('AppLayout', AppLayout)
  .use(vuetify)
  .mount('#app');
