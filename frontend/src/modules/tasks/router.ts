/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteRecordRaw } from 'vue-router';
import Tasks from './views/Tasks.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks,
    meta: {
      layout: 'AppLayoutApp',
    },
  },
];

export default (router: any) => {
  routes.forEach((route) => router.addRoute(route));
};
