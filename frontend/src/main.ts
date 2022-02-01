import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';

import AppLayout from './layouts/AppLayout.vue';

import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

import { registerModules } from './services/registre-modules';
import setupInterceptors from './services/setupInterceptors';

import authModule from './modules/auth';
import tasksModule from './modules/tasks';
import projectsModule from './modules/projects';

registerModules({
  auth: authModule,
  tasks: tasksModule,
  projects: projectsModule,
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
