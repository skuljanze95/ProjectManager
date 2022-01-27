/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AppLayout from './layouts/AppLayout.vue';
import authModule from './modules/auth';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { registerModules } from './services/registre-modules';
import setupInterceptors from './services/setupInterceptors';

import './main.css';

registerModules({
  auth: authModule,
});
setupInterceptors(store);

createApp(App)
  .directive('validity', function (el: any, binding: any) {
    el.setCustomValidity(binding.value ? binding.value : '');
  })
  .use(VueAxios, axios)
  .use(store)
  .use(router)
  .component('AppLayout', AppLayout)
  .mount('#app');
